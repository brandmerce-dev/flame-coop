interface Card {
  icon:  React.ReactNode;
  title: string;
  body:  string;
}

interface ThreeCardRowProps {
  eyebrow?:   string;
  heading:    React.ReactNode;
  subheading?: string;
  cards:      Card[];
}

export default function ThreeCardRow({ eyebrow, heading, subheading, cards }: ThreeCardRowProps) {
  return (
    <section className="section--dark">
      <div className="container">
        <div style={{ maxWidth: '520px', marginBottom: '48px' }} className="reveal">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h2 style={{ marginBottom: '16px' }}>{heading}</h2>
          {subheading && (
            <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '1rem' }}>{subheading}</p>
          )}
        </div>
        <div className="cards3 reveal">
          {cards.map((card, i) => (
            <div key={i} className="card3">
              <div className="card3__icon">{card.icon}</div>
              <div className="card3__title">{card.title}</div>
              <p className="card3__body">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
