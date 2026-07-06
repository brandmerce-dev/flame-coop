# Eduweby Websites — Deployment

## GitHub repo

| Field | Value |
|-------|-------|
| **Upstream repo** | `brandmerce-dev/flame-coop` (where all code is authored and pushed) |
| **Deploy fork** | `rsoberal-brandmerce/flame-coop` (Vercel's GitHub integration is connected to this fork) |
| **Default branch** | `main` |
| **GitHub Actions** | **None** — no `.github/workflows/` directory exists |

### Branch strategy

| Branch pattern | Purpose |
|---------------|---------|
| `main` | Production code — authoritative upstream |
| `claude/<name>` | Claude Code worktree branches for active development sessions (e.g., `claude/laughing-wescoff-eac55f`) — merged to `main` when complete |
| `docs/<name>` | Documentation branches (e.g., this branch: `docs/ecosystem-snapshot`) |

---

## Vercel deployment

Eduweby Websites deploys to Vercel via GitHub integration connected to the **fork** (`rsoberal-brandmerce/flame-coop`), not the upstream repo (`brandmerce-dev/flame-coop`).

### Critical: the fork sync step

Because Vercel watches the fork, not the upstream, **every code change requires a manual fork sync step**:

```
1. Code authored and committed in Claude Code worktree
   (branch: claude/<name>)

2. Merged to upstream main:
   brandmerce-dev/flame-coop:main

3. Rafael opens GitHub → fork repo (rsoberal-brandmerce/flame-coop)
   → clicks "Sync fork" → "Update branch"

4. Fork's main branch receives the commits

5. Vercel detects push to fork main → triggers build
```

Skipping step 3 means the live site does not update, even though `origin/main` has the new code. This is the most common source of "why hasn't the site updated?" confusion.

### Build configuration

| Setting | Value |
|---------|-------|
| **Build command** | `next build` (Vercel default) |
| **Output directory** | `.next/` (Vercel default) |
| **Install command** | `npm install` (Vercel default) |
| **Node.js version** | Vercel default (latest LTS) |
| **Framework preset** | Next.js (auto-detected) |
| **Edge Config** | None |
| **Middleware** | None |

### Preview deployments

Every push to any branch on the fork generates a Vercel preview URL:
```
https://flame-coop-<hash>-rsoberal-brandmerces-projects.vercel.app
```
Preview URLs require Vercel authentication to access (401 without login).

---

## Environments

| Environment | URL | Sanity Dataset |
|-------------|-----|----------------|
| **Production** | https://www.theflamechristiancooperative.com | `production` |
| **Preview** | `https://flame-coop-<hash>-rsoberal-brandmerces-projects.vercel.app` | `production` (same dataset — no preview dataset configured) |
| **Local development** | `http://localhost:3000` | `production` (via `.env.local`) |
| **Sanity Studio** | https://flame-coop.sanity.studio | `production` |

---

## Deployment flow

### Code change → live site

```
1. DEVELOP
   Claude Code worktree on branch claude/<name>
   Changes made to app/, components/, styles/, sanity/

2. COMMIT
   git commit to branch claude/<name>

3. MERGE TO MAIN
   git merge (or worktree merge) → brandmerce-dev/flame-coop:main
   git push origin main

4. SYNC FORK (manual step — Rafael)
   GitHub → rsoberal-brandmerce/flame-coop → "Sync fork" → "Update branch"

5. VERCEL BUILD
   Vercel detects push to fork's main branch
   Runs: npm install → next build
   Build time: ~40–60 seconds
   Deployment rolls out automatically on success

6. LIVE
   https://www.theflamechristiancooperative.com serves new build
   Old build replaced — no blue/green, no rollback UI (use Vercel dashboard to revert)
```

### Content change → live site (no code involved)

```
1. EDIT IN SANITY STUDIO
   Editor logs into flame-coop.sanity.studio
   Makes changes → clicks "Publish"

2. INSTANTLY LIVE
   Sanity API reflects the change immediately
   Next.js fetches fresh data on every request (revalidate = 0)
   No Vercel build, no fork sync, no developer needed
```

---

## Environment variables (names only)

### Vercel (Production + Preview)

| Variable | Category | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity | Sanity project identifier; `NEXT_PUBLIC_` prefix exposes it to the browser |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity | Dataset name (value: `production`) |
| `KEYSTATIC_GITHUB_CLIENT_ID` | Keystatic | GitHub OAuth App client ID for Keystatic admin UI authentication |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | Keystatic | GitHub OAuth App client secret |
| `KEYSTATIC_SECRET` | Keystatic | Random 32-character secret for session signing in Keystatic |

### Local development (`.env.local` — gitignored)

From `.env.local.example`:

| Variable | Notes |
|----------|-------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Same as Vercel |
| `NEXT_PUBLIC_SANITY_DATASET` | Same as Vercel |

Keystatic variables are also needed locally if using the `/keystatic` admin UI in development.

### Hardcoded values (not environment variables — require code change per client)

| Value | Location | Purpose |
|-------|----------|---------|
| `https://eduweby.com/embed/form?tenant=flame-christian-coop` | `components/RequestInfoModal.tsx` line 5 | Eduweby inquiry form embed URL with tenant slug |
| `3kgekbj6` | `sanity.config.ts`, `sanity.cli.ts` | Sanity project ID (fallback if env var not set) |
| `flame-coop` | `sanity.config.ts` name, `sanity.cli.ts` studioHost | Sanity project / studio identifier |
| `https://theflamechristiancooperative.com` | `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts` | Canonical domain, sitemap base URL |

> **For new client deployments:** The hardcoded values above must be updated in addition to environment variables. These are the client-specific touch points when spinning up a new co-op site.

---

## Cloudflare Pages (alternative build target — not active)

`wrangler.toml` and `open-next.config.ts` provide a secondary deployment path:

```
Build:   npx @opennextjs/cloudflare build  (npm run pages:build)
Deploy:  wrangler deploy                   (npm run pages:deploy)
Output:  .open-next/assets/
```

This path is **not used for production** today. It exists as an infrastructure option if the site ever migrates from Vercel to Cloudflare Pages. Cloudflare env vars would need to be set via the Cloudflare dashboard (not `wrangler.toml` — they are documented there as comments only).
