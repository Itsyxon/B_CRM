'use client'

import Select from "@/components/atoms/Select"
import { ColumnDef, ColumnSort, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table"
import { ChevronLeft, ChevronRight, ChevronsUpDown, ChevronUp, ChevronDown } from "lucide-react"
import { useState } from "react"
import { useSettings } from "@/context/SettingsContext"
import { tableDictionary } from "@/lib/dictionaries"

interface TableProps<TData> {
    data: TData[]
    columns: ColumnDef<TData>[]
    defaultSorting?: ColumnSort[]
    pagination?: boolean
    pageSize?: number
    className?: string
}

const SortIcon = ({ sorted }: { sorted: false | 'asc' | 'desc' }) => {
    if (sorted === 'asc') return <ChevronUp size={13} className="text-[var(--info)]" />
    if (sorted === 'desc') return <ChevronDown size={13} className="text-[var(--info)]" />
    return <ChevronsUpDown size={13} className="opacity-40" />
}

const Table = <TData,>({
    data,
    columns,
    defaultSorting = [],
    pagination = true,
    pageSize = 10,
    className = '',
}: TableProps<TData>) => {
    const { own } = useSettings()
    const d = tableDictionary[own.language]
    const [sorting, setSorting] = useState<SortingState>(defaultSorting)

    const table = useReactTable({
        data,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
        initialState: pagination ? { pagination: { pageSize } } : undefined,
    })

    const { pageIndex, pageSize: currentPageSize } = table.getState().pagination
    const pageCount = table.getPageCount()
    const from = pageIndex * currentPageSize + 1
    const to = Math.min(from + currentPageSize - 1, data.length)

    return (
        <div className={`rounded-xl border border-[var(--border)] overflow-hidden ${className}`}>
            <div className="overflow-x-auto">
                <table className="w-full min-w-[540px]">
                    <thead>
                        <tr className="bg-[var(--navbar)] border-b border-[var(--border)]">
                            {table.getHeaderGroups().map(hg =>
                                hg.headers.map(header => (
                                    <th
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        className="px-5 py-3.5 text-left text-xs font-semibold text-[var(--accent-gray)] uppercase tracking-wider whitespace-nowrap cursor-pointer select-none"
                                    >
                                        <div className="flex items-center gap-1.5">
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            {header.column.getCanSort() && (
                                                <SortIcon sorted={header.column.getIsSorted()} />
                                            )}
                                        </div>
                                    </th>
                                ))
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border)] bg-[var(--tertiary)]">
                        {table.getRowModel().rows.map((row, i) => (
                            <tr
                                key={row.id}
                                className={`hover:bg-[var(--navbar)] transition-colors duration-150 ${i % 2 === 1 ? 'bg-[var(--navbar)]/40' : ''}`}
                            >
                                {row.getVisibleCells().map(cell => (
                                    <td
                                        key={cell.id}
                                        className="px-5 py-4 text-sm text-[var(--foreground)] whitespace-nowrap"
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
                <div className="px-5 py-3.5 border-t border-[var(--border)] bg-[var(--navbar)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <p className="text-xs text-[var(--accent-gray)]">
                        {d.showing(from, to, data.length)}
                    </p>

                    <div className="flex items-center gap-3">
                        <Select
                            value={currentPageSize}
                            onChange={(e) => table.setPageSize(Number(e.target.value))}
                            className="text-xs py-1.5 px-2 rounded-lg border border-[var(--border)] bg-[var(--tertiary)] text-[var(--foreground)]"
                        >
                            {[10, 20, 30, 50].map(s => (
                                <option key={s} value={s}>{d.per(s)}</option>
                            ))}
                        </Select>

                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                                className="w-8 h-8 flex items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--tertiary)] text-[var(--foreground)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--background)] transition-colors cursor-pointer"
                                aria-label={d.prev}
                            >
                                <ChevronLeft size={15} />
                            </button>

                            <span className="text-xs text-[var(--foreground)] px-2 font-medium">
                                {pageIndex + 1} / {pageCount}
                            </span>

                            <button
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                                className="w-8 h-8 flex items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--tertiary)] text-[var(--foreground)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--background)] transition-colors cursor-pointer"
                                aria-label={d.next}
                            >
                                <ChevronRight size={15} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Table
