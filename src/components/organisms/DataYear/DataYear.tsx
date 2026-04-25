'use client'
import { useYearData } from '@/app/api/year-data/useYearData';
import DataYearBar from '../DataYearBar/DataYearBar';
import Loader from '@/components/atoms/Loader';
import Content from '@/components/atoms/Content';

const DataYear = () => {
    const { data: yearData, isLoading, isError } = useYearData()

    if (isLoading) {
        return <Content className="w-full flex justify-center items-center h-[200px] sm:h-[305px]"><Loader /></Content>
    }

    if (!yearData?.length) {
        return <Content className='w-full mr-8 flex items-center justify-center '>
            <p>Данные за этот год не обнаружены</p>
        </Content>
    }

    return (
        <Content>
            <DataYearBar yearData={yearData} />
        </Content>
    );
};

export default DataYear;