# CampusCycle INSA Lyon

A simple second-hand marketplace for INSA Lyon students. Post items you no longer need, browse what others are giving away, and get in touch directly via email. No payments, no complexity.

**Live app:** https://insa-campuscyle-lyon-final-f24llms8f-moritz-gross-projects.vercel.app

---

## What it does

- Browse listings by category
- Post an item with a photo, description, and location
- Contact the poster directly via email
- Delete your own listings
- Login / sign up required to post

## Tech stack

- React + Vite (frontend)
- Supabase (database, auth, image storage)
- Vercel (hosting)

## Run locally

1. Clone the repo
2. `npm install`
3. Create a `.env` file with your Supabase credentials:
        VITE_SUPABASE_URL=...   
        VITE_SUPABASE_ANON_KEY=...
4. `npm run dev`

## Project structure

See the full documentation in `CampusCycle_Documentation.docx` for implementation details, admin guide, and access credentials.

---

*Research project — INSA Lyon, Department of Computer Science, 2026*  
*Author: Moritz Gross — moritz.gross@insa-lyon.fr*  
*Supervisor: Prof. Stefan Duffner*