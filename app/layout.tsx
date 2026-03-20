import type { Metadata } from 'next';
import '../assets/style.css';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: 'DSA Practice Library',
  description: 'An offline-friendly data structures and algorithms question bank with solutions and interview pattern study cards.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
