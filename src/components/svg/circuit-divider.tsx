import React from 'react';

export interface CircuitDividerProps {
    className?: string;
    primaryColor?: string;
    accentColor?: string;
}

export function CircuitDivider({
    className = '',
    primaryColor = '#00f0ff',
    accentColor = '#a855f7'
}: CircuitDividerProps) {
    return (
        <svg
            className={className}
            viewBox="0 0 1000 50"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
        >
            <style>
                {`
                    @keyframes slidePattern {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-100px); }
                    }
                    @keyframes moveDot {
                        0% { stroke-dashoffset: 200; opacity: 0; }
                        10% { opacity: 1; }
                        90% { opacity: 1; }
                        100% { stroke-dashoffset: 0; opacity: 0; }
                    }
                    .circuit-path {
                        animation: slidePattern 3s linear infinite;
                    }
                    .traveling-dot {
                        stroke-dasharray: 4 196;
                        animation: moveDot 5s linear infinite;
                    }
                    .traveling-dot-reverse {
                        stroke-dasharray: 4 196;
                        animation: moveDot 4s linear infinite reverse;
                    }
                    .pulse {
                        animation: pulseGlow 2s infinite alternate;
                    }
                    @keyframes pulseGlow {
                        from { opacity: 0.5; }
                        to { opacity: 1; filter: drop-shadow(0 0 8px ${primaryColor}); }
                    }
                `}
            </style>

            <defs>
                <pattern id="circuit-pattern" width="100" height="50" patternUnits="userSpaceOnUse">
                    {/* Horizontal lines */}
                    <line x1="0" y1="25" x2="100" y2="25" stroke={primaryColor} strokeWidth="1" strokeOpacity="0.4" />
                    <line x1="0" y1="10" x2="100" y2="10" stroke={accentColor} strokeWidth="0.5" strokeOpacity="0.3" />
                    <line x1="0" y1="40" x2="100" y2="40" stroke={accentColor} strokeWidth="0.5" strokeOpacity="0.3" />

                    {/* Circuit connections */}
                    <path d="M 20 25 L 30 10 L 50 10" fill="none" stroke={primaryColor} strokeWidth="1" strokeOpacity="0.5" />
                    <path d="M 70 25 L 80 40 L 95 40" fill="none" stroke={primaryColor} strokeWidth="1" strokeOpacity="0.5" />

                    {/* Nodes */}
                    <circle cx="20" cy="25" r="2" fill={primaryColor} className="pulse" />
                    <circle cx="70" cy="25" r="2" fill={primaryColor} className="pulse" />
                    <circle cx="50" cy="10" r="1.5" fill={accentColor} />
                    <circle cx="95" cy="40" r="1.5" fill={accentColor} />
                </pattern>

                <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {/* Repeating Pattern Background */}
            <g className="circuit-path">
                <rect x="0" y="0" width="1100" height="50" fill="url(#circuit-pattern)" />
            </g>

            {/* Traveling dots over straight lines */}
            <line x1="0" y1="25" x2="1000" y2="25" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" className="traveling-dot" filter="url(#glow)" />
            <line x1="0" y1="10" x2="1000" y2="10" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" className="traveling-dot-reverse" filter="url(#glow)" style={{ animationDelay: '1s' }} />
            <line x1="0" y1="40" x2="1000" y2="40" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" className="traveling-dot" filter="url(#glow)" style={{ animationDelay: '2s', animationDuration: '6s' }} />

        </svg>
    );
}
