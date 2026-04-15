import { getConnector } from "./index"

export interface ActivityData {
  id: string
  title: string
  category: string
  tags: string[]
  host: string
  hostAvatar: string
  hostDescription: string
  startDate: string
  endDate: string
  displayDate: string
  location: string
  price: number
  participantCount: number
  duration: string
  maxPeople: number
  rating: number
  reviews: number
  images: string[]
}

export async function fetchActivities(): Promise<ActivityData[]> {
  const connector = getConnector()
  const res = await connector.GET<ActivityData[]>("activities", undefined, {}, true)
  if (res.isSuccess() && res.payload) {
    return res.payload
  }
  return []
}

export async function fetchActivityById(id: string): Promise<ActivityData | null> {
  const connector = getConnector()
  const res = await connector.GET<ActivityData>(`activities/${id}`, undefined, {}, true)
  if (res.isSuccess() && res.payload) {
    return res.payload
  }
  return null
}

export interface BookActivityPayload {
  activityId: string
  seniorIds: string[]
  transport: "self" | "pickup" | "dropoff"
  transportLocation?: string
  note?: string
}

export interface ActivityBookingResponse {
  bookingId: string
  activityId: string
  seniorIds: string[]
  transport: string
  activityFee: number
  transportFee: number
  totalAmount: number
  currency: string
}

export interface SeniorConflictsResponse {
  alreadyBooked: string[]
  timeConflicts: string[]
}

export async function fetchSeniorConflicts(activityId: string): Promise<SeniorConflictsResponse> {
  const connector = getConnector()
  const res = await connector.GET<SeniorConflictsResponse>(`activities/${activityId}/senior-conflicts`)
  if (res.isSuccess() && res.payload) {
    return res.payload
  }
  return { alreadyBooked: [], timeConflicts: [] }
}

export type PrecautionRisk = "none" | "medium" | "high"

export interface SeniorPrecaution {
  seniorId: string
  fullname: string
  risk: PrecautionRisk
  precaution: string
}

export async function fetchActivityPrecautions(activityId: string): Promise<SeniorPrecaution[]> {
  const connector = getConnector()
  const res = await connector.GET<{ precautions: SeniorPrecaution[] | string }>(`activities/${activityId}/precautions`)
  if (res.isSuccess() && res.payload) {
    const p = res.payload.precautions
    if (Array.isArray(p)) return p
    if (typeof p === "string") {
      try {
        const parsed = JSON.parse(p)
        if (Array.isArray(parsed)) return parsed
      } catch { /* fall through */ }
    }
  }
  return []
}

export async function createActivityBooking(payload: BookActivityPayload): Promise<ActivityBookingResponse | null> {
  const connector = getConnector()
  const res = await connector.POST<ActivityBookingResponse>(
    "bookings/activity",
    payload as unknown as Record<string, unknown>,
  )
  if (res.isSuccess() && res.payload) {
    return res.payload
  }
  return null
}
