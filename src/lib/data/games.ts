import { Game } from '@/types/game';

export const games: Game[] = [
    {
        slug: 'neon-drifter',
        title: 'Neon Drifter',
        description: 'A fast-paced arcade racing game with neon aesthetics and synthwave beats.',
        techStack: [{ name: 'Three.js' }, { name: 'React Fiber' }, { name: 'Zustand' }],
        genre: 'Arcade',
        thumbnailColor: 'bg-fuchsia-600',
        playUrl: '#',
        developmentStory: 'Neon Drifter started as a weekend experiment with React Three Fiber. The goal was to create a performant infinite runner in the browser without sacrificing visual quality. The core loop was built in just 48 hours, but tweaking the physics and lighting took another two weeks of polish.',
    },
    {
        slug: 'block-weaver',
        title: 'Block Weaver',
        description: 'A relaxing puzzle game where you arrange blocks to form intricate patterns.',
        techStack: [{ name: 'React' }, { name: 'Framer Motion' }, { name: 'Tailwind' }],
        genre: 'Puzzle',
        thumbnailColor: 'bg-emerald-500',
        playUrl: '#',
        developmentStory: 'Designed to be a zen experience, Block Weaver focuses heavily on smooth animations and satisfying interactions. Every block placement is accompanied by subtle physics-based animations powered by Framer Motion.',
    },
    {
        slug: 'stellar-defender',
        title: 'Stellar Defender',
        description: 'Defend your home planet against waves of alien invaders in this classic action shooter.',
        techStack: [{ name: 'Phaser.io' }, { name: 'TypeScript' }],
        genre: 'Action',
        thumbnailColor: 'bg-indigo-600',
        playUrl: '#',
        developmentStory: 'An homage to classic arcade shooters, Stellar Defender was my first foray into the Phaser.io framework. It taught me a lot about sprite management, collision detection, and game loops.',
    },
    {
        slug: 'logic-gates',
        title: 'Logic Gates',
        description: 'Build complex circuits and solve logical puzzles using basic electronic components.',
        techStack: [{ name: 'Vue' }, { name: 'Canvas API' }],
        genre: 'Puzzle',
        thumbnailColor: 'bg-amber-500',
        playUrl: '#',
        developmentStory: 'Logic Gates was built to help beginners understand how computers work at a fundamental level. The hardest part was building a performant graph traversal engine to simulate the flow of electricity in real-time.',
    },
    {
        slug: 'snake',
        title: 'Snake',
        description: 'Classic snake gameplay on a grid canvas with smooth animations and neon aesthetic.',
        techStack: [{ name: 'HTML5 Canvas' }, { name: 'Vanilla JS' }],
        genre: 'Arcade',
        thumbnailColor: 'bg-zinc-800',
        playUrl: '/games/snake/index.html',
        developmentStory: 'A standalone homage to the classic retro snake game, built entirely with vanilla JavaScript and the Canvas API. Optimized for both desktop arrow keys and mobile swipe controls.',
    },
    {
        slug: 'space-shooter',
        title: 'Space Shooter',
        description: 'Defend the galaxy against endless waves of enemies in this fast-paced arcade shooter.',
        techStack: [{ name: 'HTML5 Canvas' }, { name: 'Vanilla JS' }, { name: 'Game Physics' }],
        genre: 'Arcade',
        thumbnailColor: 'bg-fuchsia-900',
        playUrl: '/games/space-shooter/index.html',
        developmentStory: 'A fast-paced arcade shooter built from scratch with zero dependencies using vanilla JavaScript and HTML5 Canvas. Features include particle explosion effects, increasing difficulty waves, and full touch support for mobile devices.',
    }
];

export const genres = ['All', 'Arcade', 'Puzzle', 'Action', 'Strategy', 'Other'] as const;
