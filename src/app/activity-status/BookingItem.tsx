"use client"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { CheckCircle, MapPin, Clock, Ban, Star } from "lucide-react"
import type { BookingResponse } from "@/lib/api/bookings"

const STATUS_STYLES: Record<string, { label: string; cls: string; Icon: typeof CheckCircle }> = {
  created:   { label: "Pending",    cls: "bg-[#FFF4E0] text-[#B7791F]",            Icon: Clock },
  confirmed: { label: "Confirmed",  cls: "bg-oonjai-sec-green-100 text-oonjai-green-500", Icon: CheckCircle },
  completed: { label: "Completed",  cls: "bg-slate-100 text-slate-600",            Icon: CheckCircle },
  cancelled: { label: "Cancelled",  cls: "bg-red-50 text-red-600",                 Icon: Ban },
}

interface Props {
  booking: BookingResponse
  variant: "upcoming" | "done" | "cancelled"
  onCancel?: (_bookingId: string) => void
  onReview?: (_bookingId: string) => void
  cancelling?: boolean
}

function formatDateParts(iso: string): { date: string; time: string } {
  const d = new Date(iso)
  if (isNaN(d.getTime())) return { date: iso, time: "" }
  const date = d.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" })
  const time = d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
  return { date, time }
}

const BookingItem = ({ booking, variant, onCancel, onReview, cancelling }: Props) => {
  const status = STATUS_STYLES[booking.status] ?? STATUS_STYLES.created
  const title = booking.activity?.title ?? booking.note ?? `${booking.serviceType} booking`
  const location = booking.activity?.location ?? booking.location
  const { date, time } = formatDateParts(booking.startDate)
  const image = booking.activity?.images?.[0]
  const href = booking.activity ? `/activities/${booking.activity.id}` : undefined

  const StatusIcon = status.Icon

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="self-stretch p-4 bg-white rounded-xl outline outline-1 outline-lightGrey flex items-center gap-4"
    >
      {image ? (
        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
          <Image src={image} alt={title} fill unoptimized className="object-cover" />
        </div>
      ) : (
        <div className="w-16 pr-4 border-r border-lightGrey flex flex-col items-center">
          <span className="text-DarkGrey text-xs font-bold font-['Lexend'] uppercase leading-4">{date.split(" ")[1] || ""}</span>
          <span className="text-black text-lg font-bold font-['Lexend'] leading-7">{time || date.split(" ")[0]}</span>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {href ? (
          <Link href={href} className="text-black text-base font-bold font-['Lexend'] leading-6 truncate hover:underline">
            {title}
          </Link>
        ) : (
          <span className="text-black text-base font-bold font-['Lexend'] leading-6 truncate">{title}</span>
        )}
        <div className="flex items-center gap-2 text-DarkGrey text-sm font-['Lexend'] leading-5 mt-0.5">
          <Clock size={12} />
          <span className="truncate">{date}{time ? ` • ${time}` : ""}</span>
        </div>
        {location && (
          <div className="flex items-center gap-2 text-DarkGrey text-sm font-['Lexend'] leading-5">
            <MapPin size={12} />
            <span className="truncate">{location}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col items-end gap-2">
        <span className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 text-xs font-semibold font-['Lexend'] ${status.cls}`}>
          <StatusIcon size={12} />
          {status.label}
        </span>

        {variant === "upcoming" && booking.status !== "cancelled" && onCancel && (
          <button
            onClick={() => onCancel(booking.id)}
            disabled={cancelling}
            className="px-3 py-1.5 text-xs font-semibold font-['Lexend'] text-red-600 rounded-lg border border-red-200 hover:bg-red-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelling ? "Cancelling…" : "Cancel"}
          </button>
        )}

        {variant === "done" && booking.status === "completed" && onReview && (
          <button
            onClick={() => onReview(booking.id)}
            className="px-4 py-1.5 bg-PrimaryGreen rounded-lg flex items-center gap-1 hover:opacity-90 active:scale-95 transition-all"
          >
            <Star color="white" size={12} />
            <span className="text-white text-xs font-medium font-['Lexend']">Review</span>
          </button>
        )}
      </div>
    </motion.div>
  )
}

export default BookingItem
