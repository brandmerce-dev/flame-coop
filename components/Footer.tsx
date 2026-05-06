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

  return (
    <footer id="site-footer">
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
            <p style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.2)', marginTop: '16px' }}>
              {address}
            </p>
            {(instagramUrl || facebookUrl || youtubeUrl) && (
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                {instagramUrl && (
                  <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                    style={{ color: 'rgba(255,255,255,.4)', fontSize: '.8rem' }}>IG</a>
                )}
                {facebookUrl && (
                  <a href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                    style={{ color: 'rgba(255,255,255,.4)', fontSize: '.8rem' }}>FB</a>
                )}
                {youtubeUrl && (
                  <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                    style={{ color: 'rgba(255,255,255,.4)', fontSize: '.8rem' }}>YT</a>
                )}
              </div>
            )}
          </div>

          {/* About Us */}
          <div>
            <div className="footer__col-title">About Us</div>
            <Link href="/about"    className="footer__link">About Us</Link>
            <Link href="/beliefs"  className="footer__link">Our Beliefs</Link>
            <Link href="/admissions#admissions-form" className="footer__link">Contact Us</Link>
          </div>

          {/* Our School */}
          <div>
            <div className="footer__col-title">Our School</div>
            <Link href="/programs"            className="footer__link">Our Programs</Link>
            <Link href="/admissions"          className="footer__link">Admission</Link>
            <Link href="/tuition-scholarship" className="footer__link">Tuition &amp; Scholarship</Link>
            <Link href="#"                    className="footer__link">Handbook</Link>
          </div>

          {/* Resources */}
          <div>
            <div className="footer__col-title">Resources</div>
            <Link href="#"                              className="footer__link">Calendar</Link>
            <Link href="#"                              className="footer__link">Handbook</Link>
            <Link href="/admissions#admissions-form"    className="footer__link">Request Info</Link>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © {year} The Flame Christian Cooperative. All rights reserved.
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
