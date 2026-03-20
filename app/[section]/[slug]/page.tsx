import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MarkdownReader } from '@/components/markdown-reader';
import { getAllContentParams, readMarkdown, titleFromMarkdown, type ContentSection } from '@/lib/content';

type RouteParams = { section: string; slug: string };
const VALID_SECTIONS = new Set<ContentSection>(['patterns', 'problems', 'solutions']);

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllContentParams();
}

export async function generateMetadata({ params }: { params: Promise<RouteParams> }): Promise<Metadata> {
  const { section, slug } = await params;
  if (!VALID_SECTIONS.has(section as ContentSection)) return {};
  const markdown = await readMarkdown(section as ContentSection, slug);
  return { title: titleFromMarkdown(markdown, slug) };
}

export default async function MarkdownPage({ params }: { params: Promise<RouteParams> }) {
  const { section, slug } = await params;
  if (!VALID_SECTIONS.has(section as ContentSection)) notFound();
  const markdown = await readMarkdown(section as ContentSection, slug);
  return (
    <MarkdownReader
      markdown={markdown}
      baseHref={`/${section}/${slug}.md`}
      patternSlug={section === 'patterns' && !['README', 'raw-article'].includes(slug) ? slug : undefined}
    />
  );
}
