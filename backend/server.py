from pathlib import Path
from dotenv import load_dotenv

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from fastapi import FastAPI, APIRouter, HTTPException, Request, Depends
from fastapi.responses import StreamingResponse
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import re
import io
import csv
import secrets
import bcrypt
import jwt
from pydantic import BaseModel, Field, ConfigDict, BeforeValidator
from typing import Annotated, Optional
from datetime import datetime, timezone, timedelta
from bson import ObjectId

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

JWT_SECRET = os.environ.get('JWT_SECRET', secrets.token_hex(32))
JWT_ALGORITHM = "HS256"

PyObjectId = Annotated[str, BeforeValidator(str)]

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# ─── Auth helpers ───────────────────────────────────────────────────

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))

def create_access_token(user_id: str, email: str) -> str:
    payload = {"sub": user_id, "email": email, "exp": datetime.now(timezone.utc) + timedelta(hours=24), "type": "access"}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

async def get_admin_user(request: Request):
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = auth[7:]
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.admin_users.find_one({"_id": ObjectId(payload["sub"])})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return {"id": str(user["_id"]), "email": user["email"], "role": user.get("role", "admin")}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except (jwt.InvalidTokenError, Exception):
        raise HTTPException(status_code=401, detail="Invalid token")

# ─── Models ─────────────────────────────────────────────────────────

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
    source: str = "direct"
    utm_source: Optional[str] = None

class WaitlistCreate(BaseModel):
    email: str
    source: str = "direct"
    utm_source: Optional[str] = None

class WaitlistResponse(BaseModel):
    success: bool
    message: str

class WaitlistCount(BaseModel):
    count: int

class AdminLogin(BaseModel):
    email: str
    password: str

class AnalyticsEvent(BaseModel):
    event_type: str
    session_id: str
    metadata: dict = {}
    page_url: Optional[str] = None

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')

# ─── Public Routes ──────────────────────────────────────────────────

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
    entry = WaitlistEntry(email=email, source=payload.source, utm_source=payload.utm_source)
    await db.waitlist.insert_one(entry.to_mongo())
    # Track conversion event
    await db.analytics.insert_one({
        "event_type": "waitlist_signup",
        "session_id": "server",
        "metadata": {"email": email, "source": payload.source},
        "timestamp": datetime.now(timezone.utc).isoformat(),
    })
    return WaitlistResponse(success=True, message="You're on the list.")

@api_router.get("/waitlist/count", response_model=WaitlistCount)
async def get_waitlist_count():
    count = await db.waitlist.count_documents({})
    return WaitlistCount(count=count)

# ─── Analytics (public) ─────────────────────────────────────────────

@api_router.post("/analytics/event")
async def track_event(event: AnalyticsEvent):
    doc = {
        "event_type": event.event_type,
        "session_id": event.session_id,
        "metadata": event.metadata,
        "page_url": event.page_url,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }
    await db.analytics.insert_one(doc)
    return {"ok": True}

# ─── Admin Auth ─────────────────────────────────────────────────────

@api_router.post("/admin/login")
async def admin_login(payload: AdminLogin):
    email = payload.email.strip().lower()
    user = await db.admin_users.find_one({"email": email})
    if not user or not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token(str(user["_id"]), user["email"])
    return {"token": token, "user": {"id": str(user["_id"]), "email": user["email"], "role": user.get("role", "admin")}}

@api_router.get("/admin/me")
async def admin_me(admin=Depends(get_admin_user)):
    return admin

# ─── Admin Waitlist ─────────────────────────────────────────────────

@api_router.get("/admin/waitlist")
async def admin_get_waitlist(page: int = 1, limit: int = 20, search: str = "", admin=Depends(get_admin_user)):
    query = {}
    if search:
        query["email"] = {"$regex": search, "$options": "i"}
    skip = (page - 1) * limit
    total = await db.waitlist.count_documents(query)
    entries = await db.waitlist.find(query, {"_id": 0}).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    return {"entries": entries, "total": total, "page": page, "limit": limit, "pages": (total + limit - 1) // limit}

@api_router.get("/admin/waitlist/export")
async def admin_export_waitlist(admin=Depends(get_admin_user)):
    entries = await db.waitlist.find({}, {"_id": 0}).sort("created_at", -1).to_list(100000)
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["email", "created_at", "source", "utm_source"])
    for e in entries:
        writer.writerow([e.get("email", ""), e.get("created_at", ""), e.get("source", ""), e.get("utm_source", "")])
    output.seek(0)
    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename=kinetra_waitlist_{datetime.now(timezone.utc).strftime('%Y%m%d')}.csv"}
    )

# ─── Admin Analytics ────────────────────────────────────────────────

@api_router.get("/admin/analytics/overview")
async def admin_analytics_overview(admin=Depends(get_admin_user)):
    total_signups = await db.waitlist.count_documents({})
    total_page_views = await db.analytics.count_documents({"event_type": "page_view"})
    total_section_views = await db.analytics.count_documents({"event_type": "section_view"})
    total_form_focuses = await db.analytics.count_documents({"event_type": "form_focus"})
    total_form_submits = await db.analytics.count_documents({"event_type": "form_submit"})
    unique_sessions = len(await db.analytics.distinct("session_id", {"session_id": {"$ne": "server"}}))
    conversion_rate = round((total_signups / max(unique_sessions, 1)) * 100, 1) if unique_sessions > 0 else 0
    return {
        "total_signups": total_signups,
        "total_page_views": total_page_views,
        "unique_sessions": unique_sessions,
        "total_section_views": total_section_views,
        "total_form_focuses": total_form_focuses,
        "total_form_submits": total_form_submits,
        "conversion_rate": conversion_rate,
    }

@api_router.get("/admin/analytics/funnel")
async def admin_analytics_funnel(admin=Depends(get_admin_user)):
    page_views = await db.analytics.count_documents({"event_type": "page_view"})
    section_views = await db.analytics.count_documents({"event_type": "section_view", "metadata.section": {"$in": ["pain", "features"]}})
    form_focuses = await db.analytics.count_documents({"event_type": "form_focus"})
    form_submits = await db.analytics.count_documents({"event_type": "form_submit"})
    signups = await db.waitlist.count_documents({})
    return {
        "stages": [
            {"name": "Page Views", "count": page_views},
            {"name": "Engaged (Scrolled)", "count": section_views},
            {"name": "Form Focused", "count": form_focuses},
            {"name": "Form Submitted", "count": form_submits},
            {"name": "Signed Up", "count": signups},
        ]
    }

@api_router.get("/admin/analytics/daily")
async def admin_analytics_daily(days: int = 30, admin=Depends(get_admin_user)):
    cutoff = (datetime.now(timezone.utc) - timedelta(days=days)).isoformat()
    entries = await db.waitlist.find({"created_at": {"$gte": cutoff}}, {"_id": 0, "created_at": 1}).to_list(100000)
    daily = {}
    for e in entries:
        day = e["created_at"][:10]
        daily[day] = daily.get(day, 0) + 1
    # Fill missing days
    result = []
    for i in range(days):
        d = (datetime.now(timezone.utc) - timedelta(days=days - 1 - i)).strftime("%Y-%m-%d")
        result.append({"date": d, "signups": daily.get(d, 0)})
    return {"daily": result}

@api_router.get("/admin/analytics/sections")
async def admin_analytics_sections(admin=Depends(get_admin_user)):
    pipeline = [
        {"$match": {"event_type": "section_view"}},
        {"$group": {"_id": "$metadata.section", "views": {"$sum": 1}}},
        {"$sort": {"views": -1}},
    ]
    results = await db.analytics.aggregate(pipeline).to_list(100)
    return {"sections": [{"section": r["_id"], "views": r["views"]} for r in results if r["_id"]]}

# ─── App Setup ──────────────────────────────────────────────────────

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    # Create indexes
    await db.waitlist.create_index("email", unique=True)
    await db.analytics.create_index("event_type")
    await db.analytics.create_index("session_id")
    await db.analytics.create_index("timestamp")
    await db.admin_users.create_index("email", unique=True)
    # Seed admin
    admin_email = os.environ.get("ADMIN_EMAIL", "admin@kinetra.io")
    admin_password = os.environ.get("ADMIN_PASSWORD", "kinetra2025")
    existing = await db.admin_users.find_one({"email": admin_email})
    if existing is None:
        hashed = hash_password(admin_password)
        await db.admin_users.insert_one({"email": admin_email, "password_hash": hashed, "role": "admin", "created_at": datetime.now(timezone.utc).isoformat()})
        logger.info(f"Admin user seeded: {admin_email}")
    elif not verify_password(admin_password, existing["password_hash"]):
        await db.admin_users.update_one({"email": admin_email}, {"$set": {"password_hash": hash_password(admin_password)}})
        logger.info(f"Admin password updated: {admin_email}")
    # Write credentials
    creds_path = Path("/app/memory/test_credentials.md")
    creds_path.parent.mkdir(parents=True, exist_ok=True)
    creds_path.write_text(f"# Admin Credentials\nEmail: {admin_email}\nPassword: {admin_password}\nRole: admin\nLogin: POST /api/admin/login\n")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
