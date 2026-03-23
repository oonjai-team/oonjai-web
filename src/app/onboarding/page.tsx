// src/app/onboarding/page.tsx
"use client"
import { useState } from "react"
import PhoneStep        from "@components/onboarding/steps/PhoneStep"
import RelationshipStep from "@components/onboarding/steps/RelationshipStep"
import GoalStep         from "@components/onboarding/steps/GoalStep"
import ConcernsStep     from "@components/onboarding/steps/ConcernsStep"
import SeniorProfileStep from "@components/onboarding/steps/SeniorProfileStep"
import {Header} from "@components/common/Header"
import Link from "next/link"
import Image from "next/image"

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
      <nav className="w-full bg-PrimaryCream sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-2">
        </div>
      </nav>
      {step === "phone"          && <PhoneStep onNext={next} />}
      {step === "relationship"   && <RelationshipStep onNext={next} />}
      {step === "goal"           && <GoalStep onNext={next} />}
      {step === "concerns"       && <ConcernsStep onNext={next} />}
      {step === "senior-profile" && <SeniorProfileStep onNext={next} />}
    </>
  )
}