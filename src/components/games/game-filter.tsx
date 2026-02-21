'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { games, genres } from '@/lib/data/games';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';

export function GameFilter() {
    const [selectedGenre, setSelectedGenre] = useState<typeof genres[number]>('All');

    const filteredGames = games.filter(
        (game) => selectedGenre === 'All' || game.genre === selectedGenre
    );

    return (
        <>
            {/* Filter Bar */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap justify-center gap-2 mb-12"
            >
                {genres.map((genre) => (
                    <button
                        key={genre}
                        onClick={() => setSelectedGenre(genre)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedGenre === genre
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                            }`}
                    >
                        {genre}
                    </button>
                ))}
            </motion.div>

            {/* Games Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredGames.map((game) => (
                        <motion.div
                            key={game.slug}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="flex flex-col h-full overflow-hidden group">
                                {/* Thumbnail Placeholder */}
                                <div className={`h-48 w-full ${game.thumbnailColor} transition-transform duration-500 group-hover:scale-105`} />

                                <div className="flex flex-col flex-grow p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <Heading level={3} className="text-xl m-0">{game.title}</Heading>
                                        <Badge variant="cyan">{game.genre}</Badge>
                                    </div>
                                    <Text className="text-muted-foreground line-clamp-2 mb-4">{game.description}</Text>

                                    <div className="flex flex-wrap gap-1.5 mt-auto mb-4">
                                        {game.techStack.map((tech) => (
                                            <Badge key={tech.name} variant="purple" className="text-xs">
                                                {tech.name}
                                            </Badge>
                                        ))}
                                    </div>

                                    <div className="pt-4 border-t border-border/50 mt-auto">
                                        <Link href={`/games/${game.slug}`} className="w-full block" tabIndex={-1}>
                                            <Button className="w-full">Play Now</Button>
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </>
    );
}
