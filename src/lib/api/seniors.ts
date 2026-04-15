import { getConnector } from "./index"

export interface SeniorProfile {
  id: string
  adultChildId: string
  fullname: string
  dateOfBirth: string
  mobilityLevel: string
  healthNote: string
  createdAt: string
}

export interface CreateSeniorPayload {
  fullname: string
  dateOfBirth: string
  mobilityLevel: string
  healthNote?: string
}

export async function fetchSeniors(): Promise<SeniorProfile[]> {
  const connector = getConnector()
  const res = await connector.GET<SeniorProfile[]>("users/seniors", undefined, {}, true)

  if (res.isSuccess() && res.payload) {
    return res.payload
  }
  return []
}

export async function fetchSeniorServiceConflicts(startDate: string, endDate: string): Promise<string[]> {
  const connector = getConnector()
  const res = await connector.GET<{ conflicts: string[] }>(
    "bookings/senior-conflicts",
    { startDate, endDate },
    {},
    true
  )
  if (res.isSuccess() && res.payload) {
    return res.payload.conflicts
  }
  return []
}

export async function createSenior(payload: CreateSeniorPayload): Promise<SeniorProfile | null> {
  const connector = getConnector()
  const res = await connector.POST<SeniorProfile>("users/seniors", payload as unknown as Record<string, unknown>)

  if (res.isSuccess() && res.payload) {
    return res.payload
  }
  return null
}
