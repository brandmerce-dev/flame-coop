# CLAUDE.md — Co-op Sites Studio Lane

This repo is part of Brandmerce's **website studio lane** — client marketing sites for homeschool co-ops. It is NOT the Eduweby platform. Nothing here touches Supabase, Lovable, Stripe, or edge functions. Never merge this code into `eduweby-admin-suite`.

## Stack & topology
- **Next.js (App Router) + TypeScript · Sanity CMS · Vercel** (Pro team `rsoberal-brandmerces-projects`; production deploys automatically from `main` of THIS repo — there is no fork-sync step; the old brandmerce/flame-coop fork is retired).
- **One repo, one Sanity project/dataset, one Vercel project per client.** New client sites are created from the `coop-site-template` GitHub template repository — never by forking a client repo.
- Branch convention: `rsoberal/bra-###-slug` (from the Linear issue). All website work tracks in the **Co-op Sites** Linear project; log build notes as comments on the issue.

## Worktree convention (a lost edit taught us this)
- The canonical checkout is `~/Documents/Claude/flame-coop-repo` — a normal clone with its `.git` at its own root. **Never check this repo out at the home directory** (a home-rooted checkout put the whole project index over `~`, sprawled files into `~`, and risked committing personal files; it was purged in BRA-395).
- All feature-branch edits happen in the issue's worktree, created off the canonical checkout. The canonical checkout itself is read-only reference — an edit made there lands on main's working tree and silently misses the branch.
- Run `git fetch` + `git status` and confirm a clean, current base before trusting any read or starting any change.

## The two contracts (never break these)
1. **Config contract.** Every per-client value lives in `site.config.ts` and the `:root` token block (colors, fonts, spacing, radius) — nothing else. `SITE_URL` in `lib/site-config.ts` is the single canonical-domain constant; sitemap, robots, canonicals, OG, and JSON-LD all reference it. **No hardcoded domains or email addresses anywhere in components.** Contact email lives in Sanity (`siteSettings.contactEmail`), and the Footer renders it.
2. **Structure contract.** The **parent-journey information architecture is fixed** (Research → Visit Site → Fill Form → Info Session → Application → Decision → Payment → Admission). A design/theme is only ever a skin: tokens + section-level component variants. The Sanity schema (~11 document types) **never forks per client.** Content lives in Sanity, never hardcoded in JSX.

## Eduweby integration (thin, identical every time)
- The ONLY integration is the Eduweby iframe embed: `eduweby.com/embed/form?tenant=<slug>` — the tenant slug lives in `site.config.ts`.
- No direct data flow between the site and the platform. Event/portal links are plain URLs.

## Legacy URLs & external references (a Step Up listing taught us this)
- Every replatform ships a **redirect map covering the OLD site's URL shapes** — WordPress `?page_id=N` query URLs and `/wp-content/uploads/` document paths included — not just nav pages.
- Recon must inventory **externally-referenced documents**: Step Up vendor listings, district resource pages, and directories often link tuition/course PDFs directly. Those links must resolve (redirect or re-hosted at stable paths) or real families lose reimbursement paperwork.
- Post-launch: submit the sitemap in Google Search Console and confirm stale-domain URLs fall out of the index.

## ADA Tier 2 (why these sites exist commercially)
- **Gate: axe-core scan with 0 violations on every page** before any production deploy, plus manual review.
- The build produces the Tier 2 artifact pack as a QA byproduct: dated axe-core scan log, screen-reader test log template, conformance statement, `/legal/accessibility` page, CMS editor accessibility guidelines.
- **Never write copy claiming a site is immune to ADA claims.** Compliance language follows the tiered agreement wording (good-faith documented conformance, not legal protection). One launch claim without this framing caused a billing dispute — do not repeat it.

## Build & verification gates
1. Step-0 read-only audit before any change: report findings with file:line, then propose.
2. Local gate: TypeScript type-check exit 0 + Next.js compile clean. **Local builds cannot finish "Collecting page data" — Sanity env vars are Vercel-only. That failure is expected locally and is not a code error.**
3. **The completed-build gate is the Vercel deployment.** PR previews and the production deploy build with real env vars. A failed production build never takes the site down — Vercel keeps serving the last good deploy — so merge-then-watch-the-deploy is a safe pattern here.
4. Ignore any chronically-red legacy CI checks; only Vercel deployments are signal. (The dead Cloudflare Pages check era is purged — if a red non-Vercel check ever appears, investigate whether a fossil returned.)
5. Show the full diff before committing. Grep gate before PR: zero hardcoded domains, zero hardcoded emails, zero references to domains the client doesn't own, zero macOS `* 2.*` duplicate files.
6. **Verify from the deployed object after every production deploy:** sitemap.xml URLs on the canonical domain · view-source canonical + JSON-LD on at least 3 pages · robots.txt sitemap line · apex → www permanent redirect · contact email renders from Sanity. Never trust a local build or a toast.

## Docs discipline
- Maintain the 7-doc ecosystem snapshot at `docs/ecosystem/` (`README`, `ARCHITECTURE`, `DATA_MODEL`, `FEATURES`, `INTEGRATIONS_AND_HANDOFFS`, `DEPLOYMENT`, `OPEN_QUESTIONS`) — refresh when architecture changes, via a `docs/` PR.
- The repo-root `README.md` must describe the CURRENT architecture (Next.js + Sanity + Vercel + Eduweby iframe). A stale README misleads every future session.
- `DEPLOYMENT.md` must always list every per-client value that changes on a new instantiation.

## Never
- Never fork client repos from each other (template only).
- Never let a cloned/purchased design bring its own IA or schema.
- Never introduce Tailwind/shadcn output from cloning tools — retarget to the `:root` token system.
- Never use a page builder.
- Never reintroduce Keystatic, Cloudflare Pages/OpenNext, or Web3Forms — that era is purged; Sanity + Vercel + the Eduweby iframe are the only CMS, host, and form.
- Never commit from the wrong working directory (see worktree convention) — and never commit files under a nested `Documents/` path.
