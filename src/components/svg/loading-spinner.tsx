import React from 'react';

export interface LoadingSpinnerProps {
    className?: string;
    size?: number;
    primaryColor?: string;
    accentColor?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    className = '',
    size = 1,
    primaryColor = '#00f0ff',
    accentColor = '#a855f7'
}) => {
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
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
            >
                <style>
                    {`
                        @keyframes rotateController {
                            0% { transform: rotate(0deg) scale(1); filter: drop-shadow(0 0 5px ${primaryColor}); }
                            50% { transform: rotate(180deg) scale(1.1); filter: drop-shadow(0 0 15px ${accentColor}); }
                            100% { transform: rotate(360deg) scale(1); filter: drop-shadow(0 0 5px ${primaryColor}); }
                        }
                        @keyframes pulseDots {
                            0%, 100% { opacity: 1; }
                            50% { opacity: 0.2; }
                        }
                        .neon-spinner {
                            transform-origin: 50px 50px;
                            animation: rotateController 3s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
                        }
                        .neon-btn {
                            animation: pulseDots 1s infinite alternate;
                        }
                    `}
                </style>
                <defs>
                    <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>
                <g className="neon-spinner" filter="url(#neon-glow)">
                    {/* Pixel Controller Outline */}
                    <path
                        d="M 20 35 L 80 35 L 90 45 L 90 65 L 80 75 L 60 75 L 50 65 L 40 75 L 20 75 L 10 65 L 10 45 Z"
                        fill="none"
                        stroke={primaryColor}
                        strokeWidth="4"
                        strokeLinejoin="miter"
                    />

                    {/* D-Pad */}
                    <path d="M 25 50 L 35 50 M 30 45 L 30 55" stroke={accentColor} strokeWidth="4" strokeLinecap="square" />

                    {/* Action Buttons */}
                    <rect x="65" y="45" width="6" height="6" fill={accentColor} className="neon-btn" style={{ animationDelay: '0s' }} />
                    <rect x="75" y="55" width="6" height="6" fill={accentColor} className="neon-btn" style={{ animationDelay: '0.5s' }} />
                </g>
            </svg>
        </div>
    );
};
