export type UserPermissionRole =
  | 'Администратор'
  | 'Руководитель отдела'
  | 'Менеджер'
// основной тип для сущности пользователя (или сотрудника).
export interface UserType {
  id: number
  name: string
  email: string
  createdAt: string
  role?: UserPermissionRole | string
  bio?: string
  photo?: string
}
