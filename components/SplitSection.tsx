import ImagePlaceholder from './ImagePlaceholder';

interface SplitSectionProps {
  eyebrow?:       string;
  heading:        React.ReactNode;
  children:       React.ReactNode;
  imageLabel:     string;
  imageSrc?:      string;
  imageAlt?:      string;
  imagePosition?: 'left' | 'right';
  imageRatio?:    'tall' | 'wide' | 'square';
  ratio?:         'equal' | '60' | '40';
  background?:    string;
  className?:     string;
}

export default function SplitSection({
  eyebrow,
  heading,
  children,
  imageLabel,
  imageSrc,
  imageAlt,
  imagePosition = 'left',
  imageRatio    = 'tall',
  ratio         = 'equal',
  background,
  className = '',
}: SplitSectionProps) {
  const gridClass =
    ratio === '60' ? 'split split--60' :
    ratio === '40' ? 'split split--40' :
    'split';

  const reverseClass = imagePosition === 'right' ? ' split--reverse' : '';

  return (
    <section style={background ? { background, padding: 'var(--section-v) 0' } : undefined} className={className}>
      <div className="container">
        <div className={`${gridClass}${reverseClass} reveal`}>
          <div className="split__media">
            <ImagePlaceholder label={imageLabel} src={imageSrc} alt={imageAlt} aspectRatio={imageRatio} />
          </div>
          <div className="split__body reveal reveal-delay-1">
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <h2 style={{ marginBottom: '20px' }}>{heading}</h2>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
