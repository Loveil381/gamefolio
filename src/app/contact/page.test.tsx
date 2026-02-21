import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import ContactPage from './page';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
        a: ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props}>{children}</a>,
    },
}));

describe('ContactPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Mock console.log for form submission
        vi.spyOn(console, 'log').mockImplementation(() => { });
    });

    it('renders the contact page correctly', () => {
        render(<ContactPage />);

        // Assert header elements
        expect(screen.getByText('Get In Touch')).toBeInTheDocument();
        expect(screen.getByText('Currently open to opportunities')).toBeInTheDocument();

        // Assert form elements
        expect(screen.getByLabelText('Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Subject')).toBeInTheDocument();
        expect(screen.getByLabelText('Message')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    });

    it('shows validation errors when submitting empty form', async () => {
        render(<ContactPage />);

        const submitBtn = screen.getByRole('button', { name: /send message/i });
        fireEvent.click(submitBtn);

        await waitFor(() => {
            expect(screen.getByText('Name is required')).toBeInTheDocument();
            expect(screen.getByText('Email is required')).toBeInTheDocument();
            expect(screen.getByText('Message is required')).toBeInTheDocument();
        });
    });

    it('shows email validation error for invalid email', async () => {
        render(<ContactPage />);

        const emailInput = screen.getByLabelText('Email');
        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

        const submitBtn = screen.getByRole('button', { name: /send message/i });
        fireEvent.click(submitBtn);

        await waitFor(() => {
            expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
        });
    });

    it('submits successfully when form is valid', async () => {
        render(<ContactPage />);

        // Fill form
        fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Jane Doe' } });
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'jane@example.com' } });
        fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello world!' } });

        const submitBtn = screen.getByRole('button', { name: /send message/i });
        fireEvent.click(submitBtn);

        // Should show loading state
        expect(screen.getByText('Sending...')).toBeInTheDocument();

        // Wait for success message
        await waitFor(() => {
            expect(screen.getByText('Message Sent!')).toBeInTheDocument();
        }, { timeout: 2000 });

        expect(console.log).toHaveBeenCalledWith('Form submitted:', expect.objectContaining({
            name: 'Jane Doe',
            email: 'jane@example.com',
            message: 'Hello world!',
        }));
    });
});
