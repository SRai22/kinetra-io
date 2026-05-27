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
    robotBg: (
      <g stroke="#00E5FF" strokeWidth="0.8" opacity="0.08" fill="none" strokeLinecap="round" transform="translate(160, 80) scale(2.5)">
        <rect x="-16" y="-9" width="32" height="16" rx="3" />
        <circle cx="-8" cy="10" r="4" />
        <circle cx="8" cy="10" r="4" />
        <path d="M-5 -9 L-5 -13 Q0 -16 5 -13 L5 -9" />
        <circle cx="0" cy="-14" r="1.5" />
      </g>
    ),
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
    robotBg: (
      <g stroke="#00E5FF" strokeWidth="0.8" opacity="0.08" fill="none" strokeLinecap="round" transform="translate(160, 80) scale(2)">
        <rect x="-8" y="-3" width="16" height="6" rx="2" />
        <line x1="-8" y1="-1.5" x2="-20" y2="-8" />
        <line x1="8" y1="-1.5" x2="20" y2="-8" />
        <line x1="-8" y1="1.5" x2="-20" y2="8" />
        <line x1="8" y1="1.5" x2="20" y2="8" />
        <circle cx="-20" cy="-8" r="4" strokeDasharray="2 1.5" />
        <circle cx="20" cy="-8" r="4" strokeDasharray="2 1.5" />
        <circle cx="-20" cy="8" r="4" strokeDasharray="2 1.5" />
        <circle cx="20" cy="8" r="4" strokeDasharray="2 1.5" />
      </g>
    ),
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
    robotBg: (
      <g stroke="#00E5FF" strokeWidth="0.8" opacity="0.08" fill="none" strokeLinecap="round" transform="translate(160, 80) scale(2)">
        <rect x="-14" y="-6" width="24" height="10" rx="2" />
        <rect x="8" y="-9" width="10" height="8" rx="1.5" />
        <circle cx="15" cy="-6" r="1.5" />
        <path d="M-10 4 L-12 16 L-8 16" />
        <path d="M-3 4 L-5 16 L-1 16" />
        <path d="M4 4 L2 16 L6 16" />
        <path d="M10 4 L8 16 L12 16" />
      </g>
    ),
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
              className="glass-card glow-card rounded-lg p-6 md:p-8 relative group overflow-hidden"
            >
              {/* Cyan top accent */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00E5FF]/50 to-transparent" />

              {/* Robot silhouette background */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 400" preserveAspectRatio="xMidYMid meet">
                {feat.robotBg}
                {/* Data stream lines */}
                <line x1="160" y1="100" x2="160" y2="380" stroke="#00E5FF" strokeWidth="0.5" opacity="0.06" strokeDasharray="4 6">
                  <animate attributeName="stroke-dashoffset" values="0;-20" dur="2s" repeatCount="indefinite" />
                </line>
                <line x1="130" y1="110" x2="130" y2="380" stroke="#00E5FF" strokeWidth="0.3" opacity="0.04" strokeDasharray="3 8">
                  <animate attributeName="stroke-dashoffset" values="0;-22" dur="3s" repeatCount="indefinite" />
                </line>
                <line x1="190" y1="90" x2="190" y2="380" stroke="#00E5FF" strokeWidth="0.3" opacity="0.04" strokeDasharray="2 10">
                  <animate attributeName="stroke-dashoffset" values="0;-24" dur="2.5s" repeatCount="indefinite" />
                </line>
              </svg>

              <div className="relative z-10">
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
                    <li key={j} className="flex items-start gap-2.5 text-sm text-[#8B9EB0] leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]/50 mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
