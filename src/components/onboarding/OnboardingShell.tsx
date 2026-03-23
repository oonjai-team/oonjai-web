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
    <div className="w-full flex justify-center items-center min-h-screen bg-oonjai-cream-400">
      <div className={`w-full max-w-[1480px] mx-auto ${centered ? "min-h-screen" : "h-screen sm:max-h-[900px]"} relative bg-oonjai-cream-400 overflow-x-hidden`}>

        {/* ── MOBILE layout (< lg) ── */}
        <div className="sm:hidden flex flex-col min-h-screen">

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
          {illustration && step === 1 && (
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
        shadow-[0px_-4px_16px_0px_rgba(0,0,0,0.1)] grow px-6 pt-11 pb-8 flex flex-col gap-4
        ${illustration && step === 1 ? "-mt-4" : "mt-0"}`}>

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
                className="w-full flex flex-col justify-between"
              >
                {children}
              </motion.div>
            </AnimatePresence>

          </div>
        </div>

        {/* ── DESKTOP layout (>= lg) ── */}
        <div className="hidden h-full sm:flex flex-row py-6 px-4 items-end">

          {/* White card */}
          <div className={`
          relative z-10
          ${centered
            ?  "w-full max-w-[750px] mx-auto h-full"
            : "w-full max-w-[750px] h-full"
          }
          px-10 pb-10 pt-6
          overflow-y-auto
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
          {illustration && (step === 1 ? (
            <div className={`hidden lg:block relative -mr-6`}>
              <div className="absolute scale-[105%] -left-[11%] z-[20] -top-[12%]">
                <Image
                  src={illustration}
                  alt="Onboarding illustration"
                  width={illustrationW}
                  height={illustrationH}
                  className="object-contain"
                />
              </div>
              <Image
                src={illustration}
                alt="Onboarding illustration"
                width={illustrationW}
                height={illustrationH}
                className="object-contain opacity-0"
              />
            </div>
          ) : (
            <div className={`hidden lg:flex flex-col justify-center h-full -mr-6`}>
              <Image
                src={illustration}
                alt="Onboarding illustration"
                width={illustrationW}
                height={illustrationH}
                className="object-contain"
              />
            </div>
          ))}

        </div>

      </div>
    </div>
  )
}