// src/app/activities/page.tsx
"use client"
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FilterBar, ActivityCard, type FilterState } from './components';
import { Header } from '@/components/common/Header';
import { ActivityCardSkeleton } from '@/components/common/Skeleton';
import { fetchActivities, type ActivityData, type ActivityFilterParams } from '@/lib/api/activities';

const DEFAULT_PRICE_MIN = 0
const DEFAULT_PRICE_MAX = 2000
const PAGE_SIZE = 20

function buildParams(filters: FilterState): ActivityFilterParams {
  const params: ActivityFilterParams = {}
  if (filters.search.trim()) params.search = filters.search.trim()
  if (filters.category) params.category = filters.category
  if (filters.location) params.location = filters.location
  if (filters.priceMin > DEFAULT_PRICE_MIN) params.priceMin = filters.priceMin
  if (filters.priceMax < DEFAULT_PRICE_MAX) params.priceMax = filters.priceMax
  return params
}

export default function MarketplacePage() {
  const [activities, setActivities] = useState<ActivityData[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: null,
    location: null,
    priceMin: DEFAULT_PRICE_MIN,
    priceMax: DEFAULT_PRICE_MAX,
  })

  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const requestIdRef = useRef(0)

  // Fetch first page whenever filters change (debounced to swallow typing).
  // `loading` / `hasMore` are reset in handleFilterChange, not here, to avoid
  // synchronous setState inside an effect body.
  useEffect(() => {
    const reqId = ++requestIdRef.current
    const t = setTimeout(() => {
      const base = buildParams(filters)
      fetchActivities({ ...base, limit: PAGE_SIZE, offset: 0 })
        .then(({ activities: list, total: t }) => {
          if (reqId !== requestIdRef.current) return // superseded by a newer request
          setActivities(list)
          setTotal(t)
          setHasMore(list.length < t)
        })
        .finally(() => {
          if (reqId === requestIdRef.current) setLoading(false)
        })
    }, 250)
    return () => clearTimeout(t)
  }, [filters])

  const loadMore = useCallback(async () => {
    if (loading || loadingMore || !hasMore) return
    const reqId = requestIdRef.current
    setLoadingMore(true)
    const base = buildParams(filters)
    const { activities: next, total: t } = await fetchActivities({
      ...base,
      limit: PAGE_SIZE,
      offset: activities.length,
    })
    // Drop the response if the user has since changed filters.
    if (reqId !== requestIdRef.current) return
    setActivities(prev => {
      const merged = [...prev, ...next]
      setHasMore(merged.length < t)
      return merged
    })
    setTotal(t)
    setLoadingMore(false)
  }, [filters, activities.length, hasMore, loading, loadingMore])

  // Infinite scroll: observe a sentinel near the bottom of the grid.
  useEffect(() => {
    const node = sentinelRef.current
    if (!node) return
    const io = new IntersectionObserver(entries => {
      if (entries[0]?.isIntersecting) loadMore()
    }, { rootMargin: '400px 0px' })
    io.observe(node)
    return () => io.disconnect()
  }, [loadMore])

  const handleFilterChange = useCallback((next: FilterState) => {
    setFilters(next)
    setLoading(true)
    setHasMore(true)
  }, [])

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
          <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <ActivityCardSkeleton key={i} />
            ))}
          </div>
        ) : activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <p className="text-gray-500 text-sm font-medium">No activities match your filters</p>
            <p className="text-gray-400 text-xs">Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            <p className="text-xs md:text-sm text-[#385C4B] opacity-70 mb-4">
              Showing <span className="font-semibold">{activities.length}</span> of{' '}
              <span className="font-semibold">{total}</span>{' '}
              {total === 1 ? 'activity' : 'activities'}
            </p>
            <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
              {activities.map((activity) => (
                <ActivityCard key={activity.id} imageUrl={activity.images[0]} {...activity} />
              ))}
              {loadingMore && [1, 2, 3].map(i => (
                <ActivityCardSkeleton key={`more-${i}`} />
              ))}
            </div>

            <div ref={sentinelRef} className="h-10" />

            {!hasMore && (
              <p className="text-center text-xs text-gray-400 mt-6">You&apos;ve reached the end.</p>
            )}
          </>
        )}
      </main>
    </div>
  );
}
