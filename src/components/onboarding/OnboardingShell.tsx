// src/components/onboarding/OnboardingShell.tsx
"use client"
import Image from "next/image"
import { ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"

interface Props {
  children: ReactNode
  step: number
  totalSteps?: number
  illustration: string
  illustrationW: number
  illustrationH: number
  illustrationPos?: string
  centered?: boolean
}

export default function OnboardingShell({
  children, step, totalSteps = 5,
  illustration, illustrationW, illustrationH, illustrationPos,
  centered = false
}: Props) {
  return (
    <div className="w-full min-h-screen relative bg-oonjai-cream-400 overflow-x-hidden">

      {/* ── MOBILE layout (< lg) ── */}
      <div className="lg:hidden flex flex-col">

        {/* Logo — always centered at top */}
          <div className="w-full flex items-center justify-center
          bg-oonjai-cream-400 pt-8 pb-4">
            <Image
              src="/images/logo.svg"
              alt="Oonjai"
              width={110}
              height={53}
              priority
            />
          </div>

          {/* Illustration — below logo, only when exists */}
            {illustration && (
              <div className="w-full flex-shrink-0 bg-oonjai-cream-400">
                <Image
                  src={illustration}
                  alt="Onboarding illustration"
                  width={280}
                  height={280}
                  className="object-contain w-full"
                />
              </div>
            )}


        {/* Card — slides up from bottom */}
        {/* Card */}
        <div className={`bg-white rounded-t-[40px]
        shadow-[0px_-4px_16px_0px_rgba(0,0,0,0.1)]
        px-6 pt-11 pb-8 flex flex-col gap-4
        ${illustration ? "-mt-4" : "mt-0"}`}>

            {/* Progress bar */}
            <div className="flex items-center gap-2 w-full mb-4">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-1.5 rounded-lg transition-colors duration-300 ${
                    i < step ? "bg-oonjai-green-500" : "bg-oonjai-sec-green-100"
                  }`}
                />
              ))}
            </div>

          {/* Step content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
              className="w-full flex flex-col justify-between gap-4"
            >
              {children}
            </motion.div>
          </AnimatePresence>

        </div>
      </div>

      {/* ── DESKTOP layout (>= lg) ── */}
      <div className="hidden lg:block">

        {/* White card */}
        <div className={`
          relative z-10
          ${centered
            ? "m-6 w-auto"
            : "w-full lg:absolute lg:left-[55px] lg:top-[29px] lg:w-[750px] lg:h-[calc(100vh-58px)]"
          }
          px-10 pb-10 pt-6
          bg-white rounded-[40px]
          shadow-[0px_4px_16px_0px_rgba(0,0,0,0.25)]
          flex flex-col justify-between
        `}>

          {/* Logo + progress */}
          <div className="flex flex-col gap-3 w-full">
            <Image
              src="/images/logo.svg"
              alt="Oonjai"
              width={110}
              height={53}
              priority
            />
            <div className="flex items-center gap-2 w-full">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-2.5 rounded-lg transition-colors duration-300 ${
                    i < step ? "bg-oonjai-green-500" : "bg-oonjai-sec-green-100"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Step content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
              className="w-full flex flex-col flex-1 justify-between py-8"
            >
              {children}
            </motion.div>
          </AnimatePresence>

        </div>

        {/* Illustration — right side */}
        {illustration && (
          <div className={`hidden lg:block absolute ${illustrationPos}`}>
            <Image
              src={illustration}
              alt="Onboarding illustration"
              width={illustrationW}
              height={illustrationH}
              className="object-contain"
            />
          </div>
        )}

      </div>

    </div>
  )
}