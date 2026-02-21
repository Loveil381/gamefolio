'use client';

import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ControllerSVG } from '@/components/svg/controller';
import { games } from '@/lib/data/games';
import { posts } from '@/lib/data/posts';
import { motion } from 'framer-motion';
import Link from 'next/link';

const skills = [
  'React', 'TypeScript', 'Next.js', 'Three.js', 'Framer Motion', 'Tailwind CSS', 'WebGL', 'Zustand', 'Phaser.io', 'Git'
];

export default function HomeClient() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex min-h-[100vh] items-center justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0 opacity-10 flex items-center justify-center pointer-events-none">
          <ControllerSVG className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] text-accent-cyan" />
        </div>

        <Container className="relative z-10 flex flex-col items-center text-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full max-w-4xl"
          >
            <Heading level={1} gradient className="mb-6 mx-auto pb-2">
              I Build Games & Web Experiences
            </Heading>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mb-10 max-w-2xl mx-auto"
          >
            <Text size="xl" variant="secondary">
              A creative developer specializing in visually rich, interactive web applications and performant browser-based games.
            </Text>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Link href="/games" passHref legacyBehavior>
              <Button size="lg" variant="primary">Play My Games</Button>
            </Link>
            <Link href="/blog" passHref legacyBehavior>
              <Button size="lg" variant="outline">Read My Blog</Button>
            </Link>
          </motion.div>
        </Container>
      </section>

      {/* Featured Games Section */}
      <Section className="bg-surface relative z-10">
        <Container>
          <div className="flex flex-col items-start gap-4 mb-10 sm:flex-row sm:items-end sm:justify-between sm:gap-0">
            <div>
              <Heading level={2} className="mb-4">Featured Games</Heading>
              <Text variant="secondary">Check out some of my latest interactive projects.</Text>
            </div>
            <Link href="/games" className="text-accent-cyan hover:underline font-medium hidden sm:block">
              View All Games &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {games.slice(0, 4).map((game) => (
              <Card key={game.slug} hoverEffect className="group cursor-pointer flex flex-col h-[380px]">
                <div className={`h-40 ${game.thumbnailColor || 'bg-zinc-800'} relative overflow-hidden transition-transform duration-500 group-hover:scale-105`} />
                <div className="flex-1 flex flex-col p-6 overflow-hidden">
                  <Badge variant="cyan" className="self-start mb-3">{game.genre}</Badge>
                  <Heading level={4} className="mb-2 group-hover:text-accent-cyan transition-colors line-clamp-1">
                    {game.title}
                  </Heading>
                  <Text size="sm" variant="secondary" className="mb-4 flex-1 line-clamp-3">
                    {game.description}
                  </Text>
                  <div className="flex gap-2 mt-auto overflow-hidden">
                    {/* Render up to 2 badges to prevent overflow */}
                    {game.techStack.slice(0, 2).map((tech) => (
                      <Badge key={tech.name} variant="default" className="whitespace-nowrap">{tech.name}</Badge>
                    ))}
                    {game.techStack.length > 2 && (
                      <Badge variant="default">+{game.techStack.length - 2}</Badge>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/games" className="text-accent-cyan hover:underline font-medium border border-border px-6 py-3 rounded-md transition-colors hover:bg-surface block w-full">
              View All Games &rarr;
            </Link>
          </div>
        </Container>
      </Section>

      {/* Latest Blog Posts Section */}
      <Section className="bg-background relative z-10">
        <Container>
          <div className="flex flex-col items-start gap-4 mb-10 sm:flex-row sm:items-end sm:justify-between sm:gap-0">
            <div>
              <Heading level={2} className="mb-4">Latest Writing</Heading>
              <Text variant="secondary">Thoughts, tutorials, and deep-dives into modern web development.</Text>
            </div>
            <Link href="/blog" className="text-accent-purple hover:underline font-medium hidden sm:block">
              Read All Posts &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <Card key={post.slug} hoverEffect className="group cursor-pointer p-6 flex flex-col h-full bg-surface">
                <Text size="sm" variant="muted" className="mb-2">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</Text>
                <Heading level={4} className="mb-3 group-hover:text-accent-purple transition-colors line-clamp-2">
                  {post.title}
                </Heading>
                <Text size="sm" variant="secondary" className="flex-1 mb-6 line-clamp-3">
                  {post.excerpt}
                </Text>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {post.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="purple">{tag}</Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/blog" className="text-accent-purple hover:underline font-medium border border-border px-6 py-3 rounded-md transition-colors hover:bg-surface block w-full">
              Read All Posts &rarr;
            </Link>
          </div>
        </Container>
      </Section>

      {/* Skills Overview Section */}
      <Section className="bg-surface pb-32 relative z-10 border-t border-border">
        <Container>
          <Heading level={2} className="mb-12 text-center">Technologies I Use</Heading>

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
        </Container>
      </Section>
    </div>
  );
}
