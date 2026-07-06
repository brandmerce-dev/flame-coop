# The Flame Christian Co-op — Website

Production website for The Flame Christian Cooperative, St. Augustine, FL. Part of Brandmerce's **Co-op Sites studio lane** — client marketing sites for homeschool cooperatives. See [`CLAUDE.md`](CLAUDE.md) for the studio-lane contracts and conventions.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · [Sanity](https://www.sanity.io/) CMS · Vercel · Tailwind + a custom CSS design-token system.

---

## Architecture at a glance

| Concern | How it works |
|---------|--------------|
| **Framework** | Next.js 15 App Router (`app/`), React 19, TypeScript. |
| **Content** | Sanity CMS (project `3kgekbj6`, dataset `production`). All page content is fetched via GROQ in `sanity/lib/queries.ts`. Content is never hardcoded in JSX. |
| **Sanity Studio** | Embedded at [`/studio`](app/studio) (`app/studio/[[...index]]`). Editors manage content there — no code changes needed. |
| **Canonical domain** | Single source of truth: `SITE_URL` in [`lib/site-config.ts`](lib/site-config.ts). Sitemap, robots, canonicals, OpenGraph, and JSON-LD all reference it. **No hardcoded domains or emails anywhere in components.** |
| **Contact email** | Lives in Sanity (`siteSettings.contactEmail`) and is rendered by the Footer — never hardcoded. |
| **Inquiry / Request-Info form** | A thin Eduweby iframe embed — `eduweby.com/embed/form?tenant=flame-christian-coop` — mounted in [`components/RequestInfoModal.tsx`](components/RequestInfoModal.tsx). No backend, no form service in this repo. |
| **Design system** | CSS custom properties (colors, fonts, spacing, radius) in the `:root` block of [`styles/globals.css`](styles/globals.css). Theming a site = editing tokens + section-level component variants, never per-client JSX forks. |
| **Accessibility** | WCAG 2.1 AA (ADA Tier 2). Skip link, focus-visible, ARIA landmarks, reduced-motion support, and an opt-in high-contrast mode (`components/AccessibilityWidget.tsx`). See [`ADA-COMPLIANCE.md`](ADA-COMPLIANCE.md). |
| **Hosting** | Vercel (team `rsoberal-brandmerces-projects`). Production deploys automatically from `main` of this repo. |

---

## Local development

```bash
# 1. Install dependencies
npm install

# 2. Configure Sanity access
cp .env.local.example .env.local
#    then set:
#      NEXT_PUBLIC_SANITY_PROJECT_ID=3kgekbj6
#      NEXT_PUBLIC_SANITY_DATASET=production

# 3. Run the dev server
npm run dev            # http://localhost:3000
#    Sanity Studio is at http://localhost:3000/studio
```

Scripts: `dev`, `build`, `start`, `lint`.

> **Note on local builds:** `next build` compiles and type-checks locally, but the "Collecting page data" step needs the Sanity env vars that only exist on Vercel. That step failing **locally** is expected and is not a code error — the real build gate is the Vercel deployment. See `CLAUDE.md` → Build & verification gates.

---

## Deployment

Push to `main` → Vercel builds and deploys production automatically (there is no fork-sync step; the repo is connected directly to Vercel). A failed production build never takes the site down — Vercel keeps serving the last good deploy.

After every production deploy, verify from the deployed object (not a local build): `sitemap.xml` on the canonical domain, view-source canonical + JSON-LD on a few pages, `robots.txt` sitemap line, apex → www redirect, and that the contact email renders from Sanity.

---

## Content model & operations

- **What editors change** lives in Sanity Studio (`/studio`): page copy, images (with alt text), programs, tuition tables, directors, site settings, legal pages.
- **What developers change** lives in code: layout, component structure, the design-token system, and the fixed parent-journey information architecture.
- The Sanity schema (`sanity/schemaTypes/`) is shared across all co-op clients and **never forks per client**.

---

## Documentation

- [`CLAUDE.md`](CLAUDE.md) — studio-lane contracts, conventions, and guardrails (read this first).
- [`docs/ecosystem/`](docs/ecosystem) — the 7-doc ecosystem snapshot: `README`, `ARCHITECTURE`, `DATA_MODEL`, `FEATURES`, `INTEGRATIONS_AND_HANDOFFS`, `DEPLOYMENT`, `OPEN_QUESTIONS`.
- [`ADA-COMPLIANCE.md`](ADA-COMPLIANCE.md) — accessibility conformance record.

---

## New client sites

New co-op sites are created from the `coop-site-template` GitHub template repository — one repo, one Sanity project/dataset, and one Vercel project per client. Never fork a client repo from another. `docs/ecosystem/DEPLOYMENT.md` lists every per-client value that changes on a new instantiation.
