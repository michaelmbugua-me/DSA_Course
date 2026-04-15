import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

export const CATEGORIES = [
  'Array', 'Backtracking', 'Binary', 'Binary Tree', 'BST', 'Divide & Conquer',
  'Dynamic Programming', 'Graph', 'Greedy', 'Heap', 'Linked List', 'Matrix',
  'Puzzles', 'Queue', 'Sorting', 'Stack', 'String', 'Trie',
] as const;

export type ContentSection = 'patterns' | 'problems' | 'solutions';
export type SearchItem = { title: string; href: string; category: string };

const ROOT = process.cwd();

export function slugify(value: string) {
  return value.toLowerCase().replaceAll(' & ', '-').replaceAll(' ', '-');
}

export function titleFromMarkdown(markdown: string, fallback: string) {
  const heading = markdown.match(/^#\s+(.+)$/m)?.[1];
  return heading?.replace(/\*\*/g, '').trim() || fallback;
}

export async function readMarkdown(section: ContentSection, slug: string) {
  return readFile(path.join(ROOT, section, `${slug}.md`), 'utf8');
}

async function markdownSlugs(section: ContentSection) {
  const files = await readdir(path.join(ROOT, section));
  return files.filter(file => file.endsWith('.md')).map(file => file.slice(0, -3));
}

export async function getAllContentParams() {
  const sections: ContentSection[] = ['patterns', 'problems', 'solutions'];
  const entries = await Promise.all(sections.map(async section =>
    (await markdownSlugs(section)).map(slug => ({ section, slug }))
  ));
  return entries.flat();
}

export async function getCategoryData() {
  return Promise.all(CATEGORIES.map(async name => {
    const slug = slugify(name);
    const markdown = await readMarkdown('problems', slug);
    const count = markdown.match(/^\d+\.\s/gm)?.length || 0;
    return { name, slug, count };
  }));
}

export async function getPatternData() {
  const slugs = (await markdownSlugs('patterns'))
    .filter(slug => slug !== 'README' && slug !== 'raw-article')
    .sort();
  return Promise.all(slugs.map(async slug => {
    const markdown = await readMarkdown('patterns', slug);
    return { slug, title: titleFromMarkdown(markdown, slug) };
  }));
}

export async function getSearchIndex(): Promise<SearchItem[]> {
  const results: SearchItem[] = [];
  const categories = await Promise.all(CATEGORIES.map(async category => ({
    category,
    markdown: await readMarkdown('problems', slugify(category)),
  })));

  for (const { category, markdown } of categories) {
    const expression = /^\d+\.\s+\[([^\]]+)\]\(([^)]+)\)/gm;
    for (const match of markdown.matchAll(expression)) {
      const target = match[2].split('#')[0];
      const file = path.posix.basename(target).replace(/\.md$/, '');
      results.push({
        title: match[1],
        href: target.startsWith('http') ? target : `/solutions/${file}`,
        category,
      });
    }
  }
  return results;
}
