import Image from 'next/image';
import Link from 'next/link';

interface HeroButton {
  label:    string;
  href:     string;
  variant:  'primary' | 'outline-white';
}

interface HeroProps {
  eyebrow?:    string;
  headline:    React.ReactNode;
  subheadline: string;
  trustLine?:  string;
  buttons?:    HeroButton[];
  imageSrc?:   string;
  imageAlt?:   string;
}

export default function Hero({
  eyebrow,
  headline,
  subheadline,
  trustLine,
  buttons = [],
  imageSrc,
  imageAlt = 'Hero background',
}: HeroProps) {
  return (
    <section className="hero">
      {/* Background */}
      <div
        style={{
          position: 'absolute',
          inset:    0,
          zIndex:   0,
          background: imageSrc
            ? undefined
            : 'linear-gradient(160deg,#2C2820 0%,#1A1512 60%,#0E0C0A 100%)',
        }}
      >
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            style={{ objectFit: 'cover' }}
            priority
            sizes="100vw"
          />
        )}
        {!imageSrc && (
          <div
            style={{
              position:        'absolute',
              inset:           0,
              display:         'flex',
              alignItems:      'center',
              justifyContent:  'center',
              color:           'rgba(166,146,100,.25)',
              fontSize:        '.65rem',
              letterSpacing:   '.2em',
              textTransform:   'uppercase',
              fontWeight:      500,
            }}
          >
            Photo: Real Flame community moment
          </div>
        )}
        <div className="hero__overlay" />
      </div>

      {/* Content */}
      <div className="container hero__content">
        <div
          style={{
            width:     '60%',
            maxWidth:  '860px',
            margin:    '0 auto',
            textAlign: 'center',
          }}
          className="hero-content-inner"
        >
          {eyebrow && (
            <div
              style={{
                fontFamily:    'var(--font-body)',
                fontSize:      '.65rem',
                fontWeight:    600,
                letterSpacing: '.3em',
                textTransform: 'uppercase',
                color:         'var(--gold-light)',
                display:       'flex',
                alignItems:    'center',
                justifyContent:'center',
                gap:           '10px',
                marginBottom:  '24px',
              }}
            >
              <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--gold-light)' }} />
              {eyebrow}
            </div>
          )}

          <h1 style={{ color: '#FFFFFF', marginBottom: '24px', textShadow: '0 2px 20px rgba(0,0,0,.3)' }}>
            {headline}
          </h1>

          <p
            style={{
              color:        'rgba(255,255,255,.9)',
              fontSize:     '1.15rem',
              maxWidth:     '540px',
              lineHeight:   '1.75',
              fontWeight:   400,
              margin:       '0 auto',
              marginBottom: trustLine ? '8px' : '40px',
            }}
          >
            {subheadline}
          </p>

          {trustLine && (
            <p
              style={{
                fontSize:      '.78rem',
                color:         'rgba(255,255,255,.45)',
                letterSpacing: '.06em',
                textTransform: 'uppercase',
                fontWeight:    400,
                margin:        '8px auto 40px',
              }}
            >
              {trustLine}
            </p>
          )}

          {buttons.length > 0 && (
            <div className="btn-group" style={{ justifyContent: 'center' }}>
              {buttons.map((b) => (
                <Link key={b.href} href={b.href} className={`btn btn--${b.variant}`}>
                  {b.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .hero-content-inner { width: 75% !important; } }
        @media (max-width: 768px)  { .hero-content-inner { width: 90% !important; } }
        @media (max-width: 480px)  { .hero-content-inner { width: 100% !important; } }
      `}</style>
    </section>
  );
}
