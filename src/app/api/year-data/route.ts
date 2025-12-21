import { yearData } from './data'

export async function GET() {
  return Response.json(yearData)
}
