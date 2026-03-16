// src/features/landing/HeroSection.tsx
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
    {/* Background color applied to the whole section */}
  return (
    <section id="hero" className="w-full bg-PrimaryCream pt-12 pb-8 md:pt-20 md:pb-16 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* Header Text */}
        <div className="max-w-3xl flex flex-col items-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-PrimaryGreen leading-tight tracking-tight mb-4 md:mb-6">
            Your Parents&apos; Joy, <br className="hidden sm:block" />
            Your Peace Of Mind
          </h1>
          
          <p className="text-base md:text-lg lg:text-xl text-oonjai-blue-300 mb-8 md:mb-10 max-w-2xl">
            Trusted, verified companions to get your aging parents 
            out of the house and back into life.
          </p>

          <Link 
            href="/solution"
            className="bg-PrimaryGreen text-white px-8 py-3 md:px-10 md:py-4 text-base md:text-lg font-semibold rounded-lg shadow-md hover:bg-oonjai-green-600 transition-all transform hover:scale-105"
          >
            Find Your Solution
          </Link>
        </div>

        {/* 3D Clay Illustration */}
        <div className="w-full max-w-4xl mt-12 md:mt-16 relative">
          {/* Ensure you export this as a transparent PNG from Figma */}
          <Image 
            src="/images/hero-gardening.png" 
            alt="Seniors gardening together" 
            width={1200}
            height={800}
            className="w-full h-auto object-contain drop-shadow-xl"
            priority
          />
        </div>
        
      </div>
    </section>
  );
}