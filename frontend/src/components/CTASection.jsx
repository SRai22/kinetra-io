import { motion } from "framer-motion";
import WaitlistForm from "./WaitlistForm";
import { FleetConstellation } from "./RobotSVGs";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

export default function CTASection() {
  return (
    <section
      id="cta"
      data-testid="cta-section"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Fleet constellation - all connected, glowing */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20 pointer-events-none">
        <FleetConstellation variant="online" className="w-[600px] max-w-[80vw]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center flex flex-col items-center gap-8">
        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight"
        >
          Your fleet deserves better{" "}
          <span className="text-[#00E5FF]">observability.</span>
        </motion.h2>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-base sm:text-lg text-[#8B9EB0]"
        >
          Join the waitlist. Be first to know when Kinetra launches.
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full flex justify-center"
        >
          <WaitlistForm idPrefix="cta" />
        </motion.div>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xs text-[#8B9EB0]/40 font-mono"
        >
          No spam. Just launch updates.
        </motion.p>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-24 border-t border-[#8B9EB0]/10 pt-8 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8B9EB0]/40 font-mono">
          <span>Kinetra {new Date().getFullYear()}</span>
          <span>Fleet observability for the real world.</span>
        </div>
      </div>
    </section>
  );
}
