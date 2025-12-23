import { useQuery } from '@tanstack/react-query'
import { UserType } from '../../../types/UserTypes'
import { api } from '../api'

export function useProfile() {
  return useQuery({
    queryKey: ['user'],
    queryFn: async (): Promise<UserType> => {
      const { data } = await api.get<UserType>('/profile')
      return data
    },
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 10,
    retry: 3, // в целом, можно убрать
  })
}
