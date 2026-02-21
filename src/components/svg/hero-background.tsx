import React from 'react';

/**
 * Prop types for the HeroBackground component.
 */
interface HeroBackgroundProps {
    /** Optional CSS class name */
    className?: string;
}

/**
 * An animated SVG background for the hero section featuring floating geometric shapes.
 * Uses inline CSS animations to create slow drifting and pulsing effects with neon colors.
 *
 * @param {HeroBackgroundProps} props - The component props.
 * @returns {React.ReactElement} The HeroBackground component.
 */
export const HeroBackground: React.FC<HeroBackgroundProps> = ({ className = '' }) => {
    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none z-[-1] opacity-60 ${className}`}>
            <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
            >
                <style>
                    {`
            @keyframes drift1 {
              0% { transform: translate(0, 0) rotate(0deg); }
              33% { transform: translate(30px, -50px) rotate(10deg); }
              66% { transform: translate(-20px, 20px) rotate(-5deg); }
              100% { transform: translate(0, 0) rotate(0deg); }
            }
            @keyframes drift2 {
              0% { transform: translate(0, 0) scale(1); opacity: 0.3; }
              50% { transform: translate(-40px, -30px) scale(1.1); opacity: 0.8; }
              100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
            }
            @keyframes drift3 {
              0% { transform: translate(0, 0) rotate(0deg); opacity: 0.2; }
              50% { transform: translate(50px, 40px) rotate(15deg); opacity: 0.6; }
              100% { transform: translate(0, 0) rotate(0deg); opacity: 0.2; }
            }
            .shape-1 { animation: drift1 25s ease-in-out infinite; transform-origin: center; }
            .shape-2 { animation: drift2 20s ease-in-out infinite; transform-origin: center; }
            .shape-3 { animation: drift3 30s ease-in-out infinite; transform-origin: center; }
          `}
                </style>

                {/* Glow Filters */}
                <defs>
                    <filter id="neonGlowCyan" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="8" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id="neonGlowPurple" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="8" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                <g className="opacity-0 md:opacity-100">
                    {/* Cyan Triangle */}
                    <g className="shape-1" transform="translate(15%, 20%)">
                        <polygon
                            points="0,50 25,0 50,50"
                            fill="none"
                            stroke="#00f0ff"
                            strokeWidth="2"
                            filter="url(#neonGlowCyan)"
                        />
                    </g>

                    {/* Purple Hexagon */}
                    <g className="shape-2" transform="translate(80%, 30%)">
                        <polygon
                            points="30,0 60,15 60,45 30,60 0,45 0,15"
                            fill="none"
                            stroke="#a855f7"
                            strokeWidth="2"
                            filter="url(#neonGlowPurple)"
                        />
                    </g>

                    {/* Cyan Circle */}
                    <g className="shape-3" transform="translate(60%, 80%)">
                        <circle
                            cx="30"
                            cy="30"
                            r="25"
                            fill="none"
                            stroke="#00f0ff"
                            strokeWidth="1.5"
                            filter="url(#neonGlowCyan)"
                        />
                    </g>

                    {/* Purple Triangle */}
                    <g className="shape-1" style={{ animationDelay: '-10s' }} transform="translate(25%, 75%)">
                        <polygon
                            points="0,40 20,0 40,40"
                            fill="none"
                            stroke="#a855f7"
                            strokeWidth="1.5"
                            filter="url(#neonGlowPurple)"
                        />
                    </g>

                    {/* Small accents */}
                    <g className="shape-2" style={{ animationDelay: '-5s' }} transform="translate(45%, 45%)">
                        <rect x="0" y="0" width="10" height="10" fill="none" stroke="#00f0ff" strokeWidth="1" filter="url(#neonGlowCyan)" />
                    </g>
                </g>
            </svg>
        </div>
    );
};
