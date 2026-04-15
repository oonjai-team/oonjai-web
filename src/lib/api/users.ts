import { getConnector } from "./index"

export interface AdultChildPayload {
  phone?: string
  relationship?: string
  goal?: string
  concerns?: string[]
}

export interface UpdateUserPayload {
  firstname?: string
  lastname?: string
  email?: string
  adultChild?: AdultChildPayload
}

export async function updateUser(payload: UpdateUserPayload): Promise<boolean> {
  const connector = getConnector()
  const res = await connector.PUT("users/update", payload as unknown as Record<string, unknown>)
  return res.isSuccess()
}

export interface OnboardingPayload {
  phone: string
  relationship: string
  goal: string
  concerns: string[]
}

export async function submitOnboarding(payload: OnboardingPayload): Promise<boolean> {
  const connector = getConnector()
  const res = await connector.POST("auth/onboarding", payload as unknown as Record<string, unknown>)
  return res.isSuccess()
}
