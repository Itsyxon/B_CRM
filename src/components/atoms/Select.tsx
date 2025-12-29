import { ComponentProps } from 'react';

const Select = ({ className = '', children, ...props }: { className?: string } & ComponentProps<'select'>) => {
    return (
        <select
            {...props}
            className={`${className} bg-[var(--tertiary)] rounded-lg p-3 text-black focus:outline-0 border border-gray-300 text-md`}
        >
            {children}
        </select>
    );
};

export default Select;