'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Theme = 'light' | 'dark';
const THEME_STORAGE_KEY = 'medium-dsas-theme-v1';

function readTheme(): Theme {
  try {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) ?? localStorage.getItem('theme');
    return storedTheme === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export function SiteHeader() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const saved = readTheme();
    document.documentElement.dataset.theme = saved;
    setTheme(saved);
  }, []);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Keep the in-memory theme toggle usable when storage is unavailable.
    }
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
