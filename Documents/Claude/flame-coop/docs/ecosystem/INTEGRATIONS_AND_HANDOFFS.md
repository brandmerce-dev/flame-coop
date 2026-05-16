# Eduweby Websites — Integrations and Handoffs

## Connection to Eduweby Enrollment OS

This is the primary and only active integration in the codebase. Everything else on the website is self-contained.

### How the inquiry form connects the website to Eduweby

`components/RequestInfoModal.tsx` implements an always-mounted iframe that embeds the Eduweby inquiry form:

```
Iframe src: https://eduweby.com/embed/form?tenant=flame-christian-coop
```

The modal is triggered by clicking any "Request Info" button on the site (navigation CTA or Admissions page CTA). Clicking fires a custom DOM event (`open-request-info-modal`) that the modal component listens for — decoupling the trigger from the modal itself.

The iframe is mounted and loading from the moment the page loads, so the form appears instantly when the modal opens (no load delay on click).

### What happens after a parent submits the form

Full handoff to Eduweby. The website does not intercept, receive, or display any form submission data. The parent sees whatever confirmation UI Eduweby renders inside the iframe. The co-op website has no visibility into submission events, form field values, or next steps — the Eduweby domain owns the entire post-click experience.

### Tenant identification

```
?tenant=flame-christian-coop
```

The `tenant` slug is **hardcoded** in `RequestInfoModal.tsx`. It routes the inquiry to the correct co-op's Eduweby account. For each new co-op deployment, this value must be updated to match the client's Eduweby tenant slug. It is not configurable via Sanity — it requires a code change.

### Could a parent log into the Eduweby parent portal from the co-op website?

No. The co-op website has no authentication, no session management, and no link to any Eduweby portal login. The website and the Eduweby parent portal operate on separate domains with no shared identity.

### Network pre-optimization for Eduweby

The root layout (`app/layout.tsx`) includes:
```html
<link rel="preconnect" href="https://eduweby.com" />
<link rel="dns-prefetch" href="https://eduweby.com" />
```
These reduce the iframe's initial connection latency.

---

## Other Brandmerce product integrations

**None.** Beyond the Eduweby inquiry form iframe, the website has no integrations with other Brandmerce products, third-party APIs, webhooks, or external services. It is standalone for all other functions.

Specifically absent:
- No Eduweby Enrollment OS API calls (read or write)
- No shared authentication with any other product
- No analytics platform
- No email service or marketing automation
- No payment processor
- No CRM direct connection

---

## SSO / shared identity readiness

**None today.** The website is fully public with zero authentication infrastructure. There is no concept of a logged-in user at the website layer.

If a future Brandmerce marketplace or directory product wanted to link to a co-op's Eduweby Websites page, the handoff today would be a simple URL link — no token passing, no session sharing, no SSO. The website would need to add authentication infrastructure before any identity-based integration is possible.

---

## Data that could be shared outward

The following content is available in Sanity and could be consumed by a marketplace or directory product via the Sanity API or a future public GROQ endpoint:

| Data | Sanity location | Notes |
|------|----------------|-------|
| Co-op name | `siteSettings.siteName` | |
| Tagline | `siteSettings.tagline` | |
| Contact email | `siteSettings.contactEmail` | |
| Phone | `siteSettings.phone` | |
| Address | `siteSettings.address` | |
| Social URLs | `siteSettings.instagramUrl`, `facebookUrl`, `youtubeUrl` | |
| Program names and descriptions | `program` collection | Rich content |
| Academic subjects | `subject` collection | Plain text |
| Mission, vision, model statements | `about.missionText`, `visionText`, `modelText` | |
| Hero images | `homepage.heroImage`, `about.heroImage`, etc. | Via Sanity CDN |
| Default OG image | `siteSettings.defaultOgImage` | Could serve as a directory listing image |

The Sanity project (`3kgekbj6`, dataset `production`) currently has no public read token configured in the codebase — it uses anonymous read access. A marketplace consuming this data would need a Sanity read token and GROQ queries pointed at the correct project.

---

## Brand surface area

### How each co-op's site is branded

Branding is controlled at two levels:

**1. Design tokens (`styles/globals.css`)**
All colors, typography, spacing, and visual decisions are defined as CSS custom properties. Branding a new co-op client requires updating these tokens (primary color, gold variants, heading font, body font, background palette) and the Tailwind config extension. This is a code change — not configurable via Sanity.

**2. Content and imagery (Sanity)**
All text content, hero images, photography, logos, and copy are managed in Sanity. A new co-op client gets their own Sanity project populated with their content.

**Current model:** Each co-op gets a custom-coded design token set per deployment — not a theme selector or Sanity-configurable brand switcher. The platform is designed for bespoke builds, not self-serve whitelabeling.

### The "website minutes" intake process

The intake-to-site workflow is **not documented in the codebase**. Based on the Sanity schema structure, the process appears to involve:
1. Rafael collects co-op identity information (name, address, social links, mission/vision, program list, tuition data, team bios, photography)
2. Sanity content is populated manually (or via the Sanity API/mutations) from the intake materials
3. Design tokens are configured for the client's brand
4. The Eduweby tenant slug is set in `RequestInfoModal.tsx`
5. The site is deployed to a new Vercel project under the client's domain

The "website minutes" process itself (the intake form, the workflow, the deliverable timeline) lives outside the codebase — confirm with Rafael for documentation.
