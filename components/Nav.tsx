'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { openRequestInfoModal } from '@/components/RequestInfoModal';

const navLinks = [
  { href: '/about',                label: 'About' },
  { href: '/beliefs',              label: 'Beliefs' },
  { href: '/programs',             label: 'Programs' },
  { href: '/admissions',           label: 'Admissions' },
  { href: '/tuition-scholarship',  label: 'Tuition & Scholarship' },
];

export default function Nav() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const toggleRef     = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close mobile menu on Escape key (WCAG 2.1.1)
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        toggleRef.current?.focus(); // return focus to toggle button
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [mobileOpen]);

  // Focus trap inside mobile menu (WCAG 2.4.3)
  const handleMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !mobileMenuRef.current) return;
    const focusable = mobileMenuRef.current.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }, []);

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`} id="main-nav" aria-label="Main navigation">
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
                fontSize: '.85rem', fontWeight: 500, color: 'var(--dark)',
                padding: '8px 14px', borderRadius: 'var(--radius)',
                transition: 'var(--transition)', letterSpacing: '.02em', whiteSpace: 'nowrap',
              }}
              className="nav-link"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={openRequestInfoModal}
          style={{
            fontSize: '.82rem', fontWeight: 600, letterSpacing: '.06em',
            textTransform: 'uppercase', color: 'var(--gold-text)',
            border: '1.5px solid var(--gold-text)', padding: '9px 20px',
            borderRadius: 'var(--radius)', transition: 'var(--transition)',
            whiteSpace: 'nowrap', background: 'transparent', cursor: 'pointer',
          }}
          className="nav-cta"
        >
          Request Info
        </button>

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((o) => !o)}
          style={{ display: 'none', flexDirection: 'column', gap: '5px', padding: '8px', cursor: 'pointer', minWidth: '44px', minHeight: '44px', alignItems: 'center', justifyContent: 'center' }}
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
          id="mobile-menu"
          ref={mobileMenuRef}
          role="navigation"
          aria-label="Mobile navigation"
          onKeyDown={handleMenuKeyDown}
          style={{
            position: 'fixed', top: '72px', left: 0, right: 0,
            background: 'var(--bg)', borderBottom: '1px solid rgba(166,146,100,.15)',
            padding: '16px 32px 24px', zIndex: 99,
          }}
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block', fontSize: '1rem', fontWeight: 500,
                color: 'var(--dark)', padding: '14px 0', borderBottom: '1px solid var(--cream2)',
              }}
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={() => { setMobileOpen(false); openRequestInfoModal(); }}
            style={{
              display: 'block', width: '100%', marginTop: '16px', textAlign: 'center',
              fontSize: '.85rem', fontWeight: 600, letterSpacing: '.06em',
              textTransform: 'uppercase', color: '#FFFFFF', background: 'var(--gold)',
              padding: '14px', borderRadius: 'var(--radius)', border: 'none', cursor: 'pointer',
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
        .nav-cta:hover { background: var(--gold-text) !important; color: #fff !important; }
      `}</style>
    </nav>
  );
}
