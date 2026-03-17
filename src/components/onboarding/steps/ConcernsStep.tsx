// src/components/onboarding/steps/ConcernsStep.tsx
"use client"
import { useState } from "react"
import Image from "next/image"
import OnboardingShell from "../OnboardingShell"
import OJContinueButton from "../ui/OJContinueButton"

interface Props { onNext: () => void }

const OPTIONS = [
  { id: "fall",     label: "Fall/ Injury",                   img: "/images/onboarding/concern-fall.png",     w: 118, h: 135 },
  { id: "lonely",   label: "Loneliness",                     img: "/images/onboarding/concern-lonely.png",   w: 163, h: 113 },
  { id: "inactive", label: "Health Decline From Inactivity", img: "/images/onboarding/concern-inactive.png", w: 163, h: 113 },
  { id: "health",   label: "Current Health Complications",   img: "/images/onboarding/concern-health.png",   w: 163, h: 113 },
]

export default function ConcernsStep({ onNext }: Props) {
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (id: string) =>
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])

  return (
    <OnboardingShell
      step={4}
      illustration="/images/onboarding/step4-illustrations.png"
      illustrationW={690} illustrationH={545}
      illustrationPos="right-[0px] top-[50px]"
    >
      <div className="flex flex-col gap-7 min-h-[557px]">
        <h2 className="w-full max-w-[564px] text-oonjai-green-500
        text-4xl font-medium font-['Lexend']">
          What&apos;s Your Main Concern When The Senior Is Alone?
        </h2>

        {/* Multi-select grid */}
        <div className="grid grid-cols-2 gap-3">
          {OPTIONS.map(o => (
            <button
              key={o.id}
              onClick={() => toggle(o.id)}
              className={`p-4 bg-white rounded-lg
              outline outline-2 outline-offset-[-2px]
              flex flex-col items-center justify-between gap-3
              transition-all duration-150 cursor-pointer relative
              min-h-[200px]
              ${selected.includes(o.id)
                ? "outline-oonjai-green-500 bg-oonjai-green-50"
                : "outline-lightGrey hover:outline-oonjai-green-300"
              }`}
            >
              {/* Checkmark badge */}
              {selected.includes(o.id) && (
                <div className="absolute top-2 right-2 w-5 h-5
                bg-oonjai-green-500 rounded-full flex items-center
                justify-center">
                  <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                    <path d="M2 6l3 3 5-5" stroke="white"
                    strokeWidth="1.5" strokeLinecap="round"
                    strokeLinejoin="round"/>
                  </svg>
                </div>
              )}

              {/* Image fills most of the card */}
              <div className="flex-1 flex items-center justify-center w-full">
                <Image
                  src={o.img}
                  alt={o.label}
                  width={163}
                  height={135}
                  className="object-contain w-full h-full max-h-[140px]"
                />
              </div>

              <span className="text-center text-oonjai-green-500
              text-base font-normal font-['Lexend'] w-full max-w-[125px]">
                {o.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <OJContinueButton onClick={onNext} disabled={selected.length === 0} />
    </OnboardingShell>
  )
}