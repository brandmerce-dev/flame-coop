import { defineType, defineField } from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'About Page',
  type: 'document',
  groups: [
    { name: 'seo',       title: 'SEO' },
    { name: 'hero',      title: 'Hero' },
    { name: 'story',     title: 'Our Story' },
    { name: 'mvv',       title: 'Mission / Vision / Model' },
    { name: 'diff',      title: 'What Makes Us Different' },
    { name: 'directors', title: 'Directors' },
  ],
  fields: [
    // ── SEO ───────────────────────────────────────────────────────────────────
    defineField({ name: 'seoTitle',       title: 'SEO Title',       type: 'string', group: 'seo' }),
    defineField({ name: 'seoDescription', title: 'Meta Description', type: 'text', rows: 3, group: 'seo' }),
    defineField({ name: 'ogImage',        title: 'OG Image',         type: 'image', group: 'seo' }),

    // ── HERO ──────────────────────────────────────────────────────────────────
    defineField({ name: 'heroEyebrow',  title: 'Eyebrow',  type: 'string', group: 'hero' }),
    defineField({ name: 'heroHeadline', title: 'Headline', type: 'string', group: 'hero' }),
    defineField({ name: 'heroLead',     title: 'Lead',     type: 'text', rows: 3, group: 'hero' }),

    // ── OUR STORY ─────────────────────────────────────────────────────────────
    defineField({ name: 'storyEyebrow', title: 'Eyebrow',  type: 'string', group: 'story' }),
    defineField({ name: 'storyHeading', title: 'Heading',  type: 'string', group: 'story' }),
    defineField({
      name: 'storyBody', title: 'Story Body', type: 'array', group: 'story',
      of: [{ type: 'block' }],
    }),
    defineField({ name: 'storyImage',    title: 'Story Image',    type: 'image', options: { hotspot: true }, group: 'story' }),
    defineField({ name: 'storyImageAlt', title: 'Story Image Alt', type: 'string', group: 'story' }),

    // ── MISSION / VISION / MODEL ──────────────────────────────────────────────
    defineField({ name: 'mvvEyebrow', title: 'Eyebrow', type: 'string', group: 'mvv' }),
    defineField({ name: 'mvvHeading', title: 'Heading', type: 'string', group: 'mvv' }),
    defineField({ name: 'missionText', title: 'Mission Statement (Our Mission)', type: 'text', rows: 3, group: 'mvv' }),
    defineField({ name: 'visionText',  title: 'Vision Statement (Our Vision)',   type: 'text', rows: 3, group: 'mvv' }),
    defineField({ name: 'modelText',   title: 'How We Work',                     type: 'text', rows: 3, group: 'mvv' }),

    // ── WHAT MAKES US DIFFERENT ───────────────────────────────────────────────
    defineField({ name: 'diffEyebrow', title: 'Eyebrow', type: 'string', group: 'diff' }),
    defineField({ name: 'diffHeading', title: 'Heading', type: 'string', group: 'diff' }),
    defineField({ name: 'diffIntro',   title: 'Intro Paragraph', type: 'text', rows: 2, group: 'diff' }),
    defineField({
      name: 'diffCards', title: 'Differentiator Cards', type: 'array', group: 'diff',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Card Title', type: 'string' }),
          defineField({ name: 'text',  title: 'Card Text',  type: 'text', rows: 3 }),
        ],
        preview: { select: { title: 'title', subtitle: 'text' } },
      }],
    }),

    // ── DIRECTORS ─────────────────────────────────────────────────────────────
    defineField({ name: 'directorsEyebrow', title: 'Eyebrow', type: 'string', group: 'directors' }),
    defineField({ name: 'directorsHeading', title: 'Heading', type: 'string', group: 'directors' }),
    defineField({
      name: 'directors', title: 'Directors', type: 'array', group: 'directors',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'name',        title: 'Name',              type: 'string' }),
          defineField({ name: 'titleText',   title: 'Title',             type: 'string' }),
          defineField({ name: 'bio',         title: 'Bio (paragraph 1)', type: 'text', rows: 4 }),
          defineField({ name: 'bio2',        title: 'Bio (paragraph 2)', type: 'text', rows: 4 }),
          defineField({ name: 'headshot',    title: 'Headshot',          type: 'image', options: { hotspot: true } }),
          defineField({ name: 'headshotAlt', title: 'Headshot Alt Text', type: 'string' }),
        ],
        preview: { select: { title: 'name', subtitle: 'titleText', media: 'headshot' } },
      }],
    }),
  ],
})
