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
    <div className={`w-full min-h-screen relative bg-oonjai-cream-400
    overflow-x-hidden ${centered ? "flex items-center justify-center" : ""}`}>

      <div className={`
        relative z-10 w-full
        ${centered
          ? "m-6"
          : "lg:absolute lg:left-[55px] lg:top-[29px] lg:w-[750px] lg:h-[calc(100vh-58px)]"
        }
        px-10 py-10
        bg-white rounded-[40px]
        shadow-[0px_4px_16px_0px_rgba(0,0,0,0.25)]
        flex flex-col justify-between
      `}>

        {/* Logo + progress bar */}
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

      {/* Illustration */}
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
  )
}