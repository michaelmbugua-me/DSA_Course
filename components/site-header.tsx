'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();
  const isQuestionsPage = pathname.startsWith('/problems');
  const isPatternsPage = pathname.startsWith('/patterns');
  const isSearchPage = pathname === '/q' || pathname === '/search';

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
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="home" href="/" aria-current={pathname === '/' ? 'page' : undefined}>
          <span className="brand-mark" aria-hidden="true">DSA</span>
          <span className="brand-name">Practice Library</span>
        </Link>
        <nav className="primary-nav" aria-label="Primary navigation">
          <Link
            className={`nav-link${isQuestionsPage ? ' is-active' : ''}`}
            href="/#questions"
            aria-current={isQuestionsPage ? 'location' : undefined}
          >
            Questions
          </Link>
          <Link
            className={`nav-link${isPatternsPage ? ' is-active' : ''}`}
            href="/#patterns"
            aria-current={isPatternsPage ? 'location' : undefined}
          >
            Patterns
          </Link>
          <Link
            className={`nav-link${isSearchPage ? ' is-active' : ''}`}
            href="/q"
            aria-current={isSearchPage ? 'page' : undefined}
          >
            Search
          </Link>
        </nav>
        <button
          id="theme-toggle"
          type="button"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          aria-pressed={theme === 'dark'}
          onClick={toggleTheme}
        >
          {theme === 'dark' ? 'light' : 'dark'}
        </button>
      </div>
    </header>
  );
}
