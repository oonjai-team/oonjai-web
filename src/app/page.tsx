import HeroSection from "@/components/ui/landing/HeroSection";
import Navbar from "@/components/ui/landing/Navbar";
import ProblemSection from "@/components/ui/landing/ProblemSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <div className="min-h-screen w-full flex items-center justify-center">
        <h1 className="text-4xl font-semibold">Hello Oonjai hi!</h1>
        <h2 className="text-oonjai-blue-400 font-medium text-4xl">Text</h2>
      </div>
    </>
  );
}
