import { useQuery } from '@tanstack/react-query'
import { api } from '../api'
import { UserType } from '@/types/UserTypes'

export function useStaff() {
  return useQuery({
    queryKey: ['staff'],
    queryFn: async (): Promise<UserType[]> => {
      const { data } = await api.get<UserType[]>('/staff')
      return data
    },
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 10,
  })
}
