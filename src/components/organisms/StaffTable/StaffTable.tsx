'use client'
import { useStaff } from '@/app/api/staff/useStaff';
import Table from '../Table/Table';
import { staffColumns } from './StaffTableComponents';
import Loader from '@/components/atoms/Loader';


const StaffTable = () => {
    const { data: staffData, isLoading } = useStaff()

    if (isLoading) {
        return <Loader className='mx-auto w-32 h-32' />
    }

    if (!staffData?.length) {
        return <h2 className='text-xl mt-2'>У вас пока нет персонала</h2>
    }

    return (
        <Table data={staffData} columns={staffColumns} pagination={true} pageSize={10} className='mt-4' />
    );
};

export default StaffTable;
