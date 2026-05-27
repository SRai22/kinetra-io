# Kinetra - Fleet Observability Platform - Waitlist Landing Page

## Architecture
- **Frontend**: React + Tailwind CSS + Recharts
- **Backend**: FastAPI + JWT auth + MongoDB
- **Database**: MongoDB (waitlist, analytics, admin_users collections)

## What's Been Implemented (Dec 2025)

### V1 - Core Landing Page
- [x] 6 sections: Hero, Pain, Features, How It Works, Social Proof, CTA
- [x] Email waitlist capture with duplicate detection
- [x] Canvas particle network, scroll animations, typewriter effects
- [x] SVG robot illustrations, fleet constellations

### V2 - Visual Enhancements
- [x] Fixed navbar with logo, nav links, scroll-triggered blur
- [x] FleetConstellation with robot SVG silhouettes
- [x] Heartbeat animation, robot boot sequence, section dividers

### V3 - Admin Dashboard + Analytics
- [x] JWT-based admin auth (seeded on startup)
- [x] Admin login page at /admin/login
- [x] Admin dashboard at /admin with protected routes
- [x] Waitlist tab: paginated table, search, CSV export
- [x] Analytics tab: conversion funnel, daily signups chart, section engagement
- [x] Overview cards: total signups, page views, sessions, conversion rate
- [x] Frontend analytics tracking: page_view, section_view (IntersectionObserver), form events
- [x] Admin credentials: admin@kinetra.io / kinetra2025

## Backlog
- P1: Email confirmation (SendGrid/Resend integration)
- P2: Referral system for waitlist position
- P3: A/B testing for headline variants
