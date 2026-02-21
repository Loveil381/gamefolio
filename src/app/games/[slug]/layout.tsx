import { games } from '@/lib/data/games';

export function generateStaticParams() {
    return games.map((game) => ({
        slug: game.slug,
    }));
}

export default function GameDetailLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
