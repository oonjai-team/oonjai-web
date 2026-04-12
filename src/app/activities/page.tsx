// src/app/activities/page.tsx
"use client"
import React, { useEffect, useState } from 'react';
import { FilterBar, ActivityCard } from './components';
import { Header } from '@/components/common/Header';
import { fetchActivities, type ActivityData } from '@/lib/api/activities';

export default function MarketplacePage() {
  const [activities, setActivities] = useState<ActivityData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchActivities()
      .then(setActivities)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-[#FDF8F0] font-sans pb-10">
      <Header />

      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#385C4B] mb-1">Discover Activities</h1>
          <p className="text-[#385C4B] opacity-70 text-xs md:text-sm">Join Trusted Community Events and Meet Local People</p>
        </div>

        <FilterBar />

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-oonjai-green-100 border-t-oonjai-green-500 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
            {activities.map((activity) => (
              <ActivityCard key={activity.id} imageUrl={activity.images[0]} {...activity} />
            ))}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <button className="px-8 py-2 text-sm font-semibold text-[#385C4B] bg-transparent border-2 border-[#385C4B] rounded-lg hover:bg-[#385C4B] hover:text-white transition-colors">
            Load More Activities
          </button>
        </div>
      </main>
    </div>
  );
}
