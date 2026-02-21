import * as React from 'react';

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    as?: React.ElementType;
    size?: 'sm' | 'base' | 'lg' | 'xl';
    variant?: 'primary' | 'secondary' | 'muted';
}

/**
 * Typographic component for body text.
 * Provides consistent sizing and color variants according to the design system.
 */
export const Text: React.FC<TextProps> = ({
    as: Component = 'p',
    size = 'base',
    variant = 'primary',
    className = '',
    children,
    ...props
}) => {
    const sizeStyles = {
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
    }[size];

    const variantStyles = {
        primary: 'text-text-primary',
        secondary: 'text-text-secondary',
        muted: 'text-text-secondary opacity-80',
    }[variant];

    return (
        <Component
            className={`leading-relaxed ${sizeStyles} ${variantStyles} ${className}`.trim()}
            {...props}
        >
            {children}
        </Component>
    );
};
