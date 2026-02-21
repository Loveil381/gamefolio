import * as React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    hoverEffect?: boolean;
}

/**
 * Surface container for distinct pieces of content.
 * Optionally includes a hover glow effect.
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className = '', hoverEffect = false, children, ...props }, ref) => {
        const baseStyles = 'rounded-xl border border-border bg-surface text-text-primary overflow-hidden';
        const hoverStyles = hoverEffect
            ? 'transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] hover:border-accent-cyan/30'
            : '';

        return (
            <div
                ref={ref}
                className={`${baseStyles} ${hoverStyles} ${className}`.trim()}
                {...props}
            >
                {children}
            </div>
        );
    }
);
Card.displayName = 'Card';
