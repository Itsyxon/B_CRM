import React, { ComponentProps } from 'react';

const TextArea = ({ className = '', ...props }: { className?: string } & ComponentProps<'textarea'>) => {
    return (
        <textarea
            {...props}
            className={`${className} bg-[var(--input-bg)] rounded-lg px-3 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--accent-gray)] focus:outline-none focus:border-[var(--info)] focus:ring-2 focus:ring-[var(--info)]/15 border border-[var(--border)] resize-y min-h-[100px] transition-colors`}
        />
    );
};

export default TextArea;