import Link from 'next/link';

interface Tile {
  badge: React.ReactNode;
  name:  string;
  ages:  string;
  line:  string;
}

interface ProgramTilesProps {
  eyebrow?:  string;
  heading:   React.ReactNode;
  subheading?: string;
  tiles:     Tile[];
  viewAllHref?: string;
}

export default function ProgramTiles({ eyebrow, heading, subheading, tiles, viewAllHref }: ProgramTilesProps) {
  return (
    <section className="section--cream">
      <div className="container">
        <div className="reveal" style={{ maxWidth: '600px', marginBottom: '8px' }}>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h2 style={{ marginBottom: '16px' }}>{heading}</h2>
          {subheading && <p className="lead">{subheading}</p>}
        </div>
        <div className="program-tiles reveal">
          {tiles.map((tile, i) => (
            <div key={i} className="program-tile">
              <div className="program-tile__badge">{tile.badge}</div>
              <div className="program-tile__content">
                <div className="program-tile__name">{tile.name}</div>
                <div className="program-tile__ages">{tile.ages}</div>
                <div className="program-tile__line">{tile.line}</div>
              </div>
            </div>
          ))}
        </div>
        {viewAllHref && (
          <div style={{ marginTop: '32px' }}>
            <Link href={viewAllHref} className="link-arrow">See All Programs</Link>
          </div>
        )}
      </div>
    </section>
  );
}
