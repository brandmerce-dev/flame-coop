'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { href: '/about',                label: 'About' },
  { href: '/beliefs',              label: 'Beliefs' },
  { href: '/programs',             label: 'Programs' },
  { href: '/admissions',           label: 'Admissions' },
  { href: '/tuition-scholarship',  label: 'Tuition & Scholarship' },
];

export default function Nav() {
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [modalOpen, setModalOpen]     = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen]);

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`} id="main-nav">
        <div className="nav__inner">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0" aria-label="The Flame Christian Co-op — Home">
            <Image
              src="/images/logo/flame-logo-lockup-script.png"
              alt="The Flame Christian Co-op logo"
              width={160}
              height={48}
              style={{ width: '160px', height: 'auto' }}
              priority
            />
          </Link>

          {/* Desktop links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="nav-links-desktop">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  fontSize: '.85rem',
                  fontWeight: 500,
                  color: 'var(--dark)',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius)',
                  transition: 'var(--transition)',
                  letterSpacing: '.02em',
                  whiteSpace: 'nowrap',
                }}
                className="nav-link"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => setModalOpen(true)}
            style={{
              fontSize: '.82rem',
              fontWeight: 600,
              letterSpacing: '.06em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              border: '1.5px solid var(--gold)',
              padding: '9px 20px',
              borderRadius: 'var(--radius)',
              transition: 'var(--transition)',
              whiteSpace: 'nowrap',
              background: 'transparent',
              cursor: 'pointer',
            }}
            className="nav-cta"
          >
            Request Info
          </button>

          {/* Mobile toggle */}
          <button
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((o) => !o)}
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: '5px',
              padding: '8px',
              cursor: 'pointer',
            }}
            className="nav-mobile-toggle"
          >
            <span style={{ display: 'block', width: '22px', height: '1.5px', background: 'var(--dark)', transition: 'var(--transition)' }} />
            <span style={{ display: 'block', width: '22px', height: '1.5px', background: 'var(--dark)', transition: 'var(--transition)' }} />
            <span style={{ display: 'block', width: '22px', height: '1.5px', background: 'var(--dark)', transition: 'var(--transition)' }} />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            style={{
              position: 'fixed',
              top: '72px',
              left: 0,
              right: 0,
              background: 'var(--bg)',
              borderBottom: '1px solid rgba(166,146,100,.15)',
              padding: '16px 32px 24px',
              zIndex: 99,
            }}
          >
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'block',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: 'var(--dark)',
                  padding: '14px 0',
                  borderBottom: '1px solid var(--cream2)',
                }}
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={() => { setMobileOpen(false); setModalOpen(true); }}
              style={{
                display: 'block',
                width: '100%',
                marginTop: '16px',
                textAlign: 'center',
                fontSize: '.85rem',
                fontWeight: 600,
                letterSpacing: '.06em',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                background: 'var(--gold)',
                padding: '14px',
                borderRadius: 'var(--radius)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Request Info
            </button>
          </div>
        )}

        <style>{`
          @media (max-width: 640px) {
            .nav-links-desktop { display: none !important; }
            .nav-cta { display: none !important; }
            .nav-mobile-toggle { display: flex !important; }
          }
          .nav-link:hover { color: var(--gold) !important; }
          .nav-cta:hover { background: var(--gold) !important; color: #fff !important; }
        `}</style>
      </nav>

      {/* Request Info Modal */}
      {modalOpen && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(20,20,20,.7)',
            zIndex: 1000,
            overflowY: 'auto',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '40px 16px',
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '8px',
              width: '100%',
              maxWidth: '860px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Modal header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px 24px',
              borderBottom: '1px solid var(--cream2)',
            }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 600, color: 'var(--obsidian)' }}>
                Request Information
              </p>
              <button
                onClick={() => setModalOpen(false)}
                aria-label="Close"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                  lineHeight: 1,
                  color: 'var(--obsidian)',
                  padding: '4px 8px',
                }}
              >
                ×
              </button>
            </div>

            {/* Iframe */}
            <iframe
              src="https://eduweby.com/embed/form?tenant=flame-christian-coop"
              width="100%"
              style={{ border: 'none', width: '100%', minHeight: '800px', display: 'block' }}
              title="Request Information Form"
            />
          </div>
        </div>
      )}
    </>
  );
}
