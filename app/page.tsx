import type { Metadata } from 'next';
import Link from 'next/link';
import { createReader } from '@keystatic/core/reader';
import Hero from '@/components/Hero';
import ScriptureBanner from '@/components/ScriptureBanner';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import keystaticConfig from '@/keystatic/config';

const reader = createReader(process.cwd(), keystaticConfig);

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

const programTiles = [
  { badge: 'S',                  name: 'Sparks',          ages: 'Kindergarten · Ages 5–6', line: 'The first spark of a lifelong faith.' },
  { badge: 'E',                  name: 'Embers',          ages: 'Level 1 · Ages 6–8',      line: 'Who is God the Creator? Old Testament foundations.' },
  { badge: 'I',                  name: 'Illuminators',    ages: 'Level 2 · Ages 8–10',     line: 'Walking with Christ through the life of Jesus.' },
  { badge: 'F',                  name: 'Firestarters',    ages: 'Level 3 · Ages 10–12',    line: 'Encountering the Holy Spirit and the early church.' },
  { badge: <>D<span style={{ fontSize: '.65em' }}>I</span></>,   name: 'Discipleship I',   ages: 'Ages 12–14',   line: 'Biblical Truth face-to-face with a secular world.' },
  { badge: <>D<span style={{ fontSize: '.65em' }}>II</span></>,  name: 'Discipleship II',  ages: 'Ages 14–16',   line: 'Discerning God\'s voice. Strengthening faith under pressure.' },
  { badge: <>D<span style={{ fontSize: '.65em' }}>III</span></>, name: 'Discipleship III', ages: 'High School',   line: 'Defending the faith. Living it out. Ready for what\'s next.' },
];

export default async function HomePage() {
  const cms = await reader.singletons.homepage.read();

  const heroEyebrow    = cms?.heroEyebrow    ?? 'Welcome to The Flame';
  const heroHeadline   = cms?.heroHeadline   ?? 'Stoking the Fire of the Holy Spirit in the Next Generation';
  const heroSubhead    = cms?.heroSubheadline ?? "A Christ-centered homeschool cooperative in the St. Augustine area — where children encounter God's presence, grow in knowledge, and discover who He created them to be.";
  const heroTrustLine  = cms?.heroTrustLine  ?? 'Serving homeschool families from Kindergarten through high school discipleship';
  const heroImageSrc   = cms?.heroImage      ?? undefined;

  const scriptureQuote    = cms?.scriptureQuote    ?? '"For this reason I remind you to fan into flame the gift of God, which is in you through the laying on of my hands, for God gave us a spirit not of fear but of power and of love and of self-control."';
  const scriptureCitation = cms?.scriptureCitation ?? '— 2 Timothy 1:6–7';

  return (
    <>
      {/* HERO */}
      <Hero
        eyebrow={heroEyebrow}
        headline={heroHeadline}
        subheadline={heroSubhead}
        trustLine={heroTrustLine}
        imageSrc={heroImageSrc ?? undefined}
        buttons={[
          { label: 'Begin Admissions',   href: '/admissions',  variant: 'primary' },
          { label: 'Explore Programs',   href: '/programs',    variant: 'outline-white' },
        ]}
      />

      {/* WHO WE ARE */}
      <section style={{ padding: 'var(--section-v) 0' }}>
        <div className="container">
          <div className="split split--40">
            <div className="split__media reveal">
              <ImagePlaceholder label="Photo: Small group classroom moment" aspectRatio="tall" />
            </div>
            <div className="split__body reveal reveal-delay-1">
              <span className="eyebrow">Who We Are</span>
              <h2 style={{ marginBottom: '20px' }}>
                More Than a Co-op. A Place Where Children Grow in Faith and Confidence.
              </h2>
              <p className="lead" style={{ marginBottom: '20px' }}>
                For families who want the support of a classroom, the warmth of community, and a Christ-centered place where their children can learn, build friendships, and be poured into.
              </p>
              <h3 style={{ marginBottom: '12px', fontSize: '1.2rem' }}>
                Small Groups. Real Support. Christ at the Center.
              </h3>
              <p>
                The Flame gives homeschool families a place where children are taught, encouraged, and discipled in a smaller, more personal setting. With caring tutors, meaningful classes, and a community of families walking in the same direction, students grow academically, spiritually, and socially — without losing the heart and flexibility of homeschooling.
              </p>
              <div style={{ marginTop: '24px' }}>
                <Link href="/about" className="link-arrow">Learn More About The Flame</Link>
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
          <div style={{ maxWidth: '520px', marginBottom: '48px' }} className="reveal">
            <span className="eyebrow">Why Choose Us</span>
            <h2 style={{ marginBottom: '16px' }}>A Place Where Faith, Learning, and Community Grow Together.</h2>
            <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '1rem' }}>
              For many families, homeschooling is a calling. But that doesn&apos;t mean you have to carry it alone. The Flame gives families a Christ-centered community and a clear path for growth.
            </p>
          </div>
          <div className="cards3 reveal">
            <div className="card3">
              <div className="card3__icon">
                <svg viewBox="0 0 36 36" fill="none"><circle cx="18" cy="18" r="17" stroke="#A69264" strokeWidth="1.5"/><path d="M12 18C12 14.7 14.7 12 18 12C21.3 12 24 14.7 24 18" stroke="#A69264" strokeWidth="1.5" strokeLinecap="round"/><path d="M18 24V18" stroke="#A69264" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
              <div className="card3__title">Spirit-Led Discipleship</div>
              <p className="card3__body">Children aren&apos;t just taught about God — they&apos;re invited to know Him, follow Him, hear His voice, and live with boldness and love.</p>
            </div>
            <div className="card3">
              <div className="card3__icon">
                <svg viewBox="0 0 36 36" fill="none"><rect x="3" y="8" width="30" height="22" rx="2" stroke="#A69264" strokeWidth="1.5"/><path d="M3 14H33" stroke="#A69264" strokeWidth="1.5"/><path d="M12 8V6" stroke="#A69264" strokeWidth="1.5" strokeLinecap="round"/><path d="M24 8V6" stroke="#A69264" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
              <div className="card3__title">Developmental Learning</div>
              <p className="card3__body">Students are placed and supported according to readiness, mastery, and growth — not only age or grade level.</p>
            </div>
            <div className="card3">
              <div className="card3__icon">
                <svg viewBox="0 0 36 36" fill="none"><path d="M18 6C14 6 10 9 10 14C10 19 18 30 18 30C18 30 26 19 26 14C26 9 22 6 18 6Z" stroke="#A69264" strokeWidth="1.5"/><circle cx="18" cy="14" r="3" stroke="#A69264" strokeWidth="1.5"/></svg>
              </div>
              <div className="card3__title">Family Partnership</div>
              <p className="card3__body">Parents lead the home. The Flame enriches the journey with tutors, structure, support, friendships, and a community of like-minded families.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM PATH PREVIEW */}
      <section className="section--cream">
        <div className="container">
          <div className="reveal" style={{ maxWidth: '600px', marginBottom: '8px' }}>
            <span className="eyebrow">Our Programs</span>
            <h2 style={{ marginBottom: '16px' }}>A Path That Grows With Your Child.</h2>
            <p className="lead">From the first spark in kindergarten to high school discipleship — one connected journey, built to go as deep as your child is ready.</p>
          </div>
          <div className="program-tiles reveal">
            {programTiles.map((tile, i) => (
              <div key={i} className="program-tile">
                <div className="program-tile__badge">{tile.badge}</div>
                <div className="program-tile__content">
                  <div className="program-tile__name">{tile.name}</div>
                  <div className="program-tile__ages">{tile.ages}</div>
                  <div className="program-tile__line">{tile.line}</div>
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
              <span className="eyebrow">What The Flame Feels Like</span>
              <h2 style={{ marginBottom: '16px' }}>Known by Name. Rooted in Truth. Sent With Purpose.</h2>
              <p className="lead" style={{ marginBottom: '20px' }}>A child&apos;s education should shape more than what they know. It should shape who they are becoming.</p>
              <p style={{ marginBottom: '24px' }}>
                At The Flame, students are surrounded by adults and families who care about their hearts, their minds, their character, and their walk with the Lord. We want children who can read well, think clearly, write confidently, pray with courage, and stand firm in a world that will challenge what they believe.
              </p>
              <div className="proof-rows">
                <div className="proof-row">Children are known by name — not lost in a crowd</div>
                <div className="proof-row">Faith is woven into every subject, not added as an afterthought</div>
                <div className="proof-row">Students advance when they&apos;re ready, not when the calendar says so</div>
                <div className="proof-row">Parents stay central — The Flame comes alongside, not in front of the home</div>
              </div>
            </div>
            <div className="split__media reveal reveal-delay-2">
              <ImagePlaceholder label="Photo: Students learning together, community moment" aspectRatio="tall" />
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY STATEMENT */}
      <section className="section--cream2" style={{ padding: '72px 0' }}>
        <div className="container--narrow" style={{ textAlign: 'center' }}>
          <span className="eyebrow" style={{ display: 'block', textAlign: 'center', justifyContent: 'center' }}>
            Join the Community
          </span>
          <h2 style={{ marginBottom: '20px' }}>This Is Why The Flame Exists.</h2>
          <p className="lead" style={{ marginBottom: '8px' }}>
            To help fan into flame the gifts God has already placed inside your child.
          </p>
          <p style={{ marginBottom: '32px', color: 'var(--mid)' }}>
            We exist because a group of families believed children deserved more than a good education. They deserved a community that would call out the fire inside them. That&apos;s still what we&apos;re building — one family at a time.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section--dark" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="split" style={{ gap: '60px', alignItems: 'center' }}>
            <div className="reveal">
              <span className="eyebrow">Ready to Take the Next Step?</span>
              <h2 style={{ marginBottom: '16px' }}>We&apos;d Love to Meet Your Family.</h2>
              <p style={{ color: 'rgba(255,255,255,.65)', marginBottom: '28px' }}>
                Whether you&apos;re new to homeschooling or searching for something deeper — The Flame may be exactly where God is leading you.
              </p>
              <div className="btn-group">
                <Link href="/admissions" className="btn btn--primary">Begin Admissions</Link>
                <Link href="/programs" className="link-arrow" style={{ color: 'rgba(255,255,255,.6)' }}>Explore Programs</Link>
              </div>
            </div>
            <div className="reveal reveal-delay-1">
              <ul className="check-list">
                <li style={{ color: 'rgba(255,255,255,.8)' }}>Rooted in Scripture, prayer, and the active presence of the Holy Spirit</li>
                <li style={{ color: 'rgba(255,255,255,.8)' }}>Programs from Kindergarten through high school discipleship</li>
                <li style={{ color: 'rgba(255,255,255,.8)' }}>Mastery-based learning that develops the whole child — mind, spirit, and character</li>
                <li style={{ color: 'rgba(255,255,255,.8)' }}><strong style={{ color: 'white' }}>Parents lead the home. We enrich the journey.</strong></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
