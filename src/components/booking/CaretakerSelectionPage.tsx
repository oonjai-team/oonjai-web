"use client"
import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { fetchCaretakers, type CaretakerListItem } from "@/lib/api/caretakers"

const FILTERS = [
  { id: "skills", label: "Specialized Skills" },
  { id: "exp",    label: "Experience" },
  { id: "rating", label: "Rating" },
  { id: "price",  label: "Price Range" },
]

const FILTER_OPTIONS: Record<string, string[]> = {
  skills: ["Dementia Care", "Mobility", "Post-Surgery", "Meal Prep", "Physical Therapy"],
  exp:    ["1-3 years", "3-5 years", "5-8 years", "8+ years"],
  rating: ["4.0+", "4.5+", "4.8+", "5.0"],
  price:  ["Under 80 THB", "80-100 THB", "100-150 THB", "150+ THB"],
}

const SORT_OPTIONS = [
  "Recommended",
  "Rating",
  "Price: Low to High",
  "Price: High to Low",
]

function StarIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="#F6B838" className="w-3 h-3 flex-shrink-0">
      <path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4 4.3 12.3l.7-4.1-3-2.9 4.2-.7z"/>
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none"
    className="w-3.5 h-3.5 text-[#4D4D4D] flex-shrink-0">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 7v5l3 3" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function ChevronDown() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 flex-shrink-0">
      <path d="M6 9l6 6 6-6" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function CaretakerCard({ caretaker }: { caretaker: CaretakerListItem }) {
  const router = useRouter()

  const handleSelect = () => {
    sessionStorage.setItem("selectedCaretaker", JSON.stringify(caretaker))
    router.push("/checkout")
  }

  return (
    <div className="bg-white rounded-2xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden">
      <div className="relative bg-[#b1b1b1] h-48 overflow-hidden">
        <Image
          src="/images/caretakers/caretaker-profile.png"
          alt={`${caretaker.firstname} ${caretaker.lastname}`}
          fill
          className="object-cover object-top"
        />
        <div className="absolute top-3 right-3 px-2 py-1 bg-white rounded-lg shadow-sm flex items-center gap-1">
          <StarIcon />
          <span className="text-[#0E211A] text-sm font-bold font-['Lexend']">
            {caretaker.rating?.toFixed(1) || "N/A"}
          </span>
        </div>
      </div>

      <div className="px-4 py-4 flex flex-col gap-2 flex-1">
        <div className="flex justify-between items-start">
          <h3 className="text-[#0E211A] text-base font-bold font-['Lexend']">
            {caretaker.firstname} {caretaker.lastname}
          </h3>
          <div className="flex items-baseline gap-0.5 flex-shrink-0">
            <span className="text-oonjai-green-500 text-base font-bold font-['Lexend']">
              {caretaker.hourlyRate} {caretaker.currency || "thb"}
            </span>
            <span className="text-[#4D4D4D] text-xs font-['Lexend']">/hr</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <ClockIcon />
          <span className="text-[#4D4D4D] text-sm font-normal font-['Lexend']">
            {caretaker.experience} years experience
          </span>
        </div>

        {caretaker.specialization && (
          <div className="flex flex-wrap gap-1.5 py-1">
            {caretaker.specialization.split(",").map(skill => (
              <span key={skill.trim()}
                className="px-2 py-1 bg-oonjai-green-50 rounded text-[#20372B] text-[10px] font-['Lexend'] uppercase tracking-wide">
                {skill.trim()}
              </span>
            ))}
          </div>
        )}

        <button
          onClick={handleSelect}
          className="mt-auto w-full h-10 bg-oonjai-green-500 rounded-lg flex items-center justify-center text-white text-sm font-normal font-['Lexend'] hover:bg-oonjai-green-600 transition-colors cursor-pointer"
        >
          Select Professional
        </button>
      </div>
    </div>
  )
}

interface PendingBookingRequest {
  seniorId: string
  serviceType: string
  startDate: string
  endDate: string
  location: string
  note: string
}

export default function CaretakerSelectionPage() {
  const router = useRouter()
  const [caretakers, setCaretakers] = useState<CaretakerListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState("Recommended")
  const [sortOpen, setSortOpen] = useState(false)
  const [visible, setVisible] = useState(8)
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [bookingRequest, setBookingRequest] = useState<PendingBookingRequest | null>(null)

  // Read pending booking request from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem("pendingBookingRequest")
    if (!stored) {
      router.push("/request-service")
      return
    }
    React.startTransition(() => setBookingRequest(JSON.parse(stored)))
  }, [router])

  const loadCaretakers = async () => {
    if (!bookingRequest) return
    setLoading(true)

    // Required params for backend GET /caretakers
    const filters: Record<string, string> = {
      serviceType: bookingRequest.serviceType,
      startDate: bookingRequest.startDate,
      endDate: bookingRequest.endDate,
    }

    const skills = selectedFilters.skills || []
    if (skills.length > 0) filters.specialization = skills.join(",")

    const ratings = selectedFilters.rating || []
    if (ratings.length > 0) {
      const minRating = ratings[0].replace("+", "")
      filters.minRating = minRating
    }

    const exp = selectedFilters.exp || []
    if (exp.length > 0) {
      const match = exp[0].match(/(\d+)/)
      if (match) filters.minExperience = match[1]
    }

    const price = selectedFilters.price || []
    if (price.length > 0) {
      const match = price[0].match(/(\d+)/)
      if (match) filters.maxHourlyRate = match[1]
    }

    const data = await fetchCaretakers(filters)
    setCaretakers(data)
    setLoading(false)
  }

  useEffect(() => {
    if (bookingRequest) {
      loadCaretakers() // eslint-disable-line react-hooks/set-state-in-effect
    }
  }, [selectedFilters, bookingRequest]) // eslint-disable-line react-hooks/exhaustive-deps

  const toggleFilterOption = (filterId: string, option: string) => {
    setSelectedFilters(prev => {
      const current = prev[filterId] || []
      return {
        ...prev,
        [filterId]: current.includes(option)
          ? current.filter(o => o !== option)
          : [...current, option],
      }
    })
  }

  const sortedCaretakers = [...caretakers].sort((a, b) => {
    switch (sort) {
      case "Rating": return (b.rating || 0) - (a.rating || 0)
      case "Price: Low to High": return a.hourlyRate - b.hourlyRate
      case "Price: High to Low": return b.hourlyRate - a.hourlyRate
      default: return 0
    }
  })

  const totalSelected = Object.values(selectedFilters).flat().length
  const shown = sortedCaretakers.slice(0, visible)

  return (
    <>
      <main className="min-h-screen bg-[#FFFAEF] px-4 sm:px-8 lg:px-16 py-8 lg:py-12">

        <Link href="/request-service"
          className="inline-flex items-center gap-1 text-[#0E211A] text-sm font-normal font-['Lexend'] mb-6 hover:opacity-70 transition-opacity cursor-pointer">
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Back
        </Link>

        <div className="flex flex-col items-center gap-2 mb-8">
          <h1 className="text-[#365C48] text-2xl lg:text-4xl font-bold font-['Lexend'] text-center">
            Select Your Preferred Caretaker
          </h1>
          <p className="text-[#4D4D4D] text-sm lg:text-base font-light font-['Lexend'] text-center">
            {loading ? "Loading caretakers..." : `We've found ${caretakers.length} caretakers matching your requirements.`}
          </p>
          {bookingRequest && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
              <span className="px-3 py-1 bg-oonjai-green-50 text-oonjai-green-500 rounded-full text-xs font-medium font-['Lexend']">
                {bookingRequest.serviceType.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-[#4D4D4D] rounded-full text-xs font-normal font-['Lexend']">
                {new Date(bookingRequest.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                {" • "}
                {new Date(bookingRequest.startDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                {" - "}
                {new Date(bookingRequest.endDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
              {bookingRequest.location && (
                <span className="px-3 py-1 bg-gray-100 text-[#4D4D4D] rounded-full text-xs font-normal font-['Lexend']">
                  📍 {bookingRequest.location}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Filters + Sort */}
        <div className="flex flex-row items-center gap-3 mb-8">
          <div className="flex gap-2 overflow-x-auto flex-nowrap pb-1 flex-1">
            <button
              type="button"
              onClick={() => setFilterOpen(true)}
              className="px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-normal font-['Lexend'] transition-all cursor-pointer outline outline-1 outline-offset-[-1px] whitespace-nowrap flex-shrink-0 bg-white outline-oonjai-green-700 text-[#0E211A] hover:bg-oonjai-green-50">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M3 6h18M7 12h10M11 18h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Filters
              {totalSelected > 0 && (
                <span className="bg-oonjai-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {totalSelected}
                </span>
              )}
            </button>

            {FILTERS.map(f =>
              (selectedFilters[f.id] || []).map(opt => (
                <span key={`${f.id}-${opt}`}
                  className="px-3 py-2 rounded-lg flex items-center gap-1.5 text-sm font-normal font-['Lexend'] whitespace-nowrap flex-shrink-0 bg-oonjai-green-50 outline outline-1 outline-oonjai-green-500 text-oonjai-green-500">
                  {opt}
                  <button type="button" onClick={() => toggleFilterOption(f.id, opt)} className="cursor-pointer hover:opacity-70 ml-0.5">
                    <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                      <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </span>
              ))
            )}
          </div>

          <div className="relative flex items-center gap-2 flex-shrink-0">
            <span className="text-[#4D4D4D] text-sm font-normal font-['Lexend'] whitespace-nowrap">Sort by:</span>
            <button type="button" onClick={() => setSortOpen(o => !o)}
              className="flex items-center gap-1 text-[#0E211A] text-sm font-medium font-['Lexend'] cursor-pointer hover:opacity-70">
              {sort}
              <ChevronDown />
            </button>
            {sortOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />
                <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.1)] overflow-hidden z-20">
                  {SORT_OPTIONS.map(opt => (
                    <button key={opt} type="button"
                      onClick={() => { setSort(opt); setSortOpen(false) }}
                      className={`w-full px-4 py-3 text-left text-sm font-['Lexend'] transition-colors cursor-pointer ${sort === opt ? "bg-oonjai-green-50 text-oonjai-green-500 font-medium" : "text-[#0E211A] font-normal hover:bg-oonjai-green-50"}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-oonjai-green-500 border-t-transparent" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {shown.map(c => (
              <CaretakerCard key={c.id} caretaker={c} />
            ))}
          </div>
        )}

        {!loading && visible < caretakers.length && (
          <div className="flex justify-center">
            <button type="button" onClick={() => setVisible(v => v + 4)}
              className="px-8 py-3 bg-white rounded-xl border border-dashed border-oonjai-green-300 text-oonjai-green-500 text-sm font-normal font-['Lexend'] flex items-center gap-2 hover:bg-oonjai-green-50 transition-colors cursor-pointer">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Load more caretakers
            </button>
          </div>
        )}

        {!loading && caretakers.length === 0 && (
          <div className="text-center py-20 text-[#4D4D4D]">
            <p className="text-lg font-medium">No caretakers found</p>
            <p className="text-sm mt-2">Try adjusting your filters</p>
          </div>
        )}
      </main>

      {/* Filter Modal */}
      {filterOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-30" onClick={() => setFilterOpen(false)} />
          <div className="fixed inset-x-0 bottom-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[520px] bg-white rounded-t-2xl sm:rounded-2xl z-40 max-h-[85vh] flex flex-col shadow-[0px_8px_32px_0px_rgba(0,0,0,0.2)]">
            <div className="flex justify-between items-center px-6 py-4 border-b border-[#EBF1ED] flex-shrink-0">
              <h3 className="text-[#0E211A] text-lg font-bold font-['Lexend']">Filters</h3>
              <div className="flex items-center gap-4">
                {totalSelected > 0 && (
                  <button type="button" onClick={() => setSelectedFilters({})}
                    className="text-[#CF4538] text-sm font-normal font-['Lexend'] cursor-pointer hover:opacity-70">
                    Clear all
                  </button>
                )}
                <button type="button" onClick={() => setFilterOpen(false)} className="text-[#4D4D4D] cursor-pointer hover:opacity-70">
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="overflow-y-auto flex-1 px-6 py-4 flex flex-col gap-6">
              {FILTERS.map(f => {
                const selected = selectedFilters[f.id] || []
                return (
                  <div key={f.id}>
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-[#0E211A] text-base font-bold font-['Lexend']">{f.label}</h4>
                      {selected.length > 0 && (
                        <button type="button" onClick={() => setSelectedFilters(p => ({ ...p, [f.id]: [] }))}
                          className="text-[#CF4538] text-xs font-normal font-['Lexend'] cursor-pointer hover:opacity-70">
                          Clear
                        </button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {FILTER_OPTIONS[f.id].map(opt => {
                        const checked = selected.includes(opt)
                        return (
                          <button key={opt} type="button" onClick={() => toggleFilterOption(f.id, opt)}
                            className={`px-4 py-2 rounded-lg text-sm font-['Lexend'] transition-all cursor-pointer outline outline-1 outline-offset-[-1px] ${checked ? "bg-oonjai-green-50 outline-oonjai-green-500 text-oonjai-green-500 font-medium" : "bg-white outline-[#b1b1b1] text-[#0E211A] font-normal hover:bg-oonjai-green-50"}`}>
                            {opt}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="px-6 py-4 border-t border-[#EBF1ED] flex-shrink-0">
              <button type="button" onClick={() => setFilterOpen(false)}
                className="w-full h-12 bg-oonjai-green-500 rounded-xl text-white text-base font-normal font-['Lexend'] hover:bg-oonjai-green-600 transition-colors cursor-pointer">
                Apply Filters
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}
