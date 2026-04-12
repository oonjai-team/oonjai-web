// src/components/checkout/CheckoutPage.tsx
"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/common/Header"
import { createBooking, type CreateBookingPayload } from "@/lib/api/bookings"
import { initiatePayment } from "@/lib/api/payments"
import type { CaretakerListItem } from "@/lib/api/caretakers"

const PAYMENT_METHODS = [
  { id: "qr_promptpay", label: "QR PromptPay" },
  { id: "credit_card",  label: "Credit / Debit Card" },
]

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-oonjai-green-500">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-oonjai-green-500">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="2"/>
      <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function StarIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="#F6B838" className="w-3.5 h-3.5 flex-shrink-0">
      <path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4 4.3 12.3l.7-4.1-3-2.9 4.2-.7z"/>
    </svg>
  )
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-[#4D4D4D] flex-shrink-0 mt-0.5">
      <path d="M12 2C8.69 2 6 4.69 6 8c0 5.25 6 13 6 13s6-7.75 6-13c0-3.31-2.69-6-6-6z" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="8" r="2" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-oonjai-green-500 flex-shrink-0 mt-0.5">
      <path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6l-8-4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function BahtIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-[#4D4D4D]">
      <text x="50%" y="75%" dominantBaseline="middle" textAnchor="middle" fontSize="18" fill="currentColor" fontFamily="Lexend">&#3647;</text>
    </svg>
  )
}

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 pb-4 border-b border-[#b1b1b1] mb-5">
      {icon}
      <h2 className="text-[#365C48] text-lg font-bold font-['Lexend']">{title}</h2>
    </div>
  )
}

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-3 border-b border-[#EBF1ED] last:border-0">
      <span className="text-[#4D4D4D] text-sm font-normal font-['Lexend'] sm:w-32 flex-shrink-0">{label}</span>
      <div className="text-[#0E211A] text-sm font-normal font-['Lexend'] flex-1">{children}</div>
    </div>
  )
}

interface BookingRequestData {
  seniorId: string
  serviceType: string
  startDate: string
  endDate: string
  location: string
  note: string
}

function getCheckoutInitialData(): { caretaker: CaretakerListItem | null; request: BookingRequestData | null } {
  if (typeof window === "undefined") return { caretaker: null, request: null }
  const storedCaretaker = sessionStorage.getItem("selectedCaretaker")
  const storedRequest = sessionStorage.getItem("pendingBookingRequest")
  return {
    caretaker: storedCaretaker ? JSON.parse(storedCaretaker) : null,
    request: storedRequest ? JSON.parse(storedRequest) : null,
  }
}

export default function CheckoutPage() {
  const [payment, setPayment] = useState("qr_promptpay")
  const [loading, setLoading] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [bookingId, setBookingId] = useState("")
  const [{ caretaker, request }] = useState(getCheckoutInitialData)

  const estimatedCost = caretaker && request
    ? (() => {
        const start = new Date(request.startDate)
        const end = new Date(request.endDate)
        const hours = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60)))
        return hours * caretaker.hourlyRate
      })()
    : 0

  const handleCheckout = async () => {
    if (!caretaker || !request) return

    setLoading(true)

    const bookingPayload: CreateBookingPayload = {
      seniorId: request.seniorId,
      caretakerId: caretaker.id,
      serviceType: request.serviceType as CreateBookingPayload["serviceType"],
      startDate: request.startDate,
      endDate: request.endDate,
      location: request.location,
      note: request.note,
    }

    const booking = await createBooking(bookingPayload)

    if (booking) {
      setBookingId(booking.id)
      await initiatePayment(booking.id, {
        method: payment as "qr_promptpay" | "credit_card",
        amount: booking.estimatedCost,
        currency: booking.currency || "THB",
      })
      sessionStorage.removeItem("selectedCaretaker")
      sessionStorage.removeItem("pendingBookingRequest")
      setConfirmed(true)
    }

    setLoading(false)
  }

  if (!caretaker || !request) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#FFFAEF] flex items-center justify-center">
          <div className="text-center">
            <p className="text-[#4D4D4D] text-lg mb-4">No booking data found</p>
            <Link href="/request-service" className="text-oonjai-green-500 font-bold hover:underline">
              Start a new request
            </Link>
          </div>
        </div>
      </>
    )
  }

  const caretakerName = `${caretaker.firstname} ${caretaker.lastname}`
  const serviceTypeLabel = request.serviceType.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

  // Confirmation screen
  if (confirmed) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#FFFAEF] px-4 sm:px-8 lg:px-64 py-12">
          <div className="flex flex-col items-center gap-4 mb-10">
            <div className="w-20 h-20 bg-oonjai-sec-green-100 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-oonjai-green-500">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="text-[#0E211A] text-3xl lg:text-4xl font-bold font-['Lexend'] text-center">
              Service Successfully Booked!
            </h1>
            <p className="text-[#4D4D4D] text-base font-light font-['Lexend'] text-center">
              Your caretaker has been notified and the schedule is confirmed.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.08)] overflow-hidden mb-8">
            <div className="px-8 py-5 flex justify-between items-start border-b border-[#EBF1ED]">
              <div>
                <p className="text-[#4D4D4D] text-xs font-semibold font-['Lexend'] uppercase tracking-widest mb-1">Confirmed Details</p>
                <h2 className="text-[#0E211A] text-xl font-bold font-['Lexend']">Booking Summary</h2>
              </div>
              <div className="text-right">
                <p className="text-[#4D4D4D] text-xs font-normal font-['Lexend'] uppercase tracking-widest mb-1">Booking ID</p>
                <p className="text-[#0E211A] text-base font-normal font-['Lexend']">#{bookingId.slice(0, 8)}</p>
              </div>
            </div>

            <div className="px-8 py-6 flex flex-col sm:flex-row items-start gap-8 border-b border-[#EBF1ED]">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-[#b1b1b1] overflow-hidden flex-shrink-0">
                  <Image src="/images/caretakers/caretaker-profile.png" alt={caretakerName} width={64} height={64} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-[#4D4D4D] text-xs font-normal font-['Lexend'] mb-0.5">Caretaker</p>
                  <p className="text-[#0E211A] text-lg font-bold font-['Lexend']">{caretakerName}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <StarIcon />
                    <span className="text-[#4D4D4D] text-sm font-normal font-['Lexend']">
                      {caretaker.rating?.toFixed(1) || "N/A"} ({caretaker.reviewCount || 0} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:ml-auto">
                <div className="flex items-start gap-3">
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#4D4D4D] flex-shrink-0 mt-0.5">
                    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <div>
                    <p className="text-[#4D4D4D] text-xs font-normal font-['Lexend']">Scheduled Date</p>
                    <p className="text-[#0E211A] text-sm font-bold font-['Lexend']">
                      {new Date(request.startDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#4D4D4D] flex-shrink-0 mt-0.5">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <div>
                    <p className="text-[#4D4D4D] text-xs font-normal font-['Lexend']">Service Hours</p>
                    <p className="text-[#0E211A] text-sm font-bold font-['Lexend']">
                      {new Date(request.startDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - {new Date(request.endDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-8 py-5 bg-[#EBF1ED] grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-[#4D4D4D] text-xs font-semibold font-['Lexend'] uppercase tracking-widest mb-1">Service Type</p>
                <p className="text-[#0E211A] text-sm font-normal font-['Lexend']">{serviceTypeLabel}</p>
              </div>
              <div>
                <p className="text-[#4D4D4D] text-xs font-semibold font-['Lexend'] uppercase tracking-widest mb-1">Location</p>
                <p className="text-[#0E211A] text-sm font-normal font-['Lexend']">{request.location}</p>
              </div>
              <div>
                <p className="text-[#4D4D4D] text-xs font-semibold font-['Lexend'] uppercase tracking-widest mb-1">Estimated Total</p>
                <p className="text-[#0E211A] text-sm font-normal font-['Lexend']">&#3647;{estimatedCost}.00</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 mb-10">
            <Link href="/activities"
              className="flex items-center justify-center gap-2 px-8 h-14 bg-oonjai-green-500 rounded-xl text-white text-base font-normal font-['Lexend'] hover:bg-oonjai-green-600 transition-colors cursor-pointer w-full sm:w-auto">
              Return to Dashboard
            </Link>
            <button onClick={() => window.print()}
              className="flex items-center justify-center gap-2 px-8 h-14 bg-white rounded-xl text-[#0E211A] text-base font-normal font-['Lexend'] outline outline-1 outline-[#b1b1b1] hover:outline-oonjai-green-300 transition-colors cursor-pointer w-full sm:w-auto">
              Print Receipt
            </button>
          </div>
        </div>
      </>
    )
  }

  // Main checkout layout
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#FFFAEF] px-4 sm:px-8 lg:px-64 py-8 lg:py-10">

        <Link href="/booking"
          className="inline-flex items-center gap-1 text-[#0E211A] text-sm font-normal font-['Lexend'] mb-6 hover:opacity-70 transition-opacity cursor-pointer">
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Back
        </Link>

        <h1 className="text-[#365C48] text-3xl lg:text-4xl font-bold font-['Lexend'] text-left lg:text-center mb-8">
          Job Request Review &amp; Check Out
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          {/* Selected Caretaker */}
          <div className="bg-white rounded-2xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.08)] p-6">
            <SectionHeader icon={<PersonIcon />} title="Selected Caretaker" />

            <div className="flex items-start gap-4 mb-5">
              <div className="w-20 h-20 rounded-lg bg-[#b1b1b1] overflow-hidden flex-shrink-0 outline outline-1 outline-[#b1b1b1]">
                <Image src="/images/caretakers/caretaker-profile.png" alt={caretakerName} width={80} height={80} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-[#0E211A] text-base font-bold font-['Lexend']">{caretakerName}</p>
                <p className="text-[#4D4D4D] text-sm font-light font-['Lexend'] mt-0.5">{caretaker.bio || "Professional Caretaker"}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <StarIcon />
                  <span className="text-[#0E211A] text-sm font-bold font-['Lexend']">{caretaker.rating?.toFixed(1) || "N/A"}</span>
                  <span className="text-[#4D4D4D] text-sm font-light font-['Lexend']">({caretaker.reviewCount || 0} reviews)</span>
                </div>
              </div>
            </div>

            <div className="border-t border-[#EBF1ED]">
              {[
                ["Experience", `${caretaker.experience} years`],
                ["Specialties", caretaker.specialization || "General Care"],
                ["Hourly Rate", `${caretaker.hourlyRate} ${caretaker.currency || "thb"}/hr`],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between items-center py-3 border-b border-[#EBF1ED] last:border-0">
                  <span className="text-[#4D4D4D] text-sm font-normal font-['Lexend']">{label}</span>
                  <span className="text-[#0E211A] text-sm font-semibold font-['Lexend']">{value}</span>
                </div>
              ))}
            </div>

            {caretaker.isVerified && (
              <div className="mt-4 p-3 bg-[#EBF1ED] rounded-lg flex items-start gap-2 outline outline-1 outline-oonjai-green-300">
                <ShieldIcon />
                <p className="text-[#365C48] text-xs font-light font-['Lexend']">
                  Identity verified &amp; Background check cleared. This caretaker is fully insured.
                </p>
              </div>
            )}
          </div>

          {/* Request Details */}
          <div className="bg-white rounded-2xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.08)] p-6">
            <SectionHeader icon={<DocIcon />} title="Request Details" />

            <DetailRow label="Service Type">
              <span className="px-3 py-1 bg-[#EBF1ED] rounded-full text-oonjai-green-500 text-sm font-normal font-['Lexend']">
                {serviceTypeLabel}
              </span>
            </DetailRow>

            <DetailRow label="Date & Time">
              <div>
                <p className="text-[#0E211A] text-sm font-normal font-['Lexend']">
                  {new Date(request.startDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                </p>
                <p className="text-[#4D4D4D] text-sm font-light font-['Lexend'] mt-0.5">
                  {new Date(request.startDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - {new Date(request.endDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </DetailRow>

            <DetailRow label="Location">
              <div className="flex items-start gap-1">
                <PinIcon />
                <span className="text-[#0E211A] text-sm font-normal font-['Lexend']">{request.location}</span>
              </div>
            </DetailRow>

            {request.note && (
              <DetailRow label="Special Notes">
                <span className="text-[#4D4D4D] text-sm font-light font-['Lexend'] italic">{request.note}</span>
              </DetailRow>
            )}
          </div>

          {/* Total Cost */}
          <div className="flex flex-col">
            <h2 className="text-[#0E211A] text-lg font-bold font-['Lexend'] mb-4">Total Estimated Cost</h2>
            <div className="bg-white rounded-2xl flex-1 shadow-[0px_4px_16px_0px_rgba(0,0,0,0.08)] px-8 py-8 flex flex-col justify-center gap-2">
              <div className="flex items-center">
                <BahtIcon />
                <span className="flex-1 text-[#0E211A] text-5xl font-semi-bold font-['Lexend'] text-center">
                  {estimatedCost}
                </span>
              </div>
              <div className="flex justify-center">
                <div className="h-px bg-slate-100 w-80" />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h2 className="text-[#0E211A] text-lg font-bold font-['Lexend'] mb-4">Select Payment Method</h2>
            <div className="flex flex-col gap-3">
              {PAYMENT_METHODS.map(method => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPayment(method.id)}
                  className={`w-full px-5 py-4 rounded-xl bg-white flex items-center justify-between transition-all cursor-pointer outline outline-1 outline-offset-[-1px] ${payment === method.id ? "outline-oonjai-green-300" : "outline-[#b1b1b1] hover:outline-oonjai-green-300"}`}
                >
                  <span className="text-[#0E211A] text-base font-normal font-['Lexend']">{method.label}</span>
                  {payment === method.id ? (
                    <div className="w-6 h-6 rounded-full bg-oonjai-sec-green-100 flex items-center justify-center flex-shrink-0">
                      <svg viewBox="0 0 12 12" fill="none" className="w-3.5 h-3.5">
                        <path d="M2 6l3 3 5-5" stroke="#365C48" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-[#b1b1b1] flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Checkout button */}
        <div className="sticky bottom-4 lg:static mt-4 lg:mt-0">
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full h-14 bg-oonjai-green-500 rounded-xl flex items-center justify-center gap-3 text-white text-xl font-normal font-['Lexend'] hover:bg-oonjai-green-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex gap-1">
                <span className="animate-bounce [animation-delay:0ms]">.</span>
                <span className="animate-bounce [animation-delay:150ms]">.</span>
                <span className="animate-bounce [animation-delay:300ms]">.</span>
              </span>
            ) : (
              <>
                Check Out
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </>
            )}
          </button>
        </div>
      </main>
    </>
  )
}
