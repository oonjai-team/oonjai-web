export interface SessionTokenDTO {
  accessToken: string
  refreshToken: string
}

export interface SessionDTO {
  userId: string
  email: string
  role: string
}
