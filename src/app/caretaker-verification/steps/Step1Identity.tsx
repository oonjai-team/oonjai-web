"use client"
import { motion } from "framer-motion"
import { ArrowRight, CreditCard, Layers, Lock, ShieldCheck, CheckCircle, Lightbulb } from "lucide-react"
import StepIndicator from "../StepIndicator"

interface Props {
  onNext: () => void
}

const Step1Identity = ({ onNext }: Props) => {
  return (
    <div className="min-h-screen bg-amber-50 px-4 md:px-16 py-12 flex flex-col items-center gap-10">
      <div className="w-full max-w-[1024px] px-6 py-10 flex flex-col gap-10">
        <StepIndicator currentStep={1} />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full flex flex-col lg:flex-row justify-center items-start gap-8"
        >
          {/* Left: Main Form */}
          <div className="flex-1 max-w-[640px] flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-slate-900 text-2xl font-bold font-['Lexend'] leading-8">Identity Verification</h2>
              <p className="text-DarkGrey text-base font-normal font-['Lexend'] leading-6">
                Please upload a clear photo of your Thai National ID card. Our system will automatically extract your information.
              </p>
            </div>

            {/* ID Upload Cards */}
            <div className="flex gap-4">
              <div className="flex-1 p-8 bg-white rounded-xl outline outline-2 outline-offset-[-2px] outline-sky-600/40 flex flex-col justify-center items-center gap-3">
                <div className="w-16 h-16 bg-sky-600/10 rounded-full flex justify-center items-center">
                  <CreditCard color="#365C48" size={28} />
                </div>
                <span className="text-oonjai-green-900 text-base font-semibold font-['Public_Sans'] leading-6">Thai ID Card (Front)</span>
                <span className="text-oonjai-green-400 text-xs font-['Lexend'] leading-4">JPEG, PNG up to 5MB</span>
                <button className="mt-1 px-4 py-2 bg-sky-600/10 rounded hover:bg-sky-600/20 transition-all">
                  <span className="text-oonjai-green-500 text-sm font-semibold font-['Public_Sans'] leading-5">Select File</span>
                </button>
              </div>
              <div className="flex-1 p-8 bg-white rounded-xl outline outline-2 outline-offset-[-2px] outline-oonjai-blue-100 flex flex-col justify-center items-center gap-3">
                <div className="w-16 h-16 bg-oonjai-green-50 rounded-full flex justify-center items-center">
                  <Layers color="#559373" size={28} />
                </div>
                <span className="text-oonjai-green-900 text-base font-semibold font-['Public_Sans'] leading-6">Thai ID Card (Back)</span>
                <span className="text-oonjai-green-400 text-xs font-['Lexend'] leading-4">JPEG, PNG up to 5MB</span>
                <button className="mt-1 px-4 py-2 bg-oonjai-green-50 rounded hover:bg-oonjai-green-100 transition-all">
                  <span className="text-DarkGrey text-sm font-semibold font-['Public_Sans'] leading-5">Select File</span>
                </button>
              </div>
            </div>

            {/* Extracted Information */}
            <div className="px-6 pt-8 pb-6 bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-oonjai-blue-100 flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <ShieldCheck color="#4AB082" size={20} />
                <span className="text-oonjai-green-900 text-lg font-bold font-['Public_Sans'] leading-7">Extracted Information</span>
                <div className="flex-1 flex justify-end items-center gap-2">
                  <div className="w-2 h-2 bg-oonjai-green-500 rounded-full" />
                  <span className="text-oonjai-green-500 text-xs font-semibold font-['Public_Sans'] uppercase leading-4 tracking-wide">Awaiting Upload...</span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <div className="flex-1 flex flex-col gap-2">
                    <label className="text-DarkGrey text-xs font-bold font-['Public_Sans'] uppercase leading-4 tracking-wider">Full Name (Thai/English)</label>
                    <div className="relative">
                      <input disabled placeholder="Waiting for OCR extraction..."
                        className="w-full px-4 py-3.5 bg-slate-50 rounded-lg outline outline-1 outline-oonjai-blue-100 text-lightGrey text-base font-['Lexend'] placeholder:text-lightGrey" />
                      <Lock color="#365C48" size={14} className="absolute right-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <label className="text-DarkGrey text-xs font-bold font-['Public_Sans'] uppercase leading-4 tracking-wider">Birthdate</label>
                    <div className="relative">
                      <input disabled placeholder="YYYY-MM-DD"
                        className="w-full px-4 py-3.5 bg-slate-50 rounded-lg outline outline-1 outline-oonjai-blue-100 text-lightGrey text-base font-['Lexend'] placeholder:text-lightGrey" />
                      <Lock color="#365C48" size={14} className="absolute right-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-DarkGrey text-xs font-bold font-['Public_Sans'] uppercase leading-4 tracking-wider">Mobile Number</label>
                  <div className="flex">
                    <div className="px-4 py-3 bg-oonjai-green-50 rounded-tl-lg rounded-bl-lg border border-oonjai-blue-100 flex items-center">
                      <span className="text-DarkGrey text-base font-medium font-['Public_Sans'] leading-6">+66</span>
                    </div>
                    <input placeholder="81 234 5678"
                      className="flex-1 px-4 py-3.5 bg-white rounded-tr-lg rounded-br-lg outline outline-1 outline-oonjai-blue-100 text-lightGrey text-base font-['Lexend'] placeholder:text-lightGrey" />
                  </div>
                  <span className="text-oonjai-sec-green-500 text-[10px] font-['Lexend'] leading-4">An OTP will be sent to this number for verification.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="w-72 flex flex-col gap-6">
            <div className="p-6 bg-sky-600/5 rounded-xl outline outline-1 outline-sky-600/20 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <ShieldCheck color="#365C48" size={24} />
                <span className="text-oonjai-green-500 text-base font-bold font-['Public_Sans'] leading-6">Identity Security</span>
              </div>
              <p className="text-DarkGrey text-sm font-['Lexend'] leading-6">
                Your identification documents are processed using industry-standard AES-256 encryption. We only use this data for regulatory compliance and background checks.
              </p>
              <div className="flex flex-col gap-3">
                {["Encrypted Storage", "PDPA Compliant (Thailand)", "Secure OCR Processing"].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle color="#365C48" size={12} className="mt-0.5 shrink-0" />
                    <span className="text-DarkGrey text-xs font-['Lexend'] leading-4">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 bg-white rounded-xl outline outline-1 outline-oonjai-blue-100 flex flex-col gap-4">
              <span className="text-oonjai-green-900 text-base font-bold font-['Public_Sans'] leading-6">Sample ID Guide</span>
              <div className="flex flex-col gap-4">
                <div className="relative bg-oonjai-green-50 rounded-lg outline outline-1 outline-oonjai-blue-100 overflow-hidden h-40 flex justify-center items-center">
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircle color="#22c55e" size={28} />
                    <span className="text-DarkGrey text-[10px] font-bold font-['Public_Sans'] uppercase text-center leading-4">Correct: Clear, Well-lit, All edges visible</span>
                  </div>
                </div>
                <div className="bg-amber-50 rounded-lg outline outline-1 outline-amber-100 p-3 flex items-start gap-2">
                  <Lightbulb color="#f59e0b" size={20} className="shrink-0 mt-0.5" />
                  <p className="text-amber-800 text-xs font-['Public_Sans']">
                    <strong>Tip:</strong> Avoid camera flash to prevent glare on the holographic security features.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-end items-center pt-4">
          <button onClick={onNext}
            className="px-10 py-3 bg-oonjai-green-500 rounded-lg flex items-center gap-2 hover:bg-oonjai-green-600 active:scale-95 transition-all">
            <span className="text-white text-base font-bold font-['Public_Sans'] leading-6">Save & Continue</span>
            <ArrowRight color="white" size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Step1Identity