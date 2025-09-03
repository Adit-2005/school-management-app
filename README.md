# School App (Next.js + PlanetScale + Cloudinary + Tailwind)

A minimal two-page mini-project:
- `/addSchool` — add a new school (react-hook-form validation, Cloudinary image upload).
- `/showSchools` — grid view of schools (name, address, city, image).

## Tech
- Next.js (pages router)
- MySQL (PlanetScale)
- Cloudinary (unsigned upload preset)
- Tailwind CSS

## Setup

1. Install deps
```bash
npm install
```

2. Copy `.env.example` to `.env.local` and fill values:
```
DB_HOST=...
DB_USER=...
DB_PASS=...
DB_NAME=schooldb

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=...
```

3. Create table on PlanetScale (or any MySQL):
```sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  contact VARCHAR(15),
  image TEXT,
  email_id TEXT
);
```

4. Run
```bash
npm run dev
```

5. Deploy to Vercel and add the env vars above in the project settings.
