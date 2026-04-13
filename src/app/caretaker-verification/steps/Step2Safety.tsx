"use client"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, ShieldCheck, CloudUpload, Info, Pencil } from "lucide-react"
import Image from "next/image"
import StepIndicator from "../StepIndicator"

interface Props {
  onNext: () => void
  onBack: () => void
}

const Step2Safety = ({ onNext, onBack }: Props) => {
  return (
    <div className="min-h-screen bg-amber-50 px-4 md:px-16 py-12 flex flex-col items-center gap-10">
      <div className="w-full max-w-[1024px] px-5 py-12 flex flex-col gap-10">
        <StepIndicator currentStep={2} />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-white rounded-xl shadow-xl outline outline-1 outline-oonjai-green-400 overflow-hidden"
        >
          <div className="p-12 flex flex-col gap-10">
            <div className="max-w-[672px] flex flex-col gap-3">
              <h2 className="text-oonjai-green-500 text-3xl font-bold font-['Lexend'] leading-9">Safety and Trust Verification</h2>
              <p className="text-DarkGrey text-lg font-['Lexend'] leading-7">
                Your safety verification helps us build a secure community for Thai families. Please provide the necessary credentials to finalize your Ranger status.
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-start gap-12 pb-6">
              {/* Profile Photo */}
              <div className="w-64 flex flex-col items-center">
                <div className="relative">
                  <div className="w-48 h-48 bg-slate-100 rounded-full outline outline-4 outline-slate-50 overflow-hidden flex justify-center items-center">
                    <Image
                      src="https://placehold.co/184x184"
                      alt="profile"
                      width={184}
                      height={184}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute bottom-2 right-2 p-2.5 bg-oonjai-green-500 rounded-full shadow-lg hover:bg-oonjai-green-600 transition-all">
                    <Pencil color="white" size={20} />
                  </button>
                </div>
                <div className="pt-6 flex flex-col items-center gap-2">
                  <span className="text-oonjai-green-500 text-lg font-bold font-['Lexend'] leading-7">Your Profile Photo</span>
                  <p className="text-DarkGrey text-sm font-['Lexend'] leading-5 text-center px-4">
                    &ldquo;This photo will be seen by families. Smile!&rdquo;
                  </p>
                </div>
              </div>

              {/* PCC Upload */}
              <div className="flex-1 flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-oonjai-green-500 text-base font-bold font-['Lexend'] leading-6">Police Clearance Certificate (PCC)</span>
                    <Info color="#b1b1b1" size={18} />
                  </div>
                  <div className="p-8 bg-slate-50/50 rounded-xl outline outline-2 outline-oonjai-green-200 flex flex-col justify-center items-center gap-2">
                    <div className="w-16 h-16 bg-oonjai-sec-green-100 rounded-full flex justify-center items-center mb-2">
                      <ShieldCheck color="#365C48" size={36} />
                    </div>
                    <span className="text-oonjai-green-500 text-base font-['Lexend'] leading-6">Click to upload or drag and drop</span>
                    <span className="text-DarkGrey text-sm font-['Lexend'] leading-5 mb-4">PDF, PNG, JPG (max. 10MB)</span>
                    <button className="px-6 py-2.5 bg-white rounded-lg outline outline-1 outline-oonjai-green-400 flex items-center gap-2 hover:bg-oonjai-green-50 transition-all">
                      <CloudUpload color="#365C48" size={14} />
                      <span className="text-oonjai-green-500 text-sm font-['Lexend'] leading-5">Browse Files</span>
                    </button>
                  </div>
                </div>
                <div className="p-6 bg-oonjai-green-50 rounded-xl outline outline-1 outline-oonjai-sec-green-100 flex items-start gap-4">
                  <ShieldCheck color="#365C48" size={24} className="shrink-0 mt-1" />
                  <div className="flex flex-col gap-1">
                    <span className="text-oonjai-green-500 text-base font-bold font-['Lexend'] leading-6">Background Check Protocol</span>
                    <p className="text-DarkGrey text-sm font-['Lexend'] leading-5">
                      Once submitted, our team will manually verify your document with the Royal Thai Police. This process usually takes 2-3 business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-4">
          <button onClick={onBack} className="px-6 py-3 flex items-center gap-2 hover:opacity-70 transition-all">
            <ArrowLeft color="#4d4d4d" size={14} />
            <span className="text-DarkGrey text-base font-semibold font-['Public_Sans'] leading-6">Back</span>
          </button>
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

export default Step2Safety