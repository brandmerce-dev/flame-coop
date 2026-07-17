export const revalidate = 0; // always fetch fresh from Sanity

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import Hero from '@/components/Hero';
import { getTuition } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import { SITE_URL } from '@/lib/site-config';

// Array-driven sections render ONLY what Sanity returns — no hardcoded
// fallbacks. When an array is empty/unset in Sanity, its section is omitted
// entirely and the next section moves up with normal spacing.
type TuitionRow = {
  program: string; appFee1?: string; appFeeAdd?: string; supplyFee?: string;
  regFee?: string; bgFee?: string; tuitionTotal?: string; grandTotal?: string;
};
type TuitionCallout = { program: string; total?: string; note?: string };
type Scholarship    = { name: string; desc?: string };

const defaultFootnote = "Tuition paid in two equal installments: Aug 15 (1st half) · Dec 3 (2nd half). Supply fee secures the child's spot — due within 3 business days of acceptance. Background fee due after handbook submission. All fees non-refundable. New-family fees apply to first-year enrollment only.";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getTuition();
  return {
    title:       cms?.seoTitle       ?? 'Tuition & Scholarship',
    description: cms?.seoDescription ?? 'Clear, transparent tuition — and scholarship options through the Step Up for Students program. An investment in faith, formation, and future.',
    openGraph: {
      title:       cms?.seoTitle       ?? 'Tuition & Scholarship | The Flame Christian Co-op',
      description: cms?.seoDescription ?? 'Clear, transparent tuition with scholarship options through Step Up for Students.',
    },
    alternates: { canonical: `${SITE_URL}/tuition-scholarship` },
  };
}

export default async function TuitionPage() {
  const cms = await getTuition();

  const heroStyle    = (cms?.heroStyle as 'cream' | 'image' | 'none' | 'dark') ?? 'cream'
  const heroEyebrow  = cms?.heroEyebrow  ?? 'Tuition & Scholarship'
  const heroImageSrc = cms?.heroImage ? urlFor(cms.heroImage).width(2400).url() : undefined
  const heroImageAlt = cms?.heroImageAlt ?? undefined

  const heroHeadline       = cms?.heroHeadline       ?? 'An Investment in Faith, Formation, and Future.';
  const heroLead           = cms?.heroLead           ?? 'We know tuition is a meaningful decision for every family. Our goal is to make the process clear, transparent, and connected to the mission.';
  const tableIntroHeading  = cms?.tableIntroHeading  ?? 'Clear Numbers. No Surprises.';
  const tableIntroBody     = cms?.tableIntroBody     ?? 'All fees are non-refundable. Tuition is paid in two equal installments. First-year totals include new-family fees: application, supply, registration, and background check.';
  const tableFootnote      = cms?.tableFootnote      ?? defaultFootnote;
  const tuitionRows: TuitionRow[]     = cms?.tuitionRows ?? [];
  const callouts:    TuitionCallout[] = cms?.callouts    ?? [];
  const scholarshipsHeading = cms?.scholarshipsHeading ?? 'Scholarships Welcome Here.';
  const scholarshipsIntro   = cms?.scholarshipsIntro   ?? 'The Flame Christian Cooperative is a direct provider for the Step Up for Students Scholarship in Florida. We believe financial barriers should not stand between a family and the Christ-centered education God is calling them toward.';
  const scholarshipsBody    = cms?.scholarshipsBody    ?? 'Families can pay directly through the Step Up for Students Marketplace portal, or we provide all documentation for a reimbursement request. Your tuition agreement remains in place whether you use scholarship funds or pay out of pocket.';
  const scholarships: Scholarship[] = cms?.scholarships ?? [];
  const ctaEyebrow          = cms?.ctaEyebrow ?? 'Need Help?';
  const ctaHeading          = cms?.ctaHeading ?? "You Don't Have to Figure This Out Alone.";
  const ctaBody1            = cms?.ctaBody1   ?? "If you're looking at this page and feeling unsure about tuition timing, scholarship eligibility, or what applies to your child's program — reach out.";
  const ctaBody2            = cms?.ctaBody2   ?? 'Our admissions team will walk you through it clearly, without pressure.';
  const aspectMap: Record<string, string> = { tall: '3 / 4', square: '1 / 1', wide: '16 / 10' };

  const scholarshipsImageSrc    = cms?.scholarshipsImage ? urlFor(cms.scholarshipsImage).width(1200).url() : undefined;
  const scholarshipsImageAlt2   = cms?.scholarshipsImageAlt ?? 'Student and parent in learning environment';
  const scholarshipsImageAspect = aspectMap[cms?.scholarshipsImageAspect ?? 'wide'] ?? '16 / 10';

  return (
    <>
      {/* HERO */}
      {heroStyle === 'image' ? (
        <Hero eyebrow={heroEyebrow} headline={heroHeadline} subheadline={heroLead} imageSrc={heroImageSrc} imageAlt={heroImageAlt} />
      ) : heroStyle === 'dark' ? (
        <Hero eyebrow={heroEyebrow} headline={heroHeadline} subheadline={heroLead} />
      ) : heroStyle === 'cream' ? (
        <section style={{ padding: '80px 0 64px', background: 'var(--cream2)' }}>
          <div className="container--narrow" style={{ textAlign: 'center' }}>
            <span className="eyebrow" style={{ display: 'block', textAlign: 'center', justifyContent: 'center' }}>{heroEyebrow}</span>
            <h1 style={{ marginBottom: '20px' }}>{heroHeadline}</h1>
            <p className="lead">{heroLead}</p>
          </div>
        </section>
      ) : null}

      {/* TUITION TABLE + SUMMARY CARDS — section renders only when Sanity
          returns content; an empty section shell would otherwise leave a
          blank padded band on the page. */}
      {(tuitionRows.length > 0 || callouts.length > 0) && (
        <section style={{ padding: 'var(--section-v) 0' }}>
          <div className="container">
            <div className="reveal" style={{ maxWidth: '720px', marginBottom: '32px' }}>
              <span className="eyebrow">Fee &amp; Tuition Overview</span>
              <h2 style={{ marginBottom: '12px' }}>{tableIntroHeading}</h2>
              <p>{tableIntroBody}</p>
            </div>
            {tuitionRows.length > 0 && (
              <div className="tuition-wrap reveal">
                <table className="tuition-table">
                  <thead>
                    <tr>
                      <th scope="col" style={{ textAlign: 'left' }}>Program</th>
                      <th scope="col">App Fee<br />1st child</th>
                      <th scope="col">App Fee<br />add&apos;l</th>
                      <th scope="col">Supply<br />Fee</th>
                      <th scope="col">Reg.<br />Fee</th>
                      <th scope="col">BG<br />/parent</th>
                      <th scope="col">Tuition<br />Total</th>
                      <th scope="col">Tuition +<br />Reg. Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tuitionRows.map((row: TuitionRow, i: number) => (
                      <tr key={i}>
                        <td>{row.program}</td>
                        <td>{row.appFee1}</td>
                        <td>{row.appFeeAdd}</td>
                        <td>{row.supplyFee}</td>
                        <td>{row.regFee}</td>
                        <td>{row.bgFee}</td>
                        <td>{row.tuitionTotal}</td>
                        <td>{row.grandTotal}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr><td colSpan={8}>{tableFootnote}</td></tr>
                  </tfoot>
                </table>
              </div>
            )}
            {/* SUMMARY CARDS — omitted entirely when the array is empty/unset */}
            {callouts.length > 0 && (
              <div className="tuition-callouts reveal">
                {callouts.map((c: TuitionCallout, i: number) => (
                  <div key={i} className="tuition-callout">
                    <div className="tuition-callout__program">{c.program}</div>
                    <div className="tuition-callout__total">{c.total}</div>
                    {c.note && <div style={{ fontSize: '.8rem', color: 'var(--mid)', marginTop: '4px' }}>{c.note}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* SCHOLARSHIPS */}
      <section className="section--cream">
        <div className="container">
          <div className="split split--reverse reveal">
            <div className="split__body">
              <span className="eyebrow">Scholarships</span>
              <h2 style={{ marginBottom: '20px' }}>{scholarshipsHeading}</h2>
              <p>{scholarshipsIntro}</p>
              {/* Scholarship cards — omitted (with their lead-in line) when the array is empty/unset */}
              {scholarships.length > 0 && (
                <>
                  <p style={{ marginTop: '12px', marginBottom: '24px' }}>We work with families using the following scholarship programs:</p>
                  <div className="scholarship-cards">
                    {scholarships.map((s: Scholarship, i: number) => (
                      <div key={i} className="scholarship-card">
                        <div className="scholarship-card__name">{s.name}</div>
                        <p className="scholarship-card__desc">{s.desc}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
              <p style={{ marginTop: '24px' }}>{scholarshipsBody}</p>
            </div>
            <div className="split__media reveal reveal-delay-1">
              {scholarshipsImageSrc ? (
                <div style={{ position: 'relative', width: '100%', aspectRatio: scholarshipsImageAspect, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                  <Image src={scholarshipsImageSrc} alt={scholarshipsImageAlt2} fill sizes="(max-width: 768px) 100vw, 40vw" style={{ objectFit: 'cover' }} />
                </div>
              ) : (
                <ImagePlaceholder label="Photo: Student and parent in learning environment" aspectRatio="wide" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* NEED HELP CTA */}
      <section className="section--dark" style={{ padding: '80px 0' }}>
        <div className="container--narrow" style={{ textAlign: 'center' }}>
          <span className="eyebrow" style={{ display: 'block', textAlign: 'center', justifyContent: 'center' }}>{ctaEyebrow}</span>
          <h2 style={{ marginBottom: '20px' }}>{ctaHeading}</h2>
          <p style={{ color: 'rgba(255,255,255,.65)', marginBottom: '8px' }}>
            {ctaBody1}
          </p>
          <p style={{ color: 'rgba(255,255,255,.65)', marginBottom: '36px' }}>
            {ctaBody2}
          </p>
          <div className="btn-group" style={{ justifyContent: 'center' }}>
            <Link href="/admissions" className="btn btn--primary">Ask About Scholarships</Link>
            <a href="https://www.stepupforstudents.org/scholarships/" target="_blank" rel="noopener noreferrer" className="btn btn--outline-white">
              Visit Step Up for Students
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
