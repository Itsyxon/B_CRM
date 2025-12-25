'use client'
import Content from '@/components/atoms/Content';
import React from 'react';
import DataPieBar from '../DataPieBar/DataPieBar';
import { useNewClients } from '@/app/api/new-clients/useNewClients';
import Loader from '@/components/atoms/Loader';

const DataDiagram = () => {
    const { data: clientsData, isLoading } = useNewClients()

    if (isLoading) {
        return <Loader className='mx-auto w-24 h-24' />
    }

    if (!clientsData?.length) {
        return <Content className='w-full mr-8 flex items-center justify-center '>
            <p>Данные за этот год не обнаружены</p>
        </Content>
    }

    return (
        <Content>
            <DataPieBar clientsData={clientsData} />
        </Content>
    );
};

export default DataDiagram;