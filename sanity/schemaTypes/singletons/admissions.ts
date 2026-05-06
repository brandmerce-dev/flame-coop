import { defineType, defineField } from 'sanity'

export const admissions = defineType({
  name: 'admissions',
  title: 'Admissions Page',
  type: 'document',
  groups: [
    { name: 'seo',        title: 'SEO' },
    { name: 'hero',       title: 'Hero' },
    { name: 'fit',        title: 'Fit Checklist' },
    { name: 'enrollment', title: 'Enrollment Status' },
    { name: 'after',      title: 'After You Enroll' },
    { name: 'request',    title: 'Request Information' },
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

    defineField({ name: 'beforeApplyHeading', title: 'Heading (Before You Apply — section title)',                        type: 'string', group: 'fit' }),
    defineField({ name: 'beforeApplyIntro',   title: 'Intro (Before You Apply — paragraph above the checklist)',         type: 'text', rows: 3, group: 'fit' }),
    defineField({
      name: 'fitItems', title: 'Checklist Items (Before You Apply — one item per line)', type: 'array', group: 'fit',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'fitImage',    title: 'Image (Before You Apply — photo beside the checklist)',               type: 'image', options: { hotspot: true }, group: 'fit' }),
    defineField({ name: 'fitImageAlt', title: 'Image Alt Text (Before You Apply — accessibility description)',       type: 'string', group: 'fit' }),
    defineField({
      name: 'fitImageAspect',
      title: 'Image Shape (Before You Apply — controls box proportions; image is cropped to fit using the hotspot)',
      type: 'string', group: 'fit',
      options: {
        list: [
          { title: 'Tall (3:4) — recommended, matches default layout', value: 'tall' },
          { title: 'Square (1:1)', value: 'square' },
          { title: 'Wide (16:10)', value: 'wide' },
        ],
        layout: 'radio',
      },
      initialValue: 'tall',
    }),

    defineField({
      name: 'enrollmentOpen', title: 'Enrollment is Currently OPEN (Enrollment Status — toggle on/off)',
      type: 'boolean', initialValue: true, group: 'enrollment',
      description: 'Toggle this to show the open or closed message on the page.',
    }),
    defineField({ name: 'enrollmentOpenMessage',   title: 'Open Message (Enrollment Status — shown when enrollment is open)',   type: 'text', rows: 3, group: 'enrollment' }),
    defineField({ name: 'enrollmentClosedMessage', title: 'Closed Message (Enrollment Status — shown when enrollment is closed)', type: 'text', rows: 3, group: 'enrollment' }),

    defineField({ name: 'afterEnrollHeading', title: 'Heading (After You Enroll — section title)',                     type: 'string', group: 'after' }),
    defineField({
      name: 'afterEnrollBody', title: 'Body (After You Enroll — rich text paragraphs)', type: 'array', group: 'after',
      of: [{ type: 'block' }],
    }),
    defineField({ name: 'afterEnrollImage',    title: 'Image (After You Enroll — photo beside text)',                   type: 'image', options: { hotspot: true }, group: 'after' }),
    defineField({ name: 'afterEnrollImageAlt', title: 'Image Alt Text (After You Enroll — accessibility description)', type: 'string', group: 'after' }),
    defineField({
      name: 'afterEnrollImageAspect',
      title: 'Image Shape (After You Enroll — controls box proportions; image is cropped to fit using the hotspot)',
      type: 'string', group: 'after',
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

    defineField({ name: 'requestInfoEyebrow', title: 'Eyebrow (Request Information — small label above heading)',      type: 'string', group: 'request' }),
    defineField({ name: 'requestInfoHeading', title: 'Heading (Request Information — main section title)',             type: 'string', group: 'request' }),
    defineField({ name: 'requestInfoBody1',   title: 'Body Paragraph 1 (Request Information — primary description)',  type: 'text', rows: 3, group: 'request' }),
    defineField({ name: 'requestInfoBody2',   title: 'Body Paragraph 2 (Request Information — platform/form note)',   type: 'text', rows: 3, group: 'request' }),
    defineField({ name: 'requestInfoBtnLabel', title: 'Button Label (Request Information — CTA button text)',         type: 'string', group: 'request' }),
    defineField({ name: 'requestInfoImage',    title: 'Image (Request Information — photo on the right side)',        type: 'image', options: { hotspot: true }, group: 'request' }),
    defineField({ name: 'requestInfoImageAlt', title: 'Image Alt Text (Request Information — accessibility description)', type: 'string', group: 'request' }),
    defineField({
      name: 'requestInfoImageAspect',
      title: 'Image Shape (Request Information — controls box proportions; image is cropped to fit using the hotspot)',
      type: 'string', group: 'request',
      options: {
        list: [
          { title: 'Tall (3:4) — recommended, matches default layout', value: 'tall' },
          { title: 'Square (1:1)', value: 'square' },
          { title: 'Wide (16:10)', value: 'wide' },
        ],
        layout: 'radio',
      },
      initialValue: 'tall',
    }),
  ],
})
