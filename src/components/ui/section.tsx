import * as React from 'react';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    as?: React.ElementType;
}

/**
 * A layout section component used to separate page content blocks
 * with consistent vertical spacing.
 */
export const Section: React.FC<SectionProps> = ({
    className = '',
    as: Component = 'section',
    children,
    ...props
}) => {
    return (
        <Component
            className={`py-12 md:py-16 lg:py-24 ${className}`}
            {...props}
        >
            {children}
        </Component>
    );
};
