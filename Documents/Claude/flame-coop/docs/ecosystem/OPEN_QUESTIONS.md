# Eduweby Websites — Open Questions for Rafael

These are items that could not be determined from the codebase, Vercel configuration, or Sanity schema alone. All require Rafael's input.

---

## 1. Multi-site deployment model

**Question:** Is the plan for each new co-op client to get a separate Vercel project (separate deployment, separate domain, separate environment variables), or is there a future intent to serve multiple co-op sites from a single Vercel deployment?

**What the codebase shows:** The current architecture is entirely single-site. There is no subdomain routing, no per-tenant configuration layer, and no multi-site infrastructure. The Sanity project, Vercel project, and domain all map 1:1 to one co-op client.

**Why it matters:** The answer determines whether the product scales as a replication model (copy-deploy per client) or requires architectural investment in multi-tenancy before taking on more clients.

---

## 2. Sanity Studio access for co-op admins

**Question:** Are co-op directors or administrators given Sanity Studio credentials to manage their own content, or does Brandmerce (Rafael's team) handle all content updates on their behalf?

**What the codebase shows:** Sanity Studio is fully configured and deployed at `https://flame-coop.sanity.studio`. All page content is editable without code changes. CMS Editor Guidelines have been produced (Tier 2 deliverable) — but it's not known whether The Flame's team has been onboarded to use them.

**Why it matters:** Determines whether Eduweby Websites is a self-serve CMS product or a managed content service. Also determines whether the CMS Editor Guidelines need to be actively trained/delivered or are simply on file.

---

## 3. Number of live co-op sites

**Question:** How many co-op sites are currently live on the Eduweby Websites platform beyond The Flame Christian Co-op?

**What the codebase shows:** Only one live client is visible: `https://www.theflamechristiancooperative.com`. No other domains, Sanity projects, or Vercel projects are referenced in the codebase.

**Why it matters:** Establishes the current product footprint for ecosystem documentation and sales positioning.

---

## 4. The "website minutes" intake process

**Question:** Is the intake-to-site workflow ("website minutes") documented anywhere outside the codebase? Where does the process live — a Notion doc, a form, a checklist, a Brandmerce internal template?

**What the codebase shows:** The Sanity schema defines all the content fields that need to be populated for a new site (name, tagline, programs, directors, tuition data, etc.). The `content/` folder has example JSON/YAML files from the Keystatic setup. But there is no intake form, onboarding checklist, or workflow document in the repo.

**Why it matters:** For the product to scale beyond one client, the intake and launch process needs to be documented and repeatable. This is the playbook gap between a custom project and a productized service.

---

## 5. Keystatic — active, legacy, or experimental?

**Question:** Is Keystatic being actively maintained as a content editing option for co-op admins, or is it a legacy/experimental configuration that has been superseded by Sanity?

**What the codebase shows:** Both Sanity and Keystatic are fully configured with overlapping schemas. The live site queries Sanity exclusively via GROQ. Keystatic stores content in `content/` as flat files and exposes a GitHub-auth-protected admin at `/keystatic`. The Vercel project has active `KEYSTATIC_*` environment variables.

**Why it matters:** If Keystatic is not being actively used, its environment variables, admin route, and configuration can be simplified or removed to reduce complexity. If it is being used (or planned for some clients), the dual-CMS setup needs to be documented as a feature.

---

## 6. ADA Tier 2 — self-assessed vs. third-party audited

**Question:** Is the ADA Tier 2 compliance package being represented to clients as self-assessed (Brandmerce's own audit methodology) or as third-party verified?

**What the documentation shows:** The audit was conducted by Brandmerce using industry-standard tooling (axe-core, the same engine used by Google, Microsoft, and the U.S. federal government). The conformance statement says "verified by automated axe-core audit and manual review." No independent accessibility firm was engaged.

**Why it matters:** For legal documentation accuracy and client expectation-setting. Self-assessed compliance with documented methodology is legally meaningful and defensible — it does not require a third-party firm. But this distinction should be clear in how Tier 2 is marketed.

---

## 7. Annual ADA re-audit pricing and scheduling

**Question:** What is the pricing for the annual ADA re-audit maintenance service? Has it been offered to The Flame, and is there a scheduled date for the next audit (recommended: May 2027)?

**What the documentation shows:** The audit report recommends re-audit "within 6 months or following any significant content or code changes." A recurring maintenance SKU is a natural product extension but is not yet priced or documented.

---

## 8. Domain and canonical URL alignment

**Question:** The codebase references two domains: `theflame.org` (in `sitemap.ts`, `robots.ts`, JSON-LD, and some OG metadata) and `theflamechristiancooperative.com` (in `app/layout.tsx` `metadataBase` and canonical link). Which is the canonical production domain?

**What the codebase shows:**
- `app/layout.tsx`: `metadataBase: new URL('https://theflamechristiancooperative.com')`
- `app/sitemap.ts`: `const BASE_URL = 'https://theflame.org'`
- `app/robots.ts`: sitemap points to `https://theflame.org/sitemap.xml`
- JSON-LD in layout: `"url": "https://theflame.org"`

This inconsistency means the sitemap and JSON-LD point to `theflame.org` while canonical links and `metadataBase` point to `theflamechristiancooperative.com`. Both should be the same domain to avoid SEO issues.

**Why it matters:** A discrepancy between the canonical domain and the sitemap domain can cause Google to index duplicate content or ignore the sitemap entirely.
