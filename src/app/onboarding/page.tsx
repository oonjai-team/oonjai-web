// src/app/onboarding/page.tsx
"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth/AuthContext"
import OnboardingShell from "@/components/onboarding/OnboardingShell"
import PhoneStep        from "@/components/onboarding/steps/PhoneStep"
import RelationshipStep from "@/components/onboarding/steps/RelationshipStep"
import GoalStep         from "@/components/onboarding/steps/GoalStep"
import ConcernsStep     from "@/components/onboarding/steps/ConcernsStep"
import SeniorProfileStep from "@/components/onboarding/steps/SeniorProfileStep"

const PRELOAD_IMAGES = [
  // Step illustrations
  "/images/onboarding/step1-illustrations.png",
  "/images/onboarding/step2-illustrations.png",
  "/images/onboarding/step3-illustrations.png",
  "/images/onboarding/step4-illustrations.png",
  // Relationship step
  "/images/onboarding/rel-child.png",
  "/images/onboarding/rel-grandchild.png",
  "/images/onboarding/rel-sibling.png",
  "/images/onboarding/rel-others.png",
  // Goal step
  "/images/onboarding/goal-homecare.png",
  "/images/onboarding/goal-activities.png",
  "/images/onboarding/goal-medical.png",
  "/images/onboarding/goal-outings.png",
  // Concerns step
  "/images/onboarding/concern-fall.png",
  "/images/onboarding/concern-lonely.png",
  "/images/onboarding/concern-inactive.png",
  "/images/onboarding/concern-health.png",
  // Senior profile step
  "/images/onboarding/avatar-placeholder.png",
]

const STEP_KEYS = ["phone", "relationship", "goal", "concerns", "senior-profile"] as const
type StepKey = typeof STEP_KEYS[number]

const STEP_CONFIG: Record<StepKey, {
  illustration: string
  illustrationW: number
  illustrationH: number
  illustrationPos: string
  centered?: boolean
}> = {
  phone:            { illustration: "/images/onboarding/step1-illustrations.png", illustrationW: 1042, illustrationH: 775, illustrationPos: "left-[750px] bottom-[0px]" },
  relationship:     { illustration: "/images/onboarding/step2-illustrations.png", illustrationW: 690,  illustrationH: 775, illustrationPos: "right-[0px] top-[336px] bottom-[203px]" },
  goal:             { illustration: "/images/onboarding/step3-illustrations.png", illustrationW: 612,  illustrationH: 835, illustrationPos: "right-[0px] top-[0px]" },
  concerns:         { illustration: "/images/onboarding/step4-illustrations.png", illustrationW: 690,  illustrationH: 545, illustrationPos: "right-[0px] top-[50px]" },
  "senior-profile": { illustration: "",                                           illustrationW: 0,    illustrationH: 0,   illustrationPos: "", centered: true },
}

export interface OnboardingData {
  phone: string
  relationship: string
  goal: string
  concerns: string[]
}

export default function OnboardingPage() {
  const router = useRouter()
  const { needsOnboarding, isLoading, refreshSession } = useAuth()
  const [step, setStep] = useState<StepKey>("phone")
  const [data, setData] = useState<OnboardingData>({
    phone: "",
    relationship: "",
    goal: "",
    concerns: [],
  })

  // Redirect already-onboarded users away
  useEffect(() => {
    if (!isLoading && !needsOnboarding) {
      router.replace("/booking")
    }
  }, [isLoading, needsOnboarding, router])

  // Preload all onboarding images on mount
  useEffect(() => {
    PRELOAD_IMAGES.forEach(src => {
      const img = new window.Image()
      img.src = src
    })
  }, [])

  const stepIndex = STEP_KEYS.indexOf(step) + 1
  const config = STEP_CONFIG[step]

  const next = async () => {
    const i = STEP_KEYS.indexOf(step)
    if (i < STEP_KEYS.length - 1) {
      setStep(STEP_KEYS[i + 1])
    } else {
      await refreshSession()
      router.push("/booking")
    }
  }

  return (
    <OnboardingShell
      step={stepIndex}
      illustration={config.illustration}
      illustrationW={config.illustrationW}
      illustrationH={config.illustrationH}
      illustrationPos={config.illustrationPos}
      centered={config.centered}
    >
      {step === "phone" && (
        <PhoneStep onNext={(phone) => { setData(d => ({ ...d, phone })); next() }} />
      )}
      {step === "relationship" && (
        <RelationshipStep onNext={(relationship) => { setData(d => ({ ...d, relationship })); next() }} />
      )}
      {step === "goal" && (
        <GoalStep onNext={(goal) => { setData(d => ({ ...d, goal })); next() }} />
      )}
      {step === "concerns" && (
        <ConcernsStep onNext={(concerns) => { setData(d => ({ ...d, concerns })); next() }} />
      )}
      {step === "senior-profile" && (
        <SeniorProfileStep onboardingData={data} onNext={next} />
      )}
    </OnboardingShell>
  )
}
