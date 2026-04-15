import AuthGuard from "@/components/auth/AuthGuard"

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard requireOnboarding={false}>{children}</AuthGuard>
}
