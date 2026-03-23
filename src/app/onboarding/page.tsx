// src/app/onboarding/page.tsx
"use client"
import { useState } from "react"
import PhoneStep        from "@components/onboarding/steps/PhoneStep"
import RelationshipStep from "@components/onboarding/steps/RelationshipStep"
import GoalStep         from "@components/onboarding/steps/GoalStep"
import ConcernsStep     from "@components/onboarding/steps/ConcernsStep"
import SeniorProfileStep from "@components/onboarding/steps/SeniorProfileStep"

const STEPS = ["phone", "relationship", "goal", "concerns", "senior-profile"] as const
type Step = typeof STEPS[number]

export default function OnboardingPage() {
  const [step, setStep] = useState<Step>("phone")

  const next = () => {
    const i = STEPS.indexOf(step)
    if (i < STEPS.length - 1) setStep(STEPS[i + 1])
  }

  return (
    <>
      {step === "phone"          && <PhoneStep onNext={next} />}
      {step === "relationship"   && <RelationshipStep onNext={next} />}
      {step === "goal"           && <GoalStep onNext={next} />}
      {step === "concerns"       && <ConcernsStep onNext={next} />}
      {step === "senior-profile" && <SeniorProfileStep onNext={next} />}
    </>
  )
}