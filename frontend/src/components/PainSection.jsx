import { motion } from "framer-motion";
import { Grid3x3, BellOff, Layers } from "lucide-react";
import { FleetConstellation } from "./RobotSVGs";

const painCards = [
  {
    id: "pain-card-1",
    icon: Grid3x3,
    title: "No single view",
    copy: "Your fleet's health is scattered across terminals, bag files, and dashboards that don't talk to each other. You're context-switching just to answer \"is everything okay?\"",
  },
  {
    id: "pain-card-2",
    icon: BellOff,
    title: "You find out too late",
    copy: "Silent failures. Degraded performance. Missed waypoints. You find out when someone calls — not when it happens.",
  },
  {
    id: "pain-card-3",
    icon: Layers,
    title: "Debugging is archaeology",
    copy: "Reproduce the failure. Find the right bag. grep the right topic. Hope you logged it. Every post-mortem is an excavation.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

export default function PainSection() {
  return (
    <section
      id="pain"
      data-testid="pain-section"
      className="relative py-24 md:py-32"
    >
      {/* Disconnected fleet background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-15 pointer-events-none">
        <FleetConstellation variant="disconnected" className="w-[500px] max-w-[70vw]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Section label */}
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs uppercase tracking-[0.2em] text-[#00E5FF] font-bold mb-4"
        >
          The Reality
        </motion.p>

        {/* Headline */}
        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-16"
        >
          Your robots are running.{" "}
          <span className="text-[#FFB300]">But are they okay?</span>
        </motion.h2>

        {/* Pain cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {painCards.map((card, i) => (
            <motion.div
              key={card.id}
              data-testid={card.id}
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="glass-card-amber amber-glow-card rounded-lg p-6 md:p-8 relative group"
            >
              {/* Amber top line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FFB300]/50 to-transparent" />

              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-[#FFB300]/10 border border-[#FFB300]/20 flex items-center justify-center mb-5">
                <card.icon className="w-5 h-5 text-[#FFB300]" />
              </div>

              {/* Flatline indicator */}
              <svg className="w-full h-6 mb-4" viewBox="0 0 200 24" fill="none">
                <line x1="0" y1="12" x2="200" y2="12" stroke="#FFB300" strokeWidth="1" opacity="0.4" className="flatline-pulse" />
              </svg>

              <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-[#FFB300] mb-3">
                {card.title}
              </h3>
              <p className="text-sm text-[#8B9EB0] leading-relaxed">
                {card.copy}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
