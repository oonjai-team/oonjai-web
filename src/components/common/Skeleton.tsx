import React from 'react';

const pulse = 'animate-pulse bg-gray-200 rounded';

export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`${pulse} ${className}`} />;
}

export function SkeletonCircle({ className = '' }: { className?: string }) {
  return <div className={`${pulse} rounded-full ${className}`} />;
}

/* ── Page-level skeletons ── */

export function BookingsListSkeleton() {
  return (
    <div className="w-full max-w-[896px] mx-auto flex flex-col gap-8">
      {[0, 1].map(i => (
        <section key={i} className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="flex flex-col gap-3">
            {[0, 1].map(j => (
              <div
                key={j}
                className="p-4 bg-white rounded-xl outline outline-1 outline-lightGrey flex items-center gap-4"
              >
                <Skeleton className="h-16 w-16 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-8 w-20 rounded-lg" />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export function ActivityCardSkeleton() {
  return (
    <div className="w-full sm:w-[280px] rounded-2xl bg-white shadow-sm overflow-hidden border border-gray-100">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-3/4" />
        <div className="space-y-1.5">
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-3 w-2/3" />
          <Skeleton className="h-3 w-1/3" />
        </div>
        <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ActivityDetailSkeleton() {
  return (
    <div className="min-h-screen bg-[#FDF8F0] font-sans pb-16">
      {/* Photo gallery placeholder */}
      <div className="max-w-7xl mx-auto px-0 lg:px-8 mb-8 pt-6">
        <Skeleton className="h-[300px] lg:h-[400px] w-full rounded-none lg:rounded-2xl" />
      </div>

      <main className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left content */}
          <div className="flex-1 space-y-6">
            {/* Tags + date */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <Skeleton className="h-4 w-28" />
            </div>

            {/* Title */}
            <Skeleton className="h-8 w-3/4" />

            {/* Meta row */}
            <div className="flex gap-6 pb-6 border-b border-gray-200">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-24" />
            </div>

            {/* Host card */}
            <div className="bg-white rounded-2xl p-4 lg:p-6 border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <SkeletonCircle className="w-16 h-16" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-3 w-56" />
                  <div className="flex gap-2">
                    <Skeleton className="h-4 w-16 rounded" />
                    <Skeleton className="h-4 w-28 rounded" />
                  </div>
                </div>
              </div>
              <Skeleton className="h-10 w-32 rounded-full" />
            </div>

            {/* Safety section */}
            <Skeleton className="h-48 w-full rounded-2xl" />

            {/* Accordions */}
            <Skeleton className="h-14 w-full rounded-xl" />
            <Skeleton className="h-14 w-full rounded-xl" />
          </div>

          {/* Right sidebar */}
          <div className="lg:w-[350px] flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 space-y-4">
              <Skeleton className="h-8 w-32" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </div>
        </div>

        {/* Related activities */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <Skeleton className="h-7 w-64 mb-6" />
          <div className="flex flex-wrap gap-4 lg:gap-6">
            {[1, 2, 3, 4].map(i => (
              <ActivityCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export function BookingFormSkeleton() {
  return (
    <div className="max-w-3xl w-full space-y-6">
      {/* Activity summary */}
      <div className="flex gap-4 p-4 bg-white rounded-xl border border-gray-200">
        <Skeleton className="w-20 h-20 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>

      {/* Senior selection */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-14 w-full rounded-xl" />
        <Skeleton className="h-14 w-full rounded-xl" />
      </div>

      {/* Transportation */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-14 w-full rounded-xl" />
        <Skeleton className="h-14 w-full rounded-xl" />
        <Skeleton className="h-14 w-full rounded-xl" />
      </div>

      {/* Payment */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-14 w-full rounded-xl" />
        <Skeleton className="h-14 w-full rounded-xl" />
      </div>

      {/* Total + button */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-6 w-1/2 mt-2" />
        <Skeleton className="h-12 w-full rounded-xl mt-4" />
      </div>
    </div>
  );
}

export function ReviewFormSkeleton() {
  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="bg-white rounded-3xl p-6 lg:p-10 shadow-sm border border-gray-100 space-y-8">
        {/* Activity info */}
        <div className="bg-[#EEF5F3] rounded-2xl p-4 flex items-center gap-4">
          <Skeleton className="w-16 h-16 rounded-xl flex-shrink-0" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-6 w-2/3" />
          </div>
        </div>

        {/* Activity rating */}
        <div className="text-center space-y-3">
          <Skeleton className="h-5 w-56 mx-auto" />
          <div className="flex gap-2 justify-center">
            {[1, 2, 3, 4, 5].map(i => (
              <Skeleton key={i} className="w-10 h-10 rounded" />
            ))}
          </div>
        </div>

        {/* Textarea */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-[120px] w-full rounded-2xl" />
        </div>

        {/* Host avatar */}
        <div className="flex justify-center">
          <SkeletonCircle className="w-20 h-20" />
        </div>

        {/* Host info */}
        <div className="text-center space-y-2">
          <Skeleton className="h-6 w-36 mx-auto" />
          <Skeleton className="h-3 w-48 mx-auto" />
        </div>

        {/* Host rating */}
        <div className="text-center space-y-3">
          <Skeleton className="h-5 w-48 mx-auto" />
          <div className="flex gap-2 justify-center">
            {[1, 2, 3, 4, 5].map(i => (
              <Skeleton key={i} className="w-10 h-10 rounded" />
            ))}
          </div>
        </div>

        {/* Textarea */}
        <Skeleton className="h-[100px] w-full rounded-2xl" />

        {/* Buttons */}
        <Skeleton className="h-14 w-full rounded-xl" />
        <Skeleton className="h-10 w-full rounded-xl" />
      </div>
    </div>
  );
}

export function SeniorProfileSkeleton() {
  return (
    <div className="rounded-xl border border-[#EBF1ED] overflow-hidden">
      <div className="flex items-center gap-4 px-5 py-4 bg-[#EBF1ED]">
        <SkeletonCircle className="w-10 h-10" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <div className="px-5 py-3 space-y-3">
        <div className="flex gap-4 py-2 border-b border-[#EBF1ED]">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="flex gap-4 py-2 border-b border-[#EBF1ED]">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <div className="flex gap-4 py-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
    </div>
  );
}

export function RequestServiceSkeleton() {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-4 w-80" />
      </div>

      {/* Section label */}
      <Skeleton className="h-4 w-36" />

      {/* Request cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {[1, 2].map(i => (
          <div key={i} className="p-5 rounded-2xl bg-white border border-gray-200 space-y-3">
            <div className="flex justify-between">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-6 w-28 rounded-full" />
            </div>
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-48" />
              <Skeleton className="h-3 w-36" />
            </div>
            <div className="p-3 rounded-xl bg-gray-50 space-y-2">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-3 w-full" />
            </div>
            <div className="flex items-center gap-3 pt-2">
              <SkeletonCircle className="w-9 h-9" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New request button placeholder */}
      <Skeleton className="h-24 w-full rounded-2xl" />
    </div>
  );
}
