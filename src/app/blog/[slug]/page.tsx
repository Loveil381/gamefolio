import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getPostSlugs } from '../../../lib/mdx';
import { Container } from '../../../components/ui/container';
import { Section } from '../../../components/ui/section';
import { Heading } from '../../../components/ui/heading';
import { Text } from '../../../components/ui/text';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';

export async function generateStaticParams() {
    const slugs = getPostSlugs();
    return slugs.map((slug) => ({
        slug: slug.replace(/\.mdx$/, ''),
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    try {
        const post = getPostBySlug(slug);
        return {
            title: post.frontmatter.title,
            description: post.frontmatter.excerpt,
        };
    } catch {
        return {
            title: 'Post Not Found',
        };
    }
}

// Calculate basic reading time based on 200 words per minute
function calculateReadingTime(text: string) {
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / 200);
    return `${time} min read`;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    let post;
    try {
        post = getPostBySlug(slug);
    } catch {
        notFound();
    }

    const { frontmatter, content } = post;
    const readingTime = calculateReadingTime(content);

    // MDX components mapping for custom styling
    const customComponents = {
        h1: (props: React.ComponentPropsWithoutRef<'h1'>) => <Heading level={1} className="mt-8 mb-4" {...props} />,
        h2: (props: React.ComponentPropsWithoutRef<'h2'>) => <Heading level={2} className="mt-8 mb-4 text-accent-cyan" {...props} />,
        h3: (props: React.ComponentPropsWithoutRef<'h3'>) => <Heading level={3} className="mt-6 mb-3" {...props} />,
        p: (props: React.ComponentPropsWithoutRef<'p'>) => <Text className="mb-4 leading-relaxed" {...props} />,
        a: (props: React.ComponentPropsWithoutRef<'a'>) => <a className="text-accent-cyan hover:underline hover:text-accent-cyan/80 transition-colors" {...props} />,
        ul: (props: React.ComponentPropsWithoutRef<'ul'>) => <ul className="list-disc pl-6 mb-4 space-y-2 text-text-secondary" {...props} />,
        ol: (props: React.ComponentPropsWithoutRef<'ol'>) => <ol className="list-decimal pl-6 mb-4 space-y-2 text-text-secondary" {...props} />,
        li: (props: React.ComponentPropsWithoutRef<'li'>) => <li className="pl-1" {...props} />,
        blockquote: (props: React.ComponentPropsWithoutRef<'blockquote'>) => (
            <blockquote className="border-l-4 border-accent-cyan pl-4 py-1 italic text-text-secondary my-6 bg-surface/50 p-4 rounded-r-lg" {...props} />
        ),
        pre: (props: React.ComponentPropsWithoutRef<'pre'>) => (
            <pre className="bg-surface border border-border rounded-xl p-4 overflow-x-auto my-6 text-sm" {...props} />
        ),
        code: (props: React.ComponentPropsWithoutRef<'code'>) => {
            // Inline code usually doesn't have className in basic MDX parsing unless specified
            const isInline = !props.className?.includes('language-');
            return isInline
                ? <code className="bg-surface/80 px-1.5 py-0.5 rounded text-accent-amber text-sm font-mono border border-border" {...props} />
                : <code className="text-sm font-mono text-text-primary" {...props} />;
        },
        strong: (props: React.ComponentPropsWithoutRef<'strong'>) => <strong className="font-bold text-text-primary" {...props} />
    };

    return (
        <article className="pb-20">
            <Section className="pt-24 pb-12 bg-surface/30 border-b border-border">
                <Container className="max-w-3xl">
                    <Link href="/blog" className="inline-flex mb-8 items-center text-text-secondary hover:text-accent-cyan transition-colors">
                        ← Back to blog
                    </Link>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {frontmatter.tags.map(tag => (
                            <Badge key={tag} variant="cyan">{tag}</Badge>
                        ))}
                    </div>

                    <Heading level={1} className="mb-6 animate-slide-up">
                        {frontmatter.title}
                    </Heading>

                    <div className="flex items-center gap-4 text-text-secondary text-sm animate-slide-up" style={{ animationDelay: '100ms' }}>
                        <time dateTime={frontmatter.date}>
                            {new Date(frontmatter.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </time>
                        <span>•</span>
                        <span>{readingTime}</span>
                    </div>
                </Container>
            </Section>

            <Section className="py-12">
                <Container className="max-w-3xl">
                    {/* using prose directly with overrides in custom components */}
                    <div className="prose prose-invert prose-cyan max-w-none prose-p:text-text-primary prose-headings:text-text-primary">
                        <MDXRemote source={content} components={customComponents} />
                    </div>

                    <hr className="my-12 border-border" />

                    <div className="flex justify-between items-center bg-surface p-6 rounded-xl border border-border">
                        <Text className="text-text-secondary">Thanks for reading! Let me know your thoughts.</Text>
                        <Link href="/blog">
                            <Button variant="outline">Read More Posts</Button>
                        </Link>
                    </div>
                </Container>
            </Section>
        </article>
    );
}
