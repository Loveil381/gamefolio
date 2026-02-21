import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Header } from './header';

// Mock usesDarkMode hook and next/link
vi.mock('@/hooks/use-dark-mode', () => ({
    useDarkMode: () => ({
        isDark: true,
        toggleTheme: vi.fn(),
    }),
}));

vi.mock('next/link', () => ({
    default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

describe('Header', () => {
    it('renders logo securely', () => {
        const { getByText } = render(<Header />);
        expect(getByText('Game')).toBeInTheDocument();
        expect(getByText('folio')).toBeInTheDocument();
    });

    it('renders navigation links', () => {
        const { getByText } = render(<Header />);
        expect(getByText('Home')).toBeInTheDocument();
        expect(getByText('Games')).toBeInTheDocument();
        expect(getByText('Blog')).toBeInTheDocument();
    });

    it('toggles mobile menu', () => {
        const { getByLabelText, queryByText } = render(<Header />);

        // Initially mobile links wrapper isn't rendered or is visually hidden
        // We check via aria-expanded
        const toggleBtn = getByLabelText('Toggle menu');
        expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');

        fireEvent.click(toggleBtn);
        expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');
    });
});
