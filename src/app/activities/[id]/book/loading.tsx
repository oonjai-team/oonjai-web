import { Header } from '@/components/common/Header';
import { BookingFormSkeleton } from '@/components/common/Skeleton';

export default function BookingLoading() {
  return (
    <div className="min-h-screen bg-[#FDF8F0] font-sans pb-16">
      <Header />
      <main className="max-w-7xl mx-auto px-4 lg:px-8 pt-8 flex justify-center">
        <BookingFormSkeleton />
      </main>
    </div>
  );
}
