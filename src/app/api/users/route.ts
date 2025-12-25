import { usersData } from './data'

export async function GET() {
  return Response.json(usersData)
}
