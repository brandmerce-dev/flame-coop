# Eduweby Websites — Features

## Built and shipped

### ADA Accessibility Compliance

#### Tier 1 — Technical Compliance (standard; included in all builds)

| Feature | Implementation | Location |
|---------|---------------|----------|
| Semantic HTML heading hierarchy (H1–H6) | Enforced in all page components | All `app/*/page.tsx` |
| Descriptive alt text on all meaningful images | Required field in Sanity schema; enforced in components | All image fields |
| Color contrast meeting WCAG AA minimums (4.5:1) | CSS custom property `--gold-text: #6B5D2F` (6.5:1 on white); `--btn--primary: #7A6A36` (5.33:1) | `styles/globals.css` |
| Full keyboard navigation | All interactive elements reachable by Tab; Escape closes modals/menus | Nav, RequestInfoModal, AccessibilityWidget |
| Skip-to-content link | First focusable element on every page; visible on focus | `components/SiteChrome.tsx` |
| ARIA landmarks | `<nav aria-label="Main navigation">`, `<nav aria-label="Mobile navigation">`, `<nav aria-label="Footer navigation">`, `<main id="main-content">` | Nav.tsx, Footer.tsx, SiteChrome.tsx |
| ARIA states and roles | `aria-expanded`, `aria-controls`, `aria-hidden`, `role="dialog"`, `aria-modal`, `aria-label` on all interactive UI | Nav, Modal, AccessibilityWidget |
| Modal focus management | Focus moves to close button on open; returns to trigger on close; Escape key closes | `RequestInfoModal.tsx` |
| `prefers-reduced-motion` | All CSS animations and transitions globally disabled for users with Reduce Motion enabled | `styles/globals.css` line 1450 |
| Responsive design (WCAG 1.4.10 Reflow) | Tailwind + fluid typography; no horizontal scroll at 320px | Global |
| No auto-playing audio or video | Confirmed — no `<video>`, `<audio>`, or carousel elements anywhere in codebase | Codebase-wide |
| High-contrast accessibility widget | Fixed 48px button (bottom-right, every page); toggles `html.a11y-mode` class; persisted to `localStorage`; overrides all design tokens to 7:1+ contrast ratios | `components/AccessibilityWidget.tsx` |
| 501(c)(3) nonprofit disclosure | Footer, every page | `components/Footer.tsx` |
| Accessibility Statement page | Published at `/legal/accessibility` | Sanity `legalPage` document |

#### Tier 2 — Legal Documentation (paid add-on — $1,600)

| Deliverable | Status | Date |
|-------------|--------|------|
| Full WCAG 2.1 AA automated axe-core audit (9 pages) | ✅ Complete | May 13, 2026 |
| Dated violation log retained as legal record | ✅ Complete | May 13, 2026 |
| Conformance statement published on live Accessibility Statement page | ✅ Complete | May 13, 2026 |
| 5-business-day response commitment on Accessibility Statement | ✅ Complete | May 6, 2026 |
| DOJ escalation path on Accessibility Statement | ✅ Complete | May 6, 2026 |
| CMS Editor Guidelines (plain-English reference for Sanity editors) | ✅ Complete | May 13, 2026 |
| Manual screen reader test checklist (template) | ✅ Complete | May 13, 2026 |
| Client-facing compliance report with demand-letter playbook | ✅ Complete | May 13, 2026 |

---

### Sanity CMS Content Management

- All page content — copy, images, hero styles, colors, and configuration — editable in Sanity Studio without code changes
- Singleton pages: Homepage, About, Beliefs, Admissions, Tuition & Scholarship, Programs
- Collections: Programs (individual program cards), Academic Subjects, Legal Pages
- Site-wide settings: name, tagline, contact info, social URLs, default OG image/title/description
- Navigation: all nav links and CTA button label/URL editable
- Admissions enrollment toggle: a single boolean field opens or closes enrollment across the site instantly
- Hero style selector per page: `cream` / `dark` / `image` / `none` — controls page-level visual treatment
- Per-page SEO and Open Graph fields: title, description, OG image for social sharing

---

### Inquiry Form — Connection to Eduweby Enrollment OS

- "Request Info" CTA appears in the top navigation and on the Admissions page
- Click opens a modal dialog containing an iframe to `https://eduweby.com/embed/form?tenant=flame-christian-coop`
- The Eduweby form handles all data capture, validation, and submission
- Always-mounted iframe pattern: iframe loads on page mount so modal appears instantly on click
- iOS-safe scroll lock: position:fixed + savedScrollY pattern prevents background scroll on mobile
- Full ARIA accessibility: `role="dialog"`, `aria-modal`, focus management, Escape key support

---

### SEO and Metadata

- Per-page `generateMetadata()` functions with Sanity-sourced titles, descriptions, and OG images
- Fallback chain: page-level OG image → Site Settings default OG image → `/images/og-default.jpg`
- `next/font/google` for Cormorant Garamond and Jost with `display: swap`
- `sitemap.xml` auto-generated via `app/sitemap.ts` (6 primary pages)
- `robots.txt` auto-generated via `app/robots.ts` (allows all; disallows `/keystatic/`)
- JSON-LD structured data in root layout: `Organization` + `LocalBusiness` schema
- Canonical URLs set in layout and per-page metadata
- `<link rel="preconnect">` for Google Fonts and `eduweby.com` in root layout `<head>`

---

### Performance

- Next.js App Router with server components — minimal client JavaScript
- Google Fonts loaded via `next/font` (no render-blocking external font requests)
- `preconnect` and `dns-prefetch` for Eduweby iframe domain
- Vercel global edge network (CDN) for static assets
- `revalidate = 0` on all pages — always fresh from Sanity; no stale cache issues

---

### Design System

- CSS custom properties design token system in `styles/globals.css` (colors, spacing, typography, radii, transitions)
- Tailwind CSS configured to consume the same design tokens
- Fluid typography using CSS `clamp()` throughout
- Responsive layout via CSS Grid and Flexbox; no fixed-width breakpoint hacks
- Dark/light section variants: `.section--cream`, `.section--cream2`, `.section--dark` utility classes
- Component library: `Hero`, `ScriptureBanner`, `SplitSection`, `ThreeCardRow`, `DiffGrid`, `ProgramCard`, `ProgramTiles`, `TuitionTable`, `CTASection`, `SectionHeader`, `AdmissionStep`, `ScrollReveal`, `ImagePlaceholder`

---

## In progress

- Manual screen reader test session (template is produced; human tester must complete and sign)
- Annual ADA re-audit schedule (recommended May 2027)

---

## Planned

- Multi-client deployment process (second and third co-op client sites)
- ADA Tier 2 as a productized paid add-on for existing WordPress clients
- ADA Audit lead-generation tool (automated scan by URL → branded report → upsell CTA)

---

## Notable absences

| Question | Answer |
|----------|--------|
| **Parent-facing portal features?** | **No.** This is a pure marketing and inquiry site. No parent portal, no class schedules, no grades, no messaging. All parent-facing operational features are in Eduweby Enrollment OS. |
| **Can co-op admins self-serve content updates?** | **Yes** — Sanity Studio is the designed interface for this. Any admin with Sanity credentials can update all page content without developer involvement. Whether The Flame's admins have been granted Sanity access is a process question for Rafael. |
| **Authentication or member-only content?** | **None.** The website is 100% public. The only authentication in the codebase is Keystatic's GitHub OAuth for Brandmerce team use — not visible to end users. |
| **Analytics?** | **None.** No analytics platform (GA4, Plausible, Fathom, etc.) is wired into the codebase. |
| **Email or notifications?** | **None** at the website layer. Handled by Eduweby Enrollment OS after inquiry form submission. |
| **Payments?** | **None.** Tuition and fee payments are handled in Eduweby Enrollment OS. |
| **Blog or news section?** | **None** in current schema. |
| **Search?** | **None.** |
