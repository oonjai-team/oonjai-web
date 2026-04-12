import React from 'react';
import { activitiesData } from '../../data';
import { BookingForm } from '../../components';
import { Header } from '@/components/common/Header';

export default async function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const activity = activitiesData.find(a => a.id.toString() === resolvedParams.id) || activitiesData[0];

  return (
    <div className="min-h-screen bg-[#FDF8F0] font-sans pb-16">
      <Header />
      <main className="max-w-7xl mx-auto px-4 lg:px-8 pt-8 flex justify-center">
        <BookingForm activity={activity} />
      </main>
    </div>
  );
}