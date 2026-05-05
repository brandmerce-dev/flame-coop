export const revalidate = 0; // always fetch fresh from Sanity

import type { Metadata } from 'next';
import Image from 'next/image';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import AdmissionsForm from '@/components/AdmissionsForm';
import Hero from '@/components/Hero';
import { getAdmissions } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';

const defaultFitItems = [
  'You share our Statement of Faith and are committed to raising your children in the Christian tradition.',
  "You see yourself as your child's primary teacher, with The Flame as an enrichment and discipleship partner.",
  'You\'re ready to participate in the community — not simply drop off and pick up.',
  "You believe your child's education and spiritual formation should be connected, not separated.",
  'You want your child to be known, challenged, encouraged, and rooted in Christ.',
];

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getAdmissions();
  return {
    title:       cms?.seoTitle       ?? 'Admissions',
    description: cms?.seoDescription ?? 'Admissions at The Flame is more than paperwork. It\'s the beginning of a Spirit-led partnership between your family and a community committed to helping your child grow in faith, wisdom, and purpose.',
    openGraph: {
      title:       cms?.seoTitle       ?? 'Admissions | The Flame Christian Co-op',
      description: cms?.seoDescription ?? 'Begin the admissions process for The Flame Christian Co-op.',
    },
    alternates: { canonical: 'https://theflame.org/admissions' },
  };
}

export default async function AdmissionsPage() {
  const cms = await getAdmissions();

  const heroStyle    = (cms?.heroStyle as 'cream' | 'image' | 'none' | 'dark') ?? 'cream'
  const heroEyebrow  = cms?.heroEyebrow  ?? 'Admissions'
  const heroImageSrc = cms?.heroImage ? urlFor(cms.heroImage).width(2400).url() : undefined
  const heroImageAlt = cms?.heroImageAlt ?? undefined

  const heroHeadline = cms?.heroHeadline ?? 'The Journey Into The Flame Starts Here.';
  const heroLead     = cms?.heroLead     ?? "Admissions at The Flame is more than paperwork. It's the beginning of a Spirit-led partnership between your family and a community committed to helping your child grow in faith, wisdom, and purpose.";
  const fitItems     = cms?.fitItems?.length ? cms.fitItems : defaultFitItems;
  const enrollmentOpen           = cms?.enrollmentOpen           ?? true;
  const enrollmentOpenMessage    = cms?.enrollmentOpenMessage    ?? 'Enrollment for the upcoming school year is open. Complete the form to begin the admissions process and receive information about upcoming information meetings.';
  const enrollmentClosedMessage  = cms?.enrollmentClosedMessage  ?? 'Enrollment for the upcoming school year is currently closed. Complete the form to be added to our interest list and we\'ll reach out when enrollment reopens.';

  const requestInfoEyebrow  = cms?.requestInfoEyebrow  ?? 'Request Information';
  const requestInfoHeading  = cms?.requestInfoHeading  ?? "Have Questions? We'd Love to Meet Your Family.";
  const requestInfoBody1    = cms?.requestInfoBody1    ?? "Tell us a little about your family and what you're looking for. Someone from our team will follow up with next steps and upcoming information meeting details.";
  const requestInfoBody2    = cms?.requestInfoBody2    ?? 'Our admissions form is powered by Eduweby, the platform we use to manage enrollment. It takes about two minutes to complete.';
  const requestInfoBtnLabel = cms?.requestInfoBtnLabel ?? 'Begin Your Inquiry';
  const requestInfoImageSrc = cms?.requestInfoImage ? urlFor(cms.requestInfoImage).width(1200).url() : undefined;
  const requestInfoImageAlt = cms?.requestInfoImageAlt ?? 'Welcoming community atmosphere';

  const beforeApplyHeading = cms?.beforeApplyHeading ?? "What You're Saying Yes To.";
  const beforeApplyIntro   = cms?.beforeApplyIntro   ?? "The Flame is a cooperative — every family who joins is a partner, not just a participant. Before applying, it helps to know what you're stepping into:";
  const afterEnrollHeading = cms?.afterEnrollHeading ?? "You're Not Just on a Roster. You're Part of the Family.";
  const fitImageSrc        = cms?.fitImage ? urlFor(cms.fitImage).width(1200).url() : undefined;
  const fitImageAlt2       = cms?.fitImageAlt ?? 'Welcoming family community moment';
  const afterEnrollImageSrc = cms?.afterEnrollImage ? urlFor(cms.afterEnrollImage).width(1200).url() : undefined;
  const afterEnrollImageAlt = cms?.afterEnrollImageAlt ?? 'Parent and child at The Flame';

  type PtBlock = { _type?: string; children?: { text?: string }[] };
  const afterEnrollParagraphs: string[] | null = Array.isArray(cms?.afterEnrollBody)
    ? (cms!.afterEnrollBody as PtBlock[])
        .filter((b) => b?._type === 'block')
        .map((b) => (b.children ?? []).map((c) => c?.text ?? '').join(''))
        .filter((s) => s.trim().length > 0)
    : null;

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

      {/* BEFORE YOU APPLY */}
      <section style={{ padding: 'var(--section-v) 0' }}>
        <div className="container">
          <div className="split reveal">
            <div className="split__body">
              <span className="eyebrow">Before You Apply</span>
              <h2 style={{ marginBottom: '20px' }}>{beforeApplyHeading}</h2>
              <p style={{ marginBottom: '20px' }}>{beforeApplyIntro}</p>
              <ul className="fit-list">
                {fitItems.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="split__media reveal reveal-delay-1">
              {fitImageSrc ? (
                <div style={{ position: 'relative', width: '100%', aspectRatio: '3 / 4', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                  <Image src={fitImageSrc} alt={fitImageAlt2} fill sizes="(max-width: 768px) 100vw, 40vw" style={{ objectFit: 'cover' }} />
                </div>
              ) : (
                <ImagePlaceholder label="Photo: Welcoming family community moment" aspectRatio="tall" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* AFTER YOU ENROLL */}
      <section style={{ padding: 'var(--section-v) 0' }}>
        <div className="container">
          <div className="split reveal">
            <div className="split__body">
              <span className="eyebrow">After You Enroll</span>
              <h2 style={{ marginBottom: '20px' }}>{afterEnrollHeading}</h2>
              {afterEnrollParagraphs ? (
                afterEnrollParagraphs.map((p, i) => (
                  <p key={i} style={i > 0 ? { marginTop: '12px' } : undefined}>{p}</p>
                ))
              ) : (
                <>
                  <p>Once enrolled, your family receives access to the Parent Portal — your hub for schedules, curriculum resources, upcoming events, documents, payments, and onboarding information.</p>
                  <p style={{ marginTop: '12px' }}>The Flame team will walk you through next steps so you know what to expect, what&apos;s due, and how to prepare for the school year.</p>
                  <p style={{ marginTop: '12px', fontStyle: 'italic', fontWeight: 600, color: 'var(--gold)', fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>
                    We&apos;ll take care of the onboarding. You take care of showing up.
                  </p>
                </>
              )}
              <div style={{ marginTop: '32px' }}>
                <a href="#admissions-form" className="btn btn--primary" onClick={undefined}>Begin Admissions</a>
              </div>
            </div>
            <div className="split__media reveal reveal-delay-1">
              {afterEnrollImageSrc ? (
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                  <Image src={afterEnrollImageSrc} alt={afterEnrollImageAlt} fill sizes="(max-width: 768px) 100vw, 40vw" style={{ objectFit: 'cover' }} />
                </div>
              ) : (
                <ImagePlaceholder label="Photo: Parent and child at The Flame" aspectRatio="wide" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FORM (client component handles steps + form + enrollment banner) */}
      <AdmissionsForm
        enrollmentOpen={enrollmentOpen}
        enrollmentOpenMessage={enrollmentOpenMessage}
        enrollmentClosedMessage={enrollmentClosedMessage}
        requestInfoEyebrow={requestInfoEyebrow}
        requestInfoHeading={requestInfoHeading}
        requestInfoBody1={requestInfoBody1}
        requestInfoBody2={requestInfoBody2}
        requestInfoBtnLabel={requestInfoBtnLabel}
        requestInfoImageSrc={requestInfoImageSrc}
        requestInfoImageAlt={requestInfoImageAlt}
      />
    </>
  );
}
