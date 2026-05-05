export const revalidate = 0; // always fetch fresh from Sanity

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import Hero from '@/components/Hero';
import { getBeliefs } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';

const defaultBeliefs = [
  'The Bible is the inspired, infallible, and authoritative Word of God — our ultimate guide for faith, learning, and life.',
  'There is one God, eternally existing in three persons: Father, Son, and Holy Spirit.',
  'Jesus Christ was born of a virgin, lived a sinless life, died on the cross for our sins, and rose again as the Savior of the world.',
  'Salvation comes through faith in Christ alone — by grace, not by works.',
  'The Holy Spirit indwells every believer, empowering them to live and walk in God\'s purpose.',
  'We are called to fulfill the Great Commission by making disciples of all nations.',
  'Every believer is given spiritual gifts to serve others and build up the body of Christ.',
  'Life is a sacred gift from God, to be honored from conception to natural end.',
  'Marriage is ordained by God as a covenant between one man and one woman.',
];

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getBeliefs();
  return {
    title:       cms?.seoTitle       ?? 'Our Beliefs',
    description: cms?.seoDescription ?? 'Our faith in Jesus Christ is not the backdrop to our education. It is the foundation. Every program, class, and conversation is shaped by what we believe.',
    openGraph: {
      title:       cms?.seoTitle       ?? 'Our Beliefs | The Flame Christian Co-op',
      description: cms?.seoDescription ?? 'Our faith in Jesus Christ is not the backdrop to our education. It is the foundation.',
    },
    alternates: { canonical: 'https://theflame.org/beliefs' },
  };
}

export default async function BeliefsPage() {
  const cms = await getBeliefs();

  const heroStyle    = (cms?.heroStyle as 'cream' | 'image' | 'none' | 'dark') ?? 'dark'
  const heroEyebrow  = cms?.heroEyebrow  ?? 'Our Beliefs'
  const heroImageSrc = cms?.heroImage ? urlFor(cms.heroImage).width(2400).url() : undefined
  const heroImageAlt = cms?.heroImageAlt ?? undefined

  const heroHeadline       = cms?.heroHeadline       ?? 'Rooted in God\'s Word. Alive in His Spirit.';
  const heroLead           = cms?.heroLead           ?? 'Our faith in Jesus Christ is not the backdrop to our education. It is the foundation. Every program, every class, every conversation, and every relationship is shaped by what we believe.';
  const statementTitle     = cms?.statementTitle     ?? 'What We Believe — Said Plainly.';
  const statementIntro     = cms?.statementIntro     ?? 'Not a checklist. Living convictions that shape how we teach, disciple, correct, and love the families in our community.';
  const beliefsList        = cms?.beliefsList?.length ? cms.beliefsList : defaultBeliefs;
  const faithClassroomTitle = cms?.faithClassroomTitle ?? 'What We Believe Shapes What We Teach.';
  const formationTitle     = cms?.formationTitle     ?? 'We Are Forming More Than Students.';
  const formationQuote     = cms?.formationQuote     ?? 'The world will ask your children hard questions. We want them to be ready.';
  const formationBody      = cms?.formationBody      ?? 'Who are you? What do you believe? What will you do when your faith is challenged? At The Flame, we want children to know Scripture, hear God\'s voice, pray for others, serve with humility, and walk with the quiet confidence of someone who knows exactly who they are in Christ. Not just academically prepared. Formed.';

  const statementImageSrc  = cms?.statementImage ? urlFor(cms.statementImage).width(1200).url() : undefined;
  const statementImageAlt2 = cms?.statementImageAlt ?? 'Students in prayer or quiet Bible moment';
  const faithImageSrc      = cms?.faithClassroomImage ? urlFor(cms.faithClassroomImage).width(1200).url() : undefined;
  const faithImageAlt      = cms?.faithClassroomImageAlt ?? 'Student in small group discussion';

  type PtBlock = { _type?: string; children?: { text?: string }[] };
  const faithParagraphs: string[] | null = Array.isArray(cms?.faithClassroomBody)
    ? (cms!.faithClassroomBody as PtBlock[])
        .filter((b) => b?._type === 'block')
        .map((b) => (b.children ?? []).map((c) => c?.text ?? '').join(''))
        .filter((s) => s.trim().length > 0)
    : null;

  return (
    <>
      {/* HERO */}
      {heroStyle === 'image' ? (
        <Hero eyebrow={heroEyebrow} headline={heroHeadline} subheadline={heroLead} imageSrc={heroImageSrc} imageAlt={heroImageAlt} />
      ) : heroStyle === 'dark' ? (
        <Hero eyebrow={heroEyebrow} headline={heroHeadline} subheadline={heroLead} />
      ) : heroStyle === 'cream' ? (
        <section style={{ padding: '80px 0 64px', background: 'var(--cream2)' }}>
          <div className="container--narrow" style={{ textAlign: 'center' }}>
            <span className="eyebrow" style={{ display: 'block', textAlign: 'center', justifyContent: 'center' }}>{heroEyebrow}</span>
            <h1 style={{ marginBottom: '20px' }}>{heroHeadline}</h1>
            <p className="lead">{heroLead}</p>
          </div>
        </section>
      ) : null}

      {/* STATEMENT OF FAITH */}
      <section style={{ padding: 'var(--section-v) 0' }}>
        <div className="container">
          <div className="split reveal">
            <div className="split__body">
              <span className="eyebrow">Statement of Faith</span>
              <h2 style={{ marginBottom: '20px' }}>{statementTitle}</h2>
              <p style={{ marginBottom: '28px' }}>{statementIntro}</p>
              <ul className="belief-list">
                {beliefsList.map((b: string, i: number) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
            <div className="split__media reveal reveal-delay-1">
              {statementImageSrc ? (
                <div style={{ position: 'relative', width: '100%', aspectRatio: '3 / 4', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                  <Image src={statementImageSrc} alt={statementImageAlt2} fill sizes="(max-width: 768px) 100vw, 40vw" style={{ objectFit: 'cover' }} />
                </div>
              ) : (
                <ImagePlaceholder label="Photo: Students in prayer or quiet Bible moment" aspectRatio="tall" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAITH IN THE CLASSROOM */}
      <section className="section--cream">
        <div className="container">
          <div className="split split--reverse reveal">
            <div className="split__body">
              <span className="eyebrow">Faith in the Classroom</span>
              <h2 style={{ marginBottom: '20px' }}>{faithClassroomTitle}</h2>
              {faithParagraphs ? (
                faithParagraphs.map((p, i) => (
                  <p key={i} style={i > 0 ? { marginTop: '16px' } : undefined}>{p}</p>
                ))
              ) : (
                <>
                  <p>
                    We don&apos;t separate faith from learning — we never have. When children discover how the natural world works, we point to the God who designed it. When they study history, we trace the faithfulness and sovereignty of God through it. When they learn to read, write, reason, and debate, we believe they&apos;re being equipped to carry truth into the world.
                  </p>
                  <p style={{ marginTop: '16px' }}>
                    Our discipleship programs are designed to do exactly what their names suggest: prepare children to follow Jesus not just inside the walls of The Flame, but in every room they walk into for the rest of their lives.
                  </p>
                </>
              )}
            </div>
            <div className="split__media reveal reveal-delay-1">
              {faithImageSrc ? (
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                  <Image src={faithImageSrc} alt={faithImageAlt} fill sizes="(max-width: 768px) 100vw, 40vw" style={{ objectFit: 'cover' }} />
                </div>
              ) : (
                <ImagePlaceholder label="Photo: Student in small group discussion" aspectRatio="wide" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FORMATION OVER PERFORMANCE */}
      <section className="section--dark" style={{ padding: '80px 0' }}>
        <div className="container--narrow" style={{ textAlign: 'center' }}>
          <span className="eyebrow" style={{ display: 'block', textAlign: 'center', justifyContent: 'center' }}>
            Formation Over Performance
          </span>
          <h2 style={{ marginBottom: '20px' }}>{formationTitle}</h2>
          <p style={{ color: 'rgba(255,255,255,.65)', fontSize: '1.1rem', fontStyle: 'italic', fontFamily: 'var(--font-heading)', marginBottom: '24px' }}>
            {formationQuote}
          </p>
          <p style={{ color: 'rgba(255,255,255,.65)' }}>{formationBody}</p>
          <div style={{ marginTop: '36px' }}>
            <Link href="/programs" className="btn btn--outline-white">Explore Our Programs</Link>
          </div>
        </div>
      </section>
    </>
  );
}
