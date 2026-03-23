import HeroSection from "@components/landing/HeroSection";
import Navbar from "@components/landing/Navbar";
import ProblemSection from "@components/landing/ProblemSection";
import FeaturesSection from "@components/landing/FeaturesSection";
import HowItWorksSection from "@components/landing/HowItWorksSection";
import TestimonialsSection from "@components/landing/TestimonialsSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
    </>
  );
}
