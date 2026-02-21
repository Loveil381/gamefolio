'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

export const StaggerContainer = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <motion.div
        variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
        initial="hidden"
        animate="visible"
        className={className}
    >
        {children}
    </motion.div>
);

export const StaggerItem = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <motion.div
        variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
        }}
        className={className}
    >
        {children}
    </motion.div>
);

export const SocialLinkAnimation = ({ children, url }: { children: React.ReactNode, url: string }) => (
    <motion.a
        href={url}
        target={url.startsWith('http') ? '_blank' : undefined}
        rel={url.startsWith('http') ? 'noopener noreferrer' : undefined}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="block"
    >
        {children}
    </motion.a>
);

export const SuccessIconAnimation = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.1 }}
    >
        {children}
    </motion.div>
);

export const SuccessContainerAnimation = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-12 text-center h-full"
    >
        {children}
    </motion.div>
);
