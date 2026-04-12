import { getConnector } from "./index"

export interface ActivityData {
  id: string
  title: string
  category: string
  tags: string[]
  host: string
  hostAvatar: string
  hostDescription: string
  date: string
  location: string
  price: number
  participantCount: number
  spotsLeft: number
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
