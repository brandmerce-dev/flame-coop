import { config, fields, singleton, collection } from '@keystatic/core';

export default config({
  storage: {
    // In development, files are written to disk in /content.
    // For production on Cloudflare Pages, change kind to 'github' and
    // configure KEYSTATIC_GITHUB_CLIENT_ID, KEYSTATIC_GITHUB_CLIENT_SECRET,
    // and KEYSTATIC_SECRET environment variables in the Cloudflare dashboard.
    kind: 'local',
  },

  // ── SINGLETONS ────────────────────────────────────────────────────────

  singletons: {
    // ── SITE-WIDE SETTINGS ────────────────────────────────────────────
    site: singleton({
      label: 'Site Settings',
      path:  'content/site',
      schema: {
        siteName:     fields.text({ label: 'Site Name' }),
        tagline:      fields.text({ label: 'Tagline' }),
        contactEmail: fields.text({ label: 'Contact Email', validation: { isRequired: true } }),
        phone:        fields.text({ label: 'Phone Number' }),
        address:      fields.text({ label: 'Address' }),
        instagramUrl: fields.url({ label: 'Instagram URL' }),
        facebookUrl:  fields.url({ label: 'Facebook URL' }),
        youtubeUrl:   fields.url({ label: 'YouTube URL' }),
      },
    }),

    // ── NAVIGATION ────────────────────────────────────────────────────
    navigation: singleton({
      label: 'Navigation',
      path:  'content/navigation',
      schema: {
        links: fields.array(
          fields.object({
            label: fields.text({ label: 'Link Label' }),
            href:  fields.text({ label: 'Link URL' }),
          }),
          {
            label:    'Navigation Links',
            itemLabel: (props) => props.fields.label.value,
          }
        ),
        ctaLabel: fields.text({ label: 'CTA Button Label' }),
        ctaHref:  fields.text({ label: 'CTA Button URL' }),
      },
    }),

    // ── HOMEPAGE ─────────────────────────────────────────────────────
    homepage: singleton({
      label: 'Homepage',
      path:  'content/homepage',
      schema: {
        seo: fields.object({
          title:           fields.text({ label: 'SEO Title' }),
          description:     fields.text({ label: 'Meta Description', multiline: true }),
          ogTitle:         fields.text({ label: 'Open Graph Title' }),
          ogDescription:   fields.text({ label: 'Open Graph Description', multiline: true }),
          ogImage:         fields.image({ label: 'Open Graph Image', directory: 'public/images/seo', publicPath: '/images/seo' }),
        }, { label: 'SEO' }),

        heroEyebrow:       fields.text({ label: 'Hero Eyebrow' }),
        heroHeadline:      fields.text({ label: 'Hero Headline' }),
        heroSubheadline:   fields.text({ label: 'Hero Sub-headline', multiline: true }),
        heroTrustLine:     fields.text({ label: 'Hero Trust Line' }),
        heroImage:         fields.image({ label: 'Hero Background Image', directory: 'public/images/hero', publicPath: '/images/hero' }),

        whoWeAreEyebrow:   fields.text({ label: 'Who We Are — Eyebrow' }),
        whoWeAreHeading:   fields.text({ label: 'Who We Are — Heading' }),
        whoWeAreLead:      fields.text({ label: 'Who We Are — Lead Paragraph', multiline: true }),
        whoWeAreBody:      fields.text({ label: 'Who We Are — Body', multiline: true }),

        scriptureQuote:    fields.text({ label: 'Scripture Quote', multiline: true }),
        scriptureCitation: fields.text({ label: 'Scripture Citation' }),

        whyChooseHeading:  fields.text({ label: 'Why Choose Us — Heading' }),
        whyChooseSubhead:  fields.text({ label: 'Why Choose Us — Subheading', multiline: true }),

        programsEyebrow:   fields.text({ label: 'Programs Preview — Eyebrow' }),
        programsHeading:   fields.text({ label: 'Programs Preview — Heading' }),
        programsSubhead:   fields.text({ label: 'Programs Preview — Sub-headline', multiline: true }),

        feelsLikeHeading:  fields.text({ label: 'What The Flame Feels Like — Heading' }),
        feelsLikeLead:     fields.text({ label: 'What The Flame Feels Like — Lead', multiline: true }),
        feelsLikeBody:     fields.text({ label: 'What The Flame Feels Like — Body', multiline: true }),

        ctaHeading:        fields.text({ label: 'CTA — Heading' }),
        ctaSubheading:     fields.text({ label: 'CTA — Subheading', multiline: true }),
      },
    }),

    // ── ABOUT ─────────────────────────────────────────────────────────
    about: singleton({
      label: 'About Page',
      path:  'content/about',
      schema: {
        seo: fields.object({
          title:         fields.text({ label: 'SEO Title' }),
          description:   fields.text({ label: 'Meta Description', multiline: true }),
          ogTitle:       fields.text({ label: 'Open Graph Title' }),
          ogDescription: fields.text({ label: 'Open Graph Description', multiline: true }),
          ogImage:       fields.image({ label: 'Open Graph Image', directory: 'public/images/seo', publicPath: '/images/seo' }),
        }, { label: 'SEO' }),

        heroHeadline:    fields.text({ label: 'Hero Headline' }),
        heroLead:        fields.text({ label: 'Hero Lead', multiline: true }),

        storyBody:       fields.document({ label: 'Our Story', formatting: true }),

        missionText:     fields.text({ label: 'Mission Statement', multiline: true }),
        visionText:      fields.text({ label: 'Vision Statement', multiline: true }),
        modelText:       fields.text({ label: 'How We Work', multiline: true }),

        directors: fields.array(
          fields.object({
            name:        fields.text({ label: 'Name' }),
            titleText:   fields.text({ label: 'Title' }),
            bio:         fields.text({ label: 'Bio (paragraph 1)', multiline: true }),
            bio2:        fields.text({ label: 'Bio (paragraph 2)', multiline: true }),
            headshot:    fields.image({ label: 'Headshot', directory: 'public/images/directors', publicPath: '/images/directors' }),
            headshotAlt: fields.text({ label: 'Headshot Alt Text' }),
          }),
          {
            label:    'Directors',
            itemLabel: (props) => props.fields.name.value,
          }
        ),
      },
    }),

    // ── BELIEFS ───────────────────────────────────────────────────────
    beliefs: singleton({
      label: 'Beliefs Page',
      path:  'content/beliefs',
      schema: {
        seo: fields.object({
          title:         fields.text({ label: 'SEO Title' }),
          description:   fields.text({ label: 'Meta Description', multiline: true }),
          ogTitle:       fields.text({ label: 'Open Graph Title' }),
          ogDescription: fields.text({ label: 'Open Graph Description', multiline: true }),
          ogImage:       fields.image({ label: 'Open Graph Image', directory: 'public/images/seo', publicPath: '/images/seo' }),
        }, { label: 'SEO' }),

        heroHeadline:  fields.text({ label: 'Hero Headline' }),
        heroLead:      fields.text({ label: 'Hero Lead', multiline: true }),

        statementTitle: fields.text({ label: 'Statement of Faith — Title' }),
        statementIntro: fields.text({ label: 'Statement of Faith — Intro', multiline: true }),
        beliefs: fields.array(
          fields.text({ label: 'Belief Statement' }),
          { label: 'Belief Statements' }
        ),

        faithClassroomTitle: fields.text({ label: 'Faith in the Classroom — Title' }),
        faithClassroomBody:  fields.document({ label: 'Faith in the Classroom — Body', formatting: true }),

        formationTitle: fields.text({ label: 'Formation — Title' }),
        formationQuote: fields.text({ label: 'Formation — Italic Quote', multiline: true }),
        formationBody:  fields.text({ label: 'Formation — Body', multiline: true }),
      },
    }),

    // ── ADMISSIONS ────────────────────────────────────────────────────
    admissions: singleton({
      label: 'Admissions Page',
      path:  'content/admissions',
      schema: {
        seo: fields.object({
          title:         fields.text({ label: 'SEO Title' }),
          description:   fields.text({ label: 'Meta Description', multiline: true }),
          ogTitle:       fields.text({ label: 'Open Graph Title' }),
          ogDescription: fields.text({ label: 'Open Graph Description', multiline: true }),
          ogImage:       fields.image({ label: 'Open Graph Image', directory: 'public/images/seo', publicPath: '/images/seo' }),
        }, { label: 'SEO' }),

        heroHeadline:    fields.text({ label: 'Hero Headline' }),
        heroLead:        fields.text({ label: 'Hero Lead', multiline: true }),

        fitItems: fields.array(
          fields.text({ label: 'Fit Checklist Item' }),
          { label: 'Fit Checklist Items' }
        ),

        enrollmentOpen: fields.checkbox({
          label:       'Enrollment is Currently OPEN',
          description: 'Check this box when enrollment is open. Uncheck when it is closed.',
          defaultValue: true,
        }),
        enrollmentOpenMessage:   fields.text({ label: 'Enrollment Open — Banner Message', multiline: true }),
        enrollmentClosedMessage: fields.text({ label: 'Enrollment Closed — Banner Message', multiline: true }),

        afterEnrollBody: fields.document({ label: 'After You Enroll — Body', formatting: true }),
      },
    }),

    // ── TUITION ───────────────────────────────────────────────────────
    tuition: singleton({
      label: 'Tuition & Scholarship Page',
      path:  'content/tuition',
      schema: {
        seo: fields.object({
          title:         fields.text({ label: 'SEO Title' }),
          description:   fields.text({ label: 'Meta Description', multiline: true }),
          ogTitle:       fields.text({ label: 'Open Graph Title' }),
          ogDescription: fields.text({ label: 'Open Graph Description', multiline: true }),
          ogImage:       fields.image({ label: 'Open Graph Image', directory: 'public/images/seo', publicPath: '/images/seo' }),
        }, { label: 'SEO' }),

        heroHeadline: fields.text({ label: 'Hero Headline' }),
        heroLead:     fields.text({ label: 'Hero Lead', multiline: true }),

        tableIntroHeading: fields.text({ label: 'Table Section — Heading' }),
        tableIntroBody:    fields.text({ label: 'Table Section — Intro', multiline: true }),
        tableFootnote:     fields.text({ label: 'Table Footnote', multiline: true }),

        tuitionRows: fields.array(
          fields.object({
            program:      fields.text({ label: 'Program Name' }),
            appFee1:      fields.text({ label: 'App Fee (1st child)' }),
            appFeeAdd:    fields.text({ label: 'App Fee (additional)' }),
            supplyFee:    fields.text({ label: 'Supply Fee' }),
            regFee:       fields.text({ label: 'Registration Fee' }),
            bgFee:        fields.text({ label: 'Background Check Fee' }),
            tuitionTotal: fields.text({ label: 'Tuition Total' }),
            grandTotal:   fields.text({ label: 'Tuition + Reg. Total' }),
          }),
          {
            label:    'Tuition Table Rows',
            itemLabel: (props) => props.fields.program.value,
          }
        ),

        callouts: fields.array(
          fields.object({
            program: fields.text({ label: 'Program Label' }),
            total:   fields.text({ label: 'Total Display' }),
            note:    fields.text({ label: 'Note' }),
          }),
          {
            label:    'Program Callout Cards',
            itemLabel: (props) => props.fields.program.value,
          }
        ),

        scholarshipsHeading: fields.text({ label: 'Scholarships — Heading' }),
        scholarshipsIntro:   fields.text({ label: 'Scholarships — Intro', multiline: true }),
        scholarshipsBody:    fields.text({ label: 'Scholarships — Full Body', multiline: true }),
        scholarships: fields.array(
          fields.object({
            name: fields.text({ label: 'Scholarship Name' }),
            desc: fields.text({ label: 'Description' }),
          }),
          {
            label:    'Scholarship Programs',
            itemLabel: (props) => props.fields.name.value,
          }
        ),
      },
    }),
  },

  // ── COLLECTIONS ──────────────────────────────────────────────────────

  collections: {
    // ── PROGRAMS ──────────────────────────────────────────────────────
    programs: collection({
      label:  'Programs',
      path:   'content/programs/*',
      slugField: 'name',
      schema: {
        name:         fields.slug({ name: { label: 'Program Name' } }),
        level:        fields.text({ label: 'Level Label (e.g. Kindergarten, Level 1)' }),
        ages:         fields.text({ label: 'Ages (e.g. Ages 5–6)' }),
        themeLine:    fields.text({ label: 'One-Line Theme' }),
        description:  fields.document({ label: 'Full Description', formatting: true }),
        badgeLabel:   fields.text({ label: 'Badge Label (letter shown on tile/card)' }),
        variant:      fields.select({
          label:   'Card Variant',
          options: [
            { label: 'Elementary (gold)',      value: 'elementary' },
            { label: 'Discipleship (dark)',    value: 'discipleship' },
          ],
          defaultValue: 'elementary',
        }),
        displayOrder: fields.integer({ label: 'Display Order (1 = first)' }),
      },
    }),

    // ── SUBJECTS ──────────────────────────────────────────────────────
    subjects: collection({
      label:  'Academic Subjects',
      path:   'content/subjects/*',
      slugField: 'name',
      schema: {
        name:        fields.slug({ name: { label: 'Subject Name' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        displayOrder: fields.integer({ label: 'Display Order' }),
      },
    }),
  },
});
