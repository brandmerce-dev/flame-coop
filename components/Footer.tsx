import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
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
            <p className="footer__tagline">
              To stoke the fire of the Holy Spirit within the next generation through real-life encounters with God&apos;s glory and love.
            </p>
            <p style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.2)', marginTop: '16px' }}>
              895 Palm Valley Rd, Ponte Vedra, FL 32081
            </p>
          </div>

          {/* About Us */}
          <div>
            <div className="footer__col-title">About Us</div>
            <Link href="/about"     className="footer__link">About Us</Link>
            <Link href="/beliefs"   className="footer__link">Our Beliefs</Link>
            <Link href="/admissions" className="footer__link">Contact Us</Link>
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
            <Link href="#"            className="footer__link">Calendar</Link>
            <Link href="#"            className="footer__link">Handbook</Link>
            <Link href="/admissions"  className="footer__link">Request Info</Link>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © 2025 The Flame Christian Cooperative. All rights reserved.
          </p>
          <div className="footer__legal">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Use</Link>
            <Link href="#">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
