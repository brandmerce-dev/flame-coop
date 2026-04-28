'use client';

import { useEffect } from 'react';

interface RequestInfoModalProps {
  open:    boolean;
  onClose: () => void;
}

const EDUWEBY_URL = 'https://eduweby.com/embed/form?tenant=flame-christian-coop';

export default function RequestInfoModal({ open, onClose }: RequestInfoModalProps) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position:        'fixed',
        inset:           0,
        background:      'rgba(20,20,20,.7)',
        zIndex:          1000,
        overflowY:       'auto',
        display:         'flex',
        alignItems:      'flex-start',
        justifyContent:  'center',
        padding:         '40px 16px',
      }}
    >
      <div
        style={{
          background:    '#fff',
          borderRadius:  '8px',
          width:         '100%',
          maxWidth:      '860px',
          position:      'relative',
          overflow:      'hidden',
        }}
      >
        <div style={{
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'space-between',
          padding:         '20px 24px',
          borderBottom:    '1px solid var(--cream2)',
        }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 600, color: 'var(--obsidian)' }}>
            Request Information
          </p>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'none',
              border:     'none',
              cursor:     'pointer',
              fontSize:   '1.5rem',
              lineHeight: 1,
              color:      'var(--obsidian)',
              padding:    '4px 8px',
            }}
          >
            ×
          </button>
        </div>

        <iframe
          src={EDUWEBY_URL}
          width="100%"
          style={{ border: 'none', width: '100%', minHeight: '800px', display: 'block' }}
          title="Request Information Form"
        />
      </div>
    </div>
  );
}
