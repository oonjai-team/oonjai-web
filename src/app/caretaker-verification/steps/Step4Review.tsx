"use client"
import { motion } from "framer-motion"
import { ArrowLeft, Hourglass, Info, RefreshCw } from "lucide-react"
import StepIndicator from "../StepIndicator"

interface Props {
  onBack: () => void
}

const Step4Review = ({ onBack }: Props) => {
  return (
    <div className="min-h-screen bg-amber-50 px-4 md:px-16 py-12 flex flex-col items-center gap-10">
      <div className="w-full max-w-[1024px] px-3.5 py-4 flex flex-col gap-12">
        <StepIndicator currentStep={4} />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[656px] mx-auto bg-white rounded-xl shadow-2xl outline outline-1 outline-slate-200 overflow-hidden"
        >
          <div className="px-10 py-12 flex flex-col items-center gap-7">
            <div className="w-20 py-4 bg-oonjai-sec-green-100 rounded-full flex justify-center items-center">
              <Hourglass color="#365C48" size={48} />
            </div>
            <h2 className="text-oonjai-green-500 text-2xl font-bold font-['Lexend'] leading-8 text-center">
              Verification in Progress
            </h2>
            <p className="text-DarkGrey text-base font-['Lexend'] leading-6 text-center max-w-sm">
              Your application to become a Ranger is currently being reviewed by our compliance team in Thailand. We&apos;re verifying your credentials and safety certifications.
            </p>
            <div className="w-full p-5 bg-oonjai-green-50 rounded-lg outline outline-1 outline-oonjai-green-300 flex items-start gap-4">
              <Info color="#365C48" size={24} className="shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <span className="text-oonjai-green-500 text-sm font-['Lexend'] leading-5">Estimated timeframe</span>
                <p className="text-DarkGrey text-sm font-['Lexend'] leading-5">
                  We usually complete the verification process within{" "}
                  <span className="text-oonjai-green-500 font-bold">24 hours</span>.
                  You will receive an email and SMS once your access is unlocked.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="px-8 py-3 bg-oonjai-green-500 rounded-lg flex items-center gap-2 hover:bg-oonjai-green-600 active:scale-95 transition-all">
                <RefreshCw color="white" size={18} />
                <span className="text-white text-base font-bold font-['Lexend'] leading-6">Check Now</span>
              </button>
              <button className="px-8 py-3.5 bg-oonjai-blue-50 rounded-lg hover:bg-oonjai-blue-100 active:scale-95 transition-all">
                <span className="text-DarkGrey text-base font-bold font-['Lexend'] leading-6">Support Center</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-4">
          <button onClick={onBack} className="px-6 py-3 flex items-center gap-2 hover:opacity-70 transition-all">
            <ArrowLeft color="#4d4d4d" size={14} />
            <span className="text-DarkGrey text-base font-semibold font-['Public_Sans'] leading-6">Back</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Step4Review