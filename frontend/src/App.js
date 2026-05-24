import "@/App.css";
import ParticleNetwork from "@/components/ParticleNetwork";
import HeroSection from "@/components/HeroSection";
import PainSection from "@/components/PainSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import SocialProofSection from "@/components/SocialProofSection";
import CTASection from "@/components/CTASection";

function App() {
  return (
    <div className="relative min-h-screen bg-[#050A0F] text-[#F0F4F8] overflow-x-hidden">
      <div className="noise-overlay" />
      <ParticleNetwork />
      <HeroSection />
      <PainSection />
      <FeaturesSection />
      <HowItWorksSection />
      <SocialProofSection />
      <CTASection />
    </div>
  );
}

export default App;
