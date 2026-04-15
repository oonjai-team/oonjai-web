import { Header } from '@/components/common/Header';
import { ActivityCardSkeleton } from '@/components/common/Skeleton';

export default function ActivitiesLoading() {
  return (
    <div className="min-h-screen bg-[#FDF8F0] font-sans pb-10">
      <Header />
      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#385C4B] mb-1">Discover Activities</h1>
          <p className="text-[#385C4B] opacity-70 text-xs md:text-sm">Join Trusted Community Events and Meet Local People</p>
        </div>
        <div className="mt-6 flex flex-wrap gap-6 justify-center sm:justify-start">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <ActivityCardSkeleton key={i} />
          ))}
        </div>
      </main>
    </div>
  );
}
