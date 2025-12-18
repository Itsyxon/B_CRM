import { widgetsData } from './data'

export async function GET() {
  return Response.json(widgetsData)
}
