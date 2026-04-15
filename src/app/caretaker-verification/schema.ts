export type Step = 1 | 2 | 3 | 4

export interface StepInfo {
    number: number
    label: string
}

export const STEPS: StepInfo[] = [
{ number: 1, label: "Identity" },
{ number: 2, label: "Safety & Trust" },
{ number: 3, label: "Experience" },
{ number: 4, label: "Review" },
]

export interface IdentityFormDTO {
fullName: string
birthdate: string
mobileNumber: string
}

export interface ServiceDTO {
id: string
label: string
selected: boolean
}

export type TimeSlot = "morning" | "afternoon" | "evening"
export type DayOfWeek = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun"

export interface AvailabilityDTO {
day: DayOfWeek
morning: boolean
afternoon: boolean
evening: boolean
}

export const mockServices: ServiceDTO[] = [
{ id: "medical_escort", label: "Medical Escort", selected: true },
{ id: "home_caretaking", label: "Home Caretaking", selected: false },
{ id: "activity_host", label: "Activity Host", selected: true },
{ id: "meal_preparation", label: "Meal Preparation", selected: false },
]

export const mockAvailability: AvailabilityDTO[] = [
{ day: "Mon", morning: true,  afternoon: false, evening: false },
{ day: "Tue", morning: true,  afternoon: true,  evening: false },
{ day: "Wed", morning: true,  afternoon: false, evening: false },
{ day: "Thu", morning: false, afternoon: true,  evening: false },
{ day: "Fri", morning: true,  afternoon: false, evening: false },
{ day: "Sat", morning: false, afternoon: false, evening: true  },
{ day: "Sun", morning: false, afternoon: false, evening: true  },
]