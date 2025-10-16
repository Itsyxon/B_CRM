'use client'
import React from 'react';
import Table from '../Table/Table';
import { staffData } from '@/mocks/StaffData';
import { staffColumns } from './StaffTableComponents';


const StaffTable = () => {
    return (
        <Table data={staffData} columns={staffColumns} pagination={true} pageSize={10} className='mt-4' />
    );
};

export default StaffTable;
