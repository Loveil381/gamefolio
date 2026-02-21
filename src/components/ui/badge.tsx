import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'cyan' | 'purple' | 'green' | 'amber' | 'default';
}

/**
 * Small tag component used for displaying tech stacks, categories, or status.
 */
export const Badge: React.FC<BadgeProps> = ({
    variant = 'default',
    className = '',
    children,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors';

    const variants = {
        default: 'bg-surface border border-border text-text-secondary',
        cyan: 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20',
        purple: 'bg-accent-purple/10 text-accent-purple border border-accent-purple/20',
        green: 'bg-accent-green/10 text-accent-green border border-accent-green/20',
        amber: 'bg-accent-amber/10 text-accent-amber border border-accent-amber/20',
    };

    return (
        <span
            className={`${baseStyles} ${variants[variant]} ${className}`.trim()}
            {...props}
        >
            {children}
        </span>
    );
};
