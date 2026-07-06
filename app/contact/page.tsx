export const revalidate = 0; // always fetch fresh from Sanity

import type { Metadata } from 'next';
import { getContactPage, getSiteSettings } from '@/sanity/lib/queries';
import { SITE_URL } from '@/lib/site-config';
import RequestInfoButton from '@/components/RequestInfoButton';

const DEFAULT_HEADING = 'Get in Touch.';
const DEFAULT_LEAD =
  "Whether you're just beginning to explore Christ-centered education or you're ready to take the next step, we'd love to hear from you. Ask us anything — about our programs, the admissions process, or what an ordinary day at The Flame actually feels like. A real person from our community will get back to you.";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title:       'Contact',
    description: 'Reach The Flame Christian Co-op — email, phone, and visit information, plus a request-info form for families exploring our St. Augustine homeschool cooperative.',
    openGraph: {
      title:       'Contact | The Flame Christian Co-op',
      description: 'Get in touch with The Flame Christian Co-op.',
    },
    alternates: { canonical: `${SITE_URL}/contact` },
  };
}

// Build a Google Maps directions link from a free-form address string.
function directionsHref(address: string) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
}

// Normalize a display phone (e.g. "(NNN) NNN-NNNN") into a tel: value (+1XXXXXXXXXX).
function telHref(phone: string) {
  const digits = phone.replace(/[^\d]/g, '');
  return `tel:+${digits.length === 10 ? '1' + digits : digits}`;
}

const cardStyle: React.CSSProperties = {
  background: 'var(--cream)',
  border: '1px solid var(--cream2)',
  borderRadius: '10px',
  padding: '32px 28px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const cardLabelStyle: React.CSSProperties = {
  fontSize: '.72rem',
  letterSpacing: '.12em',
  textTransform: 'uppercase',
  color: 'var(--gold-text)',
  fontWeight: 600,
};

const cardLinkStyle: React.CSSProperties = {
  color: 'var(--text)',
  textDecoration: 'none',
  fontSize: '1.05rem',
  lineHeight: 1.5,
  wordBreak: 'break-word',
};

export default async function ContactPage() {
  const [cms, settings] = await Promise.all([getContactPage(), getSiteSettings()]);

  const heading     = cms?.heading     ?? DEFAULT_HEADING;
  const lead        = cms?.lead        ?? DEFAULT_LEAD;
  const closingNote = cms?.closingNote ?? null;

  const email   = settings?.contactEmail ?? null;
  const phone   = settings?.phone        ?? null;
  const address = settings?.address      ?? null;

  return (
    <>
      {/* Header */}
      <section className="section--cream" style={{ padding: '80px 0 40px' }}>
        <div className="container--narrow" style={{ textAlign: 'center' }}>
          <span className="eyebrow" style={{ display: 'block', textAlign: 'center', justifyContent: 'center' }}>
            Contact
          </span>
          <h1 style={{ marginBottom: '20px' }}>{heading}</h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-mid)', maxWidth: '640px', margin: '0 auto' }}>
            {lead}
          </p>
        </div>
      </section>

      {/* Channel cards */}
      <section className="section--cream" style={{ padding: '0 0 60px' }}>
        <div className="container--narrow">
          <div className="contact-channels">
            {email && (
              <div style={cardStyle}>
                <span style={cardLabelStyle}>Email us</span>
                <a href={`mailto:${email}`} style={cardLinkStyle}>{email}</a>
              </div>
            )}
            {phone && (
              <div style={cardStyle}>
                <span style={cardLabelStyle}>Call us</span>
                <a href={telHref(phone)} style={cardLinkStyle}>{phone}</a>
              </div>
            )}
            {address && (
              <div style={cardStyle}>
                <span style={cardLabelStyle}>Visit us</span>
                <span style={{ ...cardLinkStyle, color: 'var(--text-mid)' }}>{address}</span>
                <a
                  href={directionsHref(address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-arrow"
                  style={{ marginTop: '4px', fontSize: '.95rem' }}
                >
                  Get directions
                </a>
              </div>
            )}
          </div>

          {closingNote && (
            <p style={{ textAlign: 'center', color: 'var(--text-mid)', marginTop: '40px', fontStyle: 'italic' }}>
              {closingNote}
            </p>
          )}
        </div>
      </section>

      {/* Request Info CTA */}
      <section className="section--dark" style={{ padding: '72px 0' }}>
        <div className="container--narrow" style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '16px' }}>Ready to take the next step?</h2>
          <p style={{ color: 'rgba(255,255,255,.7)', marginBottom: '32px', maxWidth: '560px', margin: '0 auto 32px' }}>
            Request information and we&rsquo;ll be in touch about visiting, our programs, and beginning the admissions journey.
          </p>
          <RequestInfoButton label="Request Information" />
        </div>
      </section>
    </>
  );
}
