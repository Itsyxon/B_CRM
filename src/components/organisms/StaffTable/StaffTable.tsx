'use client'
import { useStaff } from '@/app/api/staff/useStaff'
import Table from '../Table/Table'
import { makeStaffColumns } from './StaffTableComponents'
import Loader from '@/components/atoms/Loader'
import { useSettings } from '@/context/SettingsContext'
import { staffDictionary, localeMap } from '@/lib/dictionaries'
import { useMemo } from 'react'

const StaffTable = () => {
    const { own } = useSettings()
    const d = staffDictionary[own.language]
    const locale = localeMap[own.language]
    const columns = useMemo(() => makeStaffColumns(d, locale), [d, locale])

    const { data: staffData, isLoading } = useStaff()

    if (isLoading) {
        return <Loader className='mx-auto w-32 h-32' />
    }

    if (!staffData?.length) {
        return <h2 className='text-xl mt-2'>{d.empty}</h2>
    }

    return (
        <Table data={staffData} columns={columns} pagination={true} pageSize={10} className='mt-4' />
    )
}

export default StaffTable
