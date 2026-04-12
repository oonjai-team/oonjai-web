import HeroSection from "@/components/ui/landing/HeroSection";
import Navbar from "@/components/ui/landing/Navbar";
import ProblemSection from "@/components/ui/landing/ProblemSection";
import FeaturesSection from "@/components/ui/landing/FeaturesSection";
import { Feature } from "framer-motion";
import HowItWorksSection from "@/components/ui/landing/HowItWorksSection";
import TestimonialsSection from "@/components/ui/landing/TestimonialsSection";

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
