export interface UserDTO {
  userID: string
  email: string
  firstname: string
  lastname: string
  createdAt: string
  role: string
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
