import { clientsData } from './data'

export async function GET() {
  return Response.json(clientsData)
}
