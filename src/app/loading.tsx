import React from 'react';
import { LoadingSpinner } from '@/components/svg/loading-spinner';

/**
 * Global application loading state using the custom SVG LoadingSpinner.
 *
 * @returns {React.ReactElement} The loading view layout.
 */
export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950/80 backdrop-blur-sm min-h-screen">
            <div className="relative flex flex-col items-center justify-center">
                {/* Main Spinner */}
                <LoadingSpinner size={1.5} className="mb-6 drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]" />

                {/* Loading Text */}
                <h2 className="text-xl md:text-2xl font-mono font-bold text-[#00f0ff] tracking-widest animate-pulse">
                    Loading<span className="animate-[bounce_1.4s_infinite]">.</span><span className="animate-[bounce_1.4s_infinite_0.2s]">.</span><span className="animate-[bounce_1.4s_infinite_0.4s]">.</span>
                </h2>
            </div>
        </div>
    );
}
