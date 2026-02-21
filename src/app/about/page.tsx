import type { Metadata } from 'next';
import AboutClient from './about-client';

export const metadata: Metadata = {
    title: 'About',
    description: 'Learn more about my journey, experience, and the technologies I use.',
};

export default function AboutPage() {
    return <AboutClient />;
}
