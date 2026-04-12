// src/app/activities/[id]/book/page.tsx
"use client"
import React, { useEffect, useState, use } from 'react';
import { BookingForm } from '../../components';
import { Header } from '@/components/common/Header';
import AuthGuard from '@/components/auth/AuthGuard';
import { fetchActivityById, type ActivityData } from '@/lib/api/activities';
import Link from 'next/link';

export default function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [activity, setActivity] = useState<ActivityData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchActivityById(resolvedParams.id)
      .then(setActivity)
      .finally(() => setLoading(false))
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

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#FDF8F0] font-sans pb-16">
        <Header />
        <main className="max-w-7xl mx-auto px-4 lg:px-8 pt-8 flex justify-center">
          <BookingForm activity={activity} />
        </main>
      </div>
    </AuthGuard>
  );
}
