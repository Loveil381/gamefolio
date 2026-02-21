'use client';

import { motion, Variants } from 'framer-motion';

export function ControllerSVG({ className = '' }: { className?: string }) {
    const draw: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { type: 'spring', duration: 2.5, bounce: 0 },
                opacity: { duration: 0.1 },
            },
        },
    };

    return (
        <motion.svg
            className={className}
            viewBox="0 0 100 100"
            initial="hidden"
            animate="visible"
            style={{ filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.6))' }}
        >
            <motion.path
                d="M20 40 Q20 20 40 20 L60 20 Q80 20 80 40 L85 60 Q90 80 70 80 Q60 80 50 70 Q40 80 30 80 Q10 80 15 60 Z"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="2"
                variants={draw}
                className="text-cyan-400"
            />
            {/* D-Pad */}
            <motion.path
                d="M25 45 L35 45 M30 40 L30 50"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="2"
                variants={draw}
                className="text-fuchsia-500"
            />
            {/* Action Buttons */}
            <motion.circle cx="65" cy="45" r="3" fill="transparent" stroke="currentColor" strokeWidth="2" variants={draw} className="text-pink-500" />
            <motion.circle cx="75" cy="35" r="3" fill="transparent" stroke="currentColor" strokeWidth="2" variants={draw} className="text-pink-500" />
            <motion.circle cx="85" cy="45" r="3" fill="transparent" stroke="currentColor" strokeWidth="2" variants={draw} className="text-pink-500" />
            <motion.circle cx="75" cy="55" r="3" fill="transparent" stroke="currentColor" strokeWidth="2" variants={draw} className="text-pink-500" />
            {/* Thumbsticks */}
            <motion.circle cx="45" cy="60" r="6" fill="transparent" stroke="currentColor" strokeWidth="2" variants={draw} className="text-cyan-400" />
            <motion.circle cx="65" cy="60" r="6" fill="transparent" stroke="currentColor" strokeWidth="2" variants={draw} className="text-cyan-400" />
        </motion.svg>
    );
}
