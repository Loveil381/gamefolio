import React from 'react';

export interface ControllerSVGProps {
    className?: string;
    primaryColor?: string;
    accentColor?: string;
}

export function ControllerSVG({
    className = '',
    primaryColor = '#00f0ff',
    accentColor = '#a855f7'
}: ControllerSVGProps) {
    return (
        <svg
            className={className}
            viewBox="0 0 200 150"
            xmlns="http://www.w3.org/2000/svg"
        >
            <style>
                {`
                    @keyframes drawPath {
                        0% { stroke-dashoffset: 1000; }
                        100% { stroke-dashoffset: 0; }
                    }
                    @keyframes drawCircuit {
                        0% { stroke-dashoffset: 500; opacity: 0; }
                        10% { opacity: 1; }
                        80% { stroke-dashoffset: 0; opacity: 1; }
                        100% { stroke-dashoffset: -500; opacity: 0; }
                    }
                    @keyframes pulseGlow {
                        0%, 100% { filter: drop-shadow(0 0 5px ${primaryColor}) drop-shadow(0 0 10px ${primaryColor}); }
                        50% { filter: drop-shadow(0 0 8px ${primaryColor}) drop-shadow(0 0 15px ${primaryColor}); }
                    }
                    @keyframes pulseAccent {
                        0%, 100% { filter: drop-shadow(0 0 3px ${accentColor}); opacity: 0.8; }
                        50% { filter: drop-shadow(0 0 8px ${accentColor}); opacity: 1; }
                    }
                    .controller-outline {
                        stroke-dasharray: 1000;
                        stroke-dashoffset: 1000;
                        animation: drawPath 4s linear infinite, pulseGlow 4s ease-in-out infinite;
                    }
                    .circuit-trace {
                        stroke-dasharray: 500;
                        stroke-dashoffset: 500;
                        animation: drawCircuit 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                    }
                    .accent-element {
                        animation: pulseAccent 2s ease-in-out infinite alternate;
                    }
                `}
            </style>

            {/* Glowing Definitions */}
            <defs>
                <filter id="glow-primary" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="glow-accent" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {/* Circuit Traces (Background) */}
            <g stroke={accentColor} strokeWidth="1.5" fill="none" className="circuit-trace" filter="url(#glow-accent)">
                {/* Left traces */}
                <path d="M 40 75 L 10 75 L 5 60" />
                <path d="M 50 40 L 20 20 L 10 20" />
                {/* Right traces */}
                <path d="M 160 75 L 190 75 L 195 60" />
                <path d="M 150 40 L 180 20 L 190 20" />
                {/* Bottom traces */}
                <path d="M 70 110 L 70 130 L 50 140" />
                <path d="M 130 110 L 130 130 L 150 140" />
            </g>

            {/* Circuit Nodes (Dots) */}
            <g fill={accentColor} className="accent-element">
                <circle cx="5" cy="60" r="2" />
                <circle cx="10" cy="20" r="2" />
                <circle cx="195" cy="60" r="2" />
                <circle cx="190" cy="20" r="2" />
                <circle cx="50" cy="140" r="2" />
                <circle cx="150" cy="140" r="2" />
            </g>

            {/* Main Controller Outline */}
            <path
                className="controller-outline"
                d="M 60 40 
                   C 60 40, 70 30, 100 30 
                   C 130 30, 140 40, 140 40 
                   C 160 40, 170 50, 170 70 
                   C 170 100, 150 110, 140 110 
                   C 130 110, 120 90, 100 90 
                   C 80 90, 70 110, 60 110 
                   C 50 110, 30 100, 30 70 
                   C 30 50, 40 40, 60 40 Z"
                fill="none"
                stroke={primaryColor}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* D-Pad */}
            <path
                className="accent-element"
                d="M 55 65 L 65 65 L 65 55 L 75 55 L 75 65 L 85 65 L 85 75 L 75 75 L 75 85 L 65 85 L 65 75 L 55 75 Z"
                fill="none"
                stroke={accentColor}
                strokeWidth="2"
                strokeLinejoin="miter"
                filter="url(#glow-accent)"
            />

            {/* Action Buttons */}
            <g className="accent-element" fill="none" stroke={primaryColor} strokeWidth="2" filter="url(#glow-primary)">
                <circle cx="140" cy="60" r="4" />
                <circle cx="130" cy="70" r="4" />
                <circle cx="150" cy="70" r="4" />
                <circle cx="140" cy="80" r="4" />
            </g>

            {/* Analog Sticks */}
            <g className="circuit-trace" fill="none" stroke={primaryColor} strokeWidth="2" filter="url(#glow-primary)">
                <circle cx="80" cy="95" r="10" />
                <circle cx="120" cy="95" r="10" />
                <circle cx="80" cy="95" r="4" />
                <circle cx="120" cy="95" r="4" />
            </g>

            {/* Center / Menu Buttons */}
            <g className="accent-element" stroke={accentColor} strokeWidth="2" fill="none">
                <line x1="95" y1="55" x2="105" y2="55" />
                <line x1="95" y1="62" x2="105" y2="62" />
            </g>
        </svg>
    );
}
