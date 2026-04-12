// src/components/Navbar.tsx
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-PrimaryCream border-b border-lightGrey/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src="/images/oonjai-logo.svg" 
                alt="Oonjai Logo" 
                width={100} 
                height={32} 
                className="w-24 md:w-32 h-auto" 
                priority 
              />
            </Link>
          </div>

          {/* Action Side - Single Button */}
          <div className="flex items-center">
            <Link 
              href="/auth/register"
              className="bg-PrimaryGreen text-white px-4 py-2 md:px-6 md:py-2.5 text-sm md:text-base font-medium rounded-md shadow-sm hover:bg-oonjai-green-600 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}