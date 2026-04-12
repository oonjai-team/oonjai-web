import HeroSection from "@/components/ui/landing/HeroSection";
import ProblemSection from "@/components/ui/landing/ProblemSection";
import FeaturesSection from "@/components/ui/landing/FeaturesSection";
import HowItWorksSection from "@/components/ui/landing/HowItWorksSection";
import TestimonialsSection from "@/components/ui/landing/TestimonialsSection";
import { Header } from "@/components/common/Header";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
    </>
  );
}
