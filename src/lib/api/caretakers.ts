import { getConnector } from "./index"

export interface CaretakerListItem {
  id: string
  firstname: string
  lastname: string
  bio: string
  specialization: string
  hourlyRate: number
  currency: string
  experience: number
  rating: number
  reviewCount: number
  isVerified: boolean
  isAvailable: boolean
}

export interface CaretakerFilters {
  serviceType?: string
  startDate?: string
  endDate?: string
  specialization?: string
  minRating?: string
  minExperience?: string
  maxHourlyRate?: string
}

export async function fetchCaretakers(filters?: CaretakerFilters): Promise<CaretakerListItem[]> {
  const connector = getConnector()
  const params: Record<string, string> = {}

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params[key] = value
    })
  }

  const res = await connector.GET<CaretakerListItem[]>("caretakers", params, {}, true)

  if (res.isSuccess() && res.payload) {
    return res.payload
  }
  return []
}

export async function fetchCaretakerById(id: string): Promise<CaretakerListItem | null> {
  const connector = getConnector()
  const res = await connector.GET<CaretakerListItem>(`caretakers/${id}`, undefined, {}, true)

  if (res.isSuccess() && res.payload) {
    return res.payload
  }
  return null
}
