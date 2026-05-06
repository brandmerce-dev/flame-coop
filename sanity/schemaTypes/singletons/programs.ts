import { defineType, defineField } from 'sanity'

export const programs = defineType({
  name: 'programs',
  title: 'Programs Page',
  type: 'document',
  groups: [
    { name: 'seo',         title: 'SEO' },
    { name: 'hero',        title: 'Hero' },
    { name: 'levels',      title: 'How the Levels Work' },
    { name: 'elementary',  title: 'Elementary Programs' },
    { name: 'discipleship', title: 'Discipleship Programs' },
    { name: 'academic',    title: 'Academic Approach' },
  ],
  fields: [
    // ── SEO ──────────────────────────────────────────────────────────────────
    defineField({ name: 'seoTitle',       title: 'SEO Title',       type: 'string', group: 'seo' }),
    defineField({ name: 'seoDescription', title: 'Meta Description', type: 'text', rows: 3, group: 'seo' }),
    defineField({ name: 'ogImage',        title: 'OG Image',         type: 'image', group: 'seo' }),

    // ── HERO ─────────────────────────────────────────────────────────────────
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
    defineField({ name: 'heroEyebrow',  title: 'Eyebrow (Hero — small label above headline)', type: 'string', group: 'hero' }),
    defineField({ name: 'heroHeadline', title: 'Headline (Hero — main heading)',               type: 'string', group: 'hero' }),
    defineField({ name: 'heroLead',     title: 'Lead (Hero — intro paragraph)',                type: 'text', rows: 3, group: 'hero' }),
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

    // ── HOW THE LEVELS WORK ───────────────────────────────────────────────────
    defineField({ name: 'levelsEyebrow', title: 'Eyebrow (How the Levels Work — small label above heading)',  type: 'string', group: 'levels' }),
    defineField({ name: 'levelsHeading', title: 'Heading (How the Levels Work — section title)',              type: 'string', group: 'levels' }),
    defineField({
      name: 'levelsBody', title: 'Body (How the Levels Work — rich text paragraphs)', type: 'array', group: 'levels',
      of: [{ type: 'block' }],
    }),
    defineField({ name: 'levelsImage',    title: 'Image (How the Levels Work — photo beside text)',              type: 'image', options: { hotspot: true }, group: 'levels' }),
    defineField({ name: 'levelsImageAlt', title: 'Image Alt Text (How the Levels Work — accessibility description)', type: 'string', group: 'levels' }),
    defineField({
      name: 'levelsImageAspect',
      title: 'Image Shape (How the Levels Work — controls box proportions; image is cropped to fit using the hotspot)',
      type: 'string', group: 'levels',
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

    // ── ELEMENTARY PROGRAMS ───────────────────────────────────────────────────
    defineField({ name: 'elementaryEyebrow', title: 'Eyebrow (Elementary Programs — small label above heading)', type: 'string', group: 'elementary' }),
    defineField({ name: 'elementaryHeading', title: 'Heading (Elementary Programs — section title)',              type: 'string', group: 'elementary' }),
    defineField({ name: 'elementaryIntro',   title: 'Intro (Elementary Programs — paragraph below heading)',      type: 'text', rows: 3, group: 'elementary' }),

    // ── DISCIPLESHIP PROGRAMS ─────────────────────────────────────────────────
    defineField({ name: 'discipleshipEyebrow', title: 'Eyebrow (Discipleship Programs — small label above heading)', type: 'string', group: 'discipleship' }),
    defineField({ name: 'discipleshipHeading', title: 'Heading (Discipleship Programs — section title)',              type: 'string', group: 'discipleship' }),
    defineField({ name: 'discipleshipIntro',   title: 'Intro (Discipleship Programs — paragraph below heading)',      type: 'text', rows: 3, group: 'discipleship' }),

    // ── ACADEMIC APPROACH ─────────────────────────────────────────────────────
    defineField({ name: 'academicEyebrow', title: 'Eyebrow (Academic Approach — small label above heading)', type: 'string', group: 'academic' }),
    defineField({ name: 'academicHeading', title: 'Heading (Academic Approach — section title)',              type: 'string', group: 'academic' }),
    defineField({ name: 'academicIntro',   title: 'Intro (Academic Approach — paragraph below heading)',      type: 'text', rows: 3, group: 'academic' }),
  ],
})
