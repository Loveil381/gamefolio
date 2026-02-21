/**
 * Interface representing a milestone in the developer journey.
 */
export interface TimelineMilestone {
    year: string;
    title: string;
    description: string;
    icon: string;
}

/**
 * Placeholder data for the developer journey timeline section.
 */
export const timelineData: TimelineMilestone[] = [
    {
        year: '2020',
        title: 'The Journey Begins',
        description: 'Wrote my first line of Python and discovered the magic of making computers solve problems. Started with automation scripts and basic web fundamentals.',
        icon: '🚀',
    },
    {
        year: '2021',
        title: 'First Game Project',
        description: 'Built a standalone Snake game using vanilla JavaScript and HTML5 Canvas. This project sparked my deep interest in interactive graphics and game loops.',
        icon: '🎮',
    },
    {
        year: '2022',
        title: 'Mastering the Modern Web',
        description: 'Dived headfirst into React and the TypeScript ecosystem. Focused on building scalable frontend architectures and reusable component libraries.',
        icon: '⚛️',
    },
    {
        year: '2023',
        title: 'Building Gamefolio',
        description: 'Synthesized my love for games and web engineering by building this portfolio. Leveraged Next.js App Router for high-performance content delivery.',
        icon: '⚡',
    },
    {
        year: '2024',
        title: 'AI-Assisted Development',
        description: 'Exploring the intersection of AI and software engineering. Leveraging LLMs to accelerate development workflows and build more complex interactive experiences.',
        icon: '🤖',
    },

];
