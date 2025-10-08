'use client'
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import React, { memo, useState } from 'react';

const Table = memo(function Table({ data, columns }: { data: [], columns: ColumnDef<never>[] }) {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10
    })
    const table = useReactTable({
        data, columns, getCoreRowModel: getCoreRowModel(), state: {
            pagination,
        }, onPaginationChange: setPagination, getPaginationRowModel: getPaginationRowModel(), pageCount: Math.ceil(data.length / pagination.pageSize)
    })
    return (
        <>
            <table className='w-full'>
                <thead className='bg-emerald-900 text-white'>
                    {table.getHeaderGroups().map(group => (
                        <tr key={group.id}>
                            {group.headers.map((header) => (
                                <th className='p-4' key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className='*:nth-[2n]:bg-gray-200'>
                    {table.getRowModel().rows.map(row => (
                        <tr className='text-center hover:!bg-emerald-600 hover:text-white transition' key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td className='p-4 border-t border-t-black' key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>

    );
});

export default Table;