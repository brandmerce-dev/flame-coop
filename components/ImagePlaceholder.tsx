import Image from 'next/image';

interface ImagePlaceholderProps {
  label: string;
  src?: string;
  alt?: string;
  aspectRatio?: 'tall' | 'wide' | 'square';
  dark?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function ImagePlaceholder({
  label,
  src,
  alt,
  aspectRatio = 'wide',
  dark = false,
  className = '',
  style,
}: ImagePlaceholderProps) {
  const aspectClass = {
    tall:   'img-placeholder--tall',
    wide:   'img-placeholder--wide',
    square: 'img-placeholder--square',
  }[aspectRatio];

  const darkClass = dark ? 'img-placeholder--dark' : '';

  if (src) {
    return (
      <div
        className={`img-placeholder ${aspectClass} ${className}`}
        style={{ position: 'relative', ...style }}
      >
        <Image
          src={src}
          alt={alt || label}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    );
  }

  return (
    <div
      className={`img-placeholder ${aspectClass} ${darkClass} ${className}`}
      data-label={label}
      style={style}
    />
  );
}
