"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";

/**
 * OAuth callback page.
 * After LINE/Google OAuth, the backend redirects here with httpOnly cookies
 * already set. We detect the session, check if the user needs onboarding,
 * and redirect accordingly.
 */
export default function OAuthCallbackPage() {
  const router = useRouter();
  const { refreshSession, isAuthenticated, isLoading, needsOnboarding } = useAuth();
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (!hasTriggered.current) {
      hasTriggered.current = true;
      refreshSession();
    }
  }, [refreshSession]);

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated) {
      router.push(needsOnboarding ? "/onboarding" : "/booking");
    } else {
      router.push("/auth/login");
    }
  }, [isAuthenticated, isLoading, needsOnboarding, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-PrimaryCream">
      <div className="text-center">
        <div className="mb-4 h-8 w-8 mx-auto animate-spin rounded-full border-4 border-PrimaryGreen border-t-transparent" />
        <p className="text-PrimaryGreen font-medium">Completing sign in...</p>
      </div>
    </div>
  );
}
