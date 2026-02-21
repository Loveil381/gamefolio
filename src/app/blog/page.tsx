import Link from 'next/link';
import { getAllPosts } from '../../lib/mdx';
import { Container } from '../../components/ui/container';
import { Section } from '../../components/ui/section';
import { Heading } from '../../components/ui/heading';
import { Text } from '../../components/ui/text';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

export const metadata = {
    title: 'Blog',
    description: 'Read the latest blog posts on Gamefolio',
};

export default function BlogPage() {
    const posts = getAllPosts();

    return (
        <Section className="py-20 md:py-32">
            <Container>
                <div className="mb-12 animate-slide-up">
                    <Heading level={1} className="mb-4 text-accent-cyan">
                        Blog
                    </Heading>
                    <Text variant="secondary" size="lg" className="max-w-2xl">
                        My thoughts on game development, web tech, and building experiences.
                    </Text>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post, index) => (
                        <Link key={post.frontmatter.slug} href={`/blog/${post.frontmatter.slug}`} className="group block h-full">
                            <Card
                                hoverEffect
                                className="h-full p-6 flex flex-col animate-slide-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="mb-4 flex flex-wrap gap-2">
                                    <Text variant="secondary" size="sm" className="mr-2">
                                        {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </Text>
                                    {post.frontmatter.tags.slice(0, 2).map(tag => (
                                        <Badge key={tag} variant="cyan">{tag}</Badge>
                                    ))}
                                </div>

                                <Heading level={3} className="mb-3 text-lg leading-tight group-hover:text-accent-cyan transition-colors">
                                    {post.frontmatter.title}
                                </Heading>

                                <Text variant="primary" className="line-clamp-3 mb-4 flex-grow">
                                    {post.frontmatter.excerpt}
                                </Text>

                                <Text className="text-accent-cyan text-sm font-medium mt-auto group-hover:underline inline-block">
                                    Read more →
                                </Text>
                            </Card>
                        </Link>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
