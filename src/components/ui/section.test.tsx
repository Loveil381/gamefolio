import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Section } from './section';

describe('Section', () => {
    it('renders children correctly', () => {
        const { getByText } = render(<Section>Test Section</Section>);
        expect(getByText('Test Section')).toBeInTheDocument();
    });

    it('applies custom class names', () => {
        const { container } = render(<Section className="custom-section" />);
        expect(container.firstChild).toHaveClass('custom-section');
        expect(container.firstChild).toHaveClass('py-12');
    });

    it('defaults to section element', () => {
        const { container } = render(<Section />);
        expect(container.querySelector('section')).toBeInTheDocument();
    });
});
