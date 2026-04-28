import { defineType, defineField } from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  groups: [
    { name: 'seo',    title: 'SEO' },
    { name: 'hero',   title: 'Hero' },
    { name: 'who',    title: 'Who We Are' },
    { name: 'scripture', title: 'Scripture' },
    { name: 'why',    title: 'Why Choose Us' },
    { name: 'programs',  title: 'Programs Preview' },
    { name: 'feels',  title: 'What The Flame Feels Like' },
    { name: 'cta',    title: 'CTA' },
  ],
  fields: [
    // SEO
    defineField({ name: 'seoTitle',         title: 'SEO Title',                  type: 'string',  group: 'seo' }),
    defineField({ name: 'seoDescription',   title: 'Meta Description',           type: 'text', rows: 3, group: 'seo' }),
    defineField({ name: 'ogImage',          title: 'Open Graph Image',           type: 'image', group: 'seo' }),

    // Hero
    defineField({ name: 'heroEyebrow',      title: 'Eyebrow',                    type: 'string',  group: 'hero' }),
    defineField({ name: 'heroHeadline',     title: 'Headline',                   type: 'string',  group: 'hero' }),
    defineField({ name: 'heroSubheadline',  title: 'Sub-headline',               type: 'text', rows: 3, group: 'hero' }),
    defineField({ name: 'heroTrustLine',    title: 'Trust Line',                 type: 'string',  group: 'hero' }),
    defineField({ name: 'heroImage',        title: 'Background Image',           type: 'image', options: { hotspot: true }, group: 'hero' }),

    // Who We Are
    defineField({ name: 'whoWeAreEyebrow',     title: 'Eyebrow',           type: 'string', group: 'who' }),
    defineField({ name: 'whoWeAreHeading',     title: 'Heading',           type: 'string', group: 'who' }),
    defineField({ name: 'whoWeAreLead',        title: 'Lead Paragraph',    type: 'text', rows: 3, group: 'who' }),
    defineField({ name: 'whoWeAreSubhead',     title: 'Subheadline',       type: 'string', group: 'who' }),
    defineField({ name: 'whoWeAreBody',        title: 'Body',              type: 'text', rows: 5, group: 'who' }),
    defineField({ name: 'whoWeAreImage',       title: 'Image',             type: 'image', options: { hotspot: true }, group: 'who' }),
    defineField({ name: 'whoWeAreButtonText',  title: 'Button Text',       type: 'string', group: 'who' }),
    defineField({ name: 'whoWeAreButtonUrl',   title: 'Button URL',        type: 'string', group: 'who' }),

    // Scripture
    defineField({ name: 'scriptureQuote',    title: 'Quote',                     type: 'text', rows: 4, group: 'scripture' }),
    defineField({ name: 'scriptureCitation', title: 'Citation',                  type: 'string',  group: 'scripture' }),

    // Why Choose Us
    defineField({ name: 'whyChooseHeading', title: 'Heading',                    type: 'string',  group: 'why' }),
    defineField({ name: 'whyChooseSubhead', title: 'Subheading',                 type: 'text', rows: 3, group: 'why' }),

    // Programs Preview
    defineField({ name: 'programsEyebrow',  title: 'Eyebrow',                    type: 'string',  group: 'programs' }),
    defineField({ name: 'programsHeading',  title: 'Heading',                    type: 'string',  group: 'programs' }),
    defineField({ name: 'programsSubhead',  title: 'Sub-headline',               type: 'text', rows: 3, group: 'programs' }),

    // Feels Like
    defineField({ name: 'feelsLikeHeading', title: 'Heading',                    type: 'string',  group: 'feels' }),
    defineField({ name: 'feelsLikeLead',    title: 'Lead',                       type: 'text', rows: 3, group: 'feels' }),
    defineField({ name: 'feelsLikeBody',    title: 'Body',                       type: 'text', rows: 5, group: 'feels' }),

    // CTA
    defineField({ name: 'ctaHeading',       title: 'Heading',                    type: 'string',  group: 'cta' }),
    defineField({ name: 'ctaSubheading',    title: 'Subheading',                 type: 'text', rows: 3, group: 'cta' }),
  ],
})
