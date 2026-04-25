import { ComponentProps } from 'react';

const Select = ({ className = '', children, ...props }: { className?: string } & ComponentProps<'select'>) => {
    return (
        <select
            {...props}
            className={`${className} bg-[var(--input-bg)] rounded-lg p-3 text-[var(--foreground)] focus:outline-none focus:border-[var(--info)] border border-[var(--border)] text-md transition-colors`}
        >
            {children}
        </select>
    );
};

export default Select;