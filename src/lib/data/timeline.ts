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
        title: 'Hello World',
        description: 'Wrote my first line of code and discovered a passion for programming. Started learning Web Development fundamentals: HTML, CSS, and basic JavaScript.',
        icon: '🚀',
    },
    {
        year: '2021',
        title: 'Frontend Frameworks',
        description: 'Dived deeper into React and single-page applications. Built a few small personal projects and an initial portfolio to showcase my learning.',
        icon: '⚛️',
    },
    {
        year: '2022',
        title: 'Full Stack Journey',
        description: 'Learned backend technologies like Node.js and Express. Deployed my first full-stack application with a database and user authentication.',
        icon: '🛠️',
    },
    {
        year: '2023',
        title: 'Focus on Performance',
        description: 'Transitioned to Next.js for server-side rendering and static site generation. Focused on building highly performant and accessible web experiences.',
        icon: '⚡',
    },
    {
        year: '2024',
        title: 'Creative Coding & Games',
        description: 'Started exploring WebGL, Three.js, and browser-based game development to build interactive and playful web applications inside Gamefolio.',
        icon: '🎮',
    },
];
