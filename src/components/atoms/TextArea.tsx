import React, { ComponentProps } from 'react';

const TextArea = ({ className = '', ...props }: { className?: string } & ComponentProps<'textarea'>) => {
    return (
        <textarea
            {...props}
            className={`${className} bg-[var(--tertiary)] rounded-lg px-2 py-1 text-black focus:outline-0 border border-gray-300 text-sm resize-y min-h-[100px]`}
        />
    );
};

export default TextArea;