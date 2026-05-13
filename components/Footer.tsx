import Link from 'next/link';
import Image from 'next/image';
import { getSiteSettings } from '@/sanity/lib/queries';

export default async function Footer() {
  const settings = await getSiteSettings();

  const tagline      = settings?.tagline      ?? 'To stoke the fire of the Holy Spirit within the next generation through real-life encounters with God\'s glory and love.';
  const address      = settings?.address      ?? '895 Palm Valley Rd, Ponte Vedra, FL 32081';
  const instagramUrl = settings?.instagramUrl ?? null;
  const facebookUrl  = settings?.facebookUrl  ?? null;
  const youtubeUrl   = settings?.youtubeUrl   ?? null;
  const year         = new Date().getFullYear();

  const socialStyle: React.CSSProperties = {
    color: 'rgba(255,255,255,.55)',
    fontSize: '.8rem',
    padding: '8px 4px',
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
            <p style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.55)', marginTop: '6px' }}>
              {address}
            </p>
            {(instagramUrl || facebookUrl || youtubeUrl) && (
              <div style={{ display: 'flex', gap: '4px', marginTop: '16px' }}>
                {instagramUrl && (
                  <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram"
                    style={socialStyle}>IG</a>
                )}
                {facebookUrl && (
                  <a href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook"
                    style={socialStyle}>FB</a>
                )}
                {youtubeUrl && (
                  <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="Watch us on YouTube"
                    style={socialStyle}>YT</a>
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
                <Link href="/admissions#admissions-form" className="footer__link">Contact Us</Link>
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
