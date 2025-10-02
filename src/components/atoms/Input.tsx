import React from 'react';

const Input = ({ className }: { className?: string }) => {
    return (
        <input className={`${className} p-2 border border-gray-300 text-lg rounded-md focus:outline-0`} />
    );
};

export default Input;