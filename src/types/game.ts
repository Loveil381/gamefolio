/**
 * Represents a tech stack item used in a game
 */
export interface TechBadge {
    /** The name of the technology (e.g., "React", "Three.js") */
    name: string;
}

/**
 * Represents a game in the portfolio
 */
export interface Game {
    /** Unique identifier for the game, used in URLs */
    slug: string;
    /** The title of the game */
    title: string;
    /** A short description of the game */
    description: string;
    /** The technologies used to build the game */
    techStack: TechBadge[];
    /** The genre of the game */
    genre: 'Arcade' | 'Puzzle' | 'Action' | 'Strategy' | 'Other';
    /** Tailwind color class for the thumbnail placeholder (e.g., 'bg-red-500') */
    thumbnailColor: string;
    /** URL to play the game (if hosted elsewhere or internal path) */
    playUrl?: string;
    /** A detailed development story or longer description */
    developmentStory?: string;
}
