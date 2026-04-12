// src/components/onboarding/steps/GoalStep.tsx
"use client"
import { useState } from "react"
import Image from "next/image"
import OJContinueButton from "../ui/OJContinueButton"

interface Props { onNext: (goal: string) => void }

const OPTIONS = [
  { id: "homecare",   label: "Home Care Taking",       img: "/images/onboarding/goal-homecare.png",   w: 90, h: 90 },
  { id: "activities", label: "Find & Book Activities", img: "/images/onboarding/goal-activities.png", w: 90, h: 90 },
  { id: "medical",    label: "Medical Escort",         img: "/images/onboarding/goal-medical.png",    w: 90, h: 90 },
  { id: "outings",    label: "Outings",                img: "/images/onboarding/goal-outings.png",    w: 90, h: 90 },
]

export default function GoalStep({ onNext }: Props) {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <>
      <div className="flex flex-col gap-4">
        <h2 className="w-full max-w-[564px] text-oonjai-green-500
        text-2xl sm:text-4xl font-medium font-['Lexend']">
          What&apos;s Your Goal Using Oonjai?
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {OPTIONS.map(o => (
            <button
              key={o.id}
              onClick={() => setSelected(o.id)}
              className={`px-4 py-2 bg-white rounded-lg
              outline outline-2 outline-offset-[-2px]
              flex flex-col items-center justify-center gap-1
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
              <span className="text-center text-oonjai-green-500 text-lg sm:text-xl
              font-medium font-['Lexend']">
                {o.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <OJContinueButton onClick={() => selected && onNext(selected)} disabled={!selected} />
    </>
  )
}