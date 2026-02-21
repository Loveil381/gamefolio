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
  metadataBase: new URL('https://gamefolio.vercel.app'),
  title: {
    template: '%s | Gamefolio',
    default: 'Gamefolio | Developer Portfolio & Games',
  },
  description: 'A production-grade developer portfolio showcasing playable browser games, technical blog posts, and case studies.',
  keywords: ['Game Developer', 'Web Developer', 'Portfolio', 'Browser Games', 'React', 'Next.js', 'TypeScript', 'Three.js'],
  authors: [{ name: 'Developer Name' }],
  openGraph: {
    title: 'Gamefolio | Developer Portfolio & Games',
    description: 'A production-grade developer portfolio showcasing playable browser games, technical blog posts, and case studies.',
    url: 'https://gamefolio.vercel.app', // Placeholder URL
    siteName: 'Gamefolio',
    images: [
      {
        url: '/og-image.jpg', // Placeholder image
        width: 1200,
        height: 630,
        alt: 'Gamefolio - Developer Portfolio & Games',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gamefolio | Developer Portfolio & Games',
    description: 'A production-grade developer portfolio showcasing playable browser games, technical blog posts, and case studies.',
    images: ['/og-image.jpg'],
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
