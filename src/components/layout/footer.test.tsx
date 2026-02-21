import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Footer } from './footer';

vi.mock('next/link', () => ({
    default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

describe('Footer', () => {
    it('renders copyright with current year', () => {
        const { getByText } = render(<Footer />);
        const year = new Date().getFullYear();
        expect(getByText(`© ${year} Developer Portfolio. All rights reserved.`)).toBeInTheDocument();
    });

    it('renders social links', () => {
        const { getByText } = render(<Footer />);
        expect(getByText('GitHub')).toBeInTheDocument();
        expect(getByText('LinkedIn')).toBeInTheDocument();
        expect(getByText('Twitter')).toBeInTheDocument();
    });
});
