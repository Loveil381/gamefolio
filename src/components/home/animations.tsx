'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import React from 'react';

export function HeroHeadingAnimation({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full max-w-4xl"
        >
            {children}
        </motion.div>
    );
}

export function HeroTextAnimation({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mb-10 max-w-2xl mx-auto"
        >
            {children}
        </motion.div>
    );
}

export function HeroButtonsAnimation({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
}

export function SkillsCloud({ skills }: { skills: string[] }) {
    return (
        <motion.div
            className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
                visible: {
                    transition: { staggerChildren: 0.1 }
                },
                hidden: {}
            }}
        >
            {skills.map((skill) => (
                <motion.div
                    key={skill}
                    variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 20 } }
                    }}
                >
                    <Badge variant="cyan" className="px-4 py-2 text-sm sm:text-base border-accent-cyan/30 bg-accent-cyan/5">
                        {skill}
                    </Badge>
                </motion.div>
            ))}
        </motion.div>
    );
}
