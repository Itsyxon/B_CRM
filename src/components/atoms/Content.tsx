import React from 'react';

const Content = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={`${className || ''} p-6 rounded-lg shadow-md bg-[var(--tertiary)] w-fit`}>
            {children}
        </div>
    );
};

export default Content;