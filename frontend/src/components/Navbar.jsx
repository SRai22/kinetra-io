import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Problem", href: "#pain" },
  { label: "Features", href: "#features" },
  { label: "Setup", href: "#how-it-works" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      data-testid="navbar"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
        scrolled
          ? "bg-[#050A0F]/90 backdrop-blur-lg border-b border-[#00E5FF]/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2.5 group" data-testid="nav-logo">
          <svg viewBox="0 0 28 28" width="24" height="24" fill="none" className="text-[#00E5FF]">
            <circle cx="14" cy="14" r="3" fill="currentColor" opacity="0.9" />
            <circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="0.5" opacity="0.2" strokeDasharray="3 3" />
            <line x1="14" y1="1" x2="14" y2="5" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
            <line x1="14" y1="23" x2="14" y2="27" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
            <line x1="1" y1="14" x2="5" y2="14" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
            <line x1="23" y1="14" x2="27" y2="14" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
          </svg>
          <span className="font-mono text-sm font-bold tracking-[0.15em] text-[#F0F4F8] group-hover:text-[#00E5FF] transition-colors">
            KINETRA
          </span>
        </a>

        {/* Links - desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-[0.15em] text-[#8B9EB0] hover:text-[#00E5FF] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cta"
            className="font-mono text-xs uppercase tracking-[0.15em] text-[#00E5FF] border border-[#00E5FF]/30 px-4 py-1.5 rounded hover:bg-[#00E5FF]/10 hover:border-[#00E5FF]/60 transition-all duration-200"
            data-testid="nav-waitlist-btn"
          >
            Join Waitlist
          </a>
        </div>

        {/* Mobile - just the CTA */}
        <a
          href="#cta"
          className="md:hidden font-mono text-[10px] uppercase tracking-[0.15em] text-[#00E5FF] border border-[#00E5FF]/30 px-3 py-1.5 rounded hover:bg-[#00E5FF]/10 transition-all"
          data-testid="nav-waitlist-btn-mobile"
        >
          Join Waitlist
        </a>
      </div>
    </motion.nav>
  );
}
