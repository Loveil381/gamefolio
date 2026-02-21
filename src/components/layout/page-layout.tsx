import * as React from 'react';
import { Header } from './header';
import { Footer } from './footer';

export interface PageLayoutProps {
    children: React.ReactNode;
}

/**
 * The main layout shell for all pages in the application.
 * Contains the Header, main content area, and Footer.
 */
export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
    return (
        <div className="flex min-h-screen flex-col bg-background text-text-primary">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
};
