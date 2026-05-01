export const revalidate = 60;

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Hero from '@/components/Hero';
import ScriptureBanner from '@/components/ScriptureBanner';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import { getHomepage, getPrograms } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';

export const metadata: Metadata = {
  title: 'The Flame Christian Co-op | St. Augustine Christian Homeschool Cooperative',
  description:
    "A Christ-centered homeschool cooperative in the St. Augustine area — where children encounter God's presence, grow in knowledge, and discover who He created them to be.",
  openGraph: {
    title:       'The Flame Christian Co-op | St. Augustine Christian Homeschool Cooperative',
    description: "A Christ-centered homeschool cooperative in the St. Augustine area.",
  },
  alternates: { canonical: 'https://theflame.org' },
};

// Fallback data used when Sanity fields are empty
const defaultWhyCards = [
  { cardTitle: 'Spirit-Led Discipleship', cardBody: "Children aren't just taught about God — they're invited to know Him, follow Him, hear His voice, and live with boldness and love." },
  { cardTitle: 'Developmental Learning',  cardBody: "Students are placed and supported according to readiness, mastery, and growth — not only age or grade level." },
  { cardTitle: 'Family Partnership',      cardBody: "Parents lead the home. The Flame enriches the journey with tutors, structure, support, friendships, and a community of like-minded families." },
];

const defaultProofRows = [
  'Children are known by name — not lost in a crowd',
  'Faith is woven into every subject, not added as an afterthought',
  "Students advance when they're ready, not when the calendar says so",
  'Parents stay central — The Flame comes alongside, not in front of the home',
];

const defaultChecklist = [
  'Rooted in Scripture, prayer, and the active presence of the Holy Spirit',
  'Programs from Kindergarten through high school discipleship',
  'Mastery-based learning that develops the whole child — mind, spirit, and character',
  'Parents lead the home. We enrich the journey.',
];

// SVG icons for Why Choose Us cards — fixed (not editable)
const whyIcons = [
  <svg key="0" viewBox="0 0 36 36" fill="none"><circle cx="18" cy="18" r="17" stroke="#A69264" strokeWidth="1.5"/><path d="M12 18C12 14.7 14.7 12 18 12C21.3 12 24 14.7 24 18" stroke="#A69264" strokeWidth="1.5" strokeLinecap="round"/><path d="M18 24V18" stroke="#A69264" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  <svg key="1" viewBox="0 0 36 36" fill="none"><rect x="3" y="8" width="30" height="22" rx="2" stroke="#A69264" strokeWidth="1.5"/><path d="M3 14H33" stroke="#A69264" strokeWidth="1.5"/><path d="M12 8V6" stroke="#A69264" strokeWidth="1.5" strokeLinecap="round"/><path d="M24 8V6" stroke="#A69264" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  <svg key="2" viewBox="0 0 36 36" fill="none"><path d="M18 6C14 6 10 9 10 14C10 19 18 30 18 30C18 30 26 19 26 14C26 9 22 6 18 6Z" stroke="#A69264" strokeWidth="1.5"/><circle cx="18" cy="14" r="3" stroke="#A69264" strokeWidth="1.5"/></svg>,
];

function renderBadge(label: string) {
  if (label === 'DI')   return <><span>D</span><span style={{ fontSize: '.65em' }}>I</span></>;
  if (label === 'DII')  return <><span>D</span><span style={{ fontSize: '.65em' }}>II</span></>;
  if (label === 'DIII') return <><span>D</span><span style={{ fontSize: '.65em' }}>III</span></>;
  return label;
}

export default async function HomePage() {
  const [cms, sanityPrograms] = await Promise.all([getHomepage(), getPrograms()]);

  // ── Hero ──────────────────────────────────────────────────────────────────
  const heroEyebrow   = cms?.heroEyebrow    ?? 'Welcome to The Flame';
  const heroHeadline  = cms?.heroHeadline   ?? 'Stoking the Fire of the Holy Spirit in the Next Generation';
  const heroSubhead   = cms?.heroSubheadline ?? "A Christ-centered homeschool cooperative in the St. Augustine area — where children encounter God's presence, grow in knowledge, and discover who He created them to be.";
  const heroTrustLine = cms?.heroTrustLine  ?? 'Serving homeschool families from Kindergarten through high school discipleship';
  const heroImageSrc  = cms?.heroImage ? urlFor(cms.heroImage).width(1920).url() : undefined;

  // ── Scripture ─────────────────────────────────────────────────────────────
  const scriptureQuote    = cms?.scriptureQuote    ?? '"For this reason I remind you to fan into flame the gift of God, which is in you through the laying on of my hands, for God gave us a spirit not of fear but of power and of love and of self-control."';
  const scriptureCitation = cms?.scriptureCitation ?? '— 2 Timothy 1:6–7';

  // ── Who We Are ────────────────────────────────────────────────────────────
  const whoEyebrow    = cms?.whoWeAreEyebrow    ?? 'Who We Are';
  const whoHeading    = cms?.whoWeAreHeading     ?? 'More Than a Co-op. A Place Where Children Grow in Faith and Confidence.';
  const whoLead       = cms?.whoWeAreLead        ?? 'For families who want the support of a classroom, the warmth of community, and a Christ-centered place where their children can learn, build friendships, and be poured into.';
  const whoSubhead    = cms?.whoWeAreSubhead     ?? 'Small Groups. Real Support. Christ at the Center.';
  const whoBody       = cms?.whoWeAreBody        ?? 'The Flame gives homeschool families a place where children are taught, encouraged, and discipled in a smaller, more personal setting. With caring tutors, meaningful classes, and a community of families walking in the same direction, students grow academically, spiritually, and socially — without losing the heart and flexibility of homeschooling.';
  const whoImageSrc   = cms?.whoWeAreImage ? urlFor(cms.whoWeAreImage).width(800).url() : undefined;
  const whoButtonText = cms?.whoWeAreButtonText ?? 'Learn More About Us';
  const whoButtonUrl  = cms?.whoWeAreButtonUrl  ?? '/about';

  // ── Why Choose Us ─────────────────────────────────────────────────────────
  const whyEyebrow  = cms?.whyChooseEyebrow ?? 'Why Choose Us';
  const whyHeading  = cms?.whyChooseHeading ?? 'A Place Where Faith, Learning, and Community Grow Together.';
  const whySubhead  = cms?.whyChooseSubhead ?? "For many families, homeschooling is a calling. But that doesn't mean you have to carry it alone. The Flame gives families a Christ-centered community and a clear path for growth.";
  const whyCards    = cms?.whyChooseCards?.length ? cms.whyChooseCards : defaultWhyCards;

  // ── Programs Preview ──────────────────────────────────────────────────────
  const programsEyebrow = cms?.programsEyebrow ?? 'Our Programs';
  const programsHeading = cms?.programsHeading ?? 'A Path That Grows With Your Child.';
  const programsSubhead = cms?.programsSubhead ?? 'From the first spark in kindergarten to high school discipleship — one connected journey, built to go as deep as your child is ready.';

  // ── What The Flame Feels Like ─────────────────────────────────────────────
  const feelsEyebrow   = cms?.feelsLikeEyebrow ?? 'What The Flame Feels Like';
  const feelsHeading   = cms?.feelsLikeHeading ?? 'Known by Name. Rooted in Truth. Sent With Purpose.';
  const feelsLead      = cms?.feelsLikeLead    ?? "A child's education should shape more than what they know. It should shape who they are becoming.";
  const feelsBody      = cms?.feelsLikeBody    ?? 'At The Flame, students are surrounded by adults and families who care about their hearts, their minds, their character, and their walk with the Lord. We want children who can read well, think clearly, write confidently, pray with courage, and stand firm in a world that will challenge what they believe.';
  const feelsImageSrc  = cms?.feelsLikeImage ? urlFor(cms.feelsLikeImage).width(800).url() : undefined;
  const feelsProofRows = cms?.feelsLikeProofRows?.length ? cms.feelsLikeProofRows : defaultProofRows;

  // ── Community Statement ───────────────────────────────────────────────────
  const communityEyebrow = cms?.communityEyebrow ?? 'Join the Community';
  const communityHeading = cms?.communityHeading ?? 'This Is Why The Flame Exists.';
  const communityLead    = cms?.communityLead    ?? 'To help fan into flame the gifts God has already placed inside your child.';
  const communityBody    = cms?.communityBody    ?? "We exist because a group of families believed children deserved more than a good education. They deserved a community that would call out the fire inside them. That's still what we're building — one family at a time.";

  // ── CTA ───────────────────────────────────────────────────────────────────
  const ctaHeading    = cms?.ctaHeading         ?? "We'd Love to Meet Your Family.";
  const ctaSubheading = cms?.ctaSubheading      ?? "Whether you're new to homeschooling or searching for something deeper — The Flame may be exactly where God is leading you.";
  const ctaChecklist  = cms?.ctaChecklistItems?.length ? cms.ctaChecklistItems : defaultChecklist;

  return (
    <>
      {/* HERO */}
      <Hero
        eyebrow={heroEyebrow}
        headline={heroHeadline}
        subheadline={heroSubhead}
        trustLine={heroTrustLine}
        imageSrc={heroImageSrc}
        buttons={[
          { label: 'Begin Admissions', href: '/admissions', variant: 'primary' },
          { label: 'Explore Programs', href: '/programs',   variant: 'outline-white' },
        ]}
      />

      {/* WHO WE ARE */}
      <section style={{ padding: 'var(--section-v) 0' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 48px' }}>
            <span className="eyebrow" style={{ display: 'block', textAlign: 'center', justifyContent: 'center' }}>{whoEyebrow}</span>
            <h2 style={{ marginBottom: '20px' }}>{whoHeading}</h2>
            <p className="lead">{whoLead}</p>
          </div>
          <div className="split split--40 reveal">
            <div className="split__media">
              {whoImageSrc ? (
                <Image src={whoImageSrc} alt={whoHeading} width={800} height={1067} style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-lg)' }} />
              ) : (
                <ImagePlaceholder label="Photo: Small group classroom moment" aspectRatio="tall" />
              )}
            </div>
            <div className="split__body">
              <h3 style={{ marginBottom: '16px' }}>{whoSubhead}</h3>
              <p>{whoBody}</p>
              <div style={{ marginTop: '28px' }}>
                <Link href={whoButtonUrl} className="btn btn--primary">{whoButtonText}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCRIPTURE BANNER */}
      <ScriptureBanner
        reference="Our Foundation"
        quote={scriptureQuote}
        citation={scriptureCitation}
      />

      {/* WHY CHOOSE US */}
      <section className="section--dark">
        <div className="container">
          <div style={{ maxWidth: '640px', marginBottom: '48px' }} className="reveal">
            <span className="eyebrow">{whyEyebrow}</span>
            <h2 style={{ marginBottom: '16px' }}>{whyHeading}</h2>
            <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '1rem' }}>{whySubhead}</p>
          </div>
          <div className="cards3 reveal">
            {whyCards.map((card: { cardTitle: string; cardBody: string }, i: number) => (
              <div key={i} className="card3">
                <div className="card3__icon">{whyIcons[i]}</div>
                <div className="card3__title">{card.cardTitle}</div>
                <p className="card3__body">{card.cardBody}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAM PATH PREVIEW */}
      <section className="section--cream">
        <div className="container">
          <div className="reveal" style={{ maxWidth: '720px', marginBottom: '8px' }}>
            <span className="eyebrow">{programsEyebrow}</span>
            <h2 style={{ marginBottom: '16px' }}>{programsHeading}</h2>
            <p className="lead">{programsSubhead}</p>
          </div>
          <div className="program-tiles reveal">
            {sanityPrograms?.map((p: { _id: string; badgeLabel: string; name: string; level: string; ages: string; themeLine: string }) => (
              <div key={p._id} className="program-tile">
                <div className="program-tile__badge">{renderBadge(p.badgeLabel)}</div>
                <div className="program-tile__content">
                  <div className="program-tile__name">{p.name}</div>
                  <div className="program-tile__ages">{p.level} · {p.ages}</div>
                  <div className="program-tile__line">{p.themeLine}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '32px' }}>
            <Link href="/programs" className="link-arrow">See All Programs</Link>
          </div>
        </div>
      </section>

      {/* WHAT THE FLAME FEELS LIKE */}
      <section style={{ padding: 'var(--section-v) 0' }}>
        <div className="container">
          <div className="split">
            <div className="split__body reveal">
              <span className="eyebrow">{feelsEyebrow}</span>
              <h2 style={{ marginBottom: '16px' }}>{feelsHeading}</h2>
              <p className="lead" style={{ marginBottom: '20px' }}>{feelsLead}</p>
              <p style={{ marginBottom: '24px' }}>{feelsBody}</p>
              <div className="proof-rows">
                {feelsProofRows.map((row: string, i: number) => (
                  <div key={i} className="proof-row">{row}</div>
                ))}
              </div>
            </div>
            <div className="split__media reveal reveal-delay-2">
              {feelsImageSrc ? (
                <Image src={feelsImageSrc} alt="What The Flame Feels Like" width={800} height={1067} style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-lg)' }} />
              ) : (
                <ImagePlaceholder label="Photo: Students learning together, community moment" aspectRatio="tall" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY STATEMENT */}
      <section className="section--cream2" style={{ padding: '72px 0' }}>
        <div className="container--narrow" style={{ textAlign: 'center' }}>
          <span className="eyebrow" style={{ display: 'block', textAlign: 'center', justifyContent: 'center' }}>
            {communityEyebrow}
          </span>
          <h2 style={{ marginBottom: '20px' }}>{communityHeading}</h2>
          <p className="lead" style={{ marginBottom: '8px' }}>{communityLead}</p>
          <p style={{ marginBottom: '32px', color: 'var(--mid)' }}>{communityBody}</p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section--dark" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="split" style={{ gap: '60px', alignItems: 'center' }}>
            <div className="reveal">
              <span className="eyebrow">Ready to Take the Next Step?</span>
              <h2 style={{ marginBottom: '16px' }}>{ctaHeading}</h2>
              <p style={{ color: 'rgba(255,255,255,.65)', marginBottom: '28px' }}>{ctaSubheading}</p>
              <div className="btn-group">
                <Link href="/admissions" className="btn btn--primary">Begin Admissions</Link>
                <Link href="/programs" className="link-arrow" style={{ color: 'rgba(255,255,255,.6)' }}>Explore Programs</Link>
              </div>
            </div>
            <div className="reveal reveal-delay-1">
              <ul className="check-list">
                {ctaChecklist.map((item: string, i: number) => (
                  <li key={i} style={{ color: 'rgba(255,255,255,.8)' }}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
