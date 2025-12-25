import { UserType } from "@/types/UserTypes"
import { ColumnDef } from "@tanstack/react-table"

export const userColumns: ColumnDef<UserType>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        size: 70
    },
    {
        accessorKey: 'name',
        header: 'ФИО пользователя',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'createdAt',
        header: 'Дата регистрации',
        cell: (info) => new Date(info.getValue() as string).toLocaleDateString('ru-Ru')
    }
]