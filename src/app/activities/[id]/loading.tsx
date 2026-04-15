import { Header } from '@/components/common/Header';
import { ActivityDetailSkeleton } from '@/components/common/Skeleton';

export default function ActivityDetailLoading() {
  return (
    <div className="min-h-screen bg-[#FDF8F0]">
      <Header />
      <ActivityDetailSkeleton />
    </div>
  );
}
