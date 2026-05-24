from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import re
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, BeforeValidator
from typing import Annotated
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

PyObjectId = Annotated[str, BeforeValidator(str)]


class BaseDocument(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    id: PyObjectId = Field(default=None, alias="_id")

    @classmethod
    def from_mongo(cls, doc):
        if doc is None:
            return None
        return cls(**doc)

    def to_mongo(self):
        data = self.model_dump(by_alias=True, exclude_none=True)
        if "id" in data and data["id"] is None:
            del data["id"]
        return data


class WaitlistEntry(BaseDocument):
    email: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class WaitlistCreate(BaseModel):
    email: str


class WaitlistResponse(BaseModel):
    success: bool
    message: str


class WaitlistCount(BaseModel):
    count: int


EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')


@api_router.get("/")
async def root():
    return {"message": "Kinetra API"}


@api_router.post("/waitlist", response_model=WaitlistResponse)
async def join_waitlist(payload: WaitlistCreate):
    email = payload.email.strip().lower()
    if not EMAIL_REGEX.match(email):
        return WaitlistResponse(success=False, message="Invalid email address.")

    existing = await db.waitlist.find_one({"email": email})
    if existing:
        return WaitlistResponse(success=True, message="You're already on the list.")

    entry = WaitlistEntry(email=email)
    await db.waitlist.insert_one(entry.to_mongo())
    return WaitlistResponse(success=True, message="You're on the list.")


@api_router.get("/waitlist/count", response_model=WaitlistCount)
async def get_waitlist_count():
    count = await db.waitlist.count_documents({})
    return WaitlistCount(count=count)


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
