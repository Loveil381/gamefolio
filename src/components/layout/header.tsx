'use client';

import * as React from 'react';
import Link from 'next/link';
import { useDarkMode } from '@/hooks/use-dark-mode';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

/**
 * Main application header with responsive navigation and theme toggle.
 */
export const Header: React.FC = () => {
    const { isDark, toggleTheme } = useDarkMode();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Games', href: '/games' },
        { name: 'Blog', href: '/blog' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
            <Container>
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="text-xl font-bold tracking-tighter text-text-primary">
                        Game<span className="text-accent-cyan">folio</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden items-center gap-6 md:flex">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleTheme}
                            className="ml-4"
                            aria-label="Toggle theme"
                        >
                            {isDark ? '☀️ Light' : '🌙 Dark'}
                        </Button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="md:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <span className="sr-only">Toggle menu</span>
                        <div className="flex flex-col gap-1.5">
                            <span className={`block h-0.5 w-5 bg-current transition-transform ${isMobileMenuOpen ? 'translate-y-2 rotate-45' : ''}`}></span>
                            <span className={`block h-0.5 w-5 bg-current transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                            <span className={`block h-0.5 w-5 bg-current transition-transform ${isMobileMenuOpen ? '-translate-y-2 -rotate-45' : ''}`}></span>
                        </div>
                    </Button>
                </div>
            </Container>

            {/* Mobile Nav */}
            {isMobileMenuOpen && (
                <div className="animate-slide-down border-t border-border bg-surface md:hidden">
                    <Container className="flex flex-col space-y-4 py-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-lg font-medium text-text-primary"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4 border-t border-border">
                            <Button
                                variant="outline"
                                className="w-full justify-center"
                                onClick={() => {
                                    toggleTheme();
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                            </Button>
                        </div>
                    </Container>
                </div>
            )}
        </header>
    );
};
