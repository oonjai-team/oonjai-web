// src/app/activities/page.tsx
"use client"
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { FilterBar, ActivityCard, type FilterState } from './components';
import { Header } from '@/components/common/Header';
import { fetchActivities, type ActivityData } from '@/lib/api/activities';

export default function MarketplacePage() {
  const [activities, setActivities] = useState<ActivityData[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: null,
    location: null,
    priceMin: 0,
    priceMax: 2000,
  })

  useEffect(() => {
    fetchActivities()
      .then(setActivities)
      .finally(() => setLoading(false))
  }, [])

  const handleFilterChange = useCallback((next: FilterState) => {
    setFilters(next)
  }, [])

  const filtered = useMemo(() => {
    return activities.filter(a => {
      // Search — match against title, category, tags, host, location
      if (filters.search) {
        const q = filters.search.toLowerCase()
        const haystack = [a.title, a.category, a.host, a.location, ...a.tags].join(' ').toLowerCase()
        if (!haystack.includes(q)) return false
      }
      // Category
      if (filters.category && a.category.toLowerCase() !== filters.category.toLowerCase()) return false
      // Location — skip activities only if they have a location AND it doesn't match
      if (filters.location && a.location && !a.location.toLowerCase().includes(filters.location.toLowerCase())) return false
      // Price range
      if (a.price < filters.priceMin || a.price > filters.priceMax) return false
      return true
    })
  }, [activities, filters])

  return (
    <div className="min-h-screen bg-[#FDF8F0] font-sans pb-10">
      <Header />

      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#385C4B] mb-1">Discover Activities</h1>
          <p className="text-[#385C4B] opacity-70 text-xs md:text-sm">Join Trusted Community Events and Meet Local People</p>
        </div>

        <FilterBar onChange={handleFilterChange} />

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-oonjai-green-100 border-t-oonjai-green-500 rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <p className="text-gray-500 text-sm font-medium">No activities match your filters</p>
            <p className="text-gray-400 text-xs">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
            {filtered.map((activity) => (
              <ActivityCard key={activity.id} imageUrl={activity.images[0]} {...activity} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
