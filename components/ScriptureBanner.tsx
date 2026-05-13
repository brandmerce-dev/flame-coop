interface ScriptureBannerProps {
  reference?: string;
  quote:      string;
  citation:   string;
}

export default function ScriptureBanner({ reference, quote, citation }: ScriptureBannerProps) {
  return (
    <blockquote className="scripture" role="region" aria-label={`Scripture: ${citation}`}>
      <div
        style={{
          maxWidth:   '1060px',
          margin:     '0 auto',
          padding:    '0 32px',
          textAlign:  'center',
          position:   'relative',
          zIndex:     1,
        }}
      >
        {reference && (
          <span
            style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '.65rem',
              letterSpacing: '.25em',
              textTransform: 'uppercase',
              color:         'var(--gold)',
              fontWeight:    600,
              marginBottom:  '32px',
              display:       'block',
            }}
          >
            {reference}
          </span>
        )}
        <p
          style={{
            fontFamily:    'var(--font-heading)',
            fontSize:      'clamp(1.4rem, 3vw, 1.9rem)',
            fontWeight:    400,
            fontStyle:     'italic',
            color:         'rgba(255,255,255,.92)',
            lineHeight:    1.7,
            letterSpacing: '.01em',
          }}
        >
          {quote}
        </p>
        <cite
          style={{
            fontFamily:    'var(--font-body)',
            fontSize:      '.75rem',
            letterSpacing: '.2em',
            textTransform: 'uppercase',
            color:         'var(--gold)',
            fontWeight:    600,
            marginTop:     '32px',
            display:       'block',
            fontStyle:     'normal',
          }}
        >
          {citation}
        </cite>
      </div>
    </blockquote>
  );
}
