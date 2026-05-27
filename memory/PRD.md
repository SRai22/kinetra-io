# Kinetra - Fleet Observability Platform - Waitlist Landing Page

## Problem Statement
Build a single-page pre-launch waitlist landing page for Kinetra, a fleet monitoring and observability platform for ROS2-based robot fleets.

## Architecture
- **Frontend**: React + Tailwind CSS, single-page app (no routing)
- **Backend**: FastAPI with MongoDB for email storage
- **Database**: MongoDB (waitlist collection)

## User Personas
- Robotics engineers running ROS2-based robot fleets
- Fleet operators managing AMRs, manipulators, quadrupeds, drones, humanoids

## Core Requirements
- Dark theme (#050A0F), cyan (#00E5FF) + amber (#FFB300) accents
- 6 sections: Hero, Pain, Features, How It Works, Social Proof, CTA
- Email waitlist capture (MongoDB storage, duplicate detection)
- Canvas particle network, scroll animations, typewriter effects
- SVG robot illustrations, fleet constellations
- Fully responsive (mobile, tablet, desktop)

## What's Been Implemented (Dec 2025)
- [x] Backend: POST /api/waitlist, GET /api/waitlist/count with email validation
- [x] Hero: Word-by-word headline animation, typewriter subheadline, waitlist form
- [x] Pain: 3 amber-glow cards with flatline indicators
- [x] Features: 3 cyan-glow feature pillars with bullet points
- [x] How It Works: Terminal animation cycling 3 install commands + 3-step timeline
- [x] Social Proof: 3 terminal-style quote cards
- [x] CTA: Final section with waitlist form + fleet constellation
- [x] Particle network canvas background
- [x] Noise overlay, scanlines, glass morphism cards
- [x] SVG robot silhouettes (AMR, Arm, Quadruped, Humanoid, Drone)
- [x] Fleet constellation component (connected/disconnected/online variants)
- [x] Full responsive design
- [x] All data-testid attributes

## Backlog
- P1: Email confirmation (SendGrid/Resend integration)
- P1: Analytics tracking for conversion funnel
- P2: Admin dashboard to view/export waitlist emails
- P2: Animated robot SVGs with per-section state transitions
- P3: Referral system for waitlist position
