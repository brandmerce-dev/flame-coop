# Eduweby Websites — Data Model

> All document types below are Sanity schemas defined in `sanity/schemaTypes/`. Keystatic mirrors most of these as file-based schemas in `keystatic/config.ts` but is not the active data source on the live site.

---

## Sanity document types

### Singletons
One document per type — created once, edited in place. Sanity Studio prevents deletion or duplication of singleton documents.

| Type name | Purpose | Key fields |
|-----------|---------|-----------|
| `siteSettings` | Site-wide configuration and social sharing defaults | `siteName`, `tagline`, `contactEmail`, `phone`, `address`, `instagramUrl`, `facebookUrl`, `youtubeUrl`, `defaultOgImage`, `defaultOgTitle`, `defaultOgDescription` |
| `navigation` | Global nav link array and CTA button | `links[]` (label + href), `ctaLabel`, `ctaHref` |
| `homepage` | All content for the `/` page | Hero copy + image, "Who We Are" section, scripture quote, "Why Choose Us" cards array, programs preview copy, "What The Flame Feels Like" section + proof rows, community section, CTA section + checklist items, SEO + OG fields |
| `about` | All content for the `/about` page | Hero (style toggle: cream/image/dark/none), story body (Portable Text), mission/vision/model text, differentiator cards array, directors array (name, title, bio ×2, headshot + alt), SEO + OG fields |
| `beliefs` | All content for the `/beliefs` page | Hero, statement of faith title + intro + belief list (plain text array), statement image, "Faith in the Classroom" body (Portable Text), formation title + quote + body, SEO + OG fields |
| `admissions` | All content for the `/admissions` page | Hero, fit checklist items array, **enrollment open/closed boolean toggle** + message strings, "After You Enroll" body (Portable Text), "Request Info" section copy + button label, SEO + OG fields |
| `tuition` | All content for the `/tuition-scholarship` page | Hero, table intro, tuition rows array (program, all fee columns), callout cards array, scholarships heading + intro + body + scholarships array, CTA section, SEO + OG fields |
| `programs` | Hero / intro copy for the `/programs` page | Hero (style + eyebrow + headline + lead + image), "How the Levels Work" section (eyebrow + heading + body Portable Text + image), section intro copy for elementary, discipleship, and academic areas, SEO fields |

### Collections
Multiple documents per type — editors can create, reorder, and delete.

| Type name | Purpose | Key fields | Notes |
|-----------|---------|-----------|-------|
| `program` | Individual program cards shown on `/programs` | `name`, `slug`, `level`, `ages`, `themeLine`, `badgeLabel`, `variant` (elementary \| discipleship), `displayOrder`, `description` (Portable Text) | Ordered by `displayOrder` asc; variant controls card visual style |
| `subject` | Academic subject rows shown on `/programs` | `name`, `slug`, `description` (plain text), `displayOrder` | Ordered by `displayOrder` asc |
| `legalPage` | Legal pages served at `/legal/[slug]` | `title`, `slug`, `seoTitle`, `seoDescription`, `body` (Portable Text — headings, paragraphs, lists) | Current documents: `accessibility`, `privacy-policy`, `terms-of-use` |

---

## Key relationships

```
siteSettings  ──── (no child documents; referenced by all pages for fallback OG data)
navigation    ──── (no child documents; consumed by Nav component on every page)

homepage      ──── whyChooseCards[]      (inline object array, no separate doc type)
              └─── ctaChecklistItems[]   (inline string array)
              └─── feelsLikeProofRows[]  (inline array)

about         ──── directors[]           (inline object array with headshot image)
              └─── diffCards[]           (inline object array)

admissions    ──── fitItems[]            (inline string array)

tuition       ──── tuitionRows[]         (inline object array — one row per program)
              └─── callouts[]            (inline object array)
              └─── scholarships[]        (inline object array)

programs      ──── (page-level copy only; program cards sourced from `program` collection)

program       ──── (standalone; no parent reference — queried as a collection)
subject       ──── (standalone; no parent reference — queried as a collection)
legalPage     ──── (standalone; slug-routed)
```

There are no cross-document references between collections and singletons in the current schema. All relationships are inline (nested objects and arrays within a parent document), not Sanity reference fields.

---

## Identity entities

| Concept | Representation | Notes |
|---------|---------------|-------|
| **A site (a co-op's website)** | One Sanity project + one Vercel deployment | No "site" document type exists — the entire Sanity project IS the site |
| **A page** | One singleton document per page (`homepage`, `about`, etc.) or one `legalPage` collection document | Pages map 1:1 to Next.js App Router routes |
| **A content item** | Inline objects within page singletons, or collection documents (`program`, `subject`, `legalPage`) | No generic "content block" or "section" document type |
| **A user** | **None.** The website is entirely public-facing with no authentication. | No user accounts, no parent portal, no member-only content. The Keystatic admin UI uses GitHub OAuth for Brandmerce team access only — not for co-op parents or students |

---

## Connection to Eduweby Enrollment OS

### How the form embed is implemented

The inquiry form is embedded via **iframe** inside a modal dialog component (`components/RequestInfoModal.tsx`).

```
const EDUWEBY_URL = 'https://eduweby.com/embed/form?tenant=flame-christian-coop';
```

The iframe loads immediately on page mount (always-mounted pattern for instant modal appearance on click). The modal overlay is visually hidden (1×1 absolute pixel) when closed, becoming fullscreen fixed when opened. The iframe src and the `tenant` query parameter are **hardcoded** in the component file.

### What data flows from website to Eduweby

The website sends **no data directly** to Eduweby. All data entry and submission occurs inside the Eduweby iframe — the parent page (the co-op website) has no visibility into form field values or submission events. Full control of the form UX, validation, and data handling belongs to Eduweby Enrollment OS.

### What happens after a parent submits the form

Full handoff to Eduweby. The iframe handles confirmation, error states, and next steps. The co-op website does not display any post-submission confirmation at the page level — it only hosts the modal shell.

### Tenant identification

The `tenant` query parameter (`flame-christian-coop`) identifies which co-op's enrollment funnel receives the inquiry in Eduweby. This value is **hardcoded per deployment** in `RequestInfoModal.tsx`. For a new co-op client, this string must be updated to match their Eduweby tenant slug.

### Could a parent log into the Eduweby parent portal from the co-op website domain?

No. The co-op website has no authentication layer. There is no SSO, no shared session, and no link between the public website domain and any Eduweby parent portal. A parent would navigate to the Eduweby portal separately.
