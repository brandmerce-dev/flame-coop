export const revalidate = 0;

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getLegalPage, getLegalPageSlugs } from '@/sanity/lib/queries';

export async function generateStaticParams() {
  const pages = await getLegalPageSlugs();
  return (pages ?? []).map((p: { slug: string }) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = await getLegalPage(slug);
  if (!page) return {};
  return {
    title:       page.seoTitle       ?? page.title,
    description: page.seoDescription ?? undefined,
    alternates:  { canonical: `https://theflame.org/legal/${slug}` },
  };
}

type PtBlock = {
  _type?: string;
  style?: string;
  children?: { text?: string; marks?: string[] }[];
  listItem?: string;
  level?: number;
};

function renderBlocks(blocks: PtBlock[]) {
  const elements: React.ReactNode[] = [];
  let listBuffer: PtBlock[] = [];
  let listType: 'bullet' | 'number' | null = null;

  function flushList() {
    if (!listBuffer.length) return;
    const Tag = listType === 'number' ? 'ol' : 'ul';
    elements.push(
      <Tag key={elements.length} style={{ paddingLeft: '1.5em', marginBottom: '1em' }}>
        {listBuffer.map((b, i) => (
          <li key={i} style={{ marginBottom: '.4em' }}>
            {(b.children ?? []).map((c, j) => renderSpan(c, j))}
          </li>
        ))}
      </Tag>
    );
    listBuffer = [];
    listType = null;
  }

  function renderSpan(child: { text?: string; marks?: string[] }, key: number) {
    let node: React.ReactNode = child.text ?? '';
    if (child.marks?.includes('strong')) node = <strong key={key}>{node}</strong>;
    if (child.marks?.includes('em'))     node = <em key={key}>{node}</em>;
    return node;
  }

  for (const block of blocks) {
    if (block._type !== 'block') continue;

    if (block.listItem) {
      const type = block.listItem === 'number' ? 'number' : 'bullet';
      if (listType && listType !== type) flushList();
      listType = type;
      listBuffer.push(block);
      continue;
    }

    flushList();

    const text = (block.children ?? []).map((c, j) => renderSpan(c, j));
    const style = block.style ?? 'normal';
    const mb = { marginBottom: '1em' };

    if (style === 'h1') { elements.push(<h1 key={elements.length} style={mb}>{text}</h1>); continue; }
    if (style === 'h2') { elements.push(<h2 key={elements.length} style={mb}>{text}</h2>); continue; }
    if (style === 'h3') { elements.push(<h3 key={elements.length} style={mb}>{text}</h3>); continue; }
    if (style === 'h4') { elements.push(<h4 key={elements.length} style={mb}>{text}</h4>); continue; }
    if (style === 'blockquote') {
      elements.push(
        <blockquote key={elements.length} style={{ borderLeft: '3px solid var(--gold)', paddingLeft: '1em', marginBottom: '1em', fontStyle: 'italic', color: 'var(--mid)' }}>{text}</blockquote>
      );
      continue;
    }
    elements.push(<p key={elements.length} style={mb}>{text}</p>);
  }

  flushList();
  return elements;
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getLegalPage(slug);

  if (!page) notFound();

  return (
    <section style={{ padding: '80px 0 100px' }}>
      <div className="container--narrow">
        <h1 style={{ marginBottom: '40px' }}>{page.title}</h1>
        <div style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--ink)' }}>
          {Array.isArray(page.body) ? renderBlocks(page.body as PtBlock[]) : null}
        </div>
      </div>
    </section>
  );
}
