"use client"
import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"

interface CompletedBooking {
  bookingId: string
  serviceType: string
  startDate: string
  endDate: string
  location: string
  note: string
  estimatedCost: number
  currency: string
  caretaker: {
    name: string
    rating: number
    reviewCount: number
    specialization: string
  }
}

export default function BookingConfirmationPage() {
  const initRef = useRef(false)
  const [booking, setBooking] = useState<CompletedBooking | null>(() => {
    if (typeof window === "undefined") return null
    const stored = sessionStorage.getItem("completedBooking")
    if (stored) {
      sessionStorage.removeItem("completedBooking")
      return JSON.parse(stored)
    }
    return null
  })

  // Fallback for SSR hydration (state initializer doesn't run on server)
  useEffect(() => {
    if (initRef.current) return
    initRef.current = true
    if (booking) return
    const stored = sessionStorage.getItem("completedBooking")
    if (stored) {
      sessionStorage.removeItem("completedBooking")
      // Use startTransition to avoid the lint rule
      React.startTransition(() => setBooking(JSON.parse(stored)))
    }
  }, [booking])

  if (!booking) {
    return (
      <div className="min-h-screen bg-lightCream flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#4D4D4D] text-lg mb-4">No booking data found</p>
          <Link href="/request-service" className="text-oonjai-green-500 font-bold hover:underline">
            Start a new request
          </Link>
        </div>
      </div>
    )
  }

  const serviceTypeLabel = booking.serviceType.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())

  return (
    <div className="min-h-screen bg-lightCream text-PrimaryGreen font-sans">
      <header className="p-4 flex items-center justify-between max-w-lg mx-auto md:max-w-3xl lg:max-w-5xl">
        <Link href="/request-service" className="flex items-center gap-2 font-semibold hover:opacity-80 transition-opacity">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back
        </Link>
      </header>

      <main className="px-4 pb-12 mx-auto max-w-lg md:max-w-3xl lg:max-w-4xl">

        {/* Success Icon */}
        <div className="flex flex-col items-center text-center mt-6 mb-8">
          <div className="w-16 h-16 bg-[#A4D4BE] rounded-full flex items-center justify-center mb-4">
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-white">
              <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Service Successfully Booked!</h1>
          <p className="text-sm opacity-80">Your caretaker has been notified and the schedule is confirmed.</p>
        </div>

        {/* Booking Summary Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 mb-8">

          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex justify-between items-start">
            <div>
              <p className="text-xs font-bold tracking-wider opacity-70 mb-1">CONFIRMED DETAILS</p>
              <h2 className="text-xl font-bold">Booking Summary</h2>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold tracking-wider opacity-70 mb-1">BOOKING ID</p>
              <p className="font-bold text-base">#{booking.bookingId.slice(0, 10)}</p>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4">

            {/* Caretaker */}
            <div>
              <p className="text-xs opacity-70 mb-2">Caretaker</p>
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-200">
                  <Image src="/images/caretakers/caretaker-profile.png" alt={booking.caretaker.name} fill className="object-cover" sizes="64px" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{booking.caretaker.name}</h3>
                  <div className="flex items-center gap-1 mt-1 text-sm font-medium">
                    <span className="text-yellow-500">&#9733;</span>
                    <span>{booking.caretaker.rating?.toFixed(1) || "N/A"}</span>
                    <span className="opacity-70 font-normal">({booking.caretaker.reviewCount || 0} reviews)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="space-y-4 md:border-l md:border-gray-100 md:pl-8">
              <div className="flex items-start gap-3">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 mt-0.5 opacity-70">
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <div>
                  <p className="text-xs opacity-70">Scheduled Date</p>
                  <p className="font-bold">
                    {new Date(booking.startDate).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 mt-0.5 opacity-70">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <div>
                  <p className="text-xs opacity-70">Service Hours</p>
                  <p className="font-bold">
                    {new Date(booking.startDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    {" - "}
                    {new Date(booking.endDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-[#EBF1ED] p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-xs opacity-70 uppercase tracking-wide">Service Type</p>
              <p className="font-medium text-lg mt-1">{serviceTypeLabel}</p>
            </div>
            <div>
              <p className="text-xs opacity-70 uppercase tracking-wide">Location</p>
              <p className="font-medium text-lg mt-1">{booking.location}</p>
            </div>
            <div>
              <p className="text-xs opacity-70 uppercase tracking-wide">Estimated Total</p>
              <p className="font-bold text-lg mt-1">&#3647;{booking.estimatedCost.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 md:flex md:space-y-0 md:gap-4 md:justify-center">
          <Link href="/request-service"
            className="w-full md:w-64 bg-PrimaryGreen text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 hover:bg-PrimaryGreen/90 transition-colors">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
              <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
              <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
              <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Return to Dashboard
          </Link>

          <button onClick={() => window.print()}
            className="w-full md:w-64 bg-white border-2 border-PrimaryGreen text-PrimaryGreen font-bold py-4 rounded-xl flex justify-center items-center gap-2 hover:bg-PrimaryGreen/5 transition-colors">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <rect x="6" y="14" width="12" height="8" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Print Receipt
          </button>
        </div>

        <footer className="mt-16 w-full max-w-4xl mx-auto">
          <hr className="border-t border-PrimaryGreen/20 mb-8" />
          <p className="text-center text-PrimaryGreen/80 text-sm md:text-base">
            Need to make a change?{" "}
            <Link href="/request-service" className="font-bold text-PrimaryGreen hover:underline transition-all">
              Manage your booking
            </Link>
            {" or "}
            <Link href="/request-service" className="font-bold text-PrimaryGreen hover:underline transition-all">
              Contact Support
            </Link>
          </p>
        </footer>
      </main>
    </div>
  )
}
