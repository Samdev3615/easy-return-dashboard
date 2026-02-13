export type PhaseStatus = 'completed' | 'in_progress' | 'pending'

export type Phase = {
  id: number
  name: string
  sequences: string
  total: number
  completed: number
  status: PhaseStatus
  emoji: string
  hours: number
}

export type Session = {
  id: number
  date: string
  title: string
  sequences: string[]
  duration: number
  highlights: string[]
}

export type DevLog = {
  totalSequences: number
  completedSequences: number
  totalHours: number
  lastUpdate: string
  phases: Phase[]
  sessions: Session[]
}
