import "@/App.css";
import Navbar from "@/components/Navbar";
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
      <Navbar />
      <ParticleNetwork />
      <HeroSection />
      <div className="section-divider" />
      <PainSection />
      <div className="section-divider" />
      <FeaturesSection />
      <div className="section-divider" />
      <HowItWorksSection />
      <div className="section-divider" />
      <SocialProofSection />
      <div className="section-divider" />
      <CTASection />
    </div>
  );
}

export default App;
