'use client'
import Content from '@/components/atoms/Content';
import React from 'react';
import DataYearBar from '../DataYearBar/DataYearBar';
import DataPieBar from '../DataPieBar/DataPieBar';

const DashboardYearStats = () => {
    return (
        <div className='flex justify-between'>
            <Content>
                <DataYearBar />
            </Content>
            <Content>
                <DataPieBar />
            </Content>
        </div>
    );
};

export default DashboardYearStats;