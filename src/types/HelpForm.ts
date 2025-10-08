export type HelpRequestType = {
  id: number
  name: string
  email: string
  problemType: 'web' | 'service' | 'bug' | 'other'
  reason?: string
  problemText: string
}

export type Request = {
  id: number
  text: string
}
