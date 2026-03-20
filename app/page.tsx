import Link from 'next/link';
import { PatternGrid } from '@/components/pattern-grid';
import { getCategoryData, getPatternData } from '@/lib/content';

export default async function HomePage() {
  const [categories, patterns] = await Promise.all([getCategoryData(), getPatternData()]);
  const total = categories.reduce((sum, category) => sum + category.count, 0);

  return (
    <main>
      <h1>500+ Data Structures &amp; Algorithms Questions</h1>
      <p>Picked from <a href="https://medium.com/techie-delight/500-data-structures-and-algorithms-practice-problems-35afe8a1e222">Techie Delight on Medium</a> &middot; solutions included &middot; works offline</p>
      <p><Link className="search-link" href="/q">search questions</Link></p>
      <div className="grid">
        {categories.map(category => (
          <Link className="card" href={`/problems/${category.slug}`} key={category.slug}>
            <span className="cat">{category.name}</span><span className="count">{category.count}</span>
          </Link>
        ))}
        <Link className="card" href="/full-article"><span className="cat">source article</span><span className="count">file</span></Link>
        <a className="card" href="/urls.txt"><span className="cat">source URLs</span><span className="count">file</span></a>
      </div>
      <p className="total">{total} entries &middot; ~630 unique questions &middot; all offline</p>
      <h2>19 Interview Patterns</h2>
      <p>Study cards based on <a href="/patterns/raw-article">14 Patterns to Ace Any Coding Interview Question</a>, extended with templates, pitfalls and linked practice problems. <Link href="/patterns/README">Cheat sheet &amp; decision flow</Link></p>
      <PatternGrid patterns={patterns} />
    </main>
  );
}
