import { defineType, defineField } from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string',
      description: 'The main heading on the /contact page, e.g. "Get in Touch".' }),
    defineField({ name: 'lead', title: 'Lead Paragraph', type: 'text', rows: 4,
      description: 'The opening invitation shown under the heading.' }),
    defineField({ name: 'closingNote', title: 'Closing Note (optional)', type: 'text', rows: 2,
      description: 'An optional warm closing line shown beneath the contact channel cards.' }),
  ],
  preview: {
    prepare: () => ({ title: 'Contact Page' }),
  },
})
