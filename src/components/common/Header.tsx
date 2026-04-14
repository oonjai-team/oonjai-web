"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import { AccountIcon, BookIcon, HandRequestIcon } from "@/components/icons/NavIcons";

function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const navLinks = [
    { name: "Activity Marketplace", href: "/activities", Icon: BookIcon },
    { name: "Request a Service", href: "/request-service", Icon: HandRequestIcon },
    { name: "My Bookings", href: "/booking/confirmation", Icon: BookIcon },
  ];

  const handleLogout = async () => {
    await logout();
    setAccountOpen(false);
    router.push("/");
  };

  return (
    <nav className="w-full bg-PrimaryCream border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16 md:h-20">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 relative w-24 h-8 md:w-28 md:h-10">
            <Image src="/images/oonjai-logo.svg" alt="Oonjai Logo" fill className="object-contain" priority />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center h-full space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative flex items-center gap-2 h-full border-b-4 transition-all duration-200
                    ${isActive
                      ? "border-PrimaryGreen text-PrimaryGreen font-bold"
                      : "border-transparent text-PrimaryGreen/60 hover:text-PrimaryGreen font-medium"
                    }`}
                >
                  <link.Icon width={20} height={20} className={isActive ? "opacity-100" : "opacity-60"} />
                  <span className="text-sm lg:text-base whitespace-nowrap">{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop Account */}
          <div className="hidden md:flex items-center relative">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => setAccountOpen(o => !o)}
                  className="flex items-center gap-2 text-PrimaryGreen font-bold cursor-pointer hover:opacity-80"
                >
                  <AccountIcon width={24} height={24} />
                  <span>{user?.firstname || "Account"}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {accountOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setAccountOpen(false)} />
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg overflow-hidden z-20 border border-gray-100">
                      <Link href="/profile" onClick={() => setAccountOpen(false)}
                        className="block px-4 py-3 text-sm text-PrimaryGreen hover:bg-oonjai-green-50 transition-colors">
                        Profile Settings
                      </Link>
                      <button onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer">
                        Log Out
                      </button>
                    </div>
                  </>
                )}
              </>
            ) : (
              <Link href="/auth/login"
                className="flex items-center gap-2 text-PrimaryGreen font-bold hover:opacity-80">
                <AccountIcon width={24} height={24} />
                <span>Log In</span>
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-PrimaryGreen focus:outline-none relative w-10 h-10"
              aria-label="Menu"
            >
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 space-y-1.5">
                <span className={`block w-6 h-0.5 bg-PrimaryGreen transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-PrimaryGreen transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-PrimaryGreen transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white ${isMenuOpen ? 'max-h-96 border-b border-gray-100' : 'max-h-0'}`}>
        <div className="px-6 py-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-4 py-4 border-b border-gray-50 last:border-none ${isActive ? 'text-PrimaryGreen font-bold' : 'text-PrimaryGreen/70'}`}
              >
                <link.Icon width={20} height={20} />
                <span>{link.name}</span>
              </Link>
            );
          })}
          {isAuthenticated ? (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-4 py-4 text-PrimaryGreen font-bold bg-[#FDFBF7] rounded-xl px-3"
                onClick={() => setIsMenuOpen(false)}
              >
                <AccountIcon width={20} height={20} />
                {user?.firstname || "Account"}
              </Link>
              <button onClick={handleLogout}
                className="flex items-center gap-4 py-4 text-red-600 px-3 w-full cursor-pointer">
                Log Out
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="flex items-center gap-4 py-4 mt-2 text-PrimaryGreen font-bold bg-[#FDFBF7] rounded-xl px-3"
              onClick={() => setIsMenuOpen(false)}
            >
              <AccountIcon width={20} height={20} />
              Log In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
export { Header }
