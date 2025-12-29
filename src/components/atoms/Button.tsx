import React, { ComponentProps } from 'react';

const Button = ({
    children,
    className,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
} & ComponentProps<'button'>) => {
    return (
        <button
            {...props}
            className={`cursor-pointer bg-[var(--info)] py-2 px-4 text-white rounded-lg text-lg disabled:bg-[var(--accent-gray)]/40 transition-colors ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;