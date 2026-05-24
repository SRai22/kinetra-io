import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import WaitlistForm from "./WaitlistForm";
import { FleetConstellation } from "./RobotSVGs";

const HEADLINE = "We keep an eye on your robot fleet, so you don't have to.";
const SUBHEADLINE = "Trace, monitor, and debug your entire robot fleet — from one place.";

export default function HeroSection() {
  const words = HEADLINE.split(" ");
  const [typedText, setTypedText] = useState("");
  const [showSubheadline, setShowSubheadline] = useState(false);

  useEffect(() => {
    const headlineDelay = words.length * 80 + 600;
    const timer = setTimeout(() => {
      setShowSubheadline(true);
      let i = 0;
      const interval = setInterval(() => {
        setTypedText(SUBHEADLINE.slice(0, i + 1));
        i++;
        if (i >= SUBHEADLINE.length) clearInterval(interval);
      }, 25);
      return () => clearInterval(interval);
    }, headlineDelay);
    return () => clearTimeout(timer);
  }, [words.length]);

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center scanlines overflow-hidden"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 z-0 opacity-[0.08]"
        style={{
          backgroundImage: `url(https://static.prod-images.emergentagent.com/jobs/927b68b8-9830-4903-97e6-cc4434822725/images/e2cfa3b2d48fee208c2ac2d8581c8d496eff0cc25a56c535ad68ae2383245ba5.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Fleet constellation background */}
      <div className="absolute inset-0 z-[1] flex items-center justify-center opacity-30 pointer-events-none">
        <FleetConstellation variant="connected" className="w-[600px] max-w-[80vw]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center flex flex-col items-center gap-8 py-20">
        {/* Overline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs uppercase tracking-[0.25em] text-[#00E5FF]/70"
        >
          Fleet Observability Platform
        </motion.div>

        {/* Headline - word by word */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight flex flex-wrap justify-center gap-x-3 gap-y-1">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.08, ease: "easeOut" }}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subheadline - typewriter */}
        <div className="h-8 flex items-center justify-center">
          {showSubheadline && (
            <p className="text-base sm:text-lg text-[#8B9EB0] font-mono">
              {typedText}
              <span className="cursor-blink text-[#00E5FF] ml-0.5">_</span>
            </p>
          )}
        </div>

        {/* Waitlist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2 }}
          className="w-full flex justify-center"
        >
          <WaitlistForm idPrefix="hero" />
        </motion.div>
      </div>
    </section>
  );
}
