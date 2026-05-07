'use client';

import { useEffect, useRef, useState } from 'react';

const EDUWEBY_URL = 'https://eduweby.com/embed/form?tenant=flame-christian-coop';

export function openRequestInfoModal() {
  window.dispatchEvent(new CustomEvent('open-request-info-modal'));
}

export default function RequestInfoModal() {
  const [open, setOpen] = useState(false);
  const wasOpenRef  = useRef(false);
  const savedScrollY = useRef(0); // ref survives effect cleanup runs

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

  // iOS-compatible scroll lock.
  // BUG FIXED: React runs the *cleanup* of the previous effect before the new
  // effect, so reading document.body.style.top in the else branch always got ''
  // (already cleared by cleanup). Storing scrollY in a ref means it survives
  // the cleanup run. requestAnimationFrame ensures the scroll restore fires
  // after the browser has processed the style removal.
  useEffect(() => {
    if (open) {
      wasOpenRef.current   = true;
      savedScrollY.current = window.scrollY;
      document.body.style.position  = 'fixed';
      document.body.style.top       = `-${savedScrollY.current}px`;
      document.body.style.width     = '100%';
      document.body.style.overflowY = 'scroll';
    } else if (wasOpenRef.current) {
      document.body.style.position  = '';
      document.body.style.top       = '';
      document.body.style.width     = '';
      document.body.style.overflowY = '';
      // rAF: let the browser apply the style removal before jumping scroll
      requestAnimationFrame(() => {
        window.scrollTo(0, savedScrollY.current);
      });
    }
    return () => {
      document.body.style.position  = '';
      document.body.style.top       = '';
      document.body.style.width     = '';
      document.body.style.overflowY = '';
    };
  }, [open]);

  return (
    <>
      <style>{`
        .rim-overlay {
          position:                    fixed;
          inset:                       0;
          background:                  rgba(20,20,20,.7);
          z-index:                     1000;
          overflow-y:                  auto;
          -webkit-overflow-scrolling:  touch;
          overscroll-behavior:         contain;
          display:                     flex;
          align-items:                 flex-start;
          justify-content:             center;
          padding:                     40px 16px;
          opacity:                     0;
          pointer-events:              none;
          transition:                  opacity .22s ease;
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

        /* Full-screen modal on mobile — maximises form field width */
        @media (max-width: 600px) {
          .rim-overlay {
            padding:     0;
            align-items: stretch;
          }
          .rim-sheet {
            border-radius: 0;
          }
        }
      `}</style>

      {/*
        Lazy-load iframe: src is only set when the modal is open. A loaded
        iframe inside a position:fixed; inset:0 overlay (even at opacity:0 +
        pointer-events:none) interferes with iOS Safari touch scroll, so
        we keep the iframe empty until the user actually opens the modal.
      */}
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
            flexShrink: 0,
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
            src={open ? EDUWEBY_URL : undefined}
            style={{ border: 'none', width: '100%', minHeight: '800px', display: 'block' }}
            title="Request Information Form"
          />
        </div>
      </div>
    </>
  );
}
