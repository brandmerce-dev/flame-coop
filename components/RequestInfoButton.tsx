'use client';

import { openRequestInfoModal } from '@/components/RequestInfoModal';

interface RequestInfoButtonProps {
  label?:     string;
  className?: string;
}

/**
 * Opens the shared Eduweby Request-Info modal (mounted once in SiteChrome).
 * Client wrapper so server components — like /contact — can render the CTA.
 */
export default function RequestInfoButton({
  label = 'Request Information',
  className = 'btn btn--primary',
}: RequestInfoButtonProps) {
  return (
    <button type="button" className={className} onClick={openRequestInfoModal}>
      {label}
    </button>
  );
}
