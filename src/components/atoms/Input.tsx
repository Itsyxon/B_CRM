import React, { ComponentProps } from 'react';

const Input = ({ className, ...props }: { className?: string } & ComponentProps<'input'>) => {
    return (
        <input {...props} className={`${className} p-3 border border-[var(--border)] bg-[var(--input-bg)] text-[var(--foreground)] text-md rounded-md focus:outline-none focus:border-[var(--info)] transition-colors`} />
    );
};

export default Input; 
