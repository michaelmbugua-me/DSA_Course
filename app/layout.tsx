import type { Metadata } from 'next';
import '../assets/style.css';
import { SiteHeader } from '@/components/site-header';

const themeBootstrapScript = `(() => {
  try {
    const theme = localStorage.getItem('medium-dsas-theme-v1') || localStorage.getItem('theme');
    document.documentElement.dataset.theme = theme === 'dark' ? 'dark' : 'light';
  } catch {
    document.documentElement.dataset.theme = 'light';
  }
})();`;

export const metadata: Metadata = {
  title: 'DSA Practice Library',
  description: 'An offline-friendly data structures and algorithms question bank with solutions and interview pattern study cards.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
