import { projectsData } from './data'

export async function GET() {
  return Response.json(projectsData)
}
