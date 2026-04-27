'use client'
import React, { useCallback, useState } from 'react';
import HelpForm from '../HelpForm/HelpForm';
import HelpMessage from '../HelpMessage/HelpMessage';
import HelpRequests from '../HelpRequests/HelpRequests';

const HelpBlock = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleFormSubmit = useCallback(() => {
        setIsSubmitted(true);
        setRefreshTrigger(n => n + 1);
    }, []);

    return (
        <div className="flex flex-col md:flex-row gap-5 md:items-start">
            <HelpForm handleFormSubmit={handleFormSubmit} />
            <div className="flex flex-col gap-4 flex-1 min-w-0">
                <HelpMessage isSubmitted={isSubmitted} />
                <HelpRequests refreshTrigger={refreshTrigger} />
            </div>
        </div>
    );
};

export default HelpBlock;
