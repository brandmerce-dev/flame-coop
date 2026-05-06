import { defineType, defineField } from 'sanity'

export const tuition = defineType({
  name: 'tuition',
  title: 'Tuition & Scholarship Page',
  type: 'document',
  groups: [
    { name: 'seo',          title: 'SEO' },
    { name: 'hero',         title: 'Hero' },
    { name: 'table',        title: 'Tuition Table' },
    { name: 'scholarships', title: 'Scholarships' },
    { name: 'cta',          title: 'Need Help? CTA' },
  ],
  fields: [
    defineField({ name: 'seoTitle',       title: 'SEO Title',       type: 'string', group: 'seo' }),
    defineField({ name: 'seoDescription', title: 'Meta Description', type: 'text', rows: 3, group: 'seo' }),
    defineField({ name: 'ogImage',        title: 'OG Image',         type: 'image', group: 'seo' }),

    defineField({
      name: 'heroStyle',
      title: 'Hero Style (Hero — choose how the top of the page looks)',
      type: 'string', group: 'hero',
      options: {
        list: [
          { title: 'Cream block with dark text (default)', value: 'cream' },
          { title: 'Dark gradient with white text', value: 'dark' },
          { title: 'Background photo with dark overlay & white text (like Home)', value: 'image' },
          { title: 'No hero — page starts at first section', value: 'none' },
        ],
        layout: 'radio',
      },
      initialValue: 'cream',
    }),
    defineField({ name: 'heroEyebrow',    title: 'Eyebrow (Hero — small label above headline)', type: 'string', group: 'hero' }),
    defineField({ name: 'heroHeadline',   title: 'Headline (Hero — main heading)',               type: 'string', group: 'hero' }),
    defineField({ name: 'heroLead',       title: 'Lead (Hero — intro paragraph)',                type: 'text', rows: 3, group: 'hero' }),
    defineField({
      name: 'heroImage',
      title: 'Background Image (Hero — only used when style is "Background photo")',
      type: 'image', options: { hotspot: true }, group: 'hero',
      hidden: ({ parent }) => parent?.heroStyle !== 'image',
    }),
    defineField({
      name: 'heroImageAlt',
      title: 'Background Image Alt Text (Hero — accessibility description)',
      type: 'string', group: 'hero',
      hidden: ({ parent }) => parent?.heroStyle !== 'image',
    }),

    defineField({ name: 'tableIntroHeading', title: 'Heading (Fee & Tuition Overview — section title)',              type: 'string', group: 'table' }),
    defineField({ name: 'tableIntroBody',    title: 'Intro (Fee & Tuition Overview — paragraph below heading)',     type: 'text', rows: 3, group: 'table' }),
    defineField({ name: 'tableFootnote',     title: 'Footnote (Fee & Tuition Overview — small text below table)',  type: 'text', rows: 3, group: 'table' }),
    defineField({
      name: 'tuitionRows', title: 'Table Rows (Fee & Tuition Overview — one row per program)', type: 'array', group: 'table',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'program',      title: 'Program Name',           type: 'string' }),
          defineField({ name: 'appFee1',      title: 'App Fee (1st child)',     type: 'string' }),
          defineField({ name: 'appFeeAdd',    title: 'App Fee (additional)',    type: 'string' }),
          defineField({ name: 'supplyFee',    title: 'Supply Fee',              type: 'string' }),
          defineField({ name: 'regFee',       title: 'Registration Fee',        type: 'string' }),
          defineField({ name: 'bgFee',        title: 'Background Check Fee',    type: 'string' }),
          defineField({ name: 'tuitionTotal', title: 'Tuition Total',           type: 'string' }),
          defineField({ name: 'grandTotal',   title: 'Tuition + Reg. Total',    type: 'string' }),
        ],
        preview: { select: { title: 'program', subtitle: 'grandTotal' } },
      }],
    }),
    defineField({
      name: 'callouts', title: 'Summary Cards (Fee & Tuition Overview — compact totals below table)', type: 'array', group: 'table',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'program', title: 'Program Label', type: 'string' }),
          defineField({ name: 'total',   title: 'Total Display',  type: 'string' }),
          defineField({ name: 'note',    title: 'Note',           type: 'string' }),
        ],
        preview: { select: { title: 'program', subtitle: 'total' } },
      }],
    }),

    defineField({ name: 'scholarshipsHeading', title: 'Heading (Scholarships — section title)',                                         type: 'string', group: 'scholarships' }),
    defineField({ name: 'scholarshipsIntro',   title: 'Intro Paragraph (Scholarships — first paragraph)',                               type: 'text', rows: 3, group: 'scholarships' }),
    defineField({ name: 'scholarshipsBody',    title: 'Body Paragraph (Scholarships — second paragraph about payment process)',         type: 'text', rows: 6, group: 'scholarships' }),
    defineField({
      name: 'scholarships', title: 'Scholarship Cards (Scholarships — list of scholarship programs)', type: 'array', group: 'scholarships',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'name', title: 'Scholarship Name', type: 'string' }),
          defineField({ name: 'desc', title: 'Description',      type: 'text', rows: 3 }),
        ],
        preview: { select: { title: 'name' } },
      }],
    }),
    defineField({ name: 'scholarshipsImage',    title: 'Image (Scholarships — photo beside scholarship content)',      type: 'image', options: { hotspot: true }, group: 'scholarships' }),
    defineField({ name: 'scholarshipsImageAlt', title: 'Image Alt Text (Scholarships — accessibility description)',   type: 'string', group: 'scholarships' }),
    defineField({
      name: 'scholarshipsImageAspect',
      title: 'Image Shape (Scholarships — controls box proportions; image is cropped to fit using the hotspot)',
      type: 'string', group: 'scholarships',
      options: {
        list: [
          { title: 'Tall (3:4)', value: 'tall' },
          { title: 'Square (1:1)', value: 'square' },
          { title: 'Wide (16:10) — recommended, matches default layout', value: 'wide' },
        ],
        layout: 'radio',
      },
      initialValue: 'wide',
    }),

    defineField({ name: 'ctaEyebrow', title: 'Eyebrow (Need Help? CTA — small label above heading)',   type: 'string', group: 'cta' }),
    defineField({ name: 'ctaHeading', title: 'Heading (Need Help? CTA — section title)',               type: 'string', group: 'cta' }),
    defineField({ name: 'ctaBody1',   title: 'Paragraph 1 (Need Help? CTA — first body paragraph)',    type: 'text', rows: 3, group: 'cta' }),
    defineField({ name: 'ctaBody2',   title: 'Paragraph 2 (Need Help? CTA — second body paragraph)',   type: 'text', rows: 3, group: 'cta' }),
  ],
})
