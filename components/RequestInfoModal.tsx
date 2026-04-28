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

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  return (
    <>
      <style>{`
        .rim-overlay {
          position:        fixed;
          inset:           0;
          background:      rgba(20,20,20,.7);
          z-index:         1000;
          overflowY:       auto;
          display:         flex;
          align-items:     flex-start;
          justify-content: center;
          padding:         40px 16px;
          opacity:         0;
          pointer-events:  none;
          transition:      opacity .25s ease;
        }
        .rim-overlay.open {
          opacity:        1;
          pointer-events: all;
        }
        .rim-sheet {
          background:    #fff;
          border-radius: 8px;
          width:         100%;
          max-width:     860px;
          position:      relative;
          overflow:      hidden;
          transform:     translateY(20px);
          transition:    transform .3s cubic-bezier(.4,0,.2,1);
        }
        .rim-overlay.open .rim-sheet {
          transform: translateY(0);
        }
      `}</style>

      {/* Overlay — always in DOM so iframe loads immediately on page load */}
      <div
        className={`rim-overlay${open ? ' open' : ''}`}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        aria-hidden={!open}
      >
        <div className="rim-sheet">
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
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', lineHeight: 1, color: 'var(--obsidian)', padding: '4px 8px' }}
            >
              ×
            </button>
          </div>

          {/* Iframe is always rendered — loads silently in background on page load */}
          <iframe
            src={EDUWEBY_URL}
            style={{ border: 'none', width: '100%', minHeight: '800px', display: 'block' }}
            title="Request Information Form"
          />
        </div>
      </div>
    </>
  );
}
