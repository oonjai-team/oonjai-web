"use client"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { DoneActivityDTO } from "./schema"

interface Props {
  item: DoneActivityDTO
  onReview: (id: string) => void
}

const DoneItem = ({ item, onReview }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="self-stretch p-4 bg-white rounded-xl outline outline-1 outline-lightGrey flex items-center gap-4"
    >
      <div className="pr-4 border-r border-lightGrey flex flex-col items-center">
        <span className="text-DarkGrey text-xs font-medium font-['Lexend'] uppercase leading-4">{item.date}</span>
        <span className="text-black text-lg font-bold font-['Lexend'] leading-7">{item.time}</span>
      </div>
      <div className="flex-1 flex flex-col">
        <span className="text-black text-base font-bold font-['Lexend'] leading-6">{item.title}</span>
        <span className="text-DarkGrey text-sm font-['Lexend'] leading-5">{item.location}</span>
      </div>
      <button
        onClick={() => onReview(item.id)}
        className="px-6 py-2 bg-PrimaryGreen rounded-lg flex items-center gap-1 hover:opacity-90 active:scale-95 transition-all"
      >
        <Star color="white" size={14} />
        <span className="text-white text-sm font-medium font-['Lexend']">Review</span>
      </button>
    </motion.div>
  )
}

export default DoneItem