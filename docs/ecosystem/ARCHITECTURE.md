# Eduweby Websites — Architecture

## Stack

| Layer | Technology | Version / Notes |
|-------|-----------|-----------------|
| **Frontend framework** | Next.js (App Router) | `^15.5.15` |
| **UI language** | TypeScript | `^5.0.0` |
| **Runtime** | React | `^19.0.0` |
| **Styling** | Tailwind CSS + custom CSS | Tailwind `^3.4.0`; global design tokens in `styles/globals.css` via CSS custom properties |
| **Component library** | Custom only | No third-party UI library (MUI, shadcn, etc.) |
| **Primary CMS** | Sanity | `sanity ^5.24.0`, `next-sanity ^12.3.1` |
| **Secondary CMS** | Keystatic | `@keystatic/core ^0.5.0`, `@keystatic/next ^5.0.0` — file-based, stored in `content/` in the repo; see note below |
| **Primary hosting** | Vercel | Auto-deploy via GitHub integration |
| **Alt hosting target** | Cloudflare Pages | Build target via `@opennextjs/cloudflare ^1.0.0` + `wrangler ^3.0.0`; `wrangler.toml` and `open-next.config.ts` present |
| **Authentication** | None (public site) | Keystatic admin UI uses GitHub OAuth — not exposed to end users |
| **Payments** | None | Enrollment payments handled entirely within Eduweby Enrollment OS |
| **Email / notifications** | None in codebase | No email service wired at the website layer |
| **Analytics** | None | No GA4, Plausible, Fathom, Segment, or equivalent in codebase |
| **Image optimization** | Sanity Image URL API | `@sanity/image-url ^2.1.1`; `next/image` with `unoptimized: true` in `next.config.js` |
| **Fonts** | Google Fonts (via Next.js) | Cormorant Garamond (headings), Jost (body) — loaded via `next/font/google` |

### Note on dual CMS
Both Sanity and Keystatic are configured in this codebase. **Sanity is the active primary CMS** — all page data is fetched via GROQ queries in `sanity/lib/queries.ts`. Keystatic is configured as a file-based alternative (content stored in `content/` as JSON/YAML, editable via `/keystatic` admin UI with GitHub OAuth). The live site queries Sanity; Keystatic appears to be a legacy or exploratory configuration. Both cover roughly the same content model. All pages use `export const revalidate = 0` — no ISR or static generation; every request fetches fresh from Sanity.

---

## Sanity setup

| Field | Value |
|-------|-------|
| **Project ID** | `3kgekbj6` |
| **Dataset** | `production` |
| **Studio host** | `flame-coop` → deployed at `https://flame-coop.sanity.studio` |
| **Studio deployment** | Standalone Sanity-hosted studio, deployed separately via `npx sanity deploy --yes` (not embedded in the Next.js app) |
| **Studio visibility** | Public URL, authentication required to log in |
| **API version** | `2024-01-01` (set in `sanity/lib/client.ts`) |
| **CDN** | `useCdn: false` — always fetches fresh data from the Sanity API |

### Content publishing flow

```
Sanity Studio (flame-coop.sanity.studio)
  → Editor publishes or updates a document
  → Change is immediately live in Sanity's API
  → Next.js page fetches fresh on every request (revalidate = 0)
  → No webhook, no build trigger, no deploy needed for content changes
```

Content changes are **live within seconds** of publishing in Sanity Studio. No Vercel rebuild is required.

### Webhook configuration

No Sanity webhooks are configured in the codebase. The `revalidate = 0` strategy makes webhooks unnecessary for this site — all pages are server-rendered on-demand.

---

## Multi-tenancy model

**Currently single-site.** This codebase deploys one website for one co-op client. There is no subdomain routing, no per-tenant database row, and no shared infrastructure serving multiple co-ops from a single deployment.

**Expected multi-client model (inferred):** Each new co-op client gets:
- A separate fork or copy of this repo
- A separate Sanity project (or separate dataset within the same Sanity account)
- A separate Vercel project
- A unique `tenant` slug in the Eduweby inquiry form embed URL

This is a **replication model**, not a multi-tenant SaaS model. Each deployment is independent. Confirm the intended scale architecture with Rafael.

---

## GitHub Actions

**None.** No `.github/workflows/` directory exists in the repository. There are no CI/CD pipelines, automated tests, linting jobs, or deployment workflows defined in GitHub Actions.

Deployment is handled entirely by Vercel's native GitHub integration (see Deployment section).

---

## Vercel configuration

| Field | Value |
|-------|-------|
| **Vercel project name** | `flame-coop` |
| **Vercel org / team** | `rsoberal-brandmerces-projects` |
| **Production branch** | `main` on the client fork (`rsoberal-brandmerce/flame-coop`) |
| **Upstream repo** | `brandmerce-dev/flame-coop` (where code is authored and pushed) |
| **Deploy trigger** | Push to fork's `main` branch — Rafael must "Sync fork → Update branch" on GitHub to pull upstream changes into the fork, which triggers Vercel |
| **Preview deployments** | Enabled on all branches of the fork (standard Vercel behavior) |
| **Build command** | `next build` (Vercel default, not overridden) |
| **Output** | `.next/` (Vercel default) |
| **Edge Config / Middleware** | None |

### Environment variables (Vercel — names only)

| Variable | Purpose | Environments |
|----------|---------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project identifier | Production, Preview |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset name (`production`) | Production, Preview |
| `KEYSTATIC_GITHUB_CLIENT_ID` | GitHub OAuth App client ID for Keystatic admin | Production, Preview |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | GitHub OAuth App client secret for Keystatic admin | Production, Preview |
| `KEYSTATIC_SECRET` | Random secret for Keystatic session signing | Production, Preview |

### Cloudflare Pages (alternative target)

`wrangler.toml` and `open-next.config.ts` are present, providing a second deployment path to Cloudflare Pages via the OpenNext Cloudflare adapter. Build scripts are defined in `package.json` (`pages:build`, `pages:deploy`). This target is **not currently used for production** — Vercel is the active host. Cloudflare env vars (`KEYSTATIC_*`) are documented in `wrangler.toml` comments for reference.
