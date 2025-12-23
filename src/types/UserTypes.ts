export type UserPermissionRole =
  | 'Администратор'
  | 'Руководитель отдела'
  | 'Менеджер'
// основной тип для сущности пользователя (или сотрудника).
export interface UserType {
  id: number
  name: string
  role: UserPermissionRole | string
  email: string
  createdAt: string
  bio?: string
  photo?: string
}
