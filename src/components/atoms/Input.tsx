import React, { ComponentProps } from 'react';

const Input = ({ className, ...props }: { className?: string } & ComponentProps<'input'>) => {
    return (
        <input {...props} className={`${className} px-3 py-2.5 border border-[var(--border)] bg-[var(--input-bg)] text-[var(--foreground)] text-sm rounded-lg placeholder:text-[var(--accent-gray)] focus:outline-none focus:border-[var(--info)] focus:ring-2 focus:ring-[var(--info)]/15 transition-colors`} />
    );
};

export default Input; 
