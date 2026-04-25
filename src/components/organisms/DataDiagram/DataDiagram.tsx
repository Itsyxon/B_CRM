'use client'
import Content from '@/components/atoms/Content';
import React from 'react';
import DataPieBar from '../DataPieBar/DataPieBar';
import { useNewClients } from '@/app/api/new-clients/useNewClients';
import Loader from '@/components/atoms/Loader';

const DataDiagram = () => {
    const { data: clientsData, isLoading } = useNewClients()

    if (isLoading) {
        return <Content className="w-full flex justify-center items-center h-[260px]"><Loader /></Content>
    }

    if (!clientsData?.length) {
        return (
            <Content className='w-full flex items-center justify-center h-[260px]'>
                <p className='text-[var(--accent-gray)] text-sm'>Данные не обнаружены</p>
            </Content>
        )
    }

    return (
        <Content className='w-full'>
            <div className='mb-4'>
                <h2 className='text-base font-semibold text-[var(--secondary)]'>Новые клиенты</h2>
                <p className='text-xs text-[var(--accent-gray)] mt-0.5'>Распределение по источникам</p>
            </div>
            <DataPieBar clientsData={clientsData} />
        </Content>
    );
};

export default DataDiagram;
