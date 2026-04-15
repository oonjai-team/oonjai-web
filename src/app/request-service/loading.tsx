import { Header } from '@/components/common/Header';
import { RequestServiceSkeleton } from '@/components/common/Skeleton';

export default function RequestServiceLoading() {
  return (
    <div className="min-h-screen bg-[#FCFAEF] font-sans text-gray-900 pb-20">
      <Header />
      <main className="max-w-5xl mx-auto px-5 md:px-8 py-8 md:py-10">
        <RequestServiceSkeleton />
      </main>
    </div>
  );
}
