import { DashboardWidget } from '@/types/DashboardTypes'
import { useQuery } from '@tanstack/react-query'
import { api } from '../api'

export function useWidgets() {
  return useQuery({
    queryKey: ['widgets'],
    queryFn: async (): Promise<DashboardWidget[]> => {
      const { data } = await api.get<DashboardWidget[]>('/widgets')
      return data
    },
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 10,
  })
}
