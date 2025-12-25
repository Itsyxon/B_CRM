import { UserType } from '@/types/UserTypes'
import { useQuery } from '@tanstack/react-query'
import { api } from '../api'

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async (): Promise<UserType[]> => {
      const { data } = await api.get<UserType[]>('/users')
      return data
    },
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 10,
    retry: 3,
  })
}
