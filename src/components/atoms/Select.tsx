// components/atoms/Select.tsx
import React, { ComponentProps } from 'react';

const Select = ({ className = '', children, ...props }: { className?: string } & ComponentProps<'select'>) => {
    return (
        <select
            {...props}
            className={`${className} bg-[var(--tertiary)] rounded-lg px-2 py-2 text-black focus:outline-0 border border-gray-300 text-sm`}
        >
            {children}
        </select>
    );
};

export default Select;