"use client"
import { useState } from "react"
import Step1Identity from "./steps/Step1Identity"
import Step2Safety from "./steps/Step2Safety"
import Step3Experience from "./steps/Step3Experience"
import Step4Review from "./steps/Step4Review"

const STEPS = ["identity", "safety", "experience", "review"] as const
type Step = typeof STEPS[number]

export default function CaretakerVerificationPage() {
  const [step, setStep] = useState<Step>("identity")

  const next = () => {
    const i = STEPS.indexOf(step)
    if (i < STEPS.length - 1) setStep(STEPS[i + 1])
  }

  const back = () => {
    const i = STEPS.indexOf(step)
    if (i > 0) setStep(STEPS[i - 1])
  }

  return (
    <>
      {step === "identity"   && <Step1Identity onNext={next} />}
      {step === "safety"     && <Step2Safety onNext={next} onBack={back} />}
      {step === "experience" && <Step3Experience onNext={next} onBack={back} />}
      {step === "review"     && <Step4Review onBack={back} />}
    </>
  )
}