import React from 'react';

/**
 * Prop types for the LoadingSpinner component.
 */
interface LoadingSpinnerProps {
    /** Optional CSS class name */
    className?: string;
    /** Size multiplier, default is 1 (approx 64px width) */
    size?: number;
}

/**
 * A custom loading spinner SVG component featuring a pixelated game controller
 * that slowly rotates and pulses with a neon gaming vibe.
 *
 * @param {LoadingSpinnerProps} props - The component props.
 * @returns {React.ReactElement} The LoadingSpinner component.
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className = '', size = 1 }) => {
    const baseSize = 64 * size;

    return (
        <div
            className={`inline-block flex-shrink-0 relative ${className}`}
            style={{ width: `${baseSize}px`, height: `${baseSize}px` }}
            aria-label="Loading..."
            role="status"
        >
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
            >
                <style>
                    {`
            @keyframes floatRot {
              0% { transform: rotate(0deg) translateY(0); }
              25% { transform: rotate(5deg) translateY(-2px); }
              50% { transform: rotate(0deg) translateY(0); opacity: 0.7; }
              75% { transform: rotate(-5deg) translateY(-2px); }
              100% { transform: rotate(0deg) translateY(0); }
            }
            @keyframes dpadPulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
            @keyframes buttonBlink {
              0%, 100% { fill: #a855f7; }
              50% { fill: #00f0ff; }
            }
            .controller-body { animation: floatRot 3s ease-in-out infinite; transform-origin: 32px 32px; }
            .dpad { animation: dpadPulse 1.5s infinite alternate; }
            .action-btn-1 { animation: buttonBlink 1s step-end infinite; }
            .action-btn-2 { animation: buttonBlink 1s step-end infinite 0.5s; }
          `}
                </style>

                {/* Glow Filter */}
                <defs>
                    <filter id="controllerGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                <g className="controller-body" filter="url(#controllerGlow)">
                    {/* Main Controller Body (Pixelated Rectangles) */}
                    <path
                        d="M 16 20 h 32 v 4 h 4 v 4 h 4 v 16 h -4 v 4 h -4 v -8 h -12 v 8 h -8 v -8 H 20 v 8 h -4 v -4 h -4 v -16 h 4 v -4 h 4 z"
                        fill="#1f2937"
                        stroke="#00f0ff"
                        strokeWidth="2"
                    />

                    {/* D-Pad */}
                    <g className="dpad" fill="#00f0ff">
                        <rect x="18" y="28" width="4" height="12" />
                        <rect x="14" y="32" width="12" height="4" />
                    </g>

                    {/* Start / Select Buttons */}
                    <rect x="26" y="34" width="4" height="2" fill="#9ca3af" />
                    <rect x="34" y="34" width="4" height="2" fill="#9ca3af" />

                    {/* Action Buttons */}
                    <rect x="44" y="34" width="4" height="4" className="action-btn-1" />
                    <rect x="48" y="28" width="4" height="4" className="action-btn-2" />
                </g>
            </svg>
        </div>
    );
};
