import Link from 'next/link';
import Image from 'next/image';
import { getSiteSettings } from '@/sanity/lib/queries';

export default async function Footer() {
  const settings = await getSiteSettings();

  const tagline      = settings?.tagline      ?? 'To stoke the fire of the Holy Spirit within the next generation through real-life encounters with God\'s glory and love.';
  const address      = settings?.address      ?? '895 Palm Valley Rd, Ponte Vedra, FL 32081';
  const contactEmail = settings?.contactEmail ?? null;
  const phone        = settings?.phone        ?? null;
  const instagramUrl = settings?.instagramUrl ?? null;
  const facebookUrl  = settings?.facebookUrl  ?? null;
  const youtubeUrl   = settings?.youtubeUrl   ?? null;
  const year         = new Date().getFullYear();

  // Normalize a display phone (e.g. "(NNN) NNN-NNNN") into a tel: value.
  const telHref = (p: string) => {
    const digits = p.replace(/[^\d]/g, '');
    return `tel:+${digits.length === 10 ? '1' + digits : digits}`;
  };

  const contactLinkStyle: React.CSSProperties = {
    color: 'rgba(255,255,255,.72)',
    textDecoration: 'none',
    fontSize: '.78rem',
  };

  const socialStyle: React.CSSProperties = {
    color: 'rgba(255,255,255,.7)',
    padding: '8px',
    minWidth: '44px',
    minHeight: '44px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <footer id="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer__inner">
          {/* Brand column */}
          <div>
            <div style={{ marginBottom: '20px' }}>
              <Image
                src="/images/logo/flame-logo-lockup-script.png"
                alt="The Flame Christian Co-op"
                width={140}
                height={42}
                style={{ width: '140px', height: 'auto', opacity: 0.75 }}
              />
            </div>
            <p className="footer__tagline">{tagline}</p>
            <p style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.6)', marginTop: '12px' }}>
              The Flame Christian Cooperative is a registered 501(c)(3) nonprofit organization.
            </p>
            <address style={{ fontStyle: 'normal', marginTop: '6px' }}>
              <p style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.55)', marginBottom: '4px' }}>
                {address}
              </p>
              {phone && (
                <a href={telHref(phone)} style={{ ...contactLinkStyle, display: 'block', marginBottom: '2px' }}>
                  {phone}
                </a>
              )}
              {contactEmail && (
                <a href={`mailto:${contactEmail}`} style={{ ...contactLinkStyle, display: 'block' }}>
                  {contactEmail}
                </a>
              )}
            </address>
            {(instagramUrl || facebookUrl || youtubeUrl) && (
              <div style={{ display: 'flex', gap: '4px', marginTop: '16px' }}>
                {facebookUrl && (
                  <a href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook" style={socialStyle}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
                    </svg>
                  </a>
                )}
                {instagramUrl && (
                  <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" style={socialStyle}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.68A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.41-10.4a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44z" />
                    </svg>
                  </a>
                )}
                {youtubeUrl && (
                  <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="Watch us on YouTube" style={socialStyle}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.81zM9.55 15.57V8.43L15.82 12z" />
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Footer navigation — wrapped in nav for WCAG 2.4.1 */}
          <nav aria-label="Footer navigation">
            <div style={{ display: 'contents' }}>
              {/* About Us */}
              <div>
                <h2 className="footer__col-title">About Us</h2>
                <Link href="/about"    className="footer__link">About Us</Link>
                <Link href="/beliefs"  className="footer__link">Our Beliefs</Link>
                <Link href="/contact" className="footer__link">Contact Us</Link>
              </div>

              {/* Our School */}
              <div>
                <h2 className="footer__col-title">Our School</h2>
                <Link href="/programs"            className="footer__link">Our Programs</Link>
                <Link href="/admissions"          className="footer__link">Admission</Link>
                <Link href="/tuition-scholarship" className="footer__link">Tuition &amp; Scholarship</Link>
              </div>

              {/* Resources */}
              <div>
                <h2 className="footer__col-title">Resources</h2>
                <span className="footer__link" aria-disabled="true" style={{ opacity: 0.5 }}>Calendar (coming soon)</span>
                <span className="footer__link" aria-disabled="true" style={{ opacity: 0.5 }}>Handbook (coming soon)</span>
                <Link href="/admissions#admissions-form" className="footer__link">Request Info</Link>
              </div>
            </div>
          </nav>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            &copy; {year} The Flame Christian Cooperative. All rights reserved.
            {' · '}
            <a href="https://eduweby.com" target="_blank" rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'inherit' }}>
              Website by <span style={{ color: 'var(--gold)' }}>Eduweby</span>
            </a>
          </p>
          <div className="footer__legal">
            <Link href="/legal/privacy-policy">Privacy Policy</Link>
            <Link href="/legal/terms-of-use">Terms of Use</Link>
            <Link href="/legal/accessibility">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
