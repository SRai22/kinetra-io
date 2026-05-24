import { motion } from "framer-motion";
import { Eye, Zap, Bug } from "lucide-react";

const features = [
  {
    id: "feature-card-1",
    icon: Eye,
    title: "See Everything",
    subhead: "Real-time visibility across your whole fleet",
    items: [
      "Robot health vitals — CPU, memory, temperature, per robot",
      "ROS2 topic activity and message rates",
      "Navigation state and mission status",
      "Custom metrics for whatever your stack emits",
    ],
  },
  {
    id: "feature-card-2",
    icon: Zap,
    title: "Know Immediately",
    subhead: "Alerts that catch problems before you do",
    items: [
      "Dead robot detection — know the moment a robot goes dark",
      "Threshold alerts — CPU spikes, memory pressure, anything you define",
      "Anomaly detection — catches degradation that never crossed a threshold",
      "Custom alert rules — your fleet, your rules",
    ],
  },
  {
    id: "feature-card-3",
    icon: Bug,
    title: "Debug Fast",
    subhead: 'From "something broke" to "here\'s why" — fast',
    items: [
      "Live log streaming per robot",
      "Timeline replay — scrub back to the exact moment it happened",
      "Everything correlated in one place, no tab switching",
    ],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

export default function FeaturesSection() {
  return (
    <section
      id="features"
      data-testid="features-section"
      className="relative py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs uppercase tracking-[0.2em] text-[#00E5FF] font-bold mb-4"
        >
          What Kinetra Does
        </motion.p>

        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-16"
        >
          One place. Every robot.{" "}
          <span className="text-[#00E5FF]">Full picture.</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feat, i) => (
            <motion.div
              key={feat.id}
              data-testid={feat.id}
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="glass-card glow-card rounded-lg p-6 md:p-8 relative group"
            >
              {/* Cyan top accent */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00E5FF]/50 to-transparent" />

              {/* Data stream SVG */}
              <svg className="absolute top-0 right-0 w-24 h-24 opacity-10 pointer-events-none" viewBox="0 0 100 100" fill="none">
                <circle cx="80" cy="20" r="3" fill="#00E5FF" />
                <line x1="80" y1="23" x2="80" y2="90" stroke="#00E5FF" strokeWidth="0.5" strokeDasharray="4 4" style={{ animation: "data-stream 2s linear infinite" }} />
                <line x1="60" y1="20" x2="60" y2="80" stroke="#00E5FF" strokeWidth="0.5" strokeDasharray="3 5" style={{ animation: "data-stream 3s linear infinite" }} />
              </svg>

              <div className="w-12 h-12 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/20 flex items-center justify-center mb-5">
                <feat.icon className="w-5 h-5 text-[#00E5FF]" />
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mb-2">
                {feat.title}
              </h3>
              <p className="text-sm text-[#00E5FF]/70 font-mono mb-5">
                {feat.subhead}
              </p>

              <ul className="space-y-3">
                {feat.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-[#8B9EB0] leading-relaxed">
                    <span className="w-1 h-1 rounded-full bg-[#00E5FF] mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
