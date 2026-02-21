'use client';

import * as React from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { timelineData } from '@/lib/data/timeline';

/**
 * Animated Counter Component for Stats
 */
const AnimatedCounter = ({ value, suffix = '', prefix = '' }: { value: number, suffix?: string, prefix?: string }) => {
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

const techCategories = [
    {
        title: 'Frontend',
        color: 'cyan' as const,
        items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion']
    },
    {
        title: 'Backend',
        color: 'purple' as const,
        items: ['Node.js', 'Express', 'PostgreSQL', 'REST APIs', 'GraphQL']
    },
    {
        title: 'Tools',
        color: 'default' as const,
        items: ['Git', 'GitHub', 'Figma', 'Docker', 'Vercel']
    },
    {
        title: 'Currently Learning',
        color: 'cyan' as const,
        items: ['WebGL', 'Three.js', 'Rust', 'Godot']
    }
];

const statsData = [
    { label: 'Games Built', value: 5, suffix: '' },
    { label: 'Lines of Code', value: 50, suffix: 'k+' },
];

export default function AboutClient() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* 1. Hero Section */}
            <Section className="relative flex items-center justify-center pt-32 pb-20 overflow-hidden bg-background">
                <Container className="relative z-10 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="w-full max-w-3xl"
                    >
                        <Heading level={1} gradient className="mb-6 mx-auto pb-2">
                            About Me
                        </Heading>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 1 }}
                        className="max-w-2xl mx-auto"
                    >
                        <Text size="xl" variant="secondary" className="leading-relaxed text-center">
                            A developer who loves building games and interactive web experiences.
                            I believe the best way to learn is by creating things that are fun to use.
                        </Text>
                    </motion.div>
                </Container>
            </Section>

            {/* 2. Animated Timeline Section */}
            <Section className="bg-surface relative border-t border-border py-24">
                <Container>
                    <div className="text-center mb-20">
                        <Heading level={2} className="mb-4">My Journey</Heading>
                        <Text variant="secondary">The milestones that shaped my path as a developer.</Text>
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        {/* Vertical Line */}
                        <div className="absolute left-[36px] md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

                        {timelineData.map((milestone, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div
                                    key={milestone.year}
                                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                    className={`relative flex flex-col md:flex-row items-start md:items-center justify-between mb-16 last:mb-0 ${isEven ? 'md:flex-row-reverse' : ''
                                        }`}
                                >
                                    {/* Icon Marker */}
                                    <div className="absolute left-[36px] md:left-1/2 w-12 h-12 bg-background border-2 border-accent-cyan rounded-full flex items-center justify-center text-xl z-10 -translate-x-1/2 shrink-0">
                                        {milestone.icon}
                                    </div>

                                    {/* Content */}
                                    <div className={`w-full pl-[90px] md:pl-0 md:w-[45%] ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                                        <Card hoverEffect className="p-6">
                                            <Badge variant="cyan" className="mb-4 sm:mb-3 inline-block">
                                                {milestone.year}
                                            </Badge>
                                            <Heading level={4} className="mb-2">
                                                {milestone.title}
                                            </Heading>
                                            <Text size="sm" variant="secondary">
                                                {milestone.description}
                                            </Text>
                                        </Card>
                                    </div>

                                    {/* Empty spacer for grid alignment */}
                                    <div className="hidden md:block md:w-[45%]" />
                                </motion.div>
                            );
                        })}
                    </div>
                </Container>
            </Section>

            {/* 3. Tech Stack Section */}
            <Section className="bg-background relative border-t border-border py-24">
                <Container>
                    <div className="text-center mb-16">
                        <Heading level={2} className="mb-4">Tech Stack</Heading>
                        <Text variant="secondary">Technologies and tools in my day-to-day workflow.</Text>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {techCategories.map((category, catIndex) => (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                            >
                                <Card className="p-8 h-full bg-surface shadow-sm">
                                    <Heading level={3} className="mb-6">{category.title}</Heading>
                                    <div className="flex flex-wrap gap-x-3 gap-y-4">
                                        {category.items.map((tech) => (
                                            <Badge key={tech} variant={category.color} className="px-3 py-1.5 text-sm">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* 4. Fun Facts / Gaming Stats Section */}
            <Section className="bg-surface relative border-t border-border py-24">
                <Container>
                    <div className="text-center mb-16">
                        <Heading level={2} className="mb-4">By The Numbers</Heading>
                        <Text variant="secondary">Some fun facts and stats about my development journey.</Text>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {statsData.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="h-full"
                            >
                                <Card hoverEffect className="p-8 text-center flex flex-col items-center justify-center h-full min-h-[200px]">
                                    <div className="text-5xl font-bold text-accent-cyan mb-4">
                                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                                    </div>
                                    <Text variant="secondary" className="uppercase tracking-wider text-sm font-semibold">
                                        {stat.label}
                                    </Text>
                                </Card>
                            </motion.div>
                        ))}

                        {/* The static Favorite Genre card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="h-full"
                        >
                            <Card hoverEffect className="p-8 text-center flex flex-col items-center justify-center h-full min-h-[200px]">
                                <div className="text-3xl sm:text-4xl font-bold text-accent-purple mb-4">
                                    Arcade
                                </div>
                                <Text variant="secondary" className="uppercase tracking-wider text-sm font-semibold">
                                    Favorite Genre
                                </Text>
                            </Card>
                        </motion.div>
                    </div>
                </Container>
            </Section>
        </div>
    );
}
