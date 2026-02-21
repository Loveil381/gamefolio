'use client';

import * as React from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';

export const AboutHeroHeadingAnimation = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-3xl"
    >
        {children}
    </motion.div>
);

export const AboutHeroTextAnimation = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="max-w-2xl mx-auto"
    >
        {children}
    </motion.div>
);

export const AnimatedCounter = ({ value, suffix = '', prefix = '' }: { value: number, suffix?: string, prefix?: string }) => {
    const ref = React.useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);

    React.useEffect(() => {
        if (inView) {
            const controls = animate(count, value, { duration: 2.5, ease: "easeOut" });
            return controls.stop;
        }
    }, [inView, value, count]);

    return (
        <span className="flex items-center justify-center">
            {prefix}
            <motion.span ref={ref}>{rounded}</motion.span>
            {suffix}
        </span>
    );
};

export const FadeInScale = ({ children, delay = 0, className = '' }: { children: React.ReactNode, delay?: number, className?: string }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay }}
        className={className}
    >
        {children}
    </motion.div>
);

export const FadeInUp = ({ children, delay = 0, className = '' }: { children: React.ReactNode, delay?: number, className?: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay }}
        className={className}
    >
        {children}
    </motion.div>
);

export const SlideInTimelineItem = ({ children, isEven }: { children: React.ReactNode, isEven: boolean }) => (
    <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`relative flex flex-col md:flex-row items-start md:items-center justify-between mb-16 last:mb-0 ${isEven ? 'md:flex-row-reverse' : ''}`}
    >
        {children}
    </motion.div>
);
