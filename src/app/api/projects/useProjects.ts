import { Project } from '@/types/ProjectTypes'
import { useQuery } from '@tanstack/react-query'
import { api } from '../api'

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async (): Promise<Project[]> => {
      const { data } = await api.get<Project[]>('/projects')
      return data
    },
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 10,
    retry: 3,
  })
}
