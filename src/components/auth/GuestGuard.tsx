"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth/AuthContext"

/**
 * Wraps auth pages — redirects authenticated users away.
 * Users without adultChild go to /onboarding, others to /booking.
 */
export default function GuestGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, needsOnboarding } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace(needsOnboarding ? "/onboarding" : "/activity-status")
    }
  }, [isAuthenticated, isLoading, needsOnboarding, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-PrimaryCream">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-oonjai-green-500 border-t-transparent" />
      </div>
    )
  }

  if (isAuthenticated) return null

  return <>{children}</>
}
