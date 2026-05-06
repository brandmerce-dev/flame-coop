import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemaTypes'

const singletonTypes = ['siteSettings', 'navigation', 'homepage', 'about', 'beliefs', 'admissions', 'tuition', 'programs']
// Collections that allow multiple documents
const collectionTypes = ['program', 'subject', 'legalPage']

export default defineConfig({
  name:    'flame-coop',
  title:   'The Flame CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '3kgekbj6',
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('Site Settings').id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem().title('Navigation').id('navigation')
              .child(S.document().schemaType('navigation').documentId('navigation')),
            S.divider(),
            S.listItem().title('Homepage').id('homepage')
              .child(S.document().schemaType('homepage').documentId('homepage')),
            S.listItem().title('About Page').id('about')
              .child(S.document().schemaType('about').documentId('about')),
            S.listItem().title('Beliefs Page').id('beliefs')
              .child(S.document().schemaType('beliefs').documentId('beliefs')),
            S.listItem().title('Admissions Page').id('admissions')
              .child(S.document().schemaType('admissions').documentId('admissions')),
            S.listItem().title('Tuition & Scholarship').id('tuition')
              .child(S.document().schemaType('tuition').documentId('tuition')),
            S.listItem().title('Programs Page Hero').id('programs')
              .child(S.document().schemaType('programs').documentId('programs')),
            S.divider(),
            S.documentTypeListItem('program').title('Programs'),
            S.documentTypeListItem('subject').title('Academic Subjects'),
            S.documentTypeListItem('legalPage').title('Legal Pages'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Hide "New document" for singletons
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.includes(schemaType) || collectionTypes.includes(schemaType)),
  },

  document: {
    // Remove delete/duplicate actions from singletons
    actions: (prev, context) =>
      singletonTypes.includes(context.schemaType)
        ? prev.filter(({ action }) => action !== 'delete' && action !== 'duplicate')
        : prev,
  },
})
