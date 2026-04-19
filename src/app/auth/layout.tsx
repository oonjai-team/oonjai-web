import Image from "next/image";
import Link from "next/link";
import GuestGuard from "@/components/auth/GuestGuard";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GuestGuard>
      <div
        className="min-h-screen relative flex items-end sm:items-center w-full bg-PrimaryCream"
        style={{ colorScheme: "light" }}
      >
        <div className="absolute top-0 w-full pt-6">
          <div className="mx-auto flex items-center justify-center sm:justify-start w-full max-w-[1340px]">
            <div className="w-[90px] sm:w-[120px]">
              <Link href="/">
                <Image
                  src="/images/oonjai-logo.png"
                  alt="Oonjai"
                  width={152}
                  height={50}
                  priority
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-end relative mx-auto min-h-screen sm:min-h-[unset] h-[690px] w-full max-w-[1340px]">
          <div className="max-w-[800px]">
            <Image
              src="/images/hero-gardening.png"
              alt="Seniors enjoying activities together"
              width={1200}
              height={800}
              className="h-auto w-full object-contain object-bottom"
              priority
            />
          </div>
          <div className="absolute h-full flex w-full pt-48 sm:pt-0 sm:mt-0 sm:items-center sm:px-10 justify-center sm:justify-end top-0 right-0">
            <div className="bg-white shadow-xl py-14 sm:py-24 w-full sm:max-w-[500px] px-8 sm:px-20 rounded-t-[40px] sm:rounded-b-[40px]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </GuestGuard>
  );
}
