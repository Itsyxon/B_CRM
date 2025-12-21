import { useQuery } from '@tanstack/react-query'
import { api } from '../api'

export function useYearData() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: async (): Promise<number[]> => {
      const { data } = await api.get<number[]>('/year-data')
      return data
    },
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 10,
  })
}
