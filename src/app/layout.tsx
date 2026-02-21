import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { PageLayout } from '@/components/layout/page-layout';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#09090b', // Assuming a dark background color from zinc
};

export const metadata: Metadata = {
  metadataBase: new URL('https://gamefolio-three.vercel.app'),
  title: {
    template: '%s | Gamefolio',
    default: 'Gamefolio | Developer Portfolio & Games',
  },
  description: 'A production-grade developer portfolio built with Next.js, showcasing playable browser games and technical articles.',
  keywords: ['Game Developer', 'Web Developer', 'Portfolio', 'Browser Games', 'React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  authors: [{ name: 'Gamefolio Developer' }],
  openGraph: {
    title: 'Gamefolio | Developer Portfolio & Games',
    description: 'A production-grade developer portfolio built with Next.js, showcasing playable browser games and technical articles.',
    url: 'https://gamefolio-three.vercel.app',
    siteName: 'Gamefolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gamefolio | Developer Portfolio & Games',
    description: 'A production-grade developer portfolio built with Next.js, showcasing playable browser games and technical articles.',
  },
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
