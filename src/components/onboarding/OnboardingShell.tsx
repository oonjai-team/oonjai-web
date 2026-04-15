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

        {/* ── MOBILE layout (< sm) ── */}
        <div className="sm:hidden flex flex-col h-screen">

          {/* Logo — always centered at top */}
          <div className="w-full flex items-center justify-center
          bg-oonjai-cream-400 pt-8 pb-4 flex-shrink-0">
            <Image
              src="/images/logo.svg"
              alt="Oonjai"
              width={110}
              height={53}
              priority
            />
          </div>

          {/* Illustration — below logo, only on step 1 */}
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

          {/* Card */}
          <div className={`bg-white rounded-t-[40px]
        shadow-[0px_-4px_16px_0px_rgba(0,0,0,0.1)] flex-1 min-h-0 px-6 pt-11 pb-8 flex flex-col gap-4
        overflow-y-auto
        ${illustration && step === 1 ? "-mt-4" : "mt-0"}`}>

            {/* Progress bar */}
            <div className="flex items-center gap-2 w-full mb-4 flex-shrink-0">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-1.5 rounded-lg bg-oonjai-sec-green-100 overflow-hidden"
                >
                  <motion.div
                    animate={{ width: i < step ? "100%" : "0%" }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    className="h-full bg-oonjai-green-500 rounded-lg"
                  />
                </div>
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
                className="w-full flex flex-col justify-between flex-1"
              >
                {children}
              </motion.div>
            </AnimatePresence>

          </div>
        </div>

        {/* ── DESKTOP layout (>= sm) ── */}
        <div className="hidden h-full sm:flex flex-row py-6 px-4 items-end">

          {/* White card */}
          <div className={`
          relative z-10
          ${centered
            ?  "w-full max-w-[750px] mx-auto h-full"
            : "flex-1 min-w-0 max-w-[750px] h-full"
          }
          px-10 pb-6 pt-6
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
                    className="flex-1 h-2.5 rounded-lg bg-oonjai-sec-green-100 overflow-hidden"
                  >
                    <motion.div
                      animate={{ width: i < step ? "100%" : "0%" }}
                      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                      className="h-full bg-oonjai-green-500 rounded-lg"
                    />
                  </div>
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
                className="w-full flex flex-col flex-1 justify-between py-4"
              >
                {children}
              </motion.div>
            </AnimatePresence>

          </div>

          {/* Illustration — right side, fixed width container */}
          {illustration && (
            <div className="hidden lg:flex flex-col justify-end h-full -mr-6 w-[500px] flex-shrink-0">
              {step === 1 ? (
                <div className="relative">
                  <div className="absolute scale-[105%] -left-[11%] z-[20] -top-[12%]">
                    <Image
                      src={illustration}
                      alt="Onboarding illustration"
                      width={illustrationW}
                      height={illustrationH}
                      className="object-contain w-full h-auto"
                    />
                  </div>
                  <Image
                    src={illustration}
                    alt="Onboarding illustration"
                    width={illustrationW}
                    height={illustrationH}
                    className="object-contain opacity-0 w-full h-auto"
                  />
                </div>
              ) : (
                <div className="flex flex-col justify-center h-full">
                  <Image
                    src={illustration}
                    alt="Onboarding illustration"
                    width={illustrationW}
                    height={illustrationH}
                    className="object-contain w-full h-auto"
                  />
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  )
}
