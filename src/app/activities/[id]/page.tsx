// src/app/activities/[id]/page.tsx
"use client"
import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ActivityCard, Accordion, PhotoGallery } from '../components';
import { Header } from '@/components/common/Header';
import { fetchActivityById, fetchActivities, type ActivityData } from '@/lib/api/activities';
import { useAuth } from '@/lib/auth/AuthContext';

export default function ActivityDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { isAuthenticated } = useAuth()
  const [activity, setActivity] = useState<ActivityData | null>(null)
  const [related, setRelated] = useState<ActivityData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetchActivityById(resolvedParams.id),
      fetchActivities(),
    ]).then(([act, all]) => {
      setActivity(act)
      setRelated(all.filter(a => a.id !== resolvedParams.id).slice(0, 4))
    }).finally(() => setLoading(false))
  }, [resolvedParams.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDF8F0]">
        <Header />
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-oonjai-green-100 border-t-oonjai-green-500 rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  if (!activity) {
    return (
      <div className="min-h-screen bg-[#FDF8F0]">
        <Header />
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <p className="text-[#4D4D4D] text-lg">Activity not found</p>
          <Link href="/activities" className="text-oonjai-green-500 font-bold hover:underline">
            Back to Activities
          </Link>
        </div>
      </div>
    )
  }

  const spotsLeft = Math.max(0, activity.maxPeople - activity.participantCount);

  return (
    <div className="min-h-screen bg-[#FDF8F0] font-sans pb-16">
      <Header />
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-6 pb-4 hidden lg:block">
        <Link href="/activities" className="flex items-center text-sm font-semibold text-[#385C4B] hover:underline">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back
        </Link>
      </div>
      <div className="max-w-7xl mx-auto px-0 lg:px-8 mb-8">
        <PhotoGallery images={activity.images} />
      </div>
      <main className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex gap-2">
                {activity.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-[#DDF0E5] text-[#385C4B] rounded-full text-xs font-bold">{tag}</span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                {activity.displayDate}
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{activity.title}</h1>
            <div className="flex items-center gap-6 text-sm text-gray-600 mb-8 border-b border-gray-200 pb-6">
              <div className="flex items-center gap-1.5"><span className="text-lg">⏱</span> {activity.duration}</div>
              <div className="flex items-center gap-1.5"><span className="text-lg">👥</span> Max: {activity.maxPeople} People</div>
              <div className="flex items-center gap-1.5"><span className="text-lg">⭐</span> {activity.rating} ({activity.reviews} reviews)</div>
            </div>
            <div className="bg-white border border-[#385C4B] border-opacity-20 rounded-2xl p-4 lg:p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0 overflow-hidden relative">
                  <Image src={activity.hostAvatar} alt={activity.host} fill unoptimized className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Hosted By: {activity.host}</h3>
                  <p className="text-xs text-gray-500 mt-1 max-w-sm">{activity.hostDescription}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-0.5 bg-[#DDF0E5] text-[#385C4B] rounded text-[10px] font-bold">Verified</span>
                    <span className="px-2 py-0.5 bg-[#DDF0E5] text-[#385C4B] rounded text-[10px] font-bold">{activity.category} Specialist</span>
                  </div>
                </div>
              </div>
              <button className="w-full md:w-auto px-6 py-2 border-2 border-[#385C4B] text-[#385C4B] font-bold text-sm rounded-full hover:bg-[#385C4B] hover:text-white transition">
                Message Host
              </button>
            </div>
            <div className="bg-[#EEF5F0] rounded-2xl p-6 mb-8 border border-[#385C4B] border-opacity-10">
              <h3 className="font-bold text-[#385C4B] mb-4 text-lg">Safety & Requirements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold text-gray-500 mb-2 uppercase">Mobility Requirements</h4>
                  <span className="inline-block bg-white px-3 py-1.5 rounded-lg text-sm text-gray-700 border border-gray-200">Mobility Independent</span>
                  <h4 className="text-xs font-bold text-gray-500 mt-4 mb-2 uppercase">Other Requirements</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-white px-3 py-1.5 rounded-lg text-xs text-gray-700 border border-gray-200">Gentle Movement</span>
                    <span className="bg-white px-3 py-1.5 rounded-lg text-xs text-gray-700 border border-gray-200">Walking</span>
                    <span className="bg-white px-3 py-1.5 rounded-lg text-xs text-gray-700 border border-gray-200">Low Impact</span>
                    <span className="bg-white px-3 py-1.5 rounded-lg text-xs text-gray-700 border border-gray-200">Standing</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-500 mb-2 uppercase">Health Alerts</h4>
                  <div className="bg-[#FDE8E8] rounded-xl p-4 border border-[#FDB8B8]">
                    <div className="flex gap-2 mb-2">
                      <span className="text-[10px] font-bold text-[#C53030] bg-white px-2 py-0.5 rounded border border-[#FDB8B8]">AI Supportive</span>
                    </div>
                    <h5 className="font-bold text-[#C53030] flex items-center gap-1.5 text-sm mb-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                      Medical Precaution
                    </h5>
                    <p className="text-xs text-[#9B2C2C] leading-relaxed">
                      This is an outdoor activity. High pollen area. Participants with asthma or seasonal allergies should bring appropriate medications.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Accordion title="Activity Overview" defaultOpen={true}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s.
            </Accordion>
            <Accordion title="What To Bring">
              <ul className="list-disc pl-5 space-y-1">
                <li>Comfortable, breathable clothing</li>
                <li>Water bottle</li>
                <li>Sunscreen and hat</li>
              </ul>
            </Accordion>
          </div>
          <div className="lg:w-[350px] flex-shrink-0">
            <div className="sticky top-6 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-2xl font-bold text-gray-900">{activity.price} Baht</span>
                <span className="text-sm text-gray-500">/Session</span>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-[#385C4B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  {activity.displayDate}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-[#385C4B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {activity.location}
                </div>
              </div>
              {spotsLeft > 0 ? (
                <div className="bg-[#FFF8E6] rounded-lg p-3 mb-6 flex items-center gap-2 border border-[#FDE68A]">
                  <span className="text-xl">🔥</span>
                  <span className="text-sm font-bold text-[#B7791F]">{spotsLeft} / {activity.maxPeople} spots left</span>
                </div>
              ) : (
                <div className="bg-red-50 rounded-lg p-3 mb-6 flex items-center gap-2 border border-red-200">
                  <span className="text-xl">🚫</span>
                  <span className="text-sm font-bold text-red-600">Fully Booked</span>
                </div>
              )}
              {spotsLeft === 0 ? (
                <button
                  disabled
                  className="w-full py-3 bg-gray-300 text-gray-500 font-bold rounded-xl cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Fully Booked
                </button>
              ) : isAuthenticated ? (
                <Link href={`/activities/${resolvedParams.id}/book`} className="block w-full">
                  <button className="w-full py-3 bg-[#385C4B] text-white font-bold rounded-xl hover:bg-[#2A4437] transition shadow-md flex items-center justify-center gap-2">
                    Book Activity
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </button>
                </Link>
              ) : (
                <div>
                  <Link href="/auth/login" className="block w-full">
                    <button className="w-full py-3 bg-[#385C4B] text-white font-bold rounded-xl hover:bg-[#2A4437] transition shadow-md flex items-center justify-center gap-2">
                      Log in to Book
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </button>
                  </Link>
                  <p className="text-xs text-gray-500 text-center mt-2">Sign in to book and manage activities</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {related.length > 0 && (
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Others Activities You Might Like</h2>
            <div className="flex flex-wrap gap-4 lg:gap-6 justify-center sm:justify-start">
              {related.map(a => (
                <ActivityCard key={a.id} imageUrl={a.images[0]} {...a} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
