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
    defineField({ name: 'seoTitle',       title: 'SEO Title (Browser Tab & Search Results)',  type: 'string', group: 'seo' }),
    defineField({ name: 'seoDescription', title: 'Meta Description (Search Results Snippet)', type: 'text', rows: 3, group: 'seo' }),
    defineField({ name: 'ogImage',        title: 'OG Image (Social Share Preview)',           type: 'image', group: 'seo' }),

    // ── HERO ──────────────────────────────────────────────────────────────────
    defineField({ name: 'heroEyebrow',  title: 'Eyebrow (Hero — small label above headline)', type: 'string', group: 'hero' }),
    defineField({ name: 'heroHeadline', title: 'Headline (Hero — main page title)',           type: 'string', group: 'hero' }),
    defineField({ name: 'heroLead',     title: 'Lead Paragraph (Hero — intro text)',          type: 'text', rows: 3, group: 'hero' }),

    // ── OUR STORY ─────────────────────────────────────────────────────────────
    defineField({ name: 'storyEyebrow', title: 'Eyebrow (Our Story — small label above heading)', type: 'string', group: 'story' }),
    defineField({ name: 'storyHeading', title: 'Heading (Our Story — section title)',             type: 'string', group: 'story' }),
    defineField({
      name: 'storyBody', title: 'Body (Our Story — paragraphs)', type: 'array', group: 'story',
      of: [{ type: 'block' }],
    }),
    defineField({ name: 'storyImage',    title: 'Image (Our Story — photo beside text)',  type: 'image', options: { hotspot: true }, group: 'story' }),
    defineField({ name: 'storyImageAlt', title: 'Image Alt Text (Our Story — accessibility description)', type: 'string', group: 'story' }),
    defineField({
      name: 'storyImageAspect',
      title: 'Image Shape (Our Story — controls box proportions; image is cropped to fit using the hotspot)',
      type: 'string',
      group: 'story',
      options: {
        list: [
          { title: 'Tall (3:4) — recommended, matches default layout', value: 'tall' },
          { title: 'Square (1:1)',                                    value: 'square' },
          { title: 'Wide (16:10)',                                    value: 'wide' },
        ],
        layout: 'radio',
      },
      initialValue: 'tall',
    }),

    // ── MISSION / VISION / MODEL ──────────────────────────────────────────────
    defineField({ name: 'mvvEyebrow', title: 'Eyebrow (Mission/Vision/Model — small label above heading)', type: 'string', group: 'mvv' }),
    defineField({ name: 'mvvHeading', title: 'Heading (Mission/Vision/Model — section title)',             type: 'string', group: 'mvv' }),
    defineField({ name: 'missionText', title: 'Mission Statement (Our Mission card)', type: 'text', rows: 3, group: 'mvv' }),
    defineField({ name: 'visionText',  title: 'Vision Statement (Our Vision card)',   type: 'text', rows: 3, group: 'mvv' }),
    defineField({ name: 'modelText',   title: 'Model Statement (How We Work card)',   type: 'text', rows: 3, group: 'mvv' }),

    // ── WHAT MAKES US DIFFERENT ───────────────────────────────────────────────
    defineField({ name: 'diffEyebrow', title: 'Eyebrow (What Makes Us Different — small label above heading)', type: 'string', group: 'diff' }),
    defineField({ name: 'diffHeading', title: 'Heading (What Makes Us Different — section title)',             type: 'string', group: 'diff' }),
    defineField({ name: 'diffIntro',   title: 'Intro Paragraph (What Makes Us Different — text under heading)', type: 'text', rows: 2, group: 'diff' }),
    defineField({
      name: 'diffCards', title: 'Cards (What Makes Us Different — grid of differentiators)', type: 'array', group: 'diff',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Card Title (What Makes Us Different)', type: 'string' }),
          defineField({ name: 'text',  title: 'Card Body Text (What Makes Us Different)',  type: 'text', rows: 3 }),
        ],
        preview: { select: { title: 'title', subtitle: 'text' } },
      }],
    }),

    // ── DIRECTORS ─────────────────────────────────────────────────────────────
    defineField({ name: 'directorsEyebrow', title: 'Eyebrow (Directors — small label above heading)', type: 'string', group: 'directors' }),
    defineField({ name: 'directorsHeading', title: 'Heading (Directors — section title)',             type: 'string', group: 'directors' }),
    defineField({
      name: 'directors', title: 'Director Cards (Directors — list of bios)', type: 'array', group: 'directors',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'name',        title: 'Name (Directors — full name)',                       type: 'string' }),
          defineField({ name: 'titleText',   title: 'Title (Directors — role / position)',                type: 'string' }),
          defineField({ name: 'bio',         title: 'Bio Paragraph 1 (Directors — first paragraph)',      type: 'text', rows: 4 }),
          defineField({ name: 'bio2',        title: 'Bio Paragraph 2 (Directors — second paragraph)',     type: 'text', rows: 4 }),
          defineField({ name: 'headshot',    title: 'Headshot Photo (Directors — portrait image)',        type: 'image', options: { hotspot: true } }),
          defineField({ name: 'headshotAlt', title: 'Headshot Alt Text (Directors — accessibility description)', type: 'string' }),
        ],
        preview: { select: { title: 'name', subtitle: 'titleText', media: 'headshot' } },
      }],
    }),
  ],
})
