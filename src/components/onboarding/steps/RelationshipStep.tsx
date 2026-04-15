// src/components/onboarding/steps/RelationshipStep.tsx
"use client"
import { useState } from "react"
import Image from "next/image"
import OJContinueButton from "../ui/OJContinueButton"

interface Props { onNext: (relationship: string) => void }

const OPTIONS = [
  { id: "child",      label: "Child",       img: "/images/onboarding/rel-child.png",      w: 90, h: 100 },
  { id: "grandchild", label: "Grand Child",  img: "/images/onboarding/rel-grandchild.png", w: 90, h: 100 },
  { id: "sibling",    label: "Sibling",      img: "/images/onboarding/rel-sibling.png",    w: 90, h: 100 },
  { id: "others",     label: "Others",       img: "/images/onboarding/rel-others.png",     w: 90, h: 100 },
]

export default function RelationshipStep({ onNext }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const [error, setError]       = useState("")

  const handleContinue = () => {
    if (!selected) { setError("Please select your relationship."); return }
    onNext(selected)
  }

  return (
    <>
      <div className="flex flex-col gap-4">
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

        {error && <p className="text-xs text-[#CF4538]">⚠ {error}</p>}
      </div>

      <OJContinueButton onClick={handleContinue} disabled={!selected} />
    </>
  )
}