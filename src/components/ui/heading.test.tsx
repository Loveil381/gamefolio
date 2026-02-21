import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Heading } from './heading';

describe('Heading', () => {
    it('renders children correctly', () => {
        const { getByText } = render(<Heading>Test Heading</Heading>);
        expect(getByText('Test Heading')).toBeInTheDocument();
    });

    it('renders correct heading level tag', () => {
        const { container: h1 } = render(<Heading level={1}>H1</Heading>);
        expect(h1.querySelector('h1')).toBeInTheDocument();

        const { container: h3 } = render(<Heading level={3}>H3</Heading>);
        expect(h3.querySelector('h3')).toBeInTheDocument();
    });

    it('applies gradient styles when requested', () => {
        const { container } = render(<Heading gradient>Gradient</Heading>);
        expect(container.firstChild).toHaveClass('bg-clip-text');
        expect(container.firstChild).toHaveClass('text-transparent');
    });
});
