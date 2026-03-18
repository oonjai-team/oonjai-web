import { BookingStatus, ServiceType } from './enums'
import { ReviewDTO } from './review.dto'

export interface BookingDTO {
  bookingId: string
  adultChildId: string
  seniorId: string
  startDate: string
  endDate: string
  serviceType: ServiceType
  provider: string
  note: string
  caretakeId: string
  activityId: string | null
  review: ReviewDTO | null
  status: BookingStatus
}

export type BookingDetailDTO = BookingDTO
