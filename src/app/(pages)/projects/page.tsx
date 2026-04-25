import { Suspense } from 'react'
import ProjectsGrid from '@/components/organisms/ProjectsGrid/ProjectsGrid'

const ProjectsPage = () => {
  return (
    <div>
      <Suspense>
        <ProjectsGrid />
      </Suspense>
    </div>
  )
}

export default ProjectsPage
