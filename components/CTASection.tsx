import Link from 'next/link';

interface CTAButton {
  label:   string;
  href:    string;
  variant: 'primary' | 'outline-white' | 'link-arrow';
}

interface CTASectionProps {
  eyebrow?:   string;
  heading:    React.ReactNode;
  subheading?: string;
  bullets?:   React.ReactNode[];
  buttons?:   CTAButton[];
  centered?:  boolean;
}

export default function CTASection({
  eyebrow,
  heading,
  subheading,
  bullets,
  buttons = [],
  centered = false,
}: CTASectionProps) {
  if (centered) {
    return (
      <section className="section--dark" style={{ padding: '80px 0' }}>
        <div className="container--narrow" style={{ textAlign: 'center' }}>
          {eyebrow && (
            <span
              className="eyebrow"
              style={{ display: 'block', textAlign: 'center', justifyContent: 'center' }}
            >
              {eyebrow}
            </span>
          )}
          <h2 style={{ marginBottom: '20px' }}>{heading}</h2>
          {subheading && (
            <p style={{ color: 'rgba(255,255,255,.65)', marginBottom: '36px' }}>{subheading}</p>
          )}
          {buttons.length > 0 && (
            <div className="btn-group" style={{ justifyContent: 'center' }}>
              {buttons.map((b, i) =>
                b.variant === 'link-arrow' ? (
                  <Link key={i} href={b.href} className="link-arrow" style={{ color: 'rgba(255,255,255,.6)' }}>
                    {b.label}
                  </Link>
                ) : (
                  <Link key={i} href={b.href} className={`btn btn--${b.variant}`}>
                    {b.label}
                  </Link>
                )
              )}
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="section--dark" style={{ padding: '80px 0' }}>
      <div className="container">
        <div className="split" style={{ gap: '60px', alignItems: 'center' }}>
          <div className="reveal">
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <h2 style={{ marginBottom: '16px' }}>{heading}</h2>
            {subheading && (
              <p style={{ color: 'rgba(255,255,255,.65)', marginBottom: '28px' }}>{subheading}</p>
            )}
            {buttons.length > 0 && (
              <div className="btn-group">
                {buttons.map((b, i) =>
                  b.variant === 'link-arrow' ? (
                    <Link key={i} href={b.href} className="link-arrow" style={{ color: 'rgba(255,255,255,.6)' }}>
                      {b.label}
                    </Link>
                  ) : (
                    <Link key={i} href={b.href} className={`btn btn--${b.variant}`}>
                      {b.label}
                    </Link>
                  )
                )}
              </div>
            )}
          </div>

          {bullets && bullets.length > 0 && (
            <div className="reveal reveal-delay-1">
              <ul className="check-list">
                {bullets.map((b, i) => (
                  <li key={i} style={{ color: 'rgba(255,255,255,.8)' }}>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
