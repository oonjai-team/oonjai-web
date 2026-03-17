export const ONBOARDING_STEPS = [
"welcome",
"phone",
"otp",
"relationship",
"goal",
"concerns",
"senior-profile",
] as const

export type OnboardingStep = typeof ONBOARDING_STEPS[number]

export interface SeniorProfileForm {
fullName: string
dateOfBirth: string
mobilityLevel: string
healthNotes: string
}