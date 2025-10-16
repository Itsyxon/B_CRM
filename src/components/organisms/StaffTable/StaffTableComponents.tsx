import { UserPermissionRole, UserType } from "@/types/UserTypes";
import { ColumnDef } from "@tanstack/react-table";

export const staffColumns: ColumnDef<UserType>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        size: 70
    },
    {
        accessorKey: 'name',
        header: 'ФИО сотрудника',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'role',
        header: 'Должность',
        cell: (info) => {
            const role = info.getValue() as UserPermissionRole
            const roleColors: Record<UserPermissionRole, string> = {
                'Администратор': 'bg-red-100 text-red-800',
                'Руководитель отдела': 'bg-blue-100 text-blue-800',
                'Менеджер': 'bg-green-100 text-green-800'
            }
            return (
                <span className={`px-2 py-1.5 rounded-full font-semibold text-xs ${roleColors[role]}`}>
                    {role}
                </span>
            )
        }
    },
    {
        accessorKey: 'createdAt',
        header: 'Присоединился',
        cell: (info) => new Date(info.getValue() as string).toLocaleDateString('ru-Ru')
    }
]