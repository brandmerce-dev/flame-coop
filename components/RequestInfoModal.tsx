'use client';

import { useEffect, useState } from 'react';

const EDUWEBY_URL = 'https://eduweby.com/embed/form?tenant=flame-christian-coop';

export function openRequestInfoModal() {
  window.dispatchEvent(new CustomEvent('open-request-info-modal'));
}

export default function RequestInfoModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('open-request-info-modal', handler);
    return () => window.removeEventListener('open-request-info-modal', handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <style>{`
        .rim-overlay {
          position:        fixed;
          inset:           0;
          background:      rgba(20,20,20,.7);
          z-index:         1000;
          overflow-y:      auto;
          display:         flex;
          align-items:     flex-start;
          justify-content: center;
          padding:         40px 16px;
          opacity:         0;
          pointer-events:  none;
          transition:      opacity .22s ease;
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
          overflow:      hidden;
          transform:     translateY(16px);
          transition:    transform .28s cubic-bezier(.4,0,.2,1);
        }
        .rim-overlay.open .rim-sheet {
          transform: translateY(0);
        }
      `}</style>

      {/*
        Iframe pre-loaded off-screen so it's ready before anyone clicks.
        visibility:hidden is more reliable than opacity:0 for forcing browser fetch
        without triggering lazy-load deferrals.
      */}
      <div
        aria-hidden="true"
        style={{ position: 'fixed', left: '-9999px', top: 0, width: '860px', visibility: 'hidden' }}
      >
        <iframe
          id="eduweby-preload"
          src={EDUWEBY_URL}
          style={{ border: 'none', width: '100%', height: '900px' }}
          title="Request Information Form (preload)"
          tabIndex={-1}
        />
      </div>

      {/* Modal overlay — swaps in the same already-loaded iframe src */}
      <div
        className={`rim-overlay${open ? ' open' : ''}`}
        onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        aria-modal="true"
        role="dialog"
        aria-label="Request Information"
      >
        <div className="rim-sheet">
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '20px 24px', borderBottom: '1px solid var(--cream2)',
          }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 600, color: 'var(--obsidian)' }}>
              Request Information
            </p>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', lineHeight: 1, color: 'var(--obsidian)', padding: '4px 8px' }}
            >
              ×
            </button>
          </div>
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
