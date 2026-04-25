import { UserType } from "@/types/UserTypes"
import { ColumnDef } from "@tanstack/react-table"

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

export const userColumns: ColumnDef<UserType>[] = [
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
        header: 'Пользователь',
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
        accessorKey: 'createdAt',
        header: 'Регистрация',
        cell: (info) => (
            <span className="text-[var(--accent-gray)] text-sm">
                {new Date(info.getValue() as string).toLocaleDateString('ru-RU', {
                    day: 'numeric', month: 'short', year: 'numeric'
                })}
            </span>
        ),
    },
]
