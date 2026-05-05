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
    whyChooseEyebrow, whyChooseHeading, whyChooseSubhead,
    whyChooseCards[] { cardTitle, cardBody },
    programsEyebrow, programsHeading, programsSubhead,
    feelsLikeEyebrow, feelsLikeHeading, feelsLikeLead, feelsLikeBody,
    feelsLikeImage ${imageFields},
    feelsLikeProofRows,
    communityEyebrow, communityHeading, communityLead, communityBody,
    ctaHeading, ctaSubheading,
    ctaChecklistItems,
  }`)
}

// ── ABOUT ─────────────────────────────────────────────────────────────────────
export async function getAbout() {
  return client.fetch(groq`*[_type == "about" && _id == "about"][0] {
    seoTitle, seoDescription, ogImage ${imageFields},
    heroStyle, heroEyebrow, heroHeadline, heroLead,
    heroImage ${imageFields}, heroImageAlt,
    storyEyebrow, storyHeading,
    storyBody[] { ..., children[] { ... } },
    storyImageAlt,
    storyImageAspect,
    storyImage ${imageFields},
    mvvEyebrow, mvvHeading,
    missionText, visionText, modelText,
    diffEyebrow, diffHeading, diffIntro,
    diffCards[] { title, text },
    directorsEyebrow, directorsHeading,
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
    heroStyle, heroEyebrow, heroHeadline, heroLead,
    heroImage ${imageFields}, heroImageAlt,
    statementTitle, statementIntro, beliefsList,
    statementImage ${imageFields}, statementImageAlt,
    faithClassroomTitle, faithClassroomBody[] { ..., children[] { ... } },
    faithClassroomImage ${imageFields}, faithClassroomImageAlt,
    formationTitle, formationQuote, formationBody,
  }`)
}

// ── ADMISSIONS ────────────────────────────────────────────────────────────────
export async function getAdmissions() {
  return client.fetch(groq`*[_type == "admissions" && _id == "admissions"][0] {
    seoTitle, seoDescription, ogImage ${imageFields},
    heroStyle, heroEyebrow, heroHeadline, heroLead,
    heroImage ${imageFields}, heroImageAlt,
    beforeApplyHeading, beforeApplyIntro, fitItems,
    fitImage ${imageFields}, fitImageAlt,
    enrollmentOpen, enrollmentOpenMessage, enrollmentClosedMessage,
    afterEnrollHeading, afterEnrollBody[] { ..., children[] { ... } },
    afterEnrollImage ${imageFields}, afterEnrollImageAlt,
    requestInfoEyebrow, requestInfoHeading, requestInfoBody1, requestInfoBody2, requestInfoBtnLabel,
    requestInfoImage ${imageFields}, requestInfoImageAlt,
  }`)
}

// ── TUITION ───────────────────────────────────────────────────────────────────
export async function getTuition() {
  return client.fetch(groq`*[_type == "tuition" && _id == "tuition"][0] {
    seoTitle, seoDescription, ogImage ${imageFields},
    heroStyle, heroEyebrow, heroHeadline, heroLead,
    heroImage ${imageFields}, heroImageAlt,
    tableIntroHeading, tableIntroBody, tableFootnote,
    tuitionRows[] { program, appFee1, appFeeAdd, supplyFee, regFee, bgFee, tuitionTotal, grandTotal },
    callouts[] { program, total, note },
    scholarshipsHeading, scholarshipsIntro, scholarshipsBody,
    scholarships[] { name, desc },
    scholarshipsImage ${imageFields}, scholarshipsImageAlt,
    ctaEyebrow, ctaHeading, ctaBody1, ctaBody2,
  }`)
}

// ── PROGRAMS PAGE ─────────────────────────────────────────────────────────────
export async function getPagePrograms() {
  return client.fetch(groq`*[_type == "programs" && _id == "programs"][0] {
    heroStyle, heroEyebrow, heroHeadline, heroLead,
    heroImage ${imageFields}, heroImageAlt,
  }`)
}

// ── PROGRAMS ──────────────────────────────────────────────────────────────────
export async function getPrograms() {
  return client.fetch(groq`*[_type == "program"] | order(displayOrder asc) {
    _id, name, slug, level, ages, themeLine, badgeLabel, variant, displayOrder,
    "description": pt::text(description),
  }`)
}

// ── NAVIGATION ────────────────────────────────────────────────────────────────
export async function getNavigation() {
  return client.fetch(groq`*[_type == "navigation" && _id == "navigation"][0] {
    links[] { label, href },
    ctaLabel, ctaHref,
  }`)
}
