import { MetadataRoute } from 'next';
import { games } from '@/lib/data/games';
import { getPostSlugs } from '@/lib/mdx';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://gamefolio.vercel.app'; // Update with proper production URL

    // Static routes
    const routes = ['', '/about', '/games', '/blog', '/contact'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic game routes
    const gameRoutes = games.map((game) => ({
        url: `${baseUrl}/games/${game.slug}`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'yearly' as const,
        priority: 0.7,
    }));

    // Dynamic blog routes
    const postSlugs = getPostSlugs();
    const blogRoutes = postSlugs.map((slug) => ({
        url: `${baseUrl}/blog/${slug.replace(/\.mdx$/, '')}`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...routes, ...gameRoutes, ...blogRoutes];
}
