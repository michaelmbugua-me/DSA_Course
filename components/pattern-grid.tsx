'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { readPatternProgress, type PatternProgress } from '@/lib/pattern-progress';

type Pattern = { slug: string; title: string };
const QUESTION_GOAL = 5;

export function PatternGrid({ patterns }: { patterns: Pattern[] }) {
  const [progress, setProgress] = useState<PatternProgress>({});

  useEffect(() => {
    setProgress(readPatternProgress());
  }, []);

  return (
    <div className="grid">
      {patterns.map(({ slug, title }) => {
        const state = progress[slug] || {};
        const done = Object.values(state.questions || {}).filter(Boolean).length;
        return (
          <Link className={`card${state.complete ? ' is-pattern-complete' : ''}`} href={`/patterns/${slug}`} key={slug}>
            <span className="cat">{title}</span>
            <span className="count">&rarr;</span>
            <span className={`pattern-progress mono${state.complete ? ' is-complete' : ''}`}>
              {state.complete ? 'complete' : `${done}/${QUESTION_GOAL}`}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
