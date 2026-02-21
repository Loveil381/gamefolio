export type Post = {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
};

export const posts: Post[] = [
    {
        slug: 'building-neon-drifter',
        title: 'How I Built Neon Drifter in 48 Hours',
        date: '2026-01-15',
        excerpt: 'A deep dive into using React Three Fiber and Zustand to build a high-performance 3D racing game in the browser.',
        tags: ['React Three Fiber', 'Game Dev', 'JavaScript'],
    },
    {
        slug: 'framer-motion-magic',
        title: 'Mastering Framer Motion for Web Animations',
        date: '2026-02-05',
        excerpt: 'Learn how to create buttery-smooth, physics-based animations in React using Framer Motion.',
        tags: ['React', 'Animation', 'CSS'],
    },
    {
        slug: 'why-i-chose-nextjs-for-my-portfolio',
        title: 'Why I Chose Next.js for My Developer Portfolio',
        date: '2026-02-18',
        excerpt: 'An opinionated review of the modern React ecosystem and why Next.js is my go-to framework for building fast, SEO-friendly apps.',
        tags: ['Next.js', 'Web Dev', 'Architecture'],
    },
];
