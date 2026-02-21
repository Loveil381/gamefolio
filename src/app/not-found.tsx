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

            {/* Animated SVG Character */}
            <div className="mb-8 relative w-48 h-48 md:w-64 md:h-64 mx-auto">
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <style>
                        {`
              @keyframes hoverGhost {
                0% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
                100% { transform: translateY(0px); }
              }
              @keyframes blinkEyes {
                0%, 45%, 55%, 100% { transform: scaleY(1); }
                50% { transform: scaleY(0.1); }
              }
              @keyframes colorPulse {
                0%, 100% { fill: #ef4444; }
                50% { fill: #f87171; }
              }
              @keyframes glitch {
                0% { transform: translate(0); }
                20% { transform: translate(-2px, 2px); }
                40% { transform: translate(-2px, -2px); }
                60% { transform: translate(2px, 2px); }
                80% { transform: translate(2px, -2px); }
                100% { transform: translate(0); }
              }
              .ghost-group { animation: hoverGhost 3s ease-in-out infinite; transform-origin: center; }
              .eyes { animation: blinkEyes 4s infinite; transform-origin: center; }
              .ghost-body { animation: colorPulse 3s infinite; }
              .glitch-text { animation: glitch 0.5s infinite; transform-origin: center; }
            `}
                    </style>

                    <g className="ghost-group">
                        {/* Pixel Character Body */}
                        <path
                            className="ghost-body"
                            d="M 20 40 C 20 20, 80 20, 80 40 
                 L 80 80 
                 L 70 70 L 60 80 
                 L 50 70 L 40 80 
                 L 30 70 L 20 80 Z"
                        />
                        {/* Eyes */}
                        <g className="eyes" fill="#ffffff">
                            <rect x="35" y="35" width="10" height="10" />
                            <rect x="55" y="35" width="10" height="10" />
                        </g>
                        <g className="eyes" fill="#000000">
                            <rect x="38" y="38" width="4" height="4" />
                            <rect x="58" y="38" width="4" height="4" />
                        </g>
                    </g>

                    {/* Game Over Text overlay on top of SVG */}
                    <text
                        x="50"
                        y="95"
                        textAnchor="middle"
                        fill="#ff0044"
                        fontWeight="bold"
                        fontSize="14"
                        fontFamily="monospace"
                        className="glitch-text"
                        style={{ textShadow: "0px 0px 5px #ff0044" }}
                    >
                        GAME OVER
                    </text>
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
