"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, MapPin, Stethoscope, CalendarDays, Info, Shield, Clock, Check, CheckCircle, PlusCircle } from "lucide-react"
import StepIndicator from "../StepIndicator"
import { mockServices, mockAvailability, ServiceDTO, AvailabilityDTO } from "../schema"

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const TIME_SLOTS = [
  { key: "morning",   label: "Morning",   time: "08:00 - 12:00" },
  { key: "afternoon", label: "Afternoon", time: "12:00 - 17:00" },
  { key: "evening",   label: "Evening",   time: "17:00 - 21:00" },
]

interface Props {
  onNext: () => void
  onBack: () => void
}

const Step3Experience = ({ onNext, onBack }: Props) => {
  const [services, setServices] = useState<ServiceDTO[]>(mockServices)
  const [availability, setAvailability] = useState<AvailabilityDTO[]>(mockAvailability)
  const [distance, setDistance] = useState(12)

  const toggleService = (id: string) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, selected: !s.selected } : s))
  }

  const toggleSlot = (dayIndex: number, slot: "morning" | "afternoon" | "evening") => {
    setAvailability(prev => prev.map((a, i) => i === dayIndex ? { ...a, [slot]: !a[slot] } : a))
  }

  return (
    <div className="min-h-screen bg-amber-50 px-4 md:px-16 py-12 flex flex-col items-center gap-10">
      <div className="w-full max-w-[1024px] px-3.5 py-4 flex flex-col gap-12">
        <StepIndicator currentStep={3} />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full flex flex-col gap-10"
        >
          <div className="w-full bg-white rounded-xl outline outline-1 outline-oonjai-green-100 overflow-hidden">
            <div className="p-8 flex flex-col gap-10">

              {/* Location */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-oonjai-sec-green-100 rounded-lg flex justify-center items-center">
                    <MapPin color="#365C48" size={20} />
                  </div>
                  <span className="text-DarkGrey text-lg font-['Lexend'] leading-7">Where can you work?</span>
                </div>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1 flex flex-col gap-2">
                    <span className="text-oonjai-green-500 text-sm font-medium font-['Lexend'] leading-5">Base Location</span>
                    <div className="relative">
                      <input defaultValue="Lat Phrao, Bangkok"
                        className="w-full pl-10 pr-3 py-2.5 bg-white rounded-lg outline outline-1 outline-oonjai-green-100 text-DarkGrey text-sm font-['Lexend'] leading-5" />
                      <MapPin color="#4d4d4d" size={14} className="absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                    <span className="text-DarkGrey text-xs font-['Lexend'] leading-4">Your primary starting point for travel calculations.</span>
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex justify-between">
                      <span className="text-oonjai-green-500 text-sm font-medium font-['Lexend'] leading-5">Travel Distance</span>
                      <span className="text-oonjai-green-500 text-sm font-bold font-['Lexend'] leading-5">{distance} km</span>
                    </div>
                    <input type="range" min={5} max={20} value={distance}
                      onChange={(e) => setDistance(parseInt(e.target.value))}
                      className="w-full accent-oonjai-green-500" />
                    <div className="flex justify-between px-1">
                      {["5 KM", "10 KM", "15 KM", "20 KM"].map(label => (
                        <span key={label} className="text-DarkGrey text-[10px] font-medium font-['Lexend'] leading-4">{label}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-px border-t border-oonjai-green-50" />

              {/* Services */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-oonjai-sec-green-100 rounded-lg flex justify-center items-center">
                    <Stethoscope color="#365C48" size={20} />
                  </div>
                  <span className="text-DarkGrey text-lg font-['Lexend'] leading-7">What services do you provide?</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {services.map((service) => (
                    <button key={service.id} onClick={() => toggleService(service.id)}
                      className={`px-4 py-2 rounded-full outline outline-2 flex items-center gap-2 transition-all
                        ${service.selected ? "bg-oonjai-green-500 outline-oonjai-green-500" : "bg-white outline-oonjai-green-100"}`}>
                      {service.selected
                        ? <CheckCircle color="white" size={14} />
                        : <PlusCircle color="#365C48" size={14} />}
                      <span className={`text-sm font-medium font-['Lexend'] leading-5 ${service.selected ? "text-white" : "text-oonjai-sec-green-700"}`}>
                        {service.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-px border-t border-oonjai-green-50" />

              {/* Weekly Availability */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-oonjai-sec-green-100 rounded-lg flex justify-center items-center">
                    <CalendarDays color="#365C48" size={20} />
                  </div>
                  <span className="text-DarkGrey text-lg font-['Lexend'] leading-7">Weekly Availability</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="w-40 text-left" />
                        {DAYS.map(day => (
                          <th key={day} className="p-2 text-center text-oonjai-sec-green-500 text-xs font-['Lexend'] uppercase tracking-wide">{day}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {TIME_SLOTS.map((slot) => (
                        <tr key={slot.key}>
                          <td className="py-2 pr-3">
                            <div className="text-DarkGrey text-sm font-bold font-['Lexend'] leading-5">{slot.label}</div>
                            <div className="text-DarkGrey text-[10px] font-['Lexend']">{slot.time}</div>
                          </td>
                          {availability.map((avail, dayIndex) => {
                            const isSelected = avail[slot.key as "morning" | "afternoon" | "evening"]
                            return (
                              <td key={avail.day} className="p-1">
                                <button onClick={() => toggleSlot(dayIndex, slot.key as "morning" | "afternoon" | "evening")}
                                  className={`w-full h-12 rounded flex justify-center items-center transition-all
                                    ${isSelected ? "bg-oonjai-green-500" : "bg-oonjai-green-50"}`}>
                                  {isSelected && <Check color="white" size={12} />}
                                </button>
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Info color="#559373" size={24} />, title: "Matching Tip", body: "Setting a 15km+ radius increases your job matches by up to 45% in Bangkok area." },
              { icon: <Shield color="#559373" size={24} />, title: "Privacy First", body: "Your exact base location is never shown to clients, only an approximate radius." },
              { icon: <Clock color="#559373" size={24} />, title: "Flexibility", body: "You can pause your availability or adjust your service scope at any time later." },
            ].map((tip) => (
              <div key={tip.title} className="p-4 bg-oonjai-green-50 rounded-xl outline outline-1 outline-oonjai-green-300 flex items-start gap-4">
                <div className="pt-1 shrink-0">{tip.icon}</div>
                <div className="flex flex-col gap-1">
                  <span className="text-DarkGrey text-sm font-bold font-['Lexend'] leading-5">{tip.title}</span>
                  <span className="text-DarkGrey text-xs font-['Lexend'] leading-4">{tip.body}</span>
                </div>
              </div>
            ))}
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

export default Step3Experience