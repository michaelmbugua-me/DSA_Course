import type { Metadata } from 'next';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { MarkdownReader } from '@/components/markdown-reader';

export const metadata: Metadata = { title: '500+ DSA Interview Questions — Source Article' };

export default async function FullArticlePage() {
  const markdown = await readFile(path.join(process.cwd(), 'full-article.md'), 'utf8');
  return <MarkdownReader markdown={markdown} baseHref="/full-article.md" />;
}
