import {TimestampType} from "@dto/timestamp"

export interface AdultChildAttributes {
  relationship: string
  goal: string
  concerns: string[]
}

export interface UserDTO {
  userID: string
  email: string
  firstname: string
  lastname: string
  phone: string
  createdAt: TimestampType
  role: string
  adultChild?: AdultChildAttributes
}

export type AdultChildDTO = UserDTO

export interface CaretakerDTO extends UserDTO {
  bio: string
  hourlyRate: number
  experience: number
  isVerified: boolean
}

export interface AdminDTO extends UserDTO {
  permission: string
}
