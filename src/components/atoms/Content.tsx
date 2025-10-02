import React from 'react';

const Content = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='p-6 rounded-lg shadow-md bg-white w-fit'>
            {children}
        </div>
    );
};

export default Content;