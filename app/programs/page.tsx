export const revalidate = 60;

import type { Metadata } from 'next';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import { getPrograms } from '@/sanity/lib/queries';

const defaultElementary = [
  { name: 'Sparks',       level: 'Kindergarten', ages: 'Ages 5–6',   theme: 'The First Spark',             description: "Play-based, warm, and full of wonder. Children build early phonics, number sense, listening skills, and social confidence while being introduced to God as Creator and Father. This stage is joyful by design — because first impressions of learning should be good ones." },
  { name: 'Embers',       level: 'Level 1',      ages: 'Ages 6–8',   theme: 'Who Is God the Creator?',     description: 'Rooted in the Old Testament, Embers students begin to understand God as Creator, Provider, Covenant-keeper, and faithful Father. Every lesson returns to the same question: Who made this, and what does it tell us about Him?' },
  { name: 'Illuminators', level: 'Level 2',      ages: 'Ages 8–10',  theme: 'How Do We Walk With Christ?', description: "Illuminators discover Jesus through the Gospels — His life, His teachings, His love, His call to follow. The light of Christ starts becoming personal. Students aren't just learning about Jesus anymore; they're learning what it means to walk with Him." },
  { name: 'Firestarters', level: 'Level 3',      ages: 'Ages 10–12', theme: 'Encountering the Holy Spirit', description: 'Firestarters explore the early church and the Spirit moving through ordinary people who said yes. Identity in Christ takes root. Leadership begins to emerge. Students start to see that the same Spirit who moved in Scripture is still moving today.' },
];

const defaultDiscipleship = [
  { badgeLabel: 'DI',   name: 'Discipleship I',   level: 'Middle School', ages: 'Ages 12–14', theme: 'Biblical Truth in a Secular World',  description: "Students examine the foundations of Biblical Truth alongside the messages they hear from the world — through Socratic discussion, debate, writing, and introductory apologetics. They begin moving from inherited faith to owned faith. They learn to ask hard questions, reason clearly, and stand on God's Word with humility and courage." },
  { badgeLabel: 'DII',  name: 'Discipleship II',  level: 'Upper Middle',  ages: 'Ages 14–16', theme: "Discerning God's Voice",              description: "Building on Discipleship I, students go deeper — learning to recognize God's voice, strengthen their walk with Christ under pressure, and engage culture with grace and conviction. Advanced rhetoric, writing, and reasoning sharpen both faith and mind. This level prepares students to live out their faith in a world that won't always understand it." },
  { badgeLabel: 'DIII', name: 'Discipleship III', level: 'High School',   ages: 'Ages 16+',   theme: 'Ready for the World',                 description: "Discipleship III is where formation becomes real-life readiness. Students learn to know who they are in Christ, articulate and defend what they believe, and apply Biblical Truth to the decisions and pressures that come after high school. Designed to complement dual enrollment — giving students the spiritual and intellectual formation to carry their faith confidently into college, work, ministry, and adult life." },
];

const defaultSubjects = [
  { name: 'Bible & Spiritual Development', desc: "Every day is grounded in a biblical worldview. Students move through the Old Testament, the Gospels, the early church, and the ongoing work of the Holy Spirit — one level at a time, building on what came before." },
  { name: 'Math',                          desc: "Using the Saxon Math Program, students receive guided small-group instruction plus real-life application. Math isn't a worksheet here — it's a window into the order and beauty of what God made." },
  { name: 'Reading & Language Arts',       desc: "We use the Orton-Gillingham multisensory approach — one of the most effective reading models available. Students build strong foundations in reading, writing, spelling, and comprehension. Upper levels tackle full novels, annotation, and literary analysis." },
  { name: 'Science, History, Music & Art', desc: "Interdisciplinary units built around a central theme — connecting subjects across learning styles. Students don't just read about things. They build them, discuss them, and ask real questions about them." },
  { name: 'Grammar & Writing',             desc: "Grammar is discovered, not memorized. Writing is taught as a skill worth mastering — students learn to organize their thoughts, support an argument, and say exactly what they mean." },
];

export const metadata: Metadata = {
  title: 'Programs',
  description: "From Kindergarten through high school — academically rich, spiritually rooted, moving at your child's actual pace. Every program is a step deeper into the fire.",
  openGraph: {
    title:       'Programs | The Flame Christian Co-op',
    description: 'From Kindergarten through high school — academically rich, spiritually rooted.',
  },
  alternates: { canonical: 'https://theflame.org/programs' },
};

function renderBadgeLabel(label: string) {
  if (label === 'DI')   return <><span>D</span><span style={{ fontSize: '.7em' }}>I</span></>;
  if (label === 'DII')  return <><span>D</span><span style={{ fontSize: '.7em' }}>II</span></>;
  if (label === 'DIII') return <><span>D</span><span style={{ fontSize: '.7em' }}>III</span></>;
  return label;
}

export default async function ProgramsPage() {
  const sanityPrograms = await getPrograms();

  const elementaryPrograms   = sanityPrograms?.filter((p: { variant: string }) => p.variant === 'elementary')   ?? [];
  const discipleshipPrograms = sanityPrograms?.filter((p: { variant: string }) => p.variant === 'discipleship') ?? [];

  const elementary   = elementaryPrograms.length   ? elementaryPrograms   : defaultElementary;
  const discipleship = discipleshipPrograms.length ? discipleshipPrograms : defaultDiscipleship;

  return (
    <>
      {/* HERO */}
      <section style={{ padding: '80px 0 64px', background: 'var(--cream2)' }}>
        <div className="container--narrow" style={{ textAlign: 'center' }}>
          <span className="eyebrow" style={{ display: 'block', textAlign: 'center', justifyContent: 'center' }}>
            Our Programs
          </span>
          <h1 style={{ marginBottom: '20px' }}>Every Program Is a Step Deeper Into the Fire.</h1>
          <p className="lead">From Kindergarten through high school — academically rich, spiritually rooted, moving at your child&apos;s actual pace.</p>
        </div>
      </section>

      {/* HOW THE LEVELS WORK */}
      <section style={{ padding: 'var(--section-v) 0' }}>
        <div className="container">
          <div className="split reveal">
            <div className="split__body">
              <span className="eyebrow">How the Levels Work</span>
              <h2 style={{ marginBottom: '20px' }}>Not Grade Levels. Flame Levels.</h2>
              <p>At The Flame, children aren&apos;t sorted by age and pushed through a fixed track. They&apos;re placed where they are actually ready to learn — developmentally, academically, socially, and spiritually.</p>
              <p style={{ marginTop: '12px' }}>Each level runs a two-year cycled curriculum. Students build real mastery before moving forward. Some children move through a level in one year; others need two. Either way, the goal is the same: solid ground, steady growth, a child who is genuinely ready for the next step.</p>
            </div>
            <div className="split__media reveal reveal-delay-1">
              <ImagePlaceholder label="Photo: Students in a hands-on activity" aspectRatio="wide" />
            </div>
          </div>
        </div>
      </section>

      {/* ELEMENTARY PROGRAMS */}
      <section className="section--cream">
        <div className="container">
          <div className="reveal" style={{ maxWidth: '680px', marginBottom: '32px' }}>
            <span className="eyebrow">Elementary Programs</span>
            <h2 style={{ marginBottom: '12px' }}>The First Three Levels — Where the Fire Starts.</h2>
            <p>Ages 5–12. Play-based foundations, Old Testament roots, and the growing realization that the same God who made the universe made them.</p>
          </div>
          <div className="prog-cards reveal">
            {elementary.map((p: typeof defaultElementary[0], i: number) => (
              <div key={i} className="prog-card">
                <div className="prog-card__badge">
                  <div className="prog-card__flame">{p.name}</div>
                  <div className="prog-card__level">{p.level}</div>
                  <div className="prog-card__ages">{p.ages}</div>
                </div>
                <div className="prog-card__body">
                  <div className="prog-card__theme">{'theme' in p ? p.theme : (p as { themeLine?: string }).themeLine}</div>
                  <p className="prog-card__text">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISCIPLESHIP PROGRAMS */}
      <section style={{ padding: 'var(--section-v) 0' }}>
        <div className="container">
          <div className="reveal" style={{ maxWidth: '740px', marginBottom: '32px' }}>
            <span className="eyebrow">Discipleship Programs</span>
            <h2 style={{ marginBottom: '12px' }}>The Next Three Levels — Where Faith Gets Tested and Owned.</h2>
            <p>Ages 12 and up. This is where your teenager stops inheriting their faith and starts owning it.</p>
          </div>
          <div className="prog-cards reveal">
            {discipleship.map((p: typeof defaultDiscipleship[0], i: number) => (
              <div key={i} className="prog-card prog-card--discipleship">
                <div className="prog-card__badge">
                  <div className="prog-card__flame">{renderBadgeLabel(p.badgeLabel)}</div>
                  <div className="prog-card__level">{p.level}</div>
                  <div className="prog-card__ages">{p.ages}</div>
                </div>
                <div className="prog-card__body">
                  <div className="prog-card__theme">{'theme' in p ? p.theme : (p as { themeLine?: string }).themeLine}</div>
                  <p className="prog-card__text">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACADEMIC APPROACH */}
      <section className="section--cream2">
        <div className="container">
          <div className="reveal" style={{ maxWidth: '680px', marginBottom: '32px' }}>
            <span className="eyebrow">Academic Approach</span>
            <h2 style={{ marginBottom: '12px' }}>Strong Academics, Built on a Biblical Worldview.</h2>
            <p>Academics matter at The Flame because children are called to think, communicate, create, solve, discern, and lead.</p>
          </div>
          <div className="subject-rows reveal">
            {defaultSubjects.map((s, i) => (
              <div key={i} className="subject-row">
                <div className="subject-row__label">
                  <div className="subject-row__name">{s.name}</div>
                </div>
                <div className="subject-row__body">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
