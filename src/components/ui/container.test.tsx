import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Container } from './container';

describe('Container', () => {
    it('renders children correctly', () => {
        const { getByText } = render(<Container>Test Content</Container>);
        expect(getByText('Test Content')).toBeInTheDocument();
    });

    it('applies custom class names', () => {
        const { container } = render(<Container className="custom-class" />);
        expect(container.firstChild).toHaveClass('custom-class');
        expect(container.firstChild).toHaveClass('mx-auto w-full max-w-7xl');
    });

    it('renders as different element when "as" prop is provided', () => {
        const { container } = render(<Container as="section" />);
        expect(container.querySelector('section')).toBeInTheDocument();
    });
});
