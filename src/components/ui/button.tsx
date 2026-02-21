import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
}

/**
 * Primary interactive element with standard design system variants and sizes.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {
        const baseStyles =
            'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan disabled:pointer-events-none disabled:opacity-50';

        const variants = {
            primary: 'bg-text-primary text-background hover:bg-text-primary/90',
            secondary: 'bg-surface text-text-primary hover:bg-surface/80',
            ghost: 'hover:bg-surface hover:text-text-primary',
            outline:
                'border border-border bg-transparent hover:bg-surface text-text-primary',
        };

        const sizes = {
            sm: 'h-9 px-3 text-sm',
            md: 'h-10 px-4 py-2',
            lg: 'h-11 px-8',
        };

        return (
            <button
                ref={ref}
                className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`.trim()}
                {...props}
            >
                {children}
            </button>
        );
    }
);
Button.displayName = 'Button';
