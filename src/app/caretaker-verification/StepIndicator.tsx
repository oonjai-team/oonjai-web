"use client"
import { Public_Sans } from "next/font/google"
import { Check } from "lucide-react"
import { STEPS, Step } from "./schema"

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-public-sans",
})

interface Props {
  currentStep: Step
}

const StepIndicator = ({ currentStep }: Props) => {
  return (
    <div className={`${publicSans.variable} w-full max-w-[976px] h-16 relative flex items-start`}>
      {/* Connector lines */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute top-[20px] h-0.5 w-52"
          style={{ left: `${59 + i * 317}px` }}
        >
          <div className={`w-full h-0.5 ${currentStep > i + 1 ? "bg-oonjai-green-500" : "bg-oonjai-sec-green-100"}`} />
        </div>
      ))}

      {/* Step circles */}
      {STEPS.map((step, i) => {
        const isCompleted = currentStep > step.number
        const isActive = currentStep === step.number
        const positions = [8, 284, 604, 921]

        return (
          <div
            key={step.number}
            className="absolute top-0 flex flex-col items-center gap-2"
            style={{ left: `${positions[i]}px` }}
          >
            <div className={`w-10 h-10 rounded-full flex justify-center items-center
              ${isActive || isCompleted ? "bg-oonjai-green-500" : "bg-oonjai-sec-green-100"}`}
            >
              {isCompleted ? (
                <Check color="#86efac" size={16} />
              ) : (
                <span className={`text-base font-bold font-['Lexend'] leading-6
                  ${isActive ? "text-white" : "text-DarkGrey"}`}>
                  {step.number}
                </span>
              )}
            </div>
            <span className={`text-sm font-['Public_Sans'] leading-5
              ${isActive || isCompleted ? "text-oonjai-green-500 font-semibold" : "text-DarkGrey font-medium"}`}>
              {step.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default StepIndicator