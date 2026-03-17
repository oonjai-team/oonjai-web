// src/components/onboarding/steps/PhoneStep.tsx
"use client"
import { useState } from "react"
import OnboardingShell from "../OnboardingShell"
import OJContinueButton from "../ui/OJContinueButton"

interface Props { onNext: () => void }

export default function PhoneStep({ onNext }: Props) {
  const [phone, setPhone]   = useState("")
  const [error, setError]   = useState("")
  const [loading, setLoading] = useState(false)

  const handleContinue = () => {
    if (!phone.trim()) { setError("Phone number is required."); return }
    if (!/^\d{9,10}$/.test(phone.replace(/\s/g, ""))) {
      setError("Enter a valid phone number."); return
    }
    setLoading(true)
    setTimeout(() => { setLoading(false); onNext() }, 1500)
  }

  return (
    <OnboardingShell
      step={1}
      illustration="/images/onboarding/step1-illustrations.png"
      illustrationW={1042} illustrationH={775}
      illustrationPos="left-[750px] bottom-[0px]"
    >
      {/* Content */}
      <div className="flex flex-col gap-7 min-h-[557px]">
        <div className="flex flex-col gap-1">
          <h2 className="text-oonjai-green-500 text-4xl
          font-medium font-['Lexend']">
            What&apos;s Your Phone Number?
          </h2>
          <p className="text-DarkGrey text-sm font-medium font-['Lexend']">
            *Senior&apos;s emergency primary contact
          </p>
        </div>

        <div className="w-full flex flex-col gap-7">
          <div>
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              maxLength={10}
              onChange={e => {
                setPhone(e.target.value.replace(/\D/g, ""))
                setError("")
              }}
              className={`w-full pl-5 pr-9 py-5 bg-white
              rounded-[10px] text-zinc-600 text-base font-light font-['Lexend']
              outline-none transition-all placeholder:text-zinc-600
              ring-1 ring-[#b1b1b1]
              focus:ring-2 focus:ring-[#365C48]
              ${error ? "ring-2 ring-[#CF4538]" : ""}`}
            />
            {error && (
              <p className="text-xs text-PrimaryRed mt-1">⚠ {error}</p>
            )}
          </div>
        </div>
      </div>

      <OJContinueButton
        onClick={handleContinue}
        disabled={!phone}
        loading={loading}
      />
    </OnboardingShell>
  )
}