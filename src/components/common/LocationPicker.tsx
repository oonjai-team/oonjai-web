"use client"
import React, { useState, useEffect, useRef, useCallback } from "react"
import { MapPin, Search, X, Loader2, Maximize2 } from "lucide-react"
import dynamic from "next/dynamic"

const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false })

interface NominatimResult {
  place_id: number
  display_name: string
  lat: string
  lon: string
}

interface LocationPickerProps {
  value: string
  onChange: (_location: string, _lat?: number, _lon?: number) => void
}

export default function LocationPicker({ value, onChange }: LocationPickerProps) {
  const [query, setQuery] = useState(value)
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([])
  const [searching, setSearching] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lon: number } | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Close suggestions on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [modalOpen])

  const searchNominatim = useCallback(async (q: string) => {
    if (q.length < 3) {
      setSuggestions([])
      return
    }
    setSearching(true)
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=5&addressdetails=1`,
        { headers: { "Accept-Language": "en" } }
      )
      const data: NominatimResult[] = await res.json()
      setSuggestions(data)
      setShowSuggestions(true)
    } catch {
      setSuggestions([])
    }
    setSearching(false)
  }, [])

  const reverseGeocode = useCallback(async (lat: number, lon: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18`,
        { headers: { "Accept-Language": "en" } }
      )
      const data = await res.json()
      return data.display_name || `${lat.toFixed(5)}, ${lon.toFixed(5)}`
    } catch {
      return `${lat.toFixed(5)}, ${lon.toFixed(5)}`
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setQuery(val)
    setSelectedCoords(null)

    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      searchNominatim(val)
    }, 400)
  }

  const handleSelect = (result: NominatimResult) => {
    const lat = parseFloat(result.lat)
    const lon = parseFloat(result.lon)
    setQuery(result.display_name)
    setSelectedCoords({ lat, lon })
    setShowSuggestions(false)
    setSuggestions([])
    onChange(result.display_name, lat, lon)
  }

  const handleMapClick = useCallback(async (lat: number, lon: number) => {
    setSelectedCoords({ lat, lon })
    const name = await reverseGeocode(lat, lon)
    setQuery(name)
    onChange(name, lat, lon)
  }, [onChange, reverseGeocode])

  const handleClear = () => {
    setQuery("")
    setSelectedCoords(null)
    setSuggestions([])
    onChange("")
  }

  return (
    <div ref={containerRef}>
      <label className="block text-xs font-bold text-gray-800 mb-2">Location</label>

      {/* Search input — z-index above Leaflet's stacking context */}
      <div className="relative mb-3 z-10">
        <input
          type="text"
          placeholder="Search address, place, or city..."
          value={query}
          onChange={handleInputChange}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          className="w-full border border-gray-300 rounded-xl py-3 pl-4 pr-16 text-sm font-medium focus:outline-none focus:border-[#3A5A40] focus:ring-1 focus:ring-[#3A5A40]"
        />
        <div className="absolute right-3 top-2.5 flex items-center gap-1">
          {searching && <Loader2 size={16} className="text-gray-400 animate-spin" />}
          {query && !searching && (
            <button type="button" onClick={handleClear} className="p-0.5 hover:bg-gray-100 rounded transition-colors">
              <X size={14} className="text-gray-400" />
            </button>
          )}
          <Search size={16} className="text-gray-400" />
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-[1100] top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden max-h-60 overflow-y-auto">
            {suggestions.map((result) => (
              <button
                key={result.place_id}
                type="button"
                onClick={() => handleSelect(result)}
                className="w-full px-4 py-3 text-left flex items-start gap-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 cursor-pointer"
              >
                <MapPin size={14} className="text-[#3A5A40] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700 leading-snug line-clamp-2">{result.display_name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Inline map preview */}
      <div className="h-44 bg-gray-100 rounded-xl border border-gray-200 relative overflow-hidden shadow-inner isolate">
        {!modalOpen && (
          <LeafletMap
            center={selectedCoords ?? { lat: 13.7563, lon: 100.5018 }}
            zoom={selectedCoords ? 16 : 5}
            marker={selectedCoords}
            onMapClick={handleMapClick}
            className="h-full w-full"
          />
        )}
        {/* Expand to modal */}
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="absolute bottom-2 right-2 z-10 bg-white/90 hover:bg-white border border-gray-200 rounded-lg p-1.5 shadow-md transition-colors cursor-pointer"
          title="Expand map"
        >
          <Maximize2 size={14} className="text-gray-600" />
        </button>

        {/* Empty state overlay */}
        {!selectedCoords && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#f8f8f8]/60 pointer-events-none z-10">
            <MapPin size={28} className="text-[#3A5A40] opacity-20 mb-1" />
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center px-4">
              Search or click to pin a location
            </span>
          </div>
        )}
      </div>

      {/* Selected location label */}
      {selectedCoords && (
        <div className="mt-2 flex items-center gap-1.5 text-xs text-[#3A5A40] font-medium">
          <MapPin size={12} />
          <span className="truncate">{query}</span>
        </div>
      )}

      {/* ── Expanded Map Modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 md:p-8">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col overflow-hidden max-h-[90vh]">
            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#3A5A40]" />
                <span className="text-sm font-bold text-gray-800">Pick Location</span>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                <X size={18} className="text-gray-500" />
              </button>
            </div>

            {/* Modal search — relative + high z so dropdown floats above the map */}
            <div className="px-5 pt-4 pb-2 relative z-[1100] flex-shrink-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search address, place, or city..."
                  value={query}
                  onChange={handleInputChange}
                  onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                  className="w-full border border-gray-300 rounded-xl py-3 pl-4 pr-16 text-sm font-medium focus:outline-none focus:border-[#3A5A40] focus:ring-1 focus:ring-[#3A5A40]"
                />
                <div className="absolute right-3 top-2.5 flex items-center gap-1">
                  {searching && <Loader2 size={16} className="text-gray-400 animate-spin" />}
                  {query && !searching && (
                    <button type="button" onClick={handleClear} className="p-0.5 hover:bg-gray-100 rounded transition-colors">
                      <X size={14} className="text-gray-400" />
                    </button>
                  )}
                  <Search size={16} className="text-gray-400" />
                </div>

                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute z-[1200] top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden max-h-48 overflow-y-auto">
                    {suggestions.map((result) => (
                      <button
                        key={result.place_id}
                        type="button"
                        onClick={() => handleSelect(result)}
                        className="w-full px-4 py-3 text-left flex items-start gap-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 cursor-pointer"
                      >
                        <MapPin size={14} className="text-[#3A5A40] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 leading-snug line-clamp-2">{result.display_name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Modal map — isolate creates a new stacking context so Leaflet z-indices stay contained */}
            <div className="h-[50vh] relative isolate flex-shrink-0">
              <LeafletMap
                key="modal-map"
                center={selectedCoords ?? { lat: 13.7563, lon: 100.5018 }}
                zoom={selectedCoords ? 16 : 5}
                marker={selectedCoords}
                onMapClick={handleMapClick}
                className="h-full w-full"
              />
              <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 bg-white/90 px-3 py-1.5 rounded-full shadow text-[10px] font-bold text-gray-500 uppercase tracking-wider pointer-events-none">
                Click on the map to place a pin
              </div>
            </div>

            {/* Modal footer */}
            <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between gap-4 flex-shrink-0">
              <div className="flex items-center gap-1.5 text-xs text-gray-500 truncate min-w-0">
                {selectedCoords ? (
                  <>
                    <MapPin size={12} className="text-[#3A5A40] flex-shrink-0" />
                    <span className="truncate text-[#3A5A40] font-medium">{query}</span>
                  </>
                ) : (
                  <span>No location selected</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-5 py-2.5 bg-[#3A5A40] text-white text-sm font-bold rounded-xl hover:bg-[#2c4430] transition-colors cursor-pointer flex-shrink-0"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
