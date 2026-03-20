'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { SearchItem } from '@/lib/content';

export function QuestionSearch({ index }: { index: SearchItem[] }) {
  const [term, setTerm] = useState('');
  const results = useMemo(() => {
    const query = term.trim().toLowerCase();
    if (query.length < 2) return [];
    return index.filter(item => item.title.toLowerCase().includes(query)).slice(0, 50);
  }, [index, term]);

  return (
    <>
      <input
        id="q"
        type="search"
        placeholder="type to search all 812 questions..."
        value={term}
        onChange={event => setTerm(event.target.value)}
        autoFocus
      />
      <div id="out" aria-live="polite">
        {term.trim().length >= 2 && (results.length ? results.map((item, i) => (
          <Link href={item.href} key={`${item.title}-${item.category}-${i}`}>
            {item.title}<small>{item.category}</small>
          </Link>
        )) : <p className="no-results">no matches</p>)}
      </div>
    </>
  );
}
