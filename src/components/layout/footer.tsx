import * as React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Text } from '@/components/ui/text';

/**
 * Standard page footer with copyright and generic links.
 */
export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-auto border-t border-border bg-background py-8">
            <Container>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div className="flex flex-col items-center gap-2 md:items-start">
                        <Link href="/" className="text-lg font-bold tracking-tighter text-text-primary">
                            Game<span className="text-accent-cyan">folio</span>
                        </Link>
                        <Text size="sm" variant="muted">
                            © {currentYear} Developer Portfolio. All rights reserved.
                        </Text>
                    </div>

                    <div className="flex items-center gap-6">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
                        >
                            Twitter
                        </a>
                    </div>
                </div>
            </Container>
        </footer>
    );
};
