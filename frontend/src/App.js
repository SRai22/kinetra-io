import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ParticleNetwork from "@/components/ParticleNetwork";
import HeroSection from "@/components/HeroSection";
import PainSection from "@/components/PainSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import SocialProofSection from "@/components/SocialProofSection";
import CTASection from "@/components/CTASection";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";

function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#050A0F] text-[#F0F4F8] overflow-x-hidden">
      <div className="noise-overlay" />
      <Navbar />
      <ParticleNetwork />
      <AnalyticsTracker />
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
