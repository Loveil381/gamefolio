import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { PageLayout } from '@/components/layout/page-layout';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Gamefolio | Developer Portfolio',
  description: 'A production-grade developer portfolio showcasing playable browser games, technical blog posts, and case studies.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-background text-text-primary`}>
        <PageLayout>
          {children}
        </PageLayout>
      </body>
    </html>
  );
}
