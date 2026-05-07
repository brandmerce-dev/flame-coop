'use client';

import { useEffect, useRef, useState } from 'react';

const EDUWEBY_URL = 'https://eduweby.com/embed/form?tenant=flame-christian-coop';

export function openRequestInfoModal() {
  window.dispatchEvent(new CustomEvent('open-request-info-modal'));
}

export default function RequestInfoModal() {
  const [open, setOpen]                       = useState(false);
  const [renderFullscreen, setRenderFullscreen] = useState(false);
  const wasOpenRef    = useRef(false);
  const savedScrollY  = useRef(0);

  useEffect(() => {
    const handler = () => {
      // Set both states together so the first render after click already has
      // the fullscreen layout class — avoids a flash of "absolute 1x1" with
      // the open class applied.
      setRenderFullscreen(true);
      setOpen(true);
    };
    window.addEventListener('open-request-info-modal', handler);
    return () => window.removeEventListener('open-request-info-modal', handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // After modal is closed, wait for fade-out to finish before collapsing the
  // overlay back to its tiny absolute-positioned state. Otherwise the modal
  // would visually disappear instantly instead of fading out smoothly.
  useEffect(() => {
    if (!open && renderFullscreen) {
      const t = setTimeout(() => setRenderFullscreen(false), 260);
      return () => clearTimeout(t);
    }
  }, [open, renderFullscreen]);

  // iOS-compatible scroll lock: position:fixed + saved scrollY pattern.
  // savedScrollY ref survives effect cleanup (which always runs first when
  // open changes). requestAnimationFrame ensures scroll restore fires after
  // the browser has applied the position:fixed removal.
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

  const overlayClasses = [
    'rim-overlay',
    renderFullscreen ? 'rim-overlay--full' : '',
    open ? 'open' : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      <style>{`
        /*
         * Default (closed) state: a 1x1 absolute-positioned dot.
         * Crucially does NOT cover the viewport — so the iframe inside can
         * stay always-mounted and loaded WITHOUT triggering the iOS Safari
         * touch-scroll bug that fullscreen position:fixed elements cause.
         * The iframe loads on initial page mount; when the modal is opened
         * the iframe is already fully rendered → modal appears instantly.
         */
        .rim-overlay {
          position:       absolute;
          top:            0;
          left:           0;
          width:          1px;
          height:         1px;
          overflow:       hidden;
          opacity:        0;
          pointer-events: none;
          transition:     opacity .22s ease;
        }

        /* Open layout — applied while the modal is open AND during fade-out */
        .rim-overlay--full {
          position:                    fixed;
          inset:                       0;
          width:                       auto;
          height:                      auto;
          background:                  rgba(20,20,20,.7);
          z-index:                     1000;
          overflow-y:                  auto;
          -webkit-overflow-scrolling:  touch;
          overscroll-behavior:         contain;
          display:                     flex;
          align-items:                 flex-start;
          justify-content:             center;
          padding:                     40px 16px;
        }

        /* Visible (post-fade-in) — opacity 1 + interactive */
        .rim-overlay--full.open {
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
        .rim-overlay--full.open .rim-sheet {
          transform: translateY(0);
        }

        /* Mobile: full-screen sheet, header pinned at top, iframe fills rest.
           The iframe's own internal scroll handles the form — no outer overlay
           scroll needed. This eliminates: left/right bounce, close button going
           off screen, and scroll overshooting. */
        @media (max-width: 600px) {
          .rim-overlay--full {
            padding:     0;
            align-items: stretch;
            overflow:    hidden;
          }
          .rim-sheet {
            border-radius:  0;
            overflow:       hidden;
            height:         100%;
            display:        flex;
            flex-direction: column;
          }
          .rim-form-iframe {
            flex:       1 !important;
            min-height: 0 !important;
            height:     100% !important;
          }
        }
      `}</style>

      <div
        className={overlayClasses}
        onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        aria-modal="true"
        role="dialog"
        aria-label="Request Information"
        aria-hidden={!open}
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
          {/*
            Always-mounted iframe with src always set — loads on page mount.
            Safe because when closed the parent overlay is 1x1 absolute,
            NOT a fullscreen position:fixed element (which would break iOS
            scroll). When the modal opens, the iframe is already fully
            rendered → instant appearance.
          */}
          <iframe
            src={EDUWEBY_URL}
            className="rim-form-iframe"
            style={{ border: 'none', width: '100%', minHeight: '800px', display: 'block', touchAction: 'manipulation' }}
            title="Request Information Form"
          />
        </div>
      </div>
    </>
  );
}
