import { groq } from 'next-sanity'
import { client } from './client'

const imageFields = `{ asset->{ _id, url, metadata { dimensions } }, hotspot, crop }`

// ── HOMEPAGE ──────────────────────────────────────────────────────────────────
export async function getHomepage() {
  return client.fetch(groq`*[_type == "homepage" && _id == "homepage"][0] {
    heroEyebrow, heroHeadline, heroSubheadline, heroTrustLine,
    heroImage ${imageFields},
    whoWeAreEyebrow, whoWeAreHeading, whoWeAreLead, whoWeAreSubhead, whoWeAreBody,
    whoWeAreImage ${imageFields}, whoWeAreButtonText, whoWeAreButtonUrl,
    scriptureQuote, scriptureCitation,
    whyChooseHeading, whyChooseSubhead,
    programsEyebrow, programsHeading, programsSubhead,
    feelsLikeHeading, feelsLikeLead, feelsLikeBody,
    ctaHeading, ctaSubheading,
  }`)
}

// ── ABOUT ─────────────────────────────────────────────────────────────────────
export async function getAbout() {
  return client.fetch(groq`*[_type == "about" && _id == "about"][0] {
    seoTitle, seoDescription, ogImage ${imageFields},
    heroHeadline, heroLead,
    storyBody,
    missionText, visionText, modelText,
    directors[] {
      name, titleText, bio, bio2, headshotAlt,
      headshot ${imageFields},
    },
  }`)
}

// ── BELIEFS ───────────────────────────────────────────────────────────────────
export async function getBeliefs() {
  return client.fetch(groq`*[_type == "beliefs" && _id == "beliefs"][0] {
    seoTitle, seoDescription, ogImage ${imageFields},
    heroHeadline, heroLead,
    statementTitle, statementIntro, beliefsList,
    faithClassroomTitle, faithClassroomBody,
    formationTitle, formationQuote, formationBody,
  }`)
}

// ── ADMISSIONS ────────────────────────────────────────────────────────────────
export async function getAdmissions() {
  return client.fetch(groq`*[_type == "admissions" && _id == "admissions"][0] {
    seoTitle, seoDescription, ogImage ${imageFields},
    heroHeadline, heroLead,
    fitItems,
    enrollmentOpen, enrollmentOpenMessage, enrollmentClosedMessage,
    afterEnrollBody,
  }`)
}

// ── TUITION ───────────────────────────────────────────────────────────────────
export async function getTuition() {
  return client.fetch(groq`*[_type == "tuition" && _id == "tuition"][0] {
    seoTitle, seoDescription, ogImage ${imageFields},
    heroHeadline, heroLead,
    tableIntroHeading, tableIntroBody, tableFootnote,
    tuitionRows[] { program, appFee1, appFeeAdd, supplyFee, regFee, bgFee, tuitionTotal, grandTotal },
    callouts[] { program, total, note },
    scholarshipsHeading, scholarshipsIntro, scholarshipsBody,
    scholarships[] { name, desc },
  }`)
}

// ── PROGRAMS ──────────────────────────────────────────────────────────────────
export async function getPrograms() {
  return client.fetch(groq`*[_type == "program"] | order(displayOrder asc) {
    _id, name, slug, level, ages, themeLine, badgeLabel, variant, displayOrder, description,
  }`)
}

// ── NAVIGATION ────────────────────────────────────────────────────────────────
export async function getNavigation() {
  return client.fetch(groq`*[_type == "navigation" && _id == "navigation"][0] {
    links[] { label, href },
    ctaLabel, ctaHref,
  }`)
}
