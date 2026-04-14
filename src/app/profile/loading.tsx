import { Header } from '@/components/common/Header';
import { Skeleton, SeniorProfileSkeleton } from '@/components/common/Skeleton';

export default function ProfileLoading() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FFFAEF] px-4 sm:px-8 lg:px-64 py-8 lg:py-10">
        <h1 className="text-[#365C48] text-3xl lg:text-4xl font-bold font-['Lexend'] mb-8">
          Profile Settings
        </h1>
        <div className="flex flex-col gap-6">
          {/* Account Information skeleton */}
          <div className="bg-white rounded-2xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.08)] p-6 space-y-4">
            <Skeleton className="h-6 w-48" />
            <div className="flex items-center gap-4">
              <Skeleton className="w-16 h-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          {/* Care Profile skeleton */}
          <div className="bg-white rounded-2xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.08)] p-6 space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>

          {/* Senior Profiles skeleton */}
          <div className="bg-white rounded-2xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.08)] p-6">
            <Skeleton className="h-6 w-40 mb-5" />
            <div className="flex flex-col gap-4">
              <SeniorProfileSkeleton />
              <SeniorProfileSkeleton />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
