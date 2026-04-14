import { Header } from '@/components/common/Header';
import { ReviewFormSkeleton } from '@/components/common/Skeleton';

export default function ReviewLoading() {
  return (
    <div className="min-h-screen bg-[#FDF8F0] font-sans pb-16">
      <Header />
      <main className="max-w-3xl mx-auto px-4 lg:px-8 pt-8">
        <ReviewFormSkeleton />
      </main>
    </div>
  );
}
