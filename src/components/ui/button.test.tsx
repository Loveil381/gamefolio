import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './button';

describe('Button', () => {
    it('renders children correctly', () => {
        const { getByText } = render(<Button>Click me</Button>);
        expect(getByText('Click me')).toBeInTheDocument();
    });

    it('applies default primary and md styles', () => {
        const { getByRole } = render(<Button>Default</Button>);
        const button = getByRole('button');
        expect(button).toHaveClass('bg-text-primary');
        expect(button).toHaveClass('h-10');
    });

    it('applies explicit variant and size styles', () => {
        const { getByRole } = render(
            <Button variant="outline" size="sm">
                Small Outline
            </Button>
        );
        const button = getByRole('button');
        expect(button).toHaveClass('border-border');
        expect(button).toHaveClass('h-9');
    });

    it('handles custom class names', () => {
        const { getByRole } = render(<Button className="custom">Custom</Button>);
        expect(getByRole('button')).toHaveClass('custom');
    });
});
