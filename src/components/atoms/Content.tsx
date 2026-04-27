import React from 'react';

const Content = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={`p-6 rounded-xl border border-[var(--border)] shadow-sm bg-[var(--tertiary)] w-fit ${className || ''}`}>
            {children}
        </div>
    );
};

export default Content;