interface SectionHeaderProps {
  eyebrow:   string;
  heading:   string;
  lead?:     string;
  align?:    'left' | 'center';
  headingAs?: 'h1' | 'h2' | 'h3';
  maxWidth?: string;
  style?:    React.CSSProperties;
}

export default function SectionHeader({
  eyebrow,
  heading,
  lead,
  align    = 'left',
  headingAs: Tag = 'h2',
  maxWidth = '560px',
  style,
}: SectionHeaderProps) {
  const centered = align === 'center';

  return (
    <div
      className="reveal"
      style={{
        maxWidth,
        marginBottom: '32px',
        ...(centered && { margin: '0 auto 48px', textAlign: 'center' }),
        ...style,
      }}
    >
      <span
        className="eyebrow"
        style={centered ? { display: 'block', textAlign: 'center', justifyContent: 'center' } : undefined}
      >
        {eyebrow}
      </span>
      <Tag style={{ marginBottom: lead ? '16px' : undefined }}>{heading}</Tag>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}
