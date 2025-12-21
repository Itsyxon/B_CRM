import React, { ComponentProps } from 'react';

const Input = ({ className, ...props }: { className?: string } & ComponentProps<'input'>) => {
    return (
        <input {...props} className={`${className} p-3 border border-gray-300 text-md rounded-md focus:outline-0`} />
    );
};

export default Input; 
