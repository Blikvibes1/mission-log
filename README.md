# Mission Log

A small full-stack site built on NASA's Astronomy Picture of the Day (APOD) API.
Browse today's photo, jump to any date back to 1995, sign in, and save favorites.

**Stack:** Next.js 14 (App Router) · Tailwind CSS · Supabase (auth + database) · Vercel (hosting)

---

## 1. Run it locally

You'll need [Node.js 18+](https://nodejs.org) installed.

```bash
npm install
cp .env.example .env.local
```

Fill in `.env.local` (see steps 2 and 3 below for where the values come from), then:

```bash
npm run dev
```

Visit `http://localhost:3000`.

---

## 2. Get a NASA API key (30 seconds)

1. Go to https://api.nasa.gov
2. Fill in the form — you get a key by email instantly.
3. Put it in `.env.local` as `NASA_API_KEY`.

(The app falls back to `DEMO_KEY` if you skip this, but that's limited to 30 requests/hour.)

---

## 3. Set up Supabase (auth + saved favorites)

1. Create a free project at https://supabase.com/dashboard
2. In your project, go to **SQL Editor → New query**, paste the contents of
   [`supabase/schema.sql`](./supabase/schema.sql), and run it. This creates the
   `favorites` table with row-level security so users can only see their own saves.
3. Go to **Project Settings → API** and copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Go to **Authentication → URL Configuration** and add your site URL
   (`http://localhost:3000` for local dev; add your Vercel URL later too) to
   **Redirect URLs**.

Sign-in uses passwordless email magic links — no password table to manage.

---

## 4. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Mission Log"
gh repo create mission-log --public --source=. --remote=origin --push
```

(No `gh` CLI? Create a repo on github.com, then `git remote add origin <url>` and `git push -u origin main`.)

---

## 5. Deploy to Vercel

1. Go to https://vercel.com/new and import your GitHub repo.
2. Add the three environment variables from `.env.local` (`NASA_API_KEY`,
   `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in the
   Vercel project's **Settings → Environment Variables**.
3. Deploy. Vercel will give you a `*.vercel.app` URL.
4. Add that URL back into Supabase's **Redirect URLs** (step 3.4) so sign-in
   works in production too.

From then on, every `git push` to `main` auto-deploys.

---

## Project structure

```
app/
  page.tsx                 today's APOD (home)
  archive/page.tsx          last 17 days, grid view
  archive/[date]/page.tsx   any single date
  favorites/page.tsx        signed-in user's saved entries
  login/page.tsx             magic-link sign in
  api/apod/route.ts          server-side proxy to NASA's API
  auth/callback/route.ts     Supabase auth redirect handler
components/                 UI pieces (hero, cards, buttons)
lib/supabase/                browser + server Supabase clients
supabase/schema.sql          database table + row-level security policies
```

## Ideas to extend it

- Add Mars Rover Photos (`api.nasa.gov/mars-photos`) as a second section
- Add a comment field on favorites
- Add a "random date" button
- Cache images in Supabase Storage so favorites survive if NASA's URL changes
