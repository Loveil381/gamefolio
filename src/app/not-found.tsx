import React from 'react';
import Link from 'next/link';

/**
 * Custom 404 Error Page.
 * Features an animated SVG game character with a 'Game Over' theme
 * and an animated 'Return Home' button.
 *
 * @returns {React.ReactElement} The 404 page layout.
 */
export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 relative z-10">

            {/* Animated SVG */}
            <div className="mb-8 relative w-full max-w-lg h-64 mx-auto">
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 400 200"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <style>
                        {`
                          @keyframes crtFlicker {
                            0% { opacity: 0.9; text-shadow: 0 0 4px #ff0055, 2px 2px 0px rgba(0, 255, 255, 0.5); }
                            4% { opacity: 0.9; }
                            5% { opacity: 0.2; transform: translate(-2px, 1px); }
                            6% { opacity: 0.9; transform: translate(0, 0); }
                            10% { opacity: 0.9; }
                            11% { opacity: 1; text-shadow: 0 0 10px #ff0055, -2px -2px 0px rgba(0, 255, 255, 0.5); }
                            12% { opacity: 0.8; }
                            100% { opacity: 0.9;  }
                          }
                          @keyframes scanline {
                            0% { transform: translateY(-100%); }
                            100% { transform: translateY(100%); }
                          }
                          @keyframes pulseSubtitle {
                            0%, 100% { opacity: 1; }
                            50% { opacity: 0.1; }
                          }
                          .glitch-text {
                            font-family: 'Courier New', Courier, monospace;
                            font-weight: 900;
                            font-size: 52px;
                            fill: #ff0055;
                            animation: crtFlicker 3s infinite;
                            transform-origin: center;
                          }
                          .subtitle {
                            font-family: 'Courier New', Courier, monospace;
                            font-weight: bold;
                            font-size: 18px;
                            fill: #00f0ff;
                            animation: pulseSubtitle 1.5s steps(2, start) infinite;
                          }
                          .scanline-overlay {
                            pointer-events: none;
                            animation: scanline 8s linear infinite;
                          }
                        `}
                    </style>

                    <defs>
                        <pattern id="scanlines" patternUnits="userSpaceOnUse" width="4" height="4">
                            <rect width="4" height="2" fill="rgba(0,0,0,0.1)" />
                            <rect y="2" width="4" height="2" fill="rgba(255,255,255,0.05)" />
                        </pattern>
                        <filter id="crt-glow">
                            <feGaussianBlur stdDeviation="2" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Background screen */}
                    <rect width="400" height="200" fill="#050510" rx="10" />

                    {/* Game Over Text */}
                    <text
                        x="50%"
                        y="45%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="glitch-text"
                        filter="url(#crt-glow)"
                    >
                        GAME OVER
                    </text>

                    {/* Subtitle */}
                    <text
                        x="50%"
                        y="75%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="subtitle"
                        filter="url(#crt-glow)"
                    >
                        INSERT COIN TO CONTINUE
                    </text>

                    {/* Scanline pattern over everything */}
                    <rect width="400" height="200" fill="url(#scanlines)" rx="10" />

                    {/* Moving wide scanline */}
                    <g className="scanline-overlay">
                        <rect x="0" y="0" width="400" height="20" fill="rgba(255,255,255,0.03)" />
                    </g>
                </svg>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
                404 — Page Not Found
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-md mx-auto">
                The level you are trying to reach doesn&apos;t exist or has been moved to another server.
            </p>

            {/* Animated Return Home Button */}
            <Link
                href="/"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 ease-in-out bg-transparent border-2 border-[#00f0ff] rounded-lg overflow-hidden hover:scale-105 active:scale-95"
            >
                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-[#00f0ff]"></span>
                <span className="relative z-10 flex items-center gap-2">
                    <span>Return Home</span>
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </span>
                <div className="absolute inset-0 border-2 border-[#00f0ff] rounded-lg shadow-[0_0_15px_rgba(0,240,255,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
        </div>
    );
}
