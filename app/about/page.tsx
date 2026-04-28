export const revalidate = 60;

import type { Metadata } from 'next';
import Image from 'next/image';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import { getAbout } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';

const defaultDiffCards = [
  { title: 'Developmental Placement',              text: 'Children are assessed and placed where they are developmentally ready — not sorted by birthday.' },
  { title: 'Mastery-Based Progress',               text: 'Each level runs a two-year cycled curriculum. Students move forward on solid ground, not because the calendar flipped.' },
  { title: 'Biblical Worldview Through Everything',text: "Faith isn't a class on the schedule. It's the lens for every subject, every conversation, every day." },
  { title: 'Experiential Learning',                text: 'Students build, draw, discuss, and create — reaching visual, auditory, tactile, and kinesthetic learners in every unit.' },
  { title: 'Differentiated Core Skills',           text: "Math and reading are taught with attention to how each child actually learns — because mastery looks different for every kid." },
  { title: 'Spiritual Formation at the Core',      text: "Every level is designed to help children know God more deeply and understand who they are in Christ — not as a bonus, but as the foundation." },
];

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getAbout();
  return {
    title:       cms?.seoTitle       ?? 'About',
    description: cms?.seoDescription ?? 'The Flame exists because homeschool families believed children deserved more than a good education — they deserved a community that would call out the fire God placed inside them.',
    openGraph: {
      title:       cms?.seoTitle       ?? 'About The Flame | Built by Families. Fueled by Faith.',
      description: cms?.seoDescription ?? 'The Flame exists because homeschool families believed children deserved more than a good education.',
    },
    alternates: { canonical: 'https://theflame.org/about' },
  };
}

export default async function AboutPage() {
  const cms = await getAbout();

  const heroHeadline = cms?.heroHeadline ?? 'Built by Families. Fueled by Faith. On Fire for Jesus.';
  const heroLead     = cms?.heroLead     ?? 'The Flame exists because homeschool families believed children deserved more than a good education — they deserved a community that would call out the fire God placed inside them.';
  const missionText  = cms?.missionText  ?? "To provide a Christ-centered community committed to stoking the fire of the Holy Spirit within the next generation through real-life educational encounters with God’s glory and love.";
  const visionText   = cms?.visionText   ?? 'To raise up Kingdom leaders who are on fire for Jesus — children who know who they are, can defend what they believe, and are equipped to impact the world with His love.';
  const modelText    = cms?.modelText    ?? 'The Flame is a cooperative — families doing life and learning together. Parents remain the primary educators. Our tutors and community provide structure, enrichment, discipleship, and the friendships that make homeschooling feel less lonely and a lot more alive.';

  const directors = cms?.directors ?? [
    {
      name: 'Jessica Lubrano', titleText: 'Co-Director & Curriculum Lead',
      headshot: null, headshotAlt: 'Jessica Lubrano',
      bio:  "Jessica is a co-director of The Flame and one of the hearts behind its curriculum and family-centered vision. Her conviction is straightforward: children need to know who they are in Christ before the world gets to tell them who they aren't.",
      bio2: 'At The Flame, she shapes the learning environment, program structure, and spiritual direction of the co-op. She wants families supported, children known, and students equipped to walk boldly with Jesus.',
    },
    {
      name: 'Kristy Miller', titleText: 'Co-Director',
      headshot: null, headshotAlt: 'Kristy Miller',
      bio:  "Kristy serves as co-director of The Flame, bringing a deep love for homeschool families, discipleship, and the formation of the next generation. Her heart is to help children grow in truth, confidence, and identity as they learn what it means to follow Jesus in everyday life.",
      bio2: 'Through her leadership, families feel welcomed, supported, and connected to the mission. She believes education should shape the whole child — mind, heart, character, and faith.',
    },
  ];

  return (
    <>
      {/* HERO */}
      <section style={{ padding: '80px 0 64px', background: 'var(--cream2)' }}>
        <div className="container--narrow" style={{ textAlign: 'center' }}>
          <span className="eyebrow" style={{ display: 'block', textAlign: 'center', justifyContent: 'center' }}>
            About The Flame
          </span>
          <h1 style={{ marginBottom: '20px' }}>{heroHeadline}</h1>
          <p className="lead">{heroLead}</p>
        </div>
      </section>

      {/* OUR STORY */}
      <section style={{ padding: 'var(--section-v) 0' }}>
        <div className="container">
          <div className="split split--60 reveal">
            <div className="split__body">
              <span className="eyebrow">Our Story</span>
              <h2 style={{ marginBottom: '20px' }}>How The Flame Was Born.</h2>
              {cms?.storyBody ? (
                <p>{cms.storyBody}</p>
              ) : (
                <>
                  <p>The Flame started the way most Spirit-led things do — not with a business plan, but with a burden.</p>
                  <p>A small group of homeschool families in the St. Augustine area shared a growing conviction: their children needed a community where faith wasn&apos;t something tacked onto the school day. It needed to be the school day. So they built one.</p>
                  <p>The founding team brought together a licensed speech-language pathologist, a curriculum specialist and certified teacher, a licensed mental health counselor, spiritual counselors, and homeschooling mothers. Every program they built carries that fingerprint — grounded, developmental, and driven by the Word.</p>
                  <p style={{ fontStyle: 'italic', color: 'var(--gold)', fontFamily: 'var(--font-heading)', fontSize: '1.05rem', marginTop: '8px' }}>
                    The name wasn&apos;t accidental. 2 Timothy 1:6 — &ldquo;fan into flame the gift of God.&rdquo; That&apos;s the whole mission, right there.
                  </p>
                </>
              )}
            </div>
            <div className="split__media reveal reveal-delay-1">
              <ImagePlaceholder label="Photo: Real Flame community candid" aspectRatio="tall" />
            </div>
          </div>
        </div>
      </section>

      {/* MISSION · VISION · MODEL */}
      <section className="section--cream">
        <div className="container">
          <div className="reveal" style={{ maxWidth: '560px', marginBottom: '32px' }}>
            <span className="eyebrow">Mission · Vision · Model</span>
            <h2>We Know Exactly Why We&apos;re Here.</h2>
          </div>
          <div className="mvv-grid reveal">
            <div className="mvv-card">
              <span className="mvv-card__label">Our Mission</span>
              <p className="mvv-card__text">{missionText}</p>
            </div>
            <div className="mvv-card">
              <span className="mvv-card__label">Our Vision</span>
              <p className="mvv-card__text">{visionText}</p>
            </div>
            <div className="mvv-card">
              <span className="mvv-card__label">How We Work</span>
              <p className="mvv-card__text">{modelText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT MAKES US DIFFERENT */}
      <section style={{ padding: 'var(--section-v) 0' }}>
        <div className="container">
          <div className="reveal" style={{ maxWidth: '560px', marginBottom: '40px' }}>
            <span className="eyebrow">What Makes Us Different</span>
            <h2 style={{ marginBottom: '16px' }}>An Education Built Around Your Child — Not Just a Calendar.</h2>
            <p>Most schools sort children by age and move them forward because the year ended. We don&apos;t.</p>
          </div>
          <div className="diff-grid reveal">
            {defaultDiffCards.map((card, i) => (
              <div key={i} className="diff-card">
                <div className="diff-card__title">{card.title}</div>
                <p className="diff-card__text">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEET THE DIRECTORS */}
      <section className="section--cream2">
        <div className="container">
          <div className="reveal" style={{ maxWidth: '520px', marginBottom: '40px' }}>
            <span className="eyebrow">Meet the Directors</span>
            <h2>A Heart for Families, Faith, and the Next Generation.</h2>
          </div>
          <div className="director-cards reveal">
            {directors.map((d, i) => (
              <div key={i} className="director-card">
                <div className="director-card__photo">
                  {d.headshot ? (
                    <Image
                      src={urlFor(d.headshot).width(400).height(400).url()}
                      alt={d.headshotAlt ?? d.name}
                      width={400}
                      height={400}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    `Photo: ${d.name} headshot`
                  )}
                </div>
                <div className="director-card__body">
                  <div className="director-card__name">{d.name}</div>
                  <div className="director-card__title-text">{d.titleText}</div>
                  {d.bio  && <p className="director-card__bio">{d.bio}</p>}
                  {d.bio2 && <p className="director-card__bio" style={{ marginTop: '10px' }}>{d.bio2}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
