import { profileData } from './data'

export async function GET() {
  return Response.json(profileData)
}
