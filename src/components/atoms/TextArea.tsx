import React, { ComponentProps } from 'react';

const TextArea = ({ className = '', ...props }: { className?: string } & ComponentProps<'textarea'>) => {
    return (
        <textarea
            {...props}
            className={`${className} bg-[var(--input-bg)] rounded-lg px-2 py-1 text-[var(--foreground)] focus:outline-none focus:border-[var(--info)] border border-[var(--border)] text-sm resize-y min-h-[100px] transition-colors`}
        />
    );
};

export default TextArea;