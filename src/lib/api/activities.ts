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

export interface ActivityFilterParams {
  search?: string
  category?: string | null
  location?: string | null
  priceMin?: number
  priceMax?: number
  limit?: number
  offset?: number
}

export async function fetchActivities(filter: ActivityFilterParams = {}): Promise<ActivityData[]> {
  const connector = getConnector()
  const params: Record<string, string> = {}
  if (filter.search) params.search = filter.search
  if (filter.category) params.category = filter.category
  if (filter.location) params.location = filter.location
  if (filter.priceMin !== undefined) params.priceMin = String(filter.priceMin)
  if (filter.priceMax !== undefined) params.priceMax = String(filter.priceMax)
  if (filter.limit !== undefined) params.limit = String(filter.limit)
  if (filter.offset !== undefined) params.offset = String(filter.offset)
  const res = await connector.GET<ActivityData[]>("activities", params, {}, true)
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
  pickupMode: "self" | "arrange"
  pickupLocation?: string
  dropoffMode: "self" | "arrange"
  dropoffLocation?: string
  note?: string
}

export interface ActivityBookingResponse {
  bookingId: string
  activityId: string
  seniorIds: string[]
  pickupMode: string
  pickupLocation?: string
  dropoffMode: string
  dropoffLocation?: string
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

export interface CreateBookingError {
  ok: false
  message: string
}
export interface CreateBookingOk {
  ok: true
  data: ActivityBookingResponse
}
export type CreateBookingResult = CreateBookingOk | CreateBookingError

export async function createActivityBooking(payload: BookActivityPayload): Promise<CreateBookingResult> {
  const connector = getConnector()
  const res = await connector.POST<ActivityBookingResponse>(
    "bookings/activity",
    payload as unknown as Record<string, unknown>,
  )
  if (res.isSuccess() && res.payload) {
    return { ok: true, data: res.payload }
  }
  return { ok: false, message: res.message || "Booking failed." }
}
