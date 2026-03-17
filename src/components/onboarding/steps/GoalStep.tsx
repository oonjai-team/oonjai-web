// src/components/onboarding/steps/GoalStep.tsx
"use client"
import { useState } from "react"
import Image from "next/image"
import OnboardingShell from "../OnboardingShell"
import OJContinueButton from "../ui/OJContinueButton"

interface Props { onNext: () => void }

const OPTIONS = [
  { id: "homecare",   label: "Home Care Taking",       img: "/images/onboarding/goal-homecare.png",   w: 134, h: 130 },
  { id: "activities", label: "Find & Book Activities", img: "/images/onboarding/goal-activities.png", w: 134, h: 130 },
  { id: "medical",    label: "Medical Escort",         img: "/images/onboarding/goal-medical.png",    w: 134, h: 130 },
  { id: "outings",    label: "Outings",                img: "/images/onboarding/goal-outings.png",    w: 134, h: 130 },
]

export default function GoalStep({ onNext }: Props) {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <OnboardingShell
      step={3}
      illustration="/images/onboarding/step3-illustrations.png"
      illustrationH={835} illustrationW={612}
      illustrationPos="right-[0px] top-[0px]"
    >
      <div className="flex flex-col gap-7 min-h-[557px]">
        <h2 className="w-full max-w-[564px] text-oonjai-green-500
        text-4xl font-medium font-['Lexend']">
          What&apos;s Your Goal Using Oonjai?
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {OPTIONS.map(o => (
            <button
              key={o.id}
              onClick={() => setSelected(o.id)}
              className={`px-6 py-3 bg-white rounded-lg
              outline outline-2 outline-offset-[-2px]
              flex flex-col items-center gap-2 overflow-hidden
              transition-all duration-150 cursor-pointer
              ${selected === o.id
                ? "outline-oonjai-green-500 bg-oonjai-green-50"
                : "outline-lightGrey hover:outline-oonjai-green-300"
              }`}
            >
              <Image
                src={o.img}
                alt={o.label}
                width={o.w}
                height={o.h}
                className="object-contain"
              />
              <span className="text-center text-oonjai-green-500 text-xl
              font-normal font-['Lexend']">
                {o.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <OJContinueButton onClick={onNext} disabled={!selected} />
    </OnboardingShell>
  )
}