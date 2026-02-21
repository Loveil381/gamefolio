import type { Metadata } from 'next';
import { games } from '@/lib/data/games';
import GameDetailClient from './game-detail-client';

export async function generateStaticParams() {
    return games.map((game) => ({
        slug: game.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const game = games.find((g) => g.slug === slug);

    if (!game) {
        return {
            title: 'Game Not Found',
        };
    }

    return {
        title: game.title,
        description: game.description,
    };
}

export default function GameDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    return <GameDetailClient params={params} />;
}
