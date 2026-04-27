'use client'
import { useYearData } from '@/app/api/year-data/useYearData'
import DataYearBar from '../DataYearBar/DataYearBar'
import Loader from '@/components/atoms/Loader'
import Content from '@/components/atoms/Content'
import { useSettings } from '@/context/SettingsContext'
import { dashboardDictionary } from '@/lib/dictionaries'

const DataYear = () => {
    const { data: yearData, isLoading, isError } = useYearData()
    const { own } = useSettings()
    const d = dashboardDictionary[own.language].yearStats

    if (isLoading) {
        return <Content className="w-full flex justify-center items-center h-[260px]"><Loader /></Content>
    }

    if (isError || !yearData?.length) {
        return (
            <Content className='w-full flex items-center justify-center h-[260px]'>
                <p className='text-[var(--accent-gray)] text-sm'>{d.noData}</p>
            </Content>
        )
    }

    return (
        <Content className='w-full'>
            <div className='flex items-start justify-between mb-4'>
                <div>
                    <h2 className='text-base font-semibold text-[var(--secondary)]'>{d.title}</h2>
                    <p className='text-xs text-[var(--accent-gray)] mt-0.5'>{d.subtitle}</p>
                </div>
            </div>
            <DataYearBar yearData={yearData} />
        </Content>
    )
}

export default DataYear
