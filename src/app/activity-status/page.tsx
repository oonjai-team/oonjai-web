"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { CalendarDays } from "lucide-react"
import {
  mockHappeningNow,
  mockUpcoming,
  mockDone,
  DoneActivityDTO,
  UpcomingActivityDTO,
} from "./schema"
import HappeningNowCard from "./HappeningNowCard"
import UpcomingItem from "./UpcomingItem"
import DoneItem from "./DoneItem"

const Page = () => {
  const [upcoming] = useState<UpcomingActivityDTO[]>(mockUpcoming)
  const [done] = useState<DoneActivityDTO[]>(mockDone)

  const handleReview = (id: string) => {
    console.log("Review clicked for:", id)
  }

  return (
    <div className="min-h-screen bg-amber-50 px-4 md:px-16 py-12 flex flex-col items-center">
      <div className="w-full max-w-[896px] flex flex-col gap-8">

        {/* Happening Now */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-oonjai-green-500 rounded-full" />
            <h2 className="text-DarkGrey text-lg font-bold font-['Lexend'] uppercase tracking-wide">
              Happening Now
            </h2>
          </div>
          <HappeningNowCard item={mockHappeningNow} />
        </motion.section>

        {/* Upcoming Today */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <CalendarDays color="#4d4d4d" size={20} />
            <h2 className="text-DarkGrey text-lg font-bold font-['Lexend'] uppercase tracking-wide">
              Upcoming Today
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {upcoming.map((item) => (
              <UpcomingItem key={item.id} item={item} />
            ))}
          </div>
        </motion.section>

        {/* Done */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <CalendarDays color="#4d4d4d" size={20} />
            <h2 className="text-DarkGrey text-lg font-bold font-['Lexend'] uppercase tracking-wide">
              Done
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {done.map((item) => (
              <DoneItem key={item.id} item={item} onReview={handleReview} />
            ))}
          </div>
        </motion.section>

      </div>
    </div>
  )
}

export default Page