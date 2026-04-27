import { ComponentProps } from 'react';

const Select = ({ className = '', children, ...props }: { className?: string } & ComponentProps<'select'>) => {
    return (
        <select
            {...props}
            className={`${className} bg-[var(--input-bg)] rounded-lg px-3 py-2.5 text-sm text-[var(--foreground)] focus:outline-none focus:border-[var(--info)] focus:ring-2 focus:ring-[var(--info)]/15 border border-[var(--border)] transition-colors`}
        >
            {children}
        </select>
    );
};

export default Select;