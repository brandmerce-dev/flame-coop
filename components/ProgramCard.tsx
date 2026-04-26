interface ProgramCardProps {
  name:        string;
  level:       string;
  ages:        string;
  theme:       string;
  description: string;
  variant?:    'elementary' | 'discipleship';
  badgeLabel?: React.ReactNode;
}

export default function ProgramCard({
  name,
  level,
  ages,
  theme,
  description,
  variant = 'elementary',
  badgeLabel,
}: ProgramCardProps) {
  return (
    <div className={`prog-card${variant === 'discipleship' ? ' prog-card--discipleship' : ''}`}>
      <div className="prog-card__badge">
        <div className="prog-card__flame">{badgeLabel ?? name}</div>
        <div className="prog-card__level">{level}</div>
        <div className="prog-card__ages">{ages}</div>
      </div>
      <div className="prog-card__body">
        <div className="prog-card__theme">{theme}</div>
        <p className="prog-card__text">{description}</p>
      </div>
    </div>
  );
}
