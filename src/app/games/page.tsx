import type { Metadata } from 'next';
import GamesClient from './games-client';

export const metadata: Metadata = {
    title: 'Games',
    description: 'Explore a collection of interactive games spanning different genres and technologies built by Gamefolio.',
};

export default function Games() {
    return <GamesClient />;
}
