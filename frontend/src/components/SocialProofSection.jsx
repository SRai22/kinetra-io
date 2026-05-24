import { motion } from "framer-motion";

const quotes = [
  {
    text: "Finally something built for fleet ops, not just single-robot demos.",
    author: "Robotics Engineer",
    org: "Autonomous Logistics",
  },
  {
    text: "We've been duct-taping this together for two years. This is what we needed.",
    author: "Fleet Operations Lead",
    org: "Industrial Automation",
  },
  {
    text: "Kinetra found a silent motor degradation that would've taken out three AGVs. We caught it on day one.",
    author: "Systems Engineer",
    org: "Warehouse Robotics",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

export default function SocialProofSection() {
  return (
    <section
      id="social-proof"
      data-testid="social-proof-section"
      className="relative py-24 md:py-32"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 z-0 opacity-[0.05]"
        style={{
          backgroundImage: `url(https://static.prod-images.emergentagent.com/jobs/927b68b8-9830-4903-97e6-cc4434822725/images/5835470197f2475d53651752898acd03de856e713b281f47047107dc91a467f3.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-16 text-center"
        >
          Built for the people who actually{" "}
          <span className="text-[#00E5FF]">run robot fleets.</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {quotes.map((q, i) => (
            <motion.div
              key={i}
              data-testid={`quote-card-${i + 1}`}
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="terminal-card"
            >
              <div className="terminal-header">
                <div className="terminal-dot bg-[#00E5FF]/60" />
                <span className="ml-2 font-mono text-[10px] text-[#8B9EB0]">testimony.log</span>
              </div>
              <div className="p-5">
                <p className="font-mono text-sm text-[#F0F4F8]/90 leading-relaxed mb-4">
                  <span className="text-[#00E5FF]">&gt;</span> "{q.text}"
                </p>
                <div className="font-mono text-xs text-[#8B9EB0]">
                  <span className="text-[#00E5FF]/60">—</span> {q.author},{" "}
                  <span className="text-[#8B9EB0]/60">{q.org}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-8 text-xs text-[#8B9EB0]/50 font-mono"
        >
          Early access quotes from beta testers.
        </motion.p>
      </div>
    </section>
  );
}
