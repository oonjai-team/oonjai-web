// src/components/onboarding/steps/SeniorProfileStep.tsx
"use client"
import { useState, useRef } from "react"
import Image from "next/image"
import OnboardingShell from "../OnboardingShell"
import OJContinueButton from "../ui/OJContinueButton"

interface Props { onNext: () => void }

const MOBILITY_OPTIONS = [
  "Independent", "Require a cane", "Wheelchair", "Bed Bound"
]
const CHRONIC_OPTIONS = [
  "Cardiovascular Diseases", "Metabolic & Endocrine Disorders",
  "Respiratory Diseases", "Musculoskeletal Conditions",
  "Mental Health Conditions", "Neurological Conditions"
]

function ProfileInput({
  label, required, error, ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string; required?: boolean; error?: string
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-oonjai-green-500 text-base
      font-light font-['Lexend']">
        {label}{required && " *"}
      </label>
      <input
        className={`h-9 pl-5 pr-3 py-5 bg-white rounded
        text-zinc-600 text-base font-light font-['Lexend']
        transition-all w-full
        ${error
          ? "outline outline-2 outline-offset-[-1px] outline-[#CF4538]"
          : "outline outline-1 outline-offset-[-1px] outline-[#b1b1b1] focus:outline-2 focus:outline-[#365C48]"
        }`}
        {...props}
      />
      {error && (
        <p className="text-xs text-[#CF4538]">⚠ {error}</p>
      )}
    </div>
  )
}

function DropdownSelect({
  label, required, options, value, onChange, error
}: {
  label: string; required?: boolean; error?: string
  options: string[]; value: string
  onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="w-80 flex flex-col gap-1 relative">
      <label className="text-oonjai-green-500 text-base
      font-light font-['Lexend']">
        {label}{required && " *"}
      </label>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`w-80 h-9 pl-5 pr-3 py-5 bg-white rounded
        outline outline-1 outline-offset-[-1px]
        ${error ? "outline-[#CF4538]" : "outline-[#b1b1b1]"}
        flex justify-between items-center gap-2.5 cursor-pointer
        transition-colors hover:outline-[#365C48]`}
      >
        <span className={`text-sm font-light font-['Lexend'] ${
          value ? "text-oonjai-green-500" : "text-[#b1b1b1]"
        }`}>
          {value || "Select..."}
        </span>
        <svg
          className={`w-4 h-4 text-oonjai-green-500 transition-transform
          ${open ? "rotate-180" : ""}`}
          viewBox="0 0 16 16" fill="none"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 w-80 z-20
        bg-white rounded outline outline-1 outline-offset-[-1px]
        outline-[#b1b1b1] overflow-hidden shadow-sm">
          {options.map(o => (
            <button
              key={o}
              type="button"
              onClick={() => { onChange(o); setOpen(false) }}
              className={`w-full h-9 px-7 py-1 text-left
              text-oonjai-green-500 text-sm font-light font-['Lexend']
              flex items-center justify-between
              outline outline-1 outline-offset-[-1px] outline-[#b1b1b1]
              hover:bg-oonjai-green-50 transition-colors cursor-pointer
              ${value === o ? "bg-oonjai-green-50" : "bg-white"}`}
            >
              <span>{o}</span>
              {value === o && (
                <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                  <path d="M2 6l3 3 5-5" stroke="#365C48"
                  strokeWidth="1.5" strokeLinecap="round"
                  strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
      {error && (
        <p className="text-xs text-[#CF4538]">⚠ {error}</p>
      )}
    </div>
  )
}

export default function SeniorProfileStep({ onNext }: Props) {
  const [photo, setPhoto]       = useState<string | null>(null)
  const [seniors, setSeniors]   = useState<Record<string, string>[]>([])
  const [form, setForm]         = useState({
    fullName: "", nickName: "", age: "",
    mobility: "", chronic: "", allergy: "",
    handicap: "", specialNeeds: "", emergencyNo: "",
    hospital: "",
  })
  const [errors, setErrors]     = useState<Record<string, string>>({})
  const [loading, setLoading]   = useState(false)
  const [showMap, setShowMap]   = useState(false)
  const fileRef                 = useRef<HTMLInputElement>(null)

  const set = (k: string, v: string) => {
    setForm(f => ({ ...f, [k]: v }))
    setErrors(e => ({ ...e, [k]: "" }))
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.fullName.trim()) e.fullName = "Full name is required."
    if (!form.age.trim())      e.age      = "Age is required."
    if (Number(form.age) < 0)  e.age      = "Age cannot be negative."
    if (!form.mobility)        e.mobility = "Mobility level is required."
    return e
  }

  const handleFinish = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setLoading(true)
    setTimeout(() => { setLoading(false); onNext() }, 1500)
  }

  const handleAddAnother = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setSeniors(s => [...s, form])
    setForm({
      fullName: "", nickName: "", age: "",
      mobility: "", chronic: "", allergy: "",
      handicap: "", specialNeeds: "", emergencyNo: "",
      hospital: "",
    })
    setPhoto(null)
    setErrors({})
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setPhoto(URL.createObjectURL(file))
  }

  return (
    <OnboardingShell
      step={5}
      illustration=""
      illustrationW={0}
      illustrationH={0}
      illustrationPos=""
      centered={true}
    >
      {/* Outer — full width */}
      <div className="flex flex-col items-center gap-3 w-full">

        {/* Inner — content constrained to max-w-[600px] */}
        <div className="w-full max-w-[600px] flex flex-col gap-3">

          <h2 className="w-full text-center
          text-oonjai-green-500 text-4xl font-medium font-['Lexend']">
            Set Up Your Senior Profile
          </h2>

          {/* Saved seniors list */}
          {seniors.length > 0 && (
            <div className="flex flex-col gap-2 w-full">
              {seniors.map((s, i) => (
                <div key={i}
                  className="flex items-center justify-between
                  px-4 py-3 bg-oonjai-green-50 rounded-lg
                  outline outline-1 outline-offset-[-1px] outline-[#365C48]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-oonjai-green-500 rounded-full
                    flex items-center justify-center text-white text-xs
                    font-medium font-['Lexend']">
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-oonjai-green-500 text-sm
                      font-medium font-['Lexend']">{s.fullName}</p>
                      <p className="text-[#b1b1b1] text-xs font-light font-['Lexend']">
                        {s.age} years old · {s.mobility || "No mobility info"}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSeniors(list => list.filter((_, idx) => idx !== i))}
                    className="text-[#b1b1b1] hover:text-[#CF4538]
                    transition-colors cursor-pointer text-sm">
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Photo upload */}
          <div className="py-3.5 flex flex-col items-center gap-2">
            <div
              onClick={() => fileRef.current?.click()}
              className="w-28 h-28 bg-[#b1b1b1] rounded-full
              outline outline-[3px] outline-offset-[-3px] outline-[#b1b1b1]
              overflow-hidden cursor-pointer relative"
            >
              {photo ? (
                <img src={photo} alt="Senior"
                className="w-full h-full object-cover" />
              ) : (
                <Image
                  src="/images/onboarding/avatar-placeholder.png"
                  alt="Avatar placeholder"
                  width={114} height={114}
                  className="object-cover"
                />
              )}
            </div>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="text-oonjai-green-500 text-xs font-light
              font-['Lexend'] underline cursor-pointer
              hover:text-oonjai-green-600 transition-colors"
            >
              Select Your Senior&apos;s Photo
            </button>
            <input
              ref={fileRef} type="file" accept="image/*"
              className="hidden" onChange={handlePhotoChange}
            />
          </div>

          {/* Full Name */}
          <ProfileInput
            label="Full Name" required
            placeholder=""
            value={form.fullName}
            error={errors.fullName}
            onChange={e => set("fullName", e.target.value)}
          />

          {/* Nick Name + Age row */}
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <ProfileInput
                label="Nick Name"
                placeholder=""
                value={form.nickName}
                onChange={e => set("nickName", e.target.value)}
              />
            </div>
            <div className="w-32">
              <ProfileInput
                label="Age" required
                placeholder=""
                type="number"
                min="0"
                value={form.age}
                error={errors.age}
                onChange={e => set("age", e.target.value)}
              />
            </div>
          </div>

          {/* Mobility Level dropdown */}
          <DropdownSelect
            label="Mobility Level" required
            options={MOBILITY_OPTIONS}
            value={form.mobility}
            onChange={v => set("mobility", v)}
            error={errors.mobility}
          />

          {/* Chronic Diseases dropdown */}
          <DropdownSelect
            label="Chronic Diseases"
            options={CHRONIC_OPTIONS}
            value={form.chronic}
            onChange={v => set("chronic", v)}
          />

          {/* Text inputs */}
          {[
            { key: "allergy",      label: "Allergy",                    full: false },
            { key: "handicap",     label: "Handicap",                   full: false },
            { key: "specialNeeds", label: "Special Needs and Concerns", full: true  },
            { key: "emergencyNo",  label: "Second Emergency Number",    full: true  },
            { key: "hospital",     label: "Preferred Hospital",         full: true  },
          ].map(f => (
            <div key={f.key} className={f.full ? "w-full" : "w-80"}>
              <ProfileInput
                label={f.label}
                placeholder=""
                value={form[f.key as keyof typeof form]}
                onChange={e => set(f.key, e.target.value)}
              />
            </div>
          ))}

          {/* Location */}
          <div className="w-80 flex flex-col gap-1 mb-4">
            <label className="text-oonjai-green-500 text-base
            font-light font-['Lexend']">Location</label>

            <button
              type="button"
              onClick={() => setShowMap(m => !m)}
              className="w-80 h-9 pl-5 pr-3 py-5 bg-white rounded
              outline outline-1 outline-offset-[-1px] outline-[#b1b1b1]
              flex justify-between items-center cursor-pointer
              hover:outline-[#365C48] transition-colors"
            >
              <span className="text-oonjai-green-500 text-sm
              font-light font-['Lexend']">
                Select From Map
              </span>
              <svg viewBox="0 0 24 24" fill="none"
              className="w-5 h-5 text-oonjai-green-500">
                <path d="M12 2C8.69 2 6 4.69 6 8c0 5.25 6 13 6 13s6-7.75 6-13c0-3.31-2.69-6-6-6z"
                stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="8" r="2" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>

            {showMap && (
              <div className="w-80 h-56 px-7 py-5 bg-white rounded
              outline outline-1 outline-offset-[-1px] outline-[#b1b1b1]
              flex flex-col gap-2.5">
                <div className="px-3 py-1 rounded
                outline outline-1 outline-offset-[-1px] outline-[#b1b1b1]
                flex justify-between items-center">
                  <span className="text-[#b1b1b1] text-xs
                  font-light font-['Lexend']">
                    Search Your Location
                  </span>
                  <svg viewBox="0 0 24 24" fill="none"
                  className="w-5 h-5 text-[#b1b1b1]">
                    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
                    <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="flex-1 rounded
                outline outline-1 outline-offset-[-1px] outline-[#b1b1b1]
                bg-oonjai-cream-100 flex items-center justify-center
                text-[#b1b1b1] text-xs font-['Lexend']">
                  Map view
                </div>
              </div>
            )}
          </div>

          {/* Add Another Senior */}
          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={handleAddAnother}
              className="w-80 px-5 py-2.5 bg-white rounded-[10px]
              outline outline-1 outline-offset-[-1px] outline-[#b1b1b1]
              flex justify-center items-center gap-2.5
              hover:bg-oonjai-cream-100 transition-colors cursor-pointer"
            >
              <svg viewBox="0 0 24 24" fill="none"
              className="w-5 h-5 text-[#b1b1b1]">
                <path d="M12 5v14M5 12h14"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="text-zinc-700 text-sm font-light font-['Lexend']">
                Add Another Senior
              </span>
            </button>
          </div>

        </div>{/* end max-w-[600px] */}
      </div>{/* end outer */}

      <div className="mt-6">
        <OJContinueButton
          label="Finish"
          onClick={handleFinish}
          loading={loading}
        />
      </div>

    </OnboardingShell>
  )
}