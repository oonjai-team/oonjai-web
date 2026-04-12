import {Header} from "@components/common/Header"
import AuthGuard from "@/components/auth/AuthGuard"

export default function BookingLayout({
                                        children,
                                      }: {
  children: React.ReactNode;
}) {

  return (
    <AuthGuard>
      <div className="min-h-screen bg-lightCream text-PrimaryGreen font-sans">
        <Header />
        {children}
      </div>
    </AuthGuard>
  );
}