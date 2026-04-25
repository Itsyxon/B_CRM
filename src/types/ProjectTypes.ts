export type ProjectStatus = 'active' | 'completed' | 'paused' | 'cancelled'
export type ProjectPriority = 'low' | 'medium' | 'high'

export interface Project {
  id: number
  name: string
  description: string
  author: string
  authorId: number
  status: ProjectStatus
  priority: ProjectPriority
  progress: number
  deadline: string
  createdAt: string
  tags: string[]
  budget: string
  teamSize: number
}
