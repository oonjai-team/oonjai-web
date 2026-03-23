import {Header} from "@components/common/Header"

export default function AuthLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {

  return (
    <div className="min-h-screen bg-lightCream text-PrimaryGreen font-sans">
      <Header />
      {children}
    </div>
  );
}