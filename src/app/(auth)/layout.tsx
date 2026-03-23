import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen w-full bg-PrimaryCream"
      style={{ colorScheme: "light" }}
    >
      {/* Desktop: two-panel layout */}
      <div className="hidden min-h-screen md:flex">
        {/* Left panel — illustration */}
        <div className="relative w-[56%] min-h-screen">
          <div className="absolute left-3 top-3 z-10 xl:left-4 xl:top-4 2xl:left-5 2xl:top-5">
            <Link href="/" className="block w-[clamp(7rem,9vw,11rem)]">
              <Image
                src="/images/oonjai-logo.svg"
                alt="Oonjai"
                width={176}
                height={58}
                className="h-auto w-full"
                priority
              />
            </Link>
          </div>
          <div className="absolute bottom-[10%] left-0 w-[109%]">
            <Image
              src="/images/hero-gardening.png"
              alt="Seniors enjoying activities together"
              width={1200}
              height={800}
              className="h-auto w-full object-contain object-bottom"
              priority
            />
          </div>
        </div>

        {/* Right panel — auth card */}
        <div className="relative z-20 flex w-[44%] items-center justify-center p-[clamp(1rem,1.8vw,2rem)] pr-[clamp(1.5rem,2.6vw,3.25rem)]">
          <div className="w-[min(100%,clamp(27rem,34vw,44rem))] min-h-[clamp(34rem,52vh,44rem)] flex flex-col justify-center rounded-[clamp(1.875rem,2.4vw,2.75rem)] border border-black/5 bg-white px-[clamp(2.25rem,3.2vw,4.75rem)] py-[clamp(3.5rem,5.5vw,7rem)] shadow-[0_12px_28px_rgba(54,92,72,0.16)]">
            {children}
          </div>
        </div>
      </div>

      {/* Mobile: single column */}
      <div className="flex min-h-screen flex-col items-center md:hidden">
        <div className="w-[clamp(7rem,32vw,9.5rem)] pt-8 pb-6">
          <Link href="/" className="block w-full">
            <Image
              src="/images/oonjai-logo.svg"
              alt="Oonjai"
              width={152}
              height={50}
              className="h-auto w-full"
              priority
            />
          </Link>
        </div>
        <div className="mx-4 w-full max-w-md rounded-[30px] border border-black/5 bg-white px-8 py-10 shadow-[0_12px_28px_rgba(54,92,72,0.16)]">
          {children}
        </div>
      </div>
    </div>
  );
}
