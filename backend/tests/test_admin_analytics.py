"""Backend tests for admin dashboard and analytics endpoints"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

@pytest.fixture(scope="module")
def token():
    r = requests.post(f"{BASE_URL}/api/admin/login", json={"email": "admin@kinetra.io", "password": "kinetra2025"})
    assert r.status_code == 200, f"Login failed: {r.text}"
    return r.json()["token"]

@pytest.fixture(scope="module")
def auth_headers(token):
    return {"Authorization": f"Bearer {token}"}

# Admin login tests
def test_admin_login_success():
    r = requests.post(f"{BASE_URL}/api/admin/login", json={"email": "admin@kinetra.io", "password": "kinetra2025"})
    assert r.status_code == 200
    data = r.json()
    assert "token" in data
    assert "user" in data
    assert data["user"]["email"] == "admin@kinetra.io"

def test_admin_login_invalid_credentials():
    r = requests.post(f"{BASE_URL}/api/admin/login", json={"email": "admin@kinetra.io", "password": "wrongpassword"})
    assert r.status_code == 401

def test_admin_login_unknown_email():
    r = requests.post(f"{BASE_URL}/api/admin/login", json={"email": "unknown@example.com", "password": "pass"})
    assert r.status_code == 401

# Admin me endpoint
def test_admin_me(auth_headers):
    r = requests.get(f"{BASE_URL}/api/admin/me", headers=auth_headers)
    assert r.status_code == 200
    data = r.json()
    assert "email" in data

def test_admin_me_no_token():
    r = requests.get(f"{BASE_URL}/api/admin/me")
    assert r.status_code == 401

# Admin waitlist tests
def test_admin_waitlist_returns_entries(auth_headers):
    r = requests.get(f"{BASE_URL}/api/admin/waitlist", headers=auth_headers)
    assert r.status_code == 200
    data = r.json()
    assert "entries" in data
    assert "total" in data
    assert isinstance(data["entries"], list)

def test_admin_waitlist_search(auth_headers):
    r = requests.get(f"{BASE_URL}/api/admin/waitlist?search=test", headers=auth_headers)
    assert r.status_code == 200
    data = r.json()
    assert "entries" in data

def test_admin_waitlist_pagination(auth_headers):
    r = requests.get(f"{BASE_URL}/api/admin/waitlist?page=1&limit=5", headers=auth_headers)
    assert r.status_code == 200
    data = r.json()
    assert data["page"] == 1
    assert data["limit"] == 5

def test_admin_waitlist_no_auth():
    r = requests.get(f"{BASE_URL}/api/admin/waitlist")
    assert r.status_code == 401

def test_admin_waitlist_export(auth_headers):
    r = requests.get(f"{BASE_URL}/api/admin/waitlist/export", headers=auth_headers)
    assert r.status_code == 200
    assert "text/csv" in r.headers.get("content-type", "")
    assert "email" in r.text  # CSV header

def test_admin_waitlist_export_no_auth():
    r = requests.get(f"{BASE_URL}/api/admin/waitlist/export")
    assert r.status_code == 401

# Analytics public event
def test_analytics_event_post():
    r = requests.post(f"{BASE_URL}/api/analytics/event", json={
        "event_type": "page_view",
        "session_id": "TEST_session_123",
        "metadata": {},
        "page_url": "/"
    })
    assert r.status_code == 200
    assert r.json().get("ok") is True

# Admin analytics overview
def test_admin_analytics_overview(auth_headers):
    r = requests.get(f"{BASE_URL}/api/admin/analytics/overview", headers=auth_headers)
    assert r.status_code == 200
    data = r.json()
    assert "total_signups" in data
    assert "total_page_views" in data
    assert "unique_sessions" in data
    assert "conversion_rate" in data

def test_admin_analytics_funnel(auth_headers):
    r = requests.get(f"{BASE_URL}/api/admin/analytics/funnel", headers=auth_headers)
    assert r.status_code == 200
    data = r.json()
    assert "stages" in data
    assert len(data["stages"]) == 5
    stage_names = [s["name"] for s in data["stages"]]
    assert "Page Views" in stage_names
    assert "Signed Up" in stage_names

def test_admin_analytics_daily(auth_headers):
    r = requests.get(f"{BASE_URL}/api/admin/analytics/daily", headers=auth_headers)
    assert r.status_code == 200
    data = r.json()
    assert "daily" in data
    assert len(data["daily"]) == 30  # default 30 days

def test_admin_analytics_sections(auth_headers):
    r = requests.get(f"{BASE_URL}/api/admin/analytics/sections", headers=auth_headers)
    assert r.status_code == 200
    data = r.json()
    assert "sections" in data
