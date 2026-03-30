'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/common/Header';
import { activitiesData } from '../../data';

// eslint-disable-next-line no-unused-vars
const StarRating = ({ rating, setRating }: { rating: number, setRating: (value: number) => void }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-2 justify-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-10 h-10 cursor-pointer transition-colors ${(hover || rating) >= star ? 'text-[#385C4B]' : 'text-gray-300'}`}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => setRating(star)}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export default function ReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const activity = activitiesData.find(a => a.id.toString() === resolvedParams.id) || activitiesData[0];
  
  const [activityRating, setActivityRating] = useState(0);
  const [hostRating, setHostRating] = useState(0);

  return (
    <div className="min-h-screen bg-[#FDF8F0] font-sans pb-16">
      <Header />

      <main className="max-w-3xl mx-auto px-4 lg:px-8 pt-8">
        
        <div className="hidden lg:block mb-6">
          <Link href={`/activities/${activity.id}`} className="flex items-center text-sm font-semibold text-[#385C4B] hover:underline">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-6 lg:p-10 shadow-sm border border-gray-100">
          
          <div className="bg-[#EEF5F3] rounded-2xl p-4 flex items-center gap-4 mb-10">
            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200 relative">
              <Image src={activity.images[0]} alt={activity.title} fill unoptimized className="object-cover" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 tracking-wider mb-1 uppercase">Recent Activity</p>
              <h2 className="text-xl font-bold text-gray-900">{activity.title}</h2>
            </div>
          </div>

          <div className="mb-10 text-center">
            <h3 className="font-bold text-gray-900 mb-4">How was the activity overall?</h3>
            <StarRating rating={activityRating} setRating={setActivityRating} />
          </div>

          <div className="mb-12">
            <h3 className="text-sm font-bold text-gray-700 mb-3">Tell us more about the activity</h3>
            <textarea 
              className="w-full bg-[#EEF5F3] rounded-2xl p-4 min-h-[120px] outline-none text-sm text-gray-700 placeholder-gray-400 resize-none border border-transparent focus:border-[#385C4B] transition-colors"
              placeholder="What did you enjoy the most? Anything we could improve?"
            ></textarea>
          </div>

          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-[#385C4B] overflow-hidden bg-gray-200 relative">
                <Image src={activity.hostAvatar} alt={activity.host} fill unoptimized className="object-cover" />
              </div>
              <div className="absolute bottom-0 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full z-10"></div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h3 className="font-bold text-xl text-gray-900">{activity.host}</h3>
            <p className="text-xs text-gray-500 mt-1">Medical Escort <span className="mx-1 text-[#D1D5DB]">•</span> 2 hours ago</p>
          </div>

          <div className="mb-10 text-center">
            <h3 className="font-bold text-gray-900 mb-4">How was your experience?</h3>
            <StarRating rating={hostRating} setRating={setHostRating} />
          </div>

          <div className="mb-10">
            <h3 className="text-sm font-bold text-gray-700 mb-3 text-center lg:text-left">Tell us more about the activity</h3>
            <textarea 
              className="w-full bg-[#FDF8F0] rounded-2xl p-4 min-h-[100px] outline-none text-sm text-gray-700 placeholder-gray-400 resize-none border border-transparent focus:border-[#385C4B] transition-colors"
              placeholder="Tell us more about your experience (optional)..."
            ></textarea>
          </div>

          <button className="w-full py-4 bg-[#385C4B] text-white font-bold rounded-xl hover:bg-[#2A4437] transition shadow-md">
            Submit Review
          </button>
          
          <button className="w-full py-4 text-gray-400 text-sm font-medium hover:text-gray-600 transition">
            Skip for now
          </button>

        </div>
      </main>
    </div>
  );
}