'use client';

import ImagePlaceholder from '@/components/ImagePlaceholder';
import { openRequestInfoModal } from '@/components/RequestInfoModal';

interface AdmissionsFormProps {
  enrollmentOpen:          boolean;
  enrollmentOpenMessage:   string;
  enrollmentClosedMessage: string;
}

const admissionSteps = [
  { num: 1, title: 'Attend an Information Meeting', body: 'All prospective families attend an information meeting before applying. This is your chance to understand the heart of The Flame, ask every question you have, and prayerfully decide if this community is the right fit for your family.' },
  { num: 2, title: 'Submit Your Application', body: "Complete and submit the application online. After submitting, you'll receive a prompt to pay the application and interview fee. Applications are not reviewed until the fee is received.", fee: 'Fee: $50 first child · $25 each additional child · $75 family maximum · Non-refundable' },
  { num: 3, title: 'Family Interview', body: "Our team will reach out to schedule your family interview. This step is relational. We're not just reviewing paperwork — we're learning about your family and prayerfully discerning fit together." },
  { num: 4, title: 'Acceptance Notification', body: "Within three weeks of your interview, you'll hear from us. Accepted, waitlisted, or if placement isn't currently possible — every family is communicated with honestly and with care." },
  { num: 5, title: "Secure Your Child's Spot", body: "Upon acceptance, pay the supply fee within 3 business days to hold your child's place in the program.", fee: 'Supply fee: $200 for Sparks/Elementary · $150 for Discipleship · Non-refundable' },
  { num: 6, title: 'Complete Registration + Sign the Handbook', body: 'Pay the registration fee and receive access to the Family Handbook to review and sign.', fee: 'Reg. fee: $500 for Sparks · $1,250 for Elementary and Discipleship · Non-refundable' },
  { num: 7, title: 'Background Check + Parent Portal Access', body: "After the handbook is submitted, the background check fee is collected per parent. Then your family receives full access to the Parent Portal — schedules, curriculum, events, payments, and everything you need to start the year well.", fee: 'Background fee: $20 per parent' },
];

export default function AdmissionsForm({ enrollmentOpen, enrollmentOpenMessage, enrollmentClosedMessage }: AdmissionsFormProps) {

  return (
    <>
      {/* ADMISSIONS PROCESS */}
      <section className="section--cream">
        <div className="container">
          <div className="reveal" style={{ maxWidth: '560px', marginBottom: '32px' }}>
            <span className="eyebrow">The Admissions Process</span>
            <h2 style={{ marginBottom: '12px' }}>How It Works — Step by Step.</h2>
            <p>Seven clear steps. You&apos;ll know exactly where you are and what&apos;s next at every stage.</p>
          </div>
          <div className="steps reveal">
            {admissionSteps.map((step) => (
              <div key={step.num} className="step">
                <div className="step__num">{step.num}</div>
                <div className="step__body">
                  <div className="step__title">{step.title}</div>
                  <p className="step__text">{step.body}</p>
                  {step.fee && <div className="step__fee">{step.fee}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REQUEST INFO */}
      <section className="section--cream2" id="admissions-form">
        <div className="container">
          <div className="split reveal">
            <div className="split__body">
              <div className="enroll-banner">
                <div className={`enroll-banner__dot${enrollmentOpen ? '' : ' enroll-banner__dot--closed'}`} />
                <p className="enroll-banner__text">
                  <strong>Enrollment Status:</strong>{' '}
                  {enrollmentOpen ? enrollmentOpenMessage : enrollmentClosedMessage}
                </p>
              </div>
              <span className="eyebrow">Request Information</span>
              <h2 style={{ marginBottom: '20px' }}>Have Questions? We&apos;d Love to Meet Your Family.</h2>
              <p style={{ marginBottom: '12px' }}>
                Tell us a little about your family and what you&apos;re looking for. Someone from our team will follow up with next steps and upcoming information meeting details.
              </p>
              <p style={{ marginBottom: '32px', color: 'var(--mid)' }}>
                Our admissions form is powered by Eduweby, the platform we use to manage enrollment. It takes about two minutes to complete.
              </p>
              <button
                onClick={openRequestInfoModal}
                className="btn btn--primary"
              >
                Begin Your Inquiry
              </button>
            </div>
            <div className="split__media reveal reveal-delay-1" style={{ paddingTop: '48px' }}>
              <ImagePlaceholder label="Photo: Welcoming community atmosphere" aspectRatio="tall" />
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
