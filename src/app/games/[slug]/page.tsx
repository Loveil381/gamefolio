"use client";

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { Play, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

import { games } from '@/lib/data/games';
import { PageLayout } from '@/components/layout/page-layout';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function GameDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = use(params);
    const game = games.find((g) => g.slug === slug);

    const [isPlaying, setIsPlaying] = useState(false);

    if (!game) {
        notFound();
    }

    return (
        <PageLayout>
            <Container className="py-8 md:py-12">
                {/* Back Link */}
                <div className="mb-8">
                    <Link href="/games">
                        <Button variant="ghost" className="pl-0 gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Back to All Games
                        </Button>
                    </Link>
                </div>

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <Badge variant="default" className="text-sm">
                                    {game.genre}
                                </Badge>
                            </div>
                            <Heading level={1} className="mb-2">
                                {game.title}
                            </Heading>
                            <Text className="text-lg text-muted-foreground max-w-2xl">
                                {game.description}
                            </Text>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {game.techStack.map((tech) => (
                                <Badge key={tech.name} variant="cyan">
                                    {tech.name}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Playable iframe area */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl bg-black relative mb-16 border border-border/50 group"
                >
                    {!isPlaying ? (
                        <button
                            onClick={() => setIsPlaying(true)}
                            className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-zinc-900 shadow-inner group-hover:bg-zinc-800 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                            <div className={`absolute inset-0 opacity-20 ${game.thumbnailColor} mix-blend-overlay`} />

                            <div className="relative z-10 w-20 h-20 bg-primary/90 text-primary-foreground rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-xl mb-4">
                                <Play className="w-8 h-8 ml-1" />
                            </div>

                            <Text className="relative z-10 font-medium text-zinc-300 tracking-wide text-lg">
                                Click to Play
                            </Text>
                        </button>
                    ) : (
                        <div className="w-full h-full relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                            </div>
                            <iframe
                                src={game.playUrl}
                                title={`Play ${game.title}`}
                                className="absolute inset-0 w-full h-full z-10"
                                allow="fullscreen; autoplay"
                            />
                        </div>
                    )}
                </motion.div>

                {/* Details Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <Section className="md:col-span-2">
                        <Heading level={2} className="mb-6">Development Story</Heading>
                        <div className="prose prose-zinc dark:prose-invert max-w-none">
                            <p className="text-muted-foreground leading-relaxed">
                                {game.developmentStory || "The development story for this project is currently being documented. Check back later for a deep dive into the technical challenges and creative decisions."}
                            </p>
                        </div>
                    </Section>

                    <Section>
                        <div className="bg-card border border-border/50 rounded-xl p-6">
                            <Heading level={3} className="mb-4">Quick Stats</Heading>

                            <div className="space-y-4">
                                <div>
                                    <Text className="text-sm font-medium text-muted-foreground mb-1">Status</Text>
                                    <Text className="font-medium">Completed</Text>
                                </div>

                                <div>
                                    <Text className="text-sm font-medium text-muted-foreground mb-1">Genre</Text>
                                    <Text className="font-medium">{game.genre}</Text>
                                </div>

                                <div>
                                    <Text className="text-sm font-medium text-muted-foreground mb-2">Technologies</Text>
                                    <div className="flex flex-wrap gap-2">
                                        {game.techStack.map(tech => (
                                            <Badge key={tech.name} variant="purple" className="bg-surface">
                                                {tech.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Section>
                </div>
            </Container>
        </PageLayout>
    );
}
