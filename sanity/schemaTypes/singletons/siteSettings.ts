import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'social', title: 'Social Sharing' },
    { name: 'info',   title: 'Site Info' },
  ],
  fields: [
    // ── SOCIAL SHARING ────────────────────────────────────────────────────────
    defineField({ name: 'defaultOgImage', title: 'Default Social Share Image', type: 'image', group: 'social',
      description: 'Shown when sharing any page on Facebook, iMessage, LinkedIn, etc. Used as a fallback when a page has no specific share image. Recommended: 1200×630px.' }),
    defineField({ name: 'defaultOgTitle', title: 'Default Social Share Title', type: 'string', group: 'social',
      description: 'Fallback title shown in social share previews. ~60 characters. Individual pages can override this.' }),
    defineField({ name: 'defaultOgDescription', title: 'Default Social Share Description', type: 'text', rows: 2, group: 'social',
      description: 'Fallback description shown in social share previews. ~155 characters.' }),

    // ── SITE INFO ─────────────────────────────────────────────────────────────
    defineField({ name: 'siteName',     title: 'Site Name',       type: 'string', group: 'info' }),
    defineField({ name: 'tagline',      title: 'Tagline',         type: 'string', group: 'info' }),
    defineField({ name: 'contactEmail', title: 'Contact Email',   type: 'string', group: 'info' }),
    defineField({ name: 'phone',        title: 'Phone Number',    type: 'string', group: 'info' }),
    defineField({ name: 'address',      title: 'Address',         type: 'text', rows: 2, group: 'info' }),
    defineField({ name: 'instagramUrl', title: 'Instagram URL',   type: 'url', group: 'info' }),
    defineField({ name: 'facebookUrl',  title: 'Facebook URL',    type: 'url', group: 'info' }),
    defineField({ name: 'youtubeUrl',   title: 'YouTube URL',     type: 'url', group: 'info' }),
  ],
})
