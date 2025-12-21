import { staffData } from './data'

export async function GET() {
  return Response.json(staffData)
}
