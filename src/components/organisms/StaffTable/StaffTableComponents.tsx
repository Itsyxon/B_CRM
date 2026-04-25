import { UserPermissionRole, UserType } from "@/types/UserTypes"
import { ColumnDef } from "@tanstack/react-table"
import { ShieldCheck, Users, UserCog } from "lucide-react"
import type { ReactNode } from "react"

const AVATAR_COLORS = [
    'bg-blue-500',
    'bg-emerald-500',
    'bg-violet-500',
    'bg-amber-500',
    'bg-rose-500',
    'bg-cyan-500',
    'bg-indigo-500',
    'bg-teal-500',
]

const getInitials = (name: string) =>
    name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()

const getAvatarColor = (id: number) =>
    AVATAR_COLORS[id % AVATAR_COLORS.length]

type RoleMeta = {
    label: string
    className: string
    icon: ReactNode
}

const roleMeta: Record<UserPermissionRole, RoleMeta> = {
    'Администратор': {
        label: 'Администратор',
        className: 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-500/10',
        icon: <ShieldCheck size={11} />,
    },
    'Руководитель отдела': {
        label: 'Руководитель',
        className: 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-500/10',
        icon: <UserCog size={11} />,
    },
    'Менеджер': {
        label: 'Менеджер',
        className: 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10',
        icon: <Users size={11} />,
    },
}

export const staffColumns: ColumnDef<UserType>[] = [
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
        header: 'Сотрудник',
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
        header: 'Должность',
        cell: (info) => {
            const role = info.getValue() as UserPermissionRole
            const meta = roleMeta[role]
            if (!meta) return <span className="text-[var(--accent-gray)] text-sm">{role}</span>
            return (
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${meta.className}`}>
                    {meta.icon}
                    {meta.label}
                </span>
            )
        },
    },
    {
        accessorKey: 'createdAt',
        header: 'В команде с',
        cell: (info) => (
            <span className="text-[var(--accent-gray)] text-sm">
                {new Date(info.getValue() as string).toLocaleDateString('ru-RU', {
                    day: 'numeric', month: 'short', year: 'numeric'
                })}
            </span>
        ),
    },
]
