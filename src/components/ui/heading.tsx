import * as React from 'react';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    level?: 1 | 2 | 3 | 4;
    gradient?: boolean;
}

/**
 * Typographic component for headings h1 through h4.
 * Optionally supports a gradient text effect.
 */
export const Heading: React.FC<HeadingProps> = ({
    level = 2,
    gradient = false,
    className = '',
    children,
    ...props
}) => {
    const Component = `h${level}` as React.ElementType;

    const baseStyles = 'font-bold tracking-tight text-text-primary';
    const sizeStyles = {
        1: 'text-4xl sm:text-5xl lg:text-6xl',
        2: 'text-3xl sm:text-4xl lg:text-5xl',
        3: 'text-2xl sm:text-3xl',
        4: 'text-xl sm:text-2xl',
    }[level];

    const gradientStyles = gradient
        ? 'bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent'
        : '';

    return (
        <Component
            className={`${baseStyles} ${sizeStyles} ${gradientStyles} ${className}`.trim()}
            {...props}
        >
            {children}
        </Component>
    );
};
