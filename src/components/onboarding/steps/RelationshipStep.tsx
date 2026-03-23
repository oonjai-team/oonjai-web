// src/components/onboarding/steps/RelationshipStep.tsx
"use client"
import { useState } from "react"
import Image from "next/image"
import OnboardingShell from "../OnboardingShell"
import OJContinueButton from "../ui/OJContinueButton"

interface Props { onNext: () => void }

const OPTIONS = [
  { id: "child",      label: "Child",       img: "/images/onboarding/rel-child.png",      w: 118, h: 135 },
  { id: "grandchild", label: "Grand Child",  img: "/images/onboarding/rel-grandchild.png", w: 118, h: 135 },
  { id: "sibling",    label: "Sibling",      img: "/images/onboarding/rel-sibling.png",    w: 118, h: 135 },
  { id: "others",     label: "Others",       img: "/images/onboarding/rel-others.png",     w: 118, h: 135 },
]

export default function RelationshipStep({ onNext }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const [error, setError]       = useState("")

  const handleContinue = () => {
    if (!selected) { setError("Please select your relationship."); return }
    onNext()
  }

  return (
    <OnboardingShell
      step={2}
      illustration="/images/onboarding/step2-illustrations.png"
      illustrationW={690} illustrationH={775}
      illustrationPos="right-[0px] top-[336px] bottom-[203px]"
    >
      <div className="flex flex-col gap-7 min-h-[557px]">
        <h2 className="w-full max-w-[564px] text-oonjai-green-500
        text-2xl sm:text-4xl font-medium font-['Lexend']">
          What&apos;s Your Relationship With The Senior?
        </h2>

        {/* Selection grid */}
        <div className="grid grid-cols-2 gap-3">
          {OPTIONS.map(o => (
            <button
              key={o.id}
              onClick={() => { setSelected(o.id); setError("") }}
              className={`px-6 py-3 bg-white rounded-lg
              outline outline-2 outline-offset-[-2px]
              flex flex-col items-center gap-2 overflow-hidden
              transition-all duration-150 cursor-pointer
              ${selected === o.id
                ? "outline-oonjai-green-500 bg-oonjai-green-50"
                : "outline-lightGrey hover:outline-oonjai-green-300"
              }`}
            >
              {/* Real image */}
              <Image
                src={o.img}
                alt={o.label}
                width={o.w}
                height={o.h}
                className="object-contain"
              />
              <span className="text-center text-oonjai-green-500 text-xl sm:text-2xl
              font-medium font-['Lexend']">
                {o.label}
              </span>
            </button>
          ))}
        </div>

        {error && <p className="text-xs text-[#CF4538]">⚠ {error}</p>}
      </div>

      <OJContinueButton onClick={handleContinue} disabled={!selected} />
    </OnboardingShell>
  )
}