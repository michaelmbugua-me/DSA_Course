'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export function SiteHeader() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = saved;
    setTheme(saved);
  }, []);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
    setTheme(next);
  }

  return (
    <header>
      <Link className="home" href="/">home</Link>
      <span className="crumb">DSA practice library</span>
      <button id="theme-toggle" type="button" aria-label="Toggle color theme" onClick={toggleTheme}>
        {theme === 'dark' ? 'light' : 'dark'}
      </button>
    </header>
  );
}
