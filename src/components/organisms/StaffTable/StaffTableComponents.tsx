'use client'
import { useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { UserPermissionRole, UserType } from '@/types/UserTypes'
import { ColumnDef } from '@tanstack/react-table'
import {
    ShieldCheck, Users, UserCog, MoreHorizontal,
    UserCircle, RefreshCw, Mail, ClipboardList,
    CalendarPlus, Ban, ChevronRight,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { useSettings } from '@/context/SettingsContext'
import { staffDictionary, localeMap } from '@/lib/dictionaries'

// ── Shared ────────────────────────────────────────────────────────────────────

const AVATAR_COLORS = [
    'bg-blue-500', 'bg-emerald-500', 'bg-violet-500', 'bg-amber-500',
    'bg-rose-500', 'bg-cyan-500', 'bg-indigo-500', 'bg-teal-500',
]

const getInitials = (name: string) =>
    name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()

const getAvatarColor = (id: number) => AVATAR_COLORS[id % AVATAR_COLORS.length]

const ROLE_STYLES: Record<UserPermissionRole, { className: string; icon: ReactNode }> = {
    'Администратор': {
        className: 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-500/10',
        icon: <ShieldCheck size={11} />,
    },
    'Руководитель отдела': {
        className: 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-500/10',
        icon: <UserCog size={11} />,
    },
    'Менеджер': {
        className: 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10',
        icon: <Users size={11} />,
    },
}

const ALL_ROLES: UserPermissionRole[] = ['Администратор', 'Руководитель отдела', 'Менеджер']

// ── Staff action dropdown ─────────────────────────────────────────────────────

const StaffActionsCell = ({ user }: { user: UserType }) => {
    const { own } = useSettings()
    const d = staffDictionary[own.language].actions
    const roleLabels = staffDictionary[own.language].roles

    const [open, setOpen] = useState(false)
    const [showRoles, setShowRoles] = useState(false)
    const [dropPos, setDropPos] = useState({ top: 0, right: 0 })
    const btnRef = useRef<HTMLButtonElement>(null)

    const handleBlur = (e: React.FocusEvent) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setOpen(false)
            setShowRoles(false)
        }
    }

    const handleToggle = () => {
        if (!open && btnRef.current) {
            const r = btnRef.current.getBoundingClientRect()
            setDropPos({ top: r.bottom + 4, right: window.innerWidth - r.right })
        }
        setOpen(p => !p)
        setShowRoles(false)
    }

    const close = () => { setOpen(false); setShowRoles(false) }

    const item = (icon: ReactNode, label: string, action: () => void, danger = false) => (
        <button
            key={label}
            onClick={() => { action(); close() }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm rounded-md transition-colors text-left cursor-pointer ${
                danger
                    ? 'text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10'
                    : 'text-[var(--secondary)] hover:bg-[var(--navbar)]'
            }`}
        >
            <span className="shrink-0">{icon}</span>
            {label}
        </button>
    )

    const dropdownEl = open && (
        <div
            style={{ position: 'fixed', top: dropPos.top, right: dropPos.right, zIndex: 9999 }}
            className="w-52 bg-[var(--tertiary)] border border-[var(--border)] rounded-xl shadow-xl p-1.5"
            onMouseDown={(e) => e.preventDefault()}
        >
            {item(<UserCircle size={15} />, d.openProfile, () => {})}

            {/* Change role sub-menu */}
            <div>
                <button
                    onClick={() => setShowRoles(p => !p)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm rounded-md text-[var(--secondary)] hover:bg-[var(--navbar)] transition-colors cursor-pointer"
                >
                    <RefreshCw size={15} className="shrink-0" />
                    <span className="flex-1 text-left">{d.changeRole}</span>
                    <ChevronRight
                        size={12}
                        className={`text-[var(--accent-gray)] transition-transform duration-150 ${showRoles ? 'rotate-90' : ''}`}
                    />
                </button>
                {showRoles && (
                    <div className="ml-4 pl-2 border-l border-[var(--border)] mt-0.5 mb-1 space-y-0.5">
                        {ALL_ROLES.filter(r => r !== user.role).map(role => (
                            <button
                                key={role}
                                onClick={close}
                                className="w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded-md text-[var(--accent-gray)] hover:bg-[var(--navbar)] hover:text-[var(--secondary)] transition-colors text-left cursor-pointer"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--border)] shrink-0" />
                                {roleLabels[role] ?? role}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {item(<Mail size={15} />, d.sendEmail, () => { window.location.href = `mailto:${user.email}` })}
            {item(<ClipboardList size={15} />, d.assignTask, () => {})}
            {item(<CalendarPlus size={15} />, d.scheduleMeeting, () => {})}

            <div className="h-px bg-[var(--border)] my-1" />
            {item(<Ban size={15} />, d.deactivate, () => {}, true)}
        </div>
    )

    return (
        <>
            <div tabIndex={-1} className="outline-none" onBlur={handleBlur}>
                <button
                    ref={btnRef}
                    onClick={handleToggle}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--accent-gray)] hover:bg-[var(--navbar)] hover:text-[var(--secondary)] transition-colors cursor-pointer"
                >
                    <MoreHorizontal size={16} />
                </button>
            </div>
            {dropdownEl && createPortal(dropdownEl, document.body)}
        </>
    )
}

// ── Column definitions ────────────────────────────────────────────────────────

type StaffDictionary = typeof staffDictionary['ru']

export const makeStaffColumns = (d: StaffDictionary, locale: string): ColumnDef<UserType>[] => [
    {
        accessorKey: 'id',
        header: 'ID',
        size: 60,
        cell: (info) => (
            <span className="text-xs font-mono text-[var(--accent-gray)]">
                #{info.getValue() as number}
            </span>
        ),
    },
    {
        accessorKey: 'name',
        header: d.columns.employee,
        cell: (info) => {
            const name = info.getValue() as string
            const id = info.row.original.id
            return (
                <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${getAvatarColor(id)} flex items-center justify-center shrink-0`}>
                        <span className="text-white text-xs font-semibold">{getInitials(name)}</span>
                    </div>
                    <span className="font-medium text-[var(--secondary)]">{name}</span>
                </div>
            )
        },
    },
    {
        accessorKey: 'email',
        header: 'Email',
        cell: (info) => (
            <span className="text-[var(--accent-gray)] text-sm">{info.getValue() as string}</span>
        ),
    },
    {
        accessorKey: 'role',
        header: d.columns.role,
        cell: (info) => {
            const role = info.getValue() as UserPermissionRole
            const styles = ROLE_STYLES[role]
            const label = d.roles[role] ?? role
            if (!styles) return <span className="text-[var(--accent-gray)] text-sm">{label}</span>
            return (
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${styles.className}`}>
                    {styles.icon}
                    {label}
                </span>
            )
        },
    },
    {
        accessorKey: 'createdAt',
        header: d.columns.memberSince,
        cell: (info) => (
            <span className="text-[var(--accent-gray)] text-sm">
                {new Date(info.getValue() as string).toLocaleDateString(locale, {
                    day: 'numeric', month: 'short', year: 'numeric',
                })}
            </span>
        ),
    },
    {
        id: 'actions',
        header: '',
        size: 48,
        enableSorting: false,
        cell: (info) => <StaffActionsCell user={info.row.original} />,
    },
]
