// src/components/onboarding/steps/SeniorProfileStep.tsx
"use client"
import React, { useState, useRef } from "react"
import Image from "next/image"
import OJContinueButton from "../ui/OJContinueButton"
import LocationPicker from "@/components/common/LocationPicker"
import { submitOnboarding } from "@/lib/api/users"
import { createSenior } from "@/lib/api/seniors"
import { getAgeFromDOB } from "@/lib/utils"
import type { OnboardingData } from "@/app/onboarding/page"
import {
  IndependentIcon, CaneIcon, WheelchairIcon, BedboundIcon,
  HeartIcon, MetabolicIcon, RespiratoryIcon, BoneIcon, MentalIcon, BrainIcon,
} from "@/components/icons/OnboardingIcons"

interface Props { onboardingData: OnboardingData; onNext: () => void }

const MOBILITY_OPTIONS = [
  { label: "Independent", IconComponent: IndependentIcon },
  { label: "Require a cane", IconComponent: CaneIcon },
  { label: "Wheelchair", IconComponent: WheelchairIcon },
  { label: "Bed Bound", IconComponent: BedboundIcon },
]

const CHRONIC_OPTIONS = [
  { label: "Cardiovascular Diseases", IconComponent: HeartIcon },
  { label: "Metabolic & Endocrine Disorders", IconComponent: MetabolicIcon },
  { label: "Respiratory Diseases", IconComponent: RespiratoryIcon },
  { label: "Musculoskeletal Conditions", IconComponent: BoneIcon },
  { label: "Mental Health Conditions", IconComponent: MentalIcon },
  { label: "Neurological Conditions", IconComponent: BrainIcon },
]

// FIX #2 — Tooltip bubble
function Tooltip({ text }: { text: string }) {
  const [show, setShow] = useState(false)
  return (
    <span className="relative inline-flex ml-1">
      <span
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="w-4 h-4 rounded-full bg-[#b1b1b1] text-white
        text-[10px] flex items-center justify-center cursor-pointer select-none"
      >?</span>
      {show && (
        <span className="absolute left-6 top-0 z-30 w-56 bg-zinc-800
        text-white text-xs font-light rounded px-3 py-2 shadow-lg whitespace-normal">
          {text}
        </span>
      )}
    </span>
  )
}

// FIX #1/#7 — text-zinc-600 → text-zinc-900
// FIX #2 — tooltip prop added
function ProfileInput({
  label, required, error, tooltip, ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string; required?: boolean; error?: string; tooltip?: string
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-oonjai-green-500 text-base
      font-light font-['Lexend'] flex items-center">
        {label}{required && " *"}
        {tooltip && <Tooltip text={tooltip} />}
      </label>
      <input
        className={`h-9 pl-5 pr-3 py-5 bg-white rounded
        text-zinc-900 text-base font-light font-['Lexend']
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

// FIX #3 — hint prop added for multiselect label
function DropdownSelect({
  label, required, options, value, onChange, error, hint
}: {
  label: string
  required?: boolean
  error?: string
  hint?: string
  options: { label: string; IconComponent?: React.ComponentType<{ className?: string; width?: number; height?: number }> }[]
  value: string
  onChange: (val: string) => void  // renamed v → val to avoid unused-vars lint
}) {
  const [open, setOpen] = useState(false)
  const selectedOption = options.find((o) => o.label === value)

  return (
    <div className="w-full flex flex-col gap-1 relative">
      <div className="flex items-center justify-between">
        <label className="text-oonjai-green-500 text-base font-light font-['Lexend']">
          {label}{required && " *"}
        </label>
        {hint && (
          <span className="text-[#b1b1b1] text-xs font-light font-['Lexend'] italic">
            * {hint}
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`w-full sm:w-6/8 h-9 pl-5 pr-3 py-5 bg-white rounded
        outline outline-1 outline-offset-[-1px]
        ${error ? "outline-[#CF4538]" : "outline-[#b1b1b1]"}
        flex justify-between items-center gap-2.5 cursor-pointer
        transition-colors hover:outline-[#365C48]`}
      >
        <div className="flex items-center gap-3 min-w-0">
          {selectedOption?.IconComponent && (
            <selectedOption.IconComponent width={20} height={20} className="shrink-0" />
          )}
          <span className={`text-sm font-light font-['Lexend'] ${
            value ? "text-oonjai-green-500" : "text-[#b1b1b1]"
          }`}>
            {value || "Select..."}
          </span>
        </div>
        <svg
          className={`w-4 h-4 text-oonjai-green-500 transition-transform ${open ? "rotate-180" : ""}`}
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
              key={o.label}
              type="button"
              onClick={() => { onChange(o.label); setOpen(false) }}
              className={`w-full min-h-[44px] px-4 py-3 text-left
              text-oonjai-green-500 text-sm font-light font-['Lexend']
              flex items-center justify-between
              outline outline-1 outline-offset-[-1px] outline-[#b1b1b1]
              hover:bg-oonjai-green-50 transition-colors cursor-pointer
              ${value === o.label ? "bg-oonjai-green-50" : "bg-white"}`}
            >
              <div className="flex items-center gap-4">
                {o.IconComponent && (
                  <o.IconComponent width={20} height={20} className="shrink-0" />
                )}
                <span>{o.label}</span>
              </div>
              {value === o.label && (
                <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                  <path d="M2 6l3 3 5-5" stroke="#365C48"
                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
      {error && <p className="text-xs text-[#CF4538]">⚠ {error}</p>}
    </div>
  )
}

type FieldConfig = {
  key: string
  label: string
  tooltip?: string
  full: boolean
}

export default function SeniorProfileStep({ onboardingData, onNext }: Props) {
  const [photo, setPhoto]     = useState<string | null>(null)
  const [seniors, setSeniors] = useState<Record<string, string>[]>([])
  const [form, setForm]       = useState({
    fullName: "", nickName: "", dateOfBirth: "",
    mobility: "", chronic: "", allergy: "",
    handicap: "", specialNeeds: "", emergencyNo: "",
    hospital: "", location: "",
  })
  const [errors, setErrors]   = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const fileRef               = useRef<HTMLInputElement>(null)

  const set = (k: string, val: string) => {
    setForm(f => ({ ...f, [k]: val }))
    setErrors(e => ({ ...e, [k]: "" }))
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.fullName.trim()) e.fullName = "Full name is required."
    if (!form.dateOfBirth.trim()) {
      e.dateOfBirth = "Date of birth is required."
    } else {
      const birth = new Date(form.dateOfBirth)
      if (isNaN(birth.getTime())) {
        e.dateOfBirth = "Please enter a valid date."
      } else if (birth.getTime() > Date.now()) {
        e.dateOfBirth = "Date of birth cannot be in the future."
      }
    }
    if (!form.mobility)        e.mobility = "Mobility level is required."
    if (!form.location.trim()) e.location = "Home location is required."
    return e
  }

  const handleFinish = async () => {
    const queued = [...seniors]
    const formHasData = !!(form.fullName.trim() || form.dateOfBirth.trim() || form.mobility.trim())
    if (formHasData) {
      const e = validate()
      if (Object.keys(e).length) { setErrors(e); return }
      queued.push(form)
    } else if (queued.length === 0) {
      setErrors(validate())
      return
    }

    setLoading(true)
    try {
      const onboardingOk = await submitOnboarding(onboardingData)
      if (!onboardingOk) {
        setErrors({ fullName: "Failed to save onboarding data." })
        setLoading(false)
        return
      }

      for (const s of queued) {
        const senior = await createSenior({
          fullname: s.fullName,
          dateOfBirth: s.dateOfBirth,
          mobilityLevel: s.mobility,
          homeLocation: s.location,
          healthNote: [s.chronic, s.allergy, s.handicap, s.specialNeeds].filter(Boolean).join("; "),
        })
        if (!senior) {
          setErrors({ fullName: `Failed to create senior "${s.fullName}".` })
          setLoading(false)
          return
        }
      }
      onNext()
    } catch {
      setErrors({ fullName: "Something went wrong. Please try again." })
      setLoading(false)
    }
  }

  const handleAddAnother = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setSeniors(s => [...s, form])
    setForm({
      fullName: "", nickName: "", dateOfBirth: "",
      mobility: "", chronic: "", allergy: "",
      handicap: "", specialNeeds: "", emergencyNo: "",
      hospital: "", location: form.location,
    })
    setPhoto(null)
    setErrors({})
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setPhoto(URL.createObjectURL(file))
  }

  const fields: FieldConfig[] = [
    { key: "allergy",      label: "Allergy",                    tooltip: "List any food, medication, or environmental allergies.", full: false },
    { key: "handicap",     label: "Handicap",                   tooltip: "Any physical or cognitive impairments we should be aware of.", full: false },
    { key: "specialNeeds", label: "Special Needs and Concerns", full: true },
    { key: "emergencyNo",  label: "Second Emergency Number",    full: true },
    { key: "hospital",     label: "Preferred Hospital",         full: true },
  ]

  return (
    <>
      <div className="flex flex-col items-center gap-3 w-full">
        <div className="w-full max-w-[600px] flex flex-col gap-3">

          <h2 className="w-full text-center
          text-oonjai-green-500 text-3xl font-medium font-['Lexend']">
            Set Up Your<br className="sm:hidden block"/> Senior Profile
          </h2>

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
                      <p className="text-oonjai-green-500 text-sm font-medium font-['Lexend']">
                        {s.fullName}
                      </p>
                      <p className="text-[#b1b1b1] text-xs font-light font-['Lexend']">
                        {(() => {
                          const age = getAgeFromDOB(s.dateOfBirth)
                          return age !== null ? `${age} years old` : "Age unknown"
                        })()} · {s.mobility || "No mobility info"}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSeniors(list => list.filter((_, idx) => idx !== i))}
                    className="text-[#b1b1b1] hover:text-[#CF4538] transition-colors cursor-pointer text-sm">
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Photo upload — FIX: use <Image> for both cases */}
          <div className="py-3.5 flex flex-col items-center gap-2">
            <div
              onClick={() => fileRef.current?.click()}
              className="w-28 h-28 bg-[#b1b1b1] rounded-full
              outline outline-[3px] outline-offset-[-3px] outline-[#b1b1b1]
              overflow-hidden cursor-pointer relative"
            >
              {photo ? (
                <Image
                  src={photo}
                  alt="Senior"
                  width={114}
                  height={114}
                  unoptimized
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src="/images/onboarding/avatar-placeholder.png"
                  alt="Avatar placeholder"
                  width={114}
                  height={114}
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

          <ProfileInput
            label="Full Name" required
            placeholder=""
            value={form.fullName}
            error={errors.fullName}
            onChange={e => set("fullName", e.target.value)}
          />

          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <ProfileInput
                label="Nickname"
                placeholder=""
                value={form.nickName}
                onChange={e => set("nickName", e.target.value)}
              />
            </div>
            <div className="flex-1">
              <ProfileInput
                label="Date of Birth" required
                type="date"
                max={new Date().toISOString().split("T")[0]}
                value={form.dateOfBirth}
                error={errors.dateOfBirth}
                onChange={e => set("dateOfBirth", e.target.value)}
              />
            </div>
          </div>
          {form.dateOfBirth && getAgeFromDOB(form.dateOfBirth) !== null && (
            <p className="text-xs text-[#b1b1b1] font-light font-['Lexend'] -mt-1">
              Age: {getAgeFromDOB(form.dateOfBirth)} years
            </p>
          )}

          <DropdownSelect
            label="Mobility Level" required
            options={MOBILITY_OPTIONS}
            value={form.mobility}
            onChange={val => set("mobility", val)}
            error={errors.mobility}
          />

          {/* FIX #3 — multiselect hint */}
          <DropdownSelect
            label="Chronic Diseases"
            hint="you may select multiple"
            options={CHRONIC_OPTIONS}
            value={form.chronic}
            onChange={val => set("chronic", val)}
          />

          {/* FIX #2 — tooltips on allergy & handicap */}
          {fields.map(f => (
            <div key={f.key} className={f.full ? "w-full" : "w-full sm:w-6/8"}>
              <ProfileInput
                label={f.label}
                tooltip={f.tooltip}
                placeholder=""
                value={form[f.key as keyof typeof form]}
                onChange={e => set(f.key, e.target.value)}
              />
            </div>
          ))}

          <div className="w-full mb-4">
            <LocationPicker
              value={form.location}
              onChange={location => set("location", location)}
              required
              error={errors.location}
            />
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={handleAddAnother}
              className="w-80 px-5 py-2.5 bg-white rounded-[10px]
              outline outline-1 outline-offset-[-1px] outline-[#b1b1b1]
              flex justify-center items-center gap-2.5
              hover:bg-oonjai-cream-100 transition-colors cursor-pointer"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#b1b1b1]">
                <path d="M12 5v14M5 12h14"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="text-zinc-700 text-sm font-light font-['Lexend']">
                Add Another Senior
              </span>
            </button>
          </div>

        </div>
      </div>

      <div className="mt-6">
        <OJContinueButton
          label="Finish"
          onClick={handleFinish}
          loading={loading}
        />
      </div>
    </>
  )
}