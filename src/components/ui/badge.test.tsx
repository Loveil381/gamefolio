import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from './badge';

describe('Badge', () => {
    it('renders children correctly', () => {
        const { getByText } = render(<Badge>React</Badge>);
        expect(getByText('React')).toBeInTheDocument();
    });

    it('applies default styles', () => {
        const { container } = render(<Badge>Default</Badge>);
        expect(container.firstChild).toHaveClass('bg-surface');
        expect(container.firstChild).toHaveClass('text-xs');
    });

    it('applies color variants correctly', () => {
        const { container } = render(<Badge variant="cyan">Tailwind</Badge>);
        expect(container.firstChild).toHaveClass('text-accent-cyan');
        expect(container.firstChild).toHaveClass('bg-accent-cyan/10');
    });
});
