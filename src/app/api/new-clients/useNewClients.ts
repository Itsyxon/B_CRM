import { useQuery } from '@tanstack/react-query'
import { api } from '../api'

export function useNewClients() {
  return useQuery({
    queryKey: ['diagram'],
    queryFn: async (): Promise<number[]> => {
      const { data } = await api.get<number[]>('/new-clients')
      return data
    },
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 10,
  })
}
