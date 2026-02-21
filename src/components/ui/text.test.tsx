import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Text } from './text';

describe('Text', () => {
    it('renders children correctly', () => {
        const { getByText } = render(<Text>Body Content</Text>);
        expect(getByText('Body Content')).toBeInTheDocument();
    });

    it('applies explicit size and variant styles', () => {
        const { container } = render(
            <Text size="lg" variant="secondary">
                Styled Text
            </Text>
        );
        expect(container.firstChild).toHaveClass('text-lg');
        expect(container.firstChild).toHaveClass('text-text-secondary');
    });

    it('renders as different element when "as" prop is provided', () => {
        const { container } = render(<Text as="span">Span Text</Text>);
        expect(container.querySelector('span')).toBeInTheDocument();
    });
});
