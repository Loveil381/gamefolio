import type { Metadata } from 'next';
import HomeClient from './home-client';

export const metadata: Metadata = {
    title: 'Home | Gamefolio — Developer Portfolio & Games',
    description: 'A creative developer specializing in visually rich, interactive web applications and performant browser-based games.',
};

export default function Home() {
    return <HomeClient />;
}
