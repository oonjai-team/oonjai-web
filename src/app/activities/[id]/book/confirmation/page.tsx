'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/common/Header';
import type { ActivityBookingResponse } from '@/lib/api/activities';

interface ActivityDetail {
  id: string | number;
  title: string;
  price: number;
  images: string[];
  displayDate?: string;
  date?: string;
  location: string;
  hostAvatar: string;
  host: string;
}

function getInitialData(): { session: ActivityBookingResponse | null; activity: ActivityDetail | null } {
  if (typeof window === 'undefined') return { session: null, activity: null };
  const storedSession = sessionStorage.getItem('activitySession');
  const storedActivity = sessionStorage.getItem('activityBookingDetail');
  return {
    session: storedSession ? JSON.parse(storedSession) : null,
    activity: storedActivity ? JSON.parse(storedActivity) : null,
  };
}

export default function ActivityBookingConfirmationPage() {
  const [{ session, activity }] = useState(getInitialData);

  if (!session || !activity) {
    return (
      <div className="min-h-screen bg-[#FDF8F0]">
        <Header />
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <p className="text-[#4D4D4D] text-lg">No booking data found</p>
          <Link href="/activities" className="text-[#385C4B] font-bold hover:underline">
            Browse Activities
          </Link>
        </div>
      </div>
    );
  }

  const transportLabel =
    session.transport === 'pickup' ? 'Arranged Pick Up' :
    session.transport === 'dropoff' ? 'Arranged Drop Off' : 'Self Travel';

  // Payment method is not returned from booking response, read from sessionStorage if needed

  return (
    <div className="min-h-screen bg-[#FDF8F0] font-sans pb-16">
      <Header />

      <main className="max-w-3xl mx-auto px-4 lg:px-8 py-8">

        {/* Success Banner */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 bg-[#D4EDDA] rounded-full flex items-center justify-center mb-4">
            <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-[#385C4B]">
              <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-[#385C4B] mb-2">
            Activity Successfully Booked!
          </h1>
          <p className="text-sm text-gray-500">
            Your spot has been reserved. See you there!
          </p>
        </div>

        {/* Booking Summary Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">

          {/* Header row */}
          <div className="px-6 py-5 flex flex-col sm:flex-row sm:justify-between sm:items-start border-b border-gray-100">
            <div>
              <p className="text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-1">Confirmed Details</p>
              <h2 className="text-xl font-bold text-gray-900">Booking Summary</h2>
            </div>
            <div className="mt-2 sm:mt-0 sm:text-right">
              <p className="text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-1">Booking Ref</p>
              <p className="text-base font-medium text-gray-900">#{session.bookingId?.slice(0, 8)}</p>
            </div>
          </div>

          {/* Activity Info */}
          <div className="px-6 py-5 flex items-start gap-4 border-b border-gray-100">
            <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200 relative">
              <Image src={activity.images[0]} alt={activity.title} fill unoptimized className="object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-lg">{activity.title}</h3>
              <div className="flex items-center gap-1.5 text-xs text-gray-600 mt-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2"/><path d="M16 2v4M8 2v4M3 10h18" strokeWidth="2" strokeLinecap="round"/></svg>
                {activity.displayDate || activity.date}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-600 mt-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.69 2 6 4.69 6 8c0 5.25 6 13 6 13s6-7.75 6-13c0-3.31-2.69-6-6-6z" strokeWidth="2"/><circle cx="12" cy="8" r="2" strokeWidth="2"/></svg>
                {activity.location}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-600 mt-1">
                <div className="w-4 h-4 rounded-full overflow-hidden relative flex-shrink-0">
                  <Image src={activity.hostAvatar} alt={activity.host} fill unoptimized className="object-cover" />
                </div>
                <span className="font-semibold text-gray-800">Hosted By: {activity.host}</span>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="px-6 py-5 bg-[#F4F9F6] grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-1">Participants</p>
              <p className="text-sm font-medium text-gray-900">{session.seniorIds.length} Senior{session.seniorIds.length > 1 ? 's' : ''}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-1">Transportation</p>
              <p className="text-sm font-medium text-gray-900">{transportLabel}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-1">Status</p>
              <p className="text-sm font-medium text-green-700">Confirmed</p>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="px-6 py-5">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Activity Fee ({session.seniorIds.length} x {activity.price} Baht)</span>
                <span className="font-medium text-gray-900">{session.activityFee} Baht</span>
              </div>
              {session.transportFee > 0 && (
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Transportation Fee</span>
                  <span className="font-medium text-gray-900">{session.transportFee} Baht</span>
                </div>
              )}
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <span className="font-bold text-gray-900 text-lg">Total Amount</span>
              <span className="font-bold text-[#385C4B] text-xl">{session.totalAmount} Baht</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 mb-10">
          <Link
            href="/activities"
            className="flex items-center justify-center gap-2 px-8 h-14 bg-[#385C4B] rounded-xl text-white font-bold hover:bg-[#2A4437] transition-colors w-full sm:w-auto"
          >
            Browse More Activities
          </Link>
          <button
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 px-8 h-14 bg-white rounded-xl text-gray-900 font-bold border border-gray-300 hover:border-[#385C4B] transition-colors w-full sm:w-auto"
          >
            Print Receipt
          </button>
        </div>

        {/* Footer */}
        <hr className="border-t border-gray-200 mb-8" />
        <p className="text-center text-gray-500 text-sm">
          Need to make a change?{' '}
          <Link href="/activities" className="font-bold text-[#385C4B] hover:underline">
            View your bookings
          </Link>
          {' or '}
          <Link href="/activities" className="font-bold text-[#385C4B] hover:underline">
            Contact Support
          </Link>
        </p>
      </main>
    </div>
  );
}
