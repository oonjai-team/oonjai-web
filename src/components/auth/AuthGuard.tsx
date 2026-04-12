"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth/AuthContext"

/**
 * Wraps protected pages — redirects to /auth/login when not authenticated,
 * and to /onboarding when authenticated but not yet onboarded.
 * Set requireOnboarding=false for the onboarding page itself.
 */
export default function AuthGuard({ children, requireOnboarding = true }: { children: React.ReactNode; requireOnboarding?: boolean }) {
  const { isAuthenticated, isLoading, needsOnboarding } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return
    if (!isAuthenticated) {
      router.replace("/auth/login")
    } else if (requireOnboarding && needsOnboarding) {
      router.replace("/onboarding")
    }
  }, [isAuthenticated, isLoading, needsOnboarding, requireOnboarding, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-lightCream">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-oonjai-green-500 border-t-transparent" />
      </div>
    )
  }

  if (!isAuthenticated) return null
  if (requireOnboarding && needsOnboarding) return null

  return <>{children}</>
}
