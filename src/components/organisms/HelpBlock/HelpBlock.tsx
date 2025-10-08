'use client'
import React, { useCallback, useState } from 'react';
import HelpForm from '../HelpForm/HelpForm';
import HelpMessage from '../HelpMessage/HelpMessage';
import HelpRequests from '../HelpRequests/HelpRequests';

const HelpBlock = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleFormSubmit = useCallback(() => {
        setIsSubmitted(true);
    }, []);

    return (
        <div className='flex gap-8'>
            <HelpForm handleFormSubmit={handleFormSubmit} />
            <div className='flex flex-col gap-2 w-full'>
                <HelpMessage isSubmitted={isSubmitted} />
                <HelpRequests />
            </div>
        </div>
    );
};

export default HelpBlock;