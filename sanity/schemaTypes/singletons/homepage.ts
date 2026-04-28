import { defineType, defineField } from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  groups: [
    { name: 'seo',       title: 'SEO & Sharing' },
    { name: 'hero',      title: 'Hero — Full-screen opener' },
    { name: 'who',       title: 'Who We Are — Section 1' },
    { name: 'scripture', title: 'Scripture Banner — Section 2' },
    { name: 'why',       title: 'Why Choose Us — Section 3' },
    { name: 'programs',  title: 'Programs Preview — Section 4' },
    { name: 'feels',     title: 'What The Flame Feels Like — Section 5' },
    { name: 'cta',       title: 'Final CTA — Section 6' },
  ],
  fields: [

    // ── SEO ──────────────────────────────────────────────────────────────────
    defineField({ name: 'seoTitle',       title: 'SEO Title',       type: 'string', group: 'seo',
      description: 'Appears in browser tab and Google results. ~60 characters.' }),
    defineField({ name: 'seoDescription', title: 'Meta Description', type: 'text', rows: 3, group: 'seo',
      description: 'Shown in Google search results below the title. ~155 characters.' }),
    defineField({ name: 'ogImage',        title: 'Social Share Image', type: 'image', group: 'seo',
      description: 'Image shown when sharing on Facebook, LinkedIn, iMessage, etc. Recommended: 1200×630px.' }),

    // ── HERO ─────────────────────────────────────────────────────────────────
    defineField({ name: 'heroEyebrow',     title: 'Eyebrow Label',    type: 'string', group: 'hero',
      description: 'Small uppercase label above the headline. e.g. "Welcome to The Flame"' }),
    defineField({ name: 'heroHeadline',    title: 'Headline',         type: 'string', group: 'hero' }),
    defineField({ name: 'heroSubheadline', title: 'Sub-headline',     type: 'text', rows: 3, group: 'hero' }),
    defineField({ name: 'heroTrustLine',   title: 'Trust Line',       type: 'string', group: 'hero',
      description: 'Small line of supporting text below the buttons.' }),
    defineField({ name: 'heroImage',       title: 'Background Image', type: 'image', options: { hotspot: true }, group: 'hero',
      description: 'Full-screen hero background. Recommended: 1920×1080px or larger.' }),

    // ── WHO WE ARE ────────────────────────────────────────────────────────────
    defineField({ name: 'whoWeAreEyebrow',    title: 'Eyebrow Label',  type: 'string', group: 'who' }),
    defineField({ name: 'whoWeAreHeading',    title: 'Heading',        type: 'string', group: 'who' }),
    defineField({ name: 'whoWeAreLead',       title: 'Lead Paragraph (centered intro)', type: 'text', rows: 3, group: 'who',
      description: 'Shown centered above the image/copy split.' }),
    defineField({ name: 'whoWeAreSubhead',    title: 'Subheadline (right column)',      type: 'string', group: 'who',
      description: 'Bold subheading that appears above the body copy next to the image.' }),
    defineField({ name: 'whoWeAreBody',       title: 'Body Copy (right column)',        type: 'text', rows: 5, group: 'who' }),
    defineField({ name: 'whoWeAreImage',      title: 'Image (left column)',             type: 'image', options: { hotspot: true }, group: 'who',
      description: 'Photo shown to the left of the copy. Recommended: portrait orientation.' }),
    defineField({ name: 'whoWeAreButtonText', title: 'Button Label',   type: 'string', group: 'who' }),
    defineField({ name: 'whoWeAreButtonUrl',  title: 'Button URL',     type: 'string', group: 'who',
      description: 'Use a relative path, e.g. /about' }),

    // ── SCRIPTURE BANNER ──────────────────────────────────────────────────────
    defineField({ name: 'scriptureQuote',    title: 'Scripture Quote',    type: 'text', rows: 4, group: 'scripture',
      description: 'Include the full quote text with opening/closing quotation marks.' }),
    defineField({ name: 'scriptureCitation', title: 'Citation / Reference', type: 'string', group: 'scripture',
      description: 'e.g. — 2 Timothy 1:6–7' }),

    // ── WHY CHOOSE US ─────────────────────────────────────────────────────────
    defineField({ name: 'whyChooseHeading', title: 'Section Heading', type: 'string', group: 'why' }),
    defineField({ name: 'whyChooseSubhead', title: 'Section Subheading', type: 'text', rows: 3, group: 'why' }),
    defineField({
      name: 'whyChooseCards', title: 'Feature Cards', type: 'array', group: 'why',
      description: 'The three feature cards. Edit title and body — icons are fixed.',
      of: [defineField({
        name: 'card', title: 'Card', type: 'object',
        fields: [
          defineField({ name: 'cardTitle', title: 'Card Title', type: 'string' }),
          defineField({ name: 'cardBody',  title: 'Card Body',  type: 'text', rows: 3 }),
        ],
        preview: { select: { title: 'cardTitle', subtitle: 'cardBody' } },
      })],
      validation: (R) => R.max(3),
    }),

    // ── PROGRAMS PREVIEW ──────────────────────────────────────────────────────
    defineField({ name: 'programsEyebrow', title: 'Eyebrow Label', type: 'string', group: 'programs',
      description: 'The 7 program tiles are pulled automatically from the Programs collection.' }),
    defineField({ name: 'programsHeading', title: 'Section Heading',    type: 'string', group: 'programs' }),
    defineField({ name: 'programsSubhead', title: 'Section Sub-headline', type: 'text', rows: 3, group: 'programs' }),

    // ── WHAT THE FLAME FEELS LIKE ─────────────────────────────────────────────
    defineField({ name: 'feelsLikeHeading',   title: 'Section Heading', type: 'string', group: 'feels' }),
    defineField({ name: 'feelsLikeLead',      title: 'Lead Paragraph',  type: 'text', rows: 3, group: 'feels' }),
    defineField({ name: 'feelsLikeBody',      title: 'Body Copy',       type: 'text', rows: 5, group: 'feels' }),
    defineField({ name: 'feelsLikeImage',     title: 'Image (right column)', type: 'image', options: { hotspot: true }, group: 'feels',
      description: 'Photo shown to the right of the copy. Recommended: portrait orientation.' }),
    defineField({
      name: 'feelsLikeProofRows', title: 'Proof Points', type: 'array', group: 'feels',
      description: 'Each line appears as a bullet point below the body copy.',
      of: [{ type: 'string' }],
    }),

    // ── FINAL CTA ─────────────────────────────────────────────────────────────
    defineField({ name: 'ctaHeading',    title: 'Section Heading',    type: 'string', group: 'cta' }),
    defineField({ name: 'ctaSubheading', title: 'Section Subheading', type: 'text', rows: 3, group: 'cta' }),
    defineField({
      name: 'ctaChecklistItems', title: 'Checklist Items', type: 'array', group: 'cta',
      description: 'Each item appears as a checkmark bullet on the right side of the CTA.',
      of: [{ type: 'string' }],
    }),
  ],
})
