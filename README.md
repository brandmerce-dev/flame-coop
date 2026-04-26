# The Flame Christian Co-op — Website

Production-ready Next.js 14 website for The Flame Christian Co-op, St. Augustine, FL.

**Stack:** Next.js 14 App Router · Keystatic CMS · Tailwind CSS · Cloudflare Pages

---

## Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open the site
open http://localhost:3000

# 4. Open the CMS admin panel
open http://localhost:3000/keystatic
```

---

## Folder Structure

```
/app              → Next.js pages (one folder per route)
/components       → Reusable React components
/content          → CMS content files (edited via /keystatic)
/keystatic        → CMS schema definition
/public/images    → Logo, photos, placeholders
/styles           → globals.css (design tokens + utility classes)
```

---

## Editing Content via Keystatic (For Jessica)

1. Run the dev server (`npm run dev`) on your computer.
2. Open [http://localhost:3000/keystatic](http://localhost:3000/keystatic) in your browser.
3. You will see a clean dashboard. Click any item to edit it.
4. After saving, the content is updated in the `/content` folder.
5. Push to GitHub and Cloudflare will auto-deploy the updated site.

### What you can edit

| Section | Where to find it in Keystatic |
|---------|-------------------------------|
| Site name, address, social links | **Site Settings** |
| Navigation links | **Navigation** |
| Homepage all copy | **Homepage** |
| About page (story, directors) | **About Page** |
| Statement of Faith, beliefs | **Beliefs Page** |
| Enrollment status (open/closed) | **Admissions Page** → Enrollment toggle |
| Tuition table numbers | **Tuition & Scholarship Page** → Tuition Table Rows |
| Programs | **Programs** collection |
| Academic subjects | **Academic Subjects** collection |

### Toggling Enrollment Open / Closed

1. Open Keystatic at `/keystatic`
2. Click **Admissions Page**
3. Find the **Enrollment is Currently OPEN** checkbox
4. Check = Open · Uncheck = Closed
5. Save and push to GitHub

### Adding a New Program

1. Open Keystatic → **Programs** collection
2. Click **Add entry**
3. Fill in all fields and set Display Order
4. Save and push

### Updating Tuition Numbers

1. Open Keystatic → **Tuition & Scholarship Page**
2. Scroll to **Tuition Table Rows**
3. Click the row to edit, change the numbers, save
4. Also update the **Program Callout Cards** below the table if needed

### Replacing Placeholder Photos

1. Open Keystatic → the relevant page (e.g., About Page)
2. Find the image field
3. Upload the new photo
4. Save and push

---

## Deploying to Cloudflare Pages

### First-time setup

1. Push this repository to GitHub.
2. Log into [Cloudflare Pages](https://pages.cloudflare.com/).
3. Create a new project → Connect to Git → select this repo.
4. Set the build settings:
   - **Framework preset:** Next.js
   - **Build command:** `npx @cloudflare/next-on-pages`
   - **Build output directory:** `.vercel/output/static`
   - **Node.js version:** `20`
5. Add environment variables (see section below).
6. Click **Save and Deploy**.

### Subsequent deployments

Push to the `main` branch — Cloudflare Pages auto-deploys on every push.

### Environment Variables (Cloudflare Dashboard)

Set these in **Cloudflare Pages → Your project → Settings → Environment variables**:

```
# Required for Keystatic in production (GitHub storage mode)
KEYSTATIC_GITHUB_CLIENT_ID        = <your-github-oauth-client-id>
KEYSTATIC_GITHUB_CLIENT_SECRET    = <your-github-oauth-client-secret>
KEYSTATIC_SECRET                  = <random-32-character-string>
NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG = <your-github-repo-slug>
```

> **Note:** To enable Keystatic editing in production, change `storage.kind` from `'local'` to `'github'` in `keystatic/config.ts` and set up a GitHub OAuth App. See [Keystatic GitHub storage docs](https://keystatic.com/docs/github-mode).

---

## Form Integration (Web3Forms)

The Request Info form on the Admissions page uses [Web3Forms](https://web3forms.com/) — free, no backend required.

**To activate:**
1. Go to [web3forms.com](https://web3forms.com/) and get a free access key.
2. Open `app/admissions/page.tsx`.
3. Find the line: `const ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';`
4. Replace with your actual key.
5. All submissions are emailed to the address tied to your Web3Forms account.

---

## Updating SEO Titles and Descriptions

Each page exports its own `metadata`. Open the relevant file:

| Page | File |
|------|------|
| Home | `app/page.tsx` |
| About | `app/about/page.tsx` |
| Beliefs | `app/beliefs/page.tsx` |
| Programs | `app/programs/page.tsx` |
| Admissions | `app/admissions/page.tsx` |
| Tuition | `app/tuition-scholarship/page.tsx` |

Find the `export const metadata` block at the top and update `title` and `description`.

---

## Design System Reference

All design tokens are in `styles/globals.css`:

| Token | Value |
|-------|-------|
| `--gold` | `#A69264` |
| `--obsidian` | `#141414` |
| `--cream` | `#FAF7F2` |
| `--font-heading` | Cormorant Garamond |
| `--font-body` | Jost |

**Utility classes:** `eyebrow`, `lead`, `bg-dark`, `bg-cream`, `bg-cream2`, `reveal`, `link-arrow`, `btn--primary`, `btn--outline`

---

## Tech Notes

- **Why not `output: 'export'`?** Keystatic's admin UI requires server-side API routes, incompatible with Next.js static export. The `@cloudflare/next-on-pages` adapter handles this correctly via Cloudflare Workers.
- **Images:** `next/image` with `unoptimized: true` for Cloudflare Pages compatibility.
- **Fonts:** `next/font/google` — zero layout shift, improved Core Web Vitals.
- **Scroll reveal:** Client-side hook in `components/ScrollReveal.tsx`.

---

© 2025 The Flame Christian Cooperative. All rights reserved.
