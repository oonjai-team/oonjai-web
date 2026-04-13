"use client"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { UpcomingActivityDTO } from "./schema"

interface Props {
  item: UpcomingActivityDTO
}

const UpcomingItem = ({ item }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="self-stretch p-4 bg-white rounded-xl outline outline-1 outline-lightGrey flex items-center gap-4"
    >
      <div className="w-16 pr-4 border-r border-lightGrey flex flex-col items-center">
        <span className="text-DarkGrey text-xs font-bold font-['Lexend'] uppercase leading-4">{item.period}</span>
        <span className="text-black text-lg font-bold font-['Lexend'] leading-7">{item.time}</span>
      </div>
      <div className="flex-1 flex flex-col">
        <span className="text-black text-base font-bold font-['Lexend'] leading-6">{item.title}</span>
        <span className="text-DarkGrey text-sm font-['Lexend'] leading-5">{item.location}</span>
      </div>
      <div className="px-3 py-1.5 bg-oonjai-sec-green-100 rounded-lg flex items-center gap-2">
        <CheckCircle color="#365C48" size={16} />
        <span className="text-oonjai-green-500 text-sm font-semibold font-['Lexend']">Joined</span>
      </div>
    </motion.div>
  )
}

export default UpcomingItem