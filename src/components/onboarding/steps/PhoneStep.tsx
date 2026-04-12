// src/components/onboarding/steps/PhoneStep.tsx
"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { useAuth } from "@/lib/auth/AuthContext"
import OJContinueButton from "../ui/OJContinueButton"

interface Props { onNext: (phone: string) => void }

export default function PhoneStep({ onNext }: Props) {
  const router = useRouter()
  const { logout } = useAuth()
  const [phone, setPhone]   = useState("")
  const [error, setError]   = useState("")

  const handleContinue = () => {
    if (!phone.trim()) { setError("Phone number is required."); return }
    if (!/^\d{9,10}$/.test(phone.replace(/\s/g, ""))) {
      setError("Enter a valid phone number."); return
    }
    onNext(phone)
  }

  const handleSwitchAccount = async () => {
    await logout()
    router.push("/auth/login")
  }

  return (
    <>
      {/* Content */}
      <div className="flex flex-col gap-7 mb-6">
        <div className="flex flex-col gap-1">
          <div className="self-stretch justify-start text-oonjai-green-500 text-2xl sm:text-4xl font-medium font-['Lexend']">
            What&apos;s Your Phone Number?
          </div>
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

      <div className="flex flex-col gap-3">
        <OJContinueButton
          onClick={handleContinue}
          disabled={!phone}
        />
        <button
          type="button"
          onClick={handleSwitchAccount}
          className="flex items-center justify-center gap-2 w-full py-3 text-sm font-medium text-zinc-500 hover:text-zinc-700 transition-colors"
        >
          <LogOut size={16} />
          Switch Account
        </button>
      </div>
    </>
  )
}