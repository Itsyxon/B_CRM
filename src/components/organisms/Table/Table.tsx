'use client'

import Button from "@/components/atoms/Button"
import Select from "@/components/atoms/Select"
import { ColumnDef, ColumnSort, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table"
import { useState } from "react"

interface TableProps<TData> {
    data: TData[]
    columns: ColumnDef<TData>[]
    defaultSorting?: ColumnSort[]
    pagination?: boolean
    pageSize?: number
    className?: string
}

const Table = <TData,>({ data, columns, defaultSorting = [], pagination = true, pageSize = 10, className = '' }: TableProps<TData>) => {
    const [sorting, setSorting] = useState<SortingState>(defaultSorting)

    const table = useReactTable({
        data, columns, state: {
            sorting,
        }, onSortingChange: setSorting, getCoreRowModel: getCoreRowModel(), getSortedRowModel: getSortedRowModel(), getPaginationRowModel: pagination ? getPaginationRowModel() : undefined, initialState: pagination ? {
            pagination: {
                pageSize,
            },
        } : undefined
    })
    return (
        <div className={`flex flex-col ${className}`}>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="bg-blue-200">
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="px-4 py-5 text-left text-sm font-medium text-gray-700 cursor-pointer"
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        <div className="flex items-center justify-between">
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {{
                                                asc: ' 🔼',
                                                desc: ' 🔽',
                                            }[header.column.getIsSorted() as string] ?? null}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="bg-[var(--tertiary)] transition hover:bg-blue-100">
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className="border border-gray-200 px-4 py-4 text-sm text-gray-600"
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {pagination && (
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center self-center gap-2">
                        <Button
                            className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Назад
                        </Button>
                        <Button
                            className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Вперед
                        </Button>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>
                            Страница {table.getState().pagination.pageIndex + 1} из{' '}
                            {table.getPageCount()}
                        </span>
                        <Select
                            value={table.getState().pagination.pageSize}
                            onChange={(e) => table.setPageSize(Number(e.target.value))}
                            className="border border-gray-300 rounded px-2 py-1"
                        >
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    Показать {pageSize}
                                </option>
                            ))}
                        </Select>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Table;