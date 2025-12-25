'use client'
import Table from '../Table/Table';
import { useUsers } from '@/app/api/users/useUsers';
import Loader from '@/components/atoms/Loader';
import { userColumns } from './UsersTableComponents';

const UsersTable = () => {
    const { data: usersTable, isLoading, isError } = useUsers()

    if (isLoading) {
        return <Loader className='mx-auto w-32 h-32' />
    }

    if (!usersTable?.length) {
        return <h2 className='text-xl mt-2'>На платформе нет открытых пользователей</h2>
    }

    if (isError) {
        return <h2 className='text-xl mt-2 text-red-500'>Ошибка при загрузке данных</h2>
    }

    return (
        <Table data={usersTable} columns={userColumns} pagination={true} pageSize={10} className='mt-4' />
    );
};

export default UsersTable;