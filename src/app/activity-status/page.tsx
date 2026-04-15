"use client"
import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { CalendarDays, CheckCircle2, Ban } from "lucide-react"
import { Header } from "@/components/common/Header"
import { BookingsListSkeleton } from "@/components/common/Skeleton"
import { fetchBookings, cancelBooking, type BookingResponse } from "@/lib/api/bookings"
import { useAuth } from "@/lib/auth/AuthContext"
import BookingItem from "./BookingItem"
import HappeningNowCard from "./HappeningNowCard"

interface Grouped {
  happeningNow: BookingResponse[]
  upcoming: BookingResponse[]
  done: BookingResponse[]
  cancelled: BookingResponse[]
}

function groupBookings(bookings: BookingResponse[]): Grouped {
  const now = Date.now()
  const groups: Grouped = { happeningNow: [], upcoming: [], done: [], cancelled: [] }

  for (const b of bookings) {
    const start = new Date(b.startDate).getTime()
    const end = new Date(b.endDate).getTime()

    if (b.status === "cancelled") {
      groups.cancelled.push(b)
      continue
    }
    if (b.status === "completed" || (!isNaN(end) && end < now)) {
      groups.done.push(b)
      continue
    }
    if (!isNaN(start) && !isNaN(end) && start <= now && now <= end) {
      groups.happeningNow.push(b)
      continue
    }
    groups.upcoming.push(b)
  }

  groups.upcoming.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
  groups.done.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
  groups.cancelled.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
  return groups
}

const Page = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const [bookings, setBookings] = useState<BookingResponse[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cancellingId, setCancellingId] = useState<string | null>(null)

  useEffect(() => {
    if (authLoading || !isAuthenticated) return
    let cancelled = false
    fetchBookings()
      .then(res => {
        if (cancelled) return
        setBookings(res)
        setLoading(false)
      })
      .catch(() => {
        if (cancelled) return
        setError("Unable to load your bookings.")
        setLoading(false)
      })
    return () => { cancelled = true }
  }, [isAuthenticated, authLoading])

  const grouped = useMemo(() => (bookings ? groupBookings(bookings) : null), [bookings])

  const handleCancel = async (id: string) => {
    if (cancellingId) return
    const confirmed = window.confirm("Cancel this booking? This cannot be undone.")
    if (!confirmed) return
    setCancellingId(id)
    const ok = await cancelBooking(id)
    if (ok) {
      setBookings(prev => prev ? prev.map(b => b.id === id ? { ...b, status: "cancelled" } : b) : prev)
    } else {
      window.alert("We couldn't cancel this booking. Please try again.")
    }
    setCancellingId(null)
  }

  const handleReview = (id: string) => {
    // review flow is handled per-activity route
    window.location.href = `/activities/${id}/review`
  }

  const showSkeleton = authLoading || (isAuthenticated && loading)

  return (
    <div className="min-h-screen bg-[#FDF8F0] font-sans">
      <Header />
      <div className="px-4 md:px-16 py-12 flex flex-col items-center">
        <div className="w-full max-w-[896px] flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h1 className="text-DarkGrey text-2xl md:text-3xl font-bold font-['Lexend']">My Bookings</h1>
            <Link
              href="/activities"
              className="text-sm font-semibold text-PrimaryGreen hover:underline"
            >
              Browse activities →
            </Link>
          </div>

          {!authLoading && !isAuthenticated && (
            <div className="p-8 bg-white rounded-2xl border border-gray-100 text-center">
              <p className="text-DarkGrey mb-4">Log in to view your bookings.</p>
              <Link
                href="/auth/login"
                className="inline-block px-6 py-2 bg-PrimaryGreen text-white rounded-xl font-bold hover:opacity-90"
              >
                Log In
              </Link>
            </div>
          )}

          {showSkeleton && <BookingsListSkeleton />}

          {!showSkeleton && error && (
            <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-red-700">
              {error}
            </div>
          )}

          {!showSkeleton && !error && grouped && (() => {
            const hasAny =
              grouped.happeningNow.length +
              grouped.upcoming.length +
              grouped.done.length +
              grouped.cancelled.length > 0

            if (!hasAny) {
              return <EmptyState message="You don't have any bookings yet. Browse activities to get started." />
            }

            return (
              <>
                {grouped.happeningNow.length > 0 && (
                  <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-oonjai-green-500 rounded-full animate-pulse" />
                      <h2 className="text-DarkGrey text-lg font-bold font-['Lexend'] uppercase tracking-wide">
                        Happening Now
                      </h2>
                    </div>
                    <div className="flex flex-col gap-3">
                      {grouped.happeningNow.map(b => (
                        <HappeningNowCard
                          key={b.id}
                          item={{
                            id: b.id,
                            badge: "Live Activity",
                            startedAgo: relativeStart(b.startDate),
                            title: b.activity?.title ?? b.note ?? "Active booking",
                            progress: computeProgress(b.startDate, b.endDate),
                          }}
                        />
                      ))}
                    </div>
                  </motion.section>
                )}

                <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }} className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <CalendarDays color="#4d4d4d" size={20} />
                    <h2 className="text-DarkGrey text-lg font-bold font-['Lexend'] uppercase tracking-wide">
                      Upcoming
                    </h2>
                    <span className="text-DarkGrey/60 text-sm font-['Lexend']">({grouped.upcoming.length})</span>
                  </div>
                  {grouped.upcoming.length === 0 ? (
                    <EmptyState message="No upcoming bookings. Browse activities to book one." />
                  ) : (
                    <div className="flex flex-col gap-3">
                      {grouped.upcoming.map(b => (
                        <BookingItem
                          key={b.id}
                          booking={b}
                          variant="upcoming"
                          onCancel={handleCancel}
                          cancelling={cancellingId === b.id}
                        />
                      ))}
                    </div>
                  )}
                </motion.section>

                {grouped.done.length > 0 && (
                  <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 color="#4d4d4d" size={20} />
                      <h2 className="text-DarkGrey text-lg font-bold font-['Lexend'] uppercase tracking-wide">
                        Done
                      </h2>
                      <span className="text-DarkGrey/60 text-sm font-['Lexend']">({grouped.done.length})</span>
                    </div>
                    <div className="flex flex-col gap-3">
                      {grouped.done.map(b => (
                        <BookingItem key={b.id} booking={b} variant="done" onReview={handleReview} />
                      ))}
                    </div>
                  </motion.section>
                )}

                {grouped.cancelled.length > 0 && (
                  <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <Ban color="#4d4d4d" size={20} />
                      <h2 className="text-DarkGrey text-lg font-bold font-['Lexend'] uppercase tracking-wide">
                        Cancelled
                      </h2>
                      <span className="text-DarkGrey/60 text-sm font-['Lexend']">({grouped.cancelled.length})</span>
                    </div>
                    <div className="flex flex-col gap-3">
                      {grouped.cancelled.map(b => (
                        <BookingItem key={b.id} booking={b} variant="cancelled" />
                      ))}
                    </div>
                  </motion.section>
                )}
              </>
            )
          })()}
        </div>
      </div>
    </div>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="p-8 bg-white rounded-2xl border border-gray-100 text-center">
      <p className="text-DarkGrey mb-4">{message}</p>
      <Link
        href="/activities"
        className="inline-block px-6 py-2 bg-PrimaryGreen text-white rounded-xl font-bold hover:opacity-90"
      >
        Browse Activities
      </Link>
    </div>
  )
}

function relativeStart(iso: string): string {
  const start = new Date(iso).getTime()
  if (isNaN(start)) return ""
  const diffMin = Math.floor((Date.now() - start) / 60000)
  if (diffMin < 1) return "Just started"
  if (diffMin < 60) return `Started ${diffMin} min${diffMin === 1 ? "" : "s"} ago`
  const hours = Math.floor(diffMin / 60)
  return `Started ${hours} hour${hours === 1 ? "" : "s"} ago`
}

function computeProgress(startIso: string, endIso: string): number {
  const start = new Date(startIso).getTime()
  const end = new Date(endIso).getTime()
  if (isNaN(start) || isNaN(end) || end <= start) return 0
  const pct = ((Date.now() - start) / (end - start)) * 100
  return Math.max(0, Math.min(100, Math.round(pct)))
}

export default Page
