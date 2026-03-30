import React from 'react';
import { FilterBar, ActivityCard } from './components';
import { Header } from '@/components/common/Header';
import { activitiesData } from './data';

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-[#FDF8F0] font-sans pb-10">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#385C4B] mb-1">Discover Activities</h1>
          <p className="text-[#385C4B] opacity-70 text-xs md:text-sm">Join Trusted Community Events and Meet Local People</p>
        </div>

        <FilterBar />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activitiesData.map((activity) => (
            <ActivityCard key={activity.id} imageUrl={activity.images[0]} {...activity} />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button className="px-8 py-2 text-sm font-semibold text-[#385C4B] bg-transparent border-2 border-[#385C4B] rounded-lg hover:bg-[#385C4B] hover:text-white transition-colors">
            Load More Activities
          </button>
        </div>
      </main>
    </div>
  );
}