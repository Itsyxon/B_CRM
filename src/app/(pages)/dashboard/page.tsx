'use client'
import DashboardWidgets from '@/components/organisms/DashboardWidgets/DashboardWidgets';
import DashboardYearStats from '@/components/organisms/DashboardYearStats/DashboardYearStats';
import React from 'react';

const DashboardPage = () => {
    return (
        <div className='w-1/2 flex flex-col gap-10'>
            <DashboardWidgets />
            <DashboardYearStats />
        </div>
    );
};

export default DashboardPage;