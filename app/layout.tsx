import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { SiteHeader } from '@/components/site-header';

const nunito = localFont({
  src: [
    { path: './fonts/nunito-var.woff2', weight: '200 1000', style: 'normal' },
    { path: './fonts/nunito-var-italic.woff2', weight: '200 1000', style: 'italic' },
  ],
  display: 'swap',
  variable: '--font-nunito',
});

const jakarta = localFont({
  src: [
    { path: './fonts/jakarta-var.woff2', weight: '200 800', style: 'normal' },
    { path: './fonts/jakarta-var-italic.woff2', weight: '200 800', style: 'italic' },
  ],
  display: 'swap',
  variable: '--font-jakarta',
});

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
      <body className={`${nunito.variable} ${jakarta.variable}`}>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
