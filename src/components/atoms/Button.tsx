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
            className={`cursor-pointer bg-blue-400 py-2 px-4 text-white rounded-lg text-lg ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;