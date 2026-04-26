import type { Metadata } from 'next';
import Link from 'next/link';
import ImagePlaceholder from '@/components/ImagePlaceholder';

export const metadata: Metadata = {
  title: 'Our Beliefs',
  description:
    'Our faith in Jesus Christ is not the backdrop to our education. It is the foundation. Every program, class, and conversation is shaped by what we believe.',
  openGraph: {
    title:       'Our Beliefs | The Flame Christian Co-op',
    description: 'Our faith in Jesus Christ is not the backdrop to our education. It is the foundation.',
  },
  alternates: { canonical: 'https://theflame.org/beliefs' },
};

const beliefs = [
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

export default function BeliefsPage() {
  return (
    <>
      {/* HERO */}
      <section style={{ padding: '80px 0 64px', background: 'var(--obsidian)' }}>
        <div className="container--narrow" style={{ textAlign: 'center' }}>
          <span
            className="eyebrow"
            style={{ display: 'block', textAlign: 'center', justifyContent: 'center', color: 'var(--gold-light)' }}
          >
            Our Beliefs
          </span>
          <h1 style={{ color: '#FFFFFF', marginBottom: '20px' }}>
            Rooted in God&apos;s Word.<br />Alive in His Spirit.
          </h1>
          <p style={{ color: 'rgba(255,255,255,.65)', fontSize: '1.1rem', lineHeight: '1.85', fontWeight: 300 }}>
            Our faith in Jesus Christ is not the backdrop to our education. It is the foundation. Every program, every class, every conversation, and every relationship is shaped by what we believe.
          </p>
        </div>
      </section>

      {/* STATEMENT OF FAITH */}
      <section style={{ padding: 'var(--section-v) 0' }}>
        <div className="container">
          <div className="split reveal">
            <div className="split__body">
              <span className="eyebrow">Statement of Faith</span>
              <h2 style={{ marginBottom: '20px' }}>What We Believe — Said Plainly.</h2>
              <p style={{ marginBottom: '28px' }}>
                Not a checklist. Living convictions that shape how we teach, disciple, correct, and love the families in our community.
              </p>
              <ul className="belief-list">
                {beliefs.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
            <div className="split__media reveal reveal-delay-1">
              <ImagePlaceholder label="Photo: Students in prayer or quiet Bible moment" aspectRatio="tall" />
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
              <h2 style={{ marginBottom: '20px' }}>What We Believe Shapes What We Teach.</h2>
              <p>
                We don&apos;t separate faith from learning — we never have. When children discover how the natural world works, we point to the God who designed it. When they study history, we trace the faithfulness and sovereignty of God through it. When they learn to read, write, reason, and debate, we believe they&apos;re being equipped to carry truth into the world.
              </p>
              <p style={{ marginTop: '16px' }}>
                Our discipleship programs are designed to do exactly what their names suggest: prepare children to follow Jesus not just inside the walls of The Flame, but in every room they walk into for the rest of their lives.
              </p>
            </div>
            <div className="split__media reveal reveal-delay-1">
              <ImagePlaceholder label="Photo: Student in small group discussion" aspectRatio="wide" />
            </div>
          </div>
        </div>
      </section>

      {/* FORMATION OVER PERFORMANCE */}
      <section className="section--dark" style={{ padding: '80px 0' }}>
        <div className="container--narrow" style={{ textAlign: 'center' }}>
          <span
            className="eyebrow"
            style={{ display: 'block', textAlign: 'center', justifyContent: 'center' }}
          >
            Formation Over Performance
          </span>
          <h2 style={{ marginBottom: '20px' }}>We Are Forming More Than Students.</h2>
          <p style={{ color: 'rgba(255,255,255,.65)', fontSize: '1.1rem', fontStyle: 'italic', fontFamily: 'var(--font-heading)', marginBottom: '24px' }}>
            The world will ask your children hard questions. We want them to be ready.
          </p>
          <p style={{ color: 'rgba(255,255,255,.65)' }}>
            Who are you? What do you believe? What will you do when your faith is challenged? At The Flame, we want children to know Scripture, hear God&apos;s voice, pray for others, serve with humility, and walk with the quiet confidence of someone who knows exactly who they are in Christ. Not just academically prepared. Formed.
          </p>
          <div style={{ marginTop: '36px' }}>
            <Link href="/programs" className="btn btn--outline-white">Explore Our Programs</Link>
          </div>
        </div>
      </section>
    </>
  );
}
