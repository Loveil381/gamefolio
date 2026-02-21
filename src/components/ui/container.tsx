import * as React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    as?: React.ElementType;
}

/**
 * A responsive container that bounds the maximum width of content
 * and provides consistent horizontal padding.
 */
export const Container: React.FC<ContainerProps> = ({
    className = '',
    as: Component = 'div',
    children,
    ...props
}) => {
    return (
        <Component
            className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}
            {...props}
        >
            {children}
        </Component>
    );
};
