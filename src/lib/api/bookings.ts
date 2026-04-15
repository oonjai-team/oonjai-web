import { getConnector } from "./index"

export interface CreateBookingPayload {
  seniorId: string
  caretakerId: string
  serviceType: "medical_escort" | "home_care" | "outings"
  startDate: string
  endDate: string
  location: string
  note?: string
}

export interface BookingActivitySummary {
  id: string
  title: string
  displayDate: string
  startDate: string
  endDate: string
  location: string
  images: string[]
  duration: string
  category: string
}

export interface BookingResponse {
  id: string
  adultChildId: string
  seniorId: string
  caretakerId: string | null
  serviceType: string
  status: string
  startDate: string
  endDate: string
  location: string
  note: string
  estimatedCost: number
  currency: string
  createdAt: string
  activityId?: string | null
  caretakerName?: string
  caretakerSpecialization?: string
  activity?: BookingActivitySummary
}

export async function createBooking(payload: CreateBookingPayload): Promise<BookingResponse | null> {
  const connector = getConnector()
  const res = await connector.POST<BookingResponse>("bookings", payload as unknown as Record<string, unknown>)

  if (res.isSuccess() && res.payload) {
    return res.payload
  }
  return null
}

export async function fetchBookings(status?: string): Promise<BookingResponse[]> {
  const connector = getConnector()
  const params: Record<string, string> = {}
  if (status) params.status = status

  const res = await connector.GET<BookingResponse[]>("bookings", params, {}, true)

  if (res.isSuccess() && res.payload) {
    return res.payload
  }
  return []
}

export async function fetchBookingById(id: string): Promise<BookingResponse | null> {
  const connector = getConnector()
  const res = await connector.GET<BookingResponse>(`bookings/${id}`, undefined, {}, true)

  if (res.isSuccess() && res.payload) {
    return res.payload
  }
  return null
}

export async function confirmBooking(bookingId: string): Promise<boolean> {
  const connector = getConnector()
  const res = await connector.POST(`bookings/${bookingId}/confirm`)
  return res.isSuccess()
}

export async function cancelBooking(bookingId: string): Promise<boolean> {
  const connector = getConnector()
  const res = await connector.DELETE(`bookings/${bookingId}`)
  return res.isSuccess()
}
