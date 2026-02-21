import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PageLayout } from './page-layout';

// Mock Header and Footer to isolate PageLayout testing
vi.mock('./header', () => ({
    Header: () => <header data-testid="mock-header">Header</header>,
}));

vi.mock('./footer', () => ({
    Footer: () => <footer data-testid="mock-footer">Footer</footer>,
}));

describe('PageLayout', () => {
    it('renders children within main tag', () => {
        const { getByText, getByRole } = render(
            <PageLayout>
                <div>Test Content</div>
            </PageLayout>
        );

        expect(getByRole('main')).toBeInTheDocument();
        expect(getByText('Test Content')).toBeInTheDocument();
    });

    it('renders header and footer components', () => {
        const { getByTestId } = render(<PageLayout>Content</PageLayout>);

        expect(getByTestId('mock-header')).toBeInTheDocument();
        expect(getByTestId('mock-footer')).toBeInTheDocument();
    });
});
