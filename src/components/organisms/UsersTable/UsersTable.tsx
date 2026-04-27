'use client'
import Table from '../Table/Table'
import { useUsers } from '@/app/api/users/useUsers'
import Loader from '@/components/atoms/Loader'
import { makeUserColumns } from './UsersTableComponents'
import { useSettings } from '@/context/SettingsContext'
import { usersDictionary, localeMap } from '@/lib/dictionaries'
import { useMemo } from 'react'

const UsersTable = () => {
    const { own } = useSettings()
    const d = usersDictionary[own.language]
    const locale = localeMap[own.language]
    const columns = useMemo(() => makeUserColumns(d, locale), [d, locale])

    const { data: usersTable, isLoading, isError } = useUsers()

    if (isLoading) {
        return <Loader className='mx-auto w-32 h-32' />
    }

    if (isError) {
        return <h2 className='text-xl mt-2 text-red-500'>{d.error}</h2>
    }

    if (!usersTable?.length) {
        return <h2 className='text-xl mt-2'>{d.empty}</h2>
    }

    return (
        <Table data={usersTable} columns={columns} pagination={true} pageSize={10} className='mt-4' />
    )
}

export default UsersTable
