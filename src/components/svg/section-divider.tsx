import React from 'react';

/**
 * Prop types for the SectionDivider component.
 */
interface SectionDividerProps {
    /** Optional CSS class name */
    className?: string;
    /** Indicates if the divider should be flipped vertically */
    flip?: boolean;
}

/**
 * An animated SVG wave/circuit divider to place between page sections.
 *
 * @param {SectionDividerProps} props - The component props.
 * @returns {React.ReactElement} The SectionDivider component.
 */
export const SectionDivider: React.FC<SectionDividerProps> = ({ className = '', flip = false }) => {
    return (
        <div
            className={`w-full overflow-hidden leading-[0] ${className} ${flip ? 'rotate-180' : ''}`}
            aria-hidden="true"
        >
            <svg
                className="block w-full h-[60px] md:h-[100px]"
                viewBox="0 0 1200 100"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <style>
                    {`
            @keyframes dashMove {
              from { stroke-dashoffset: 0; }
              to { stroke-dashoffset: -100; }
            }
            .circuit-line {
              animation: dashMove 3s linear infinite;
            }
          `}
                </style>

                {/* Base abstract wave polygon */}
                <polygon
                    points="0,100 1200,100 1200,80 1000,40 800,90 400,20 200,60 0,20"
                    fill="rgba(0, 240, 255, 0.05)"
                />

                {/* Animated Circuit Line */}
                <path
                    d="M0 20 L 200 60 L 400 20 L 800 90 L 1000 40 L 1200 80"
                    fill="none"
                    stroke="#00f0ff"
                    strokeWidth="2"
                    strokeDasharray="10 10"
                    className="circuit-line opacity-30"
                />

                {/* Secondary styling line */}
                <path
                    d="M0 100 L 1200 100 L 1200 95 L 1000 70 L 800 100 L 400 50 L 200 80 L 0 50 Z"
                    fill="rgba(168, 85, 247, 0.05)"
                />
                <path
                    d="M0 50 L 200 80 L 400 50 L 800 100 L 1000 70 L 1200 95"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="1.5"
                    strokeDasharray="4 8"
                    className="circuit-line opacity-40"
                    style={{ animationDirection: 'reverse', animationDuration: '4s' }}
                />
            </svg>
        </div>
    );
};
