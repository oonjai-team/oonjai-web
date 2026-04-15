"use client"
import { motion } from "framer-motion"
import { Map, Phone } from "lucide-react"
import { HappeningNowDTO } from "./schema"

interface Props {
  item: HappeningNowDTO
}

const HappeningNowCard = ({ item }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="self-stretch p-8 bg-white rounded-2xl shadow-xl outline outline-2 outline-offset-[-2px] outline-oonjai-green-500 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
    >
      {/* Left: Info */}
      <div className="flex flex-col gap-2 w-full md:max-w-[520px]">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-oonjai-sec-green-100 rounded-full text-oonjai-green-500 text-xs font-bold font-['Lexend'] uppercase tracking-wider">
            {item.badge}
          </span>
          <span className="text-oonjai-green-500 text-sm font-['Lexend']">
            {item.startedAgo}
          </span>
        </div>
        <h2 className="text-slate-900 text-2xl font-bold font-['Lexend']">{item.title}</h2>
        <div className="pt-2 flex flex-col gap-3">
          <div className="flex justify-between">
            <span className="text-slate-900 text-sm font-medium font-['Lexend']">Progress</span>
            <span className="text-oonjai-green-500 text-sm font-medium font-['Lexend']">{item.progress}% Complete</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${item.progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-3 bg-oonjai-green-500 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Right: Buttons */}
      <div className="flex flex-col gap-3 w-full md:w-auto">
        <button className="px-9 py-3 bg-oonjai-green-500 rounded-xl flex justify-center items-center gap-2 hover:bg-oonjai-green-600 active:scale-95 transition-all">
          <Map color="white" size={20} />
          <span className="text-white text-base font-bold font-['Lexend']">Track Status</span>
        </button>
        <button className="px-8 py-3 bg-oonjai-red-50 rounded-xl outline outline-1 outline-oonjai-red-400 flex justify-center items-center gap-2 hover:bg-oonjai-red-100 active:scale-95 transition-all">
          <Phone color="#CF4538" size={20} />
          <span className="text-oonjai-red-400 text-base font-bold font-['Lexend']">Emergency Call</span>
        </button>
      </div>
    </motion.div>
  )
}

export default HappeningNowCard