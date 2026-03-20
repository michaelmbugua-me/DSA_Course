'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Pattern = { slug: string; title: string };
type Progress = Record<string, { complete?: boolean; questions?: Record<string, boolean> }>;
const STORAGE_KEY = 'medium-dsas-pattern-progress-v1';
const QUESTION_GOAL = 5;

export function PatternGrid({ patterns }: { patterns: Pattern[] }) {
  const [progress, setProgress] = useState<Progress>({});

  useEffect(() => {
    try {
      setProgress(JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'));
    } catch {
      setProgress({});
    }
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
