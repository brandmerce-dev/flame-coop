import { defineType, defineField } from 'sanity'

export const legalPage = defineType({
  name: 'legalPage',
  title: 'Legal Page',
  type: 'document',
  fields: [
    defineField({ name: 'title',          title: 'Page Title',       type: 'string' }),
    defineField({ name: 'slug',           title: 'Slug',             type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'seoTitle',       title: 'SEO Title',        type: 'string' }),
    defineField({ name: 'seoDescription', title: 'Meta Description', type: 'text', rows: 3 }),
    defineField({
      name: 'body', title: 'Page Content', type: 'array',
      of: [{ type: 'block' }],
      description: 'Full legal page content. Use headings, paragraphs, and lists as needed.',
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'slug.current' } },
})
