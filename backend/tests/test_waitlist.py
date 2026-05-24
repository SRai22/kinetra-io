import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Waitlist API Tests

class TestWaitlistAPI:

    def test_root_api(self):
        r = requests.get(f"{BASE_URL}/api/")
        assert r.status_code == 200

    def test_get_waitlist_count(self):
        r = requests.get(f"{BASE_URL}/api/waitlist/count")
        assert r.status_code == 200
        data = r.json()
        assert "count" in data
        assert isinstance(data["count"], int)
        print(f"Waitlist count: {data['count']}")

    def test_join_waitlist_valid_email(self):
        r = requests.post(f"{BASE_URL}/api/waitlist", json={"email": "TEST_newuser_12345@example.com"})
        assert r.status_code == 200
        data = r.json()
        assert data["success"] == True
        assert "list" in data["message"].lower()
        print(f"Join response: {data}")

    def test_join_waitlist_duplicate_email(self):
        email = "TEST_dup_99999@example.com"
        # First submission
        requests.post(f"{BASE_URL}/api/waitlist", json={"email": email})
        # Duplicate submission
        r = requests.post(f"{BASE_URL}/api/waitlist", json={"email": email})
        assert r.status_code == 200
        data = r.json()
        assert data["success"] == True
        assert "already" in data["message"].lower()
        print(f"Duplicate response: {data}")

    def test_join_waitlist_invalid_email(self):
        r = requests.post(f"{BASE_URL}/api/waitlist", json={"email": "notanemail"})
        assert r.status_code == 200
        data = r.json()
        assert data["success"] == False
        assert "invalid" in data["message"].lower()
        print(f"Invalid email response: {data}")

    def test_count_increases_after_join(self):
        r1 = requests.get(f"{BASE_URL}/api/waitlist/count")
        count_before = r1.json()["count"]

        unique_email = f"TEST_count_check_{os.urandom(4).hex()}@example.com"
        requests.post(f"{BASE_URL}/api/waitlist", json={"email": unique_email})

        r2 = requests.get(f"{BASE_URL}/api/waitlist/count")
        count_after = r2.json()["count"]
        assert count_after == count_before + 1
        print(f"Count before: {count_before}, after: {count_after}")
