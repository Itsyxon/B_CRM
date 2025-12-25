import { NewsResponse } from '@/types/DashboardTypes'
import { useInfiniteQuery } from '@tanstack/react-query'
import { api } from '../api'

export function useNews() {
  return useInfiniteQuery({
    queryKey: ['news'],
    queryFn: async ({ pageParam = 1 }): Promise<NewsResponse> => {
      const { data } = await api.get<NewsResponse>('/news', {
        params: {
          page: pageParam,
          limit: 3,
        },
      })
      return data
    },
    getNextPageParam: (lastPage) => {
      return lastPage.meta.hasMore ? lastPage.meta.nextPage : undefined
    },
    initialPageParam: 1,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 10,
  })
}
