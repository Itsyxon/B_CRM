import React, { ComponentProps } from 'react';

const Input = ({ className, ...props }: { className?: string } & ComponentProps<'input'>) => {
    return (
        <input {...props} className={`${className} p-2 border border-gray-300 text-lg rounded-md focus:outline-0`} />
    );
};

export default Input; 
