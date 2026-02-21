import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from './card';

describe('Card', () => {
    it('renders children correctly', () => {
        const { getByText } = render(<Card>Card Content</Card>);
        expect(getByText('Card Content')).toBeInTheDocument();
    });

    it('applies base styles', () => {
        const { container } = render(<Card>Content</Card>);
        expect(container.firstChild).toHaveClass('bg-surface');
        expect(container.firstChild).toHaveClass('border-border');
        expect(container.firstChild).toHaveClass('rounded-xl');
    });

    it('applies hover effect styles when propelled', () => {
        const { container } = render(<Card hoverEffect>Hover</Card>);
        expect(container.firstChild).toHaveClass('hover:shadow-[0_0_15px_rgba(0,240,255,0.1)]');
    });
});
