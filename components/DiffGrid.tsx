interface DiffCard {
  title: string;
  text:  string;
}

interface DiffGridProps {
  eyebrow?:    string;
  heading:     React.ReactNode;
  subheading?: string;
  cards:       DiffCard[];
}

export default function DiffGrid({ eyebrow, heading, subheading, cards }: DiffGridProps) {
  return (
    <>
      <div className="reveal" style={{ maxWidth: '560px', marginBottom: '40px' }}>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2 style={{ marginBottom: '16px' }}>{heading}</h2>
        {subheading && <p>{subheading}</p>}
      </div>
      <div className="diff-grid reveal">
        {cards.map((card, i) => (
          <div key={i} className="diff-card">
            <div className="diff-card__title">{card.title}</div>
            <p className="diff-card__text">{card.text}</p>
          </div>
        ))}
      </div>
    </>
  );
}
