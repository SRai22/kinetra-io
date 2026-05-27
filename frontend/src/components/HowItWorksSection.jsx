import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Terminal, Wifi, LayoutDashboard } from "lucide-react";
import { RobotOnline } from "./RobotSVGs";

const steps = [
  {
    num: "01",
    icon: Terminal,
    title: "Install the agent",
    copy: "Works with your stack. No lock-in.",
  },
  {
    num: "02",
    icon: Wifi,
    title: "Connect your fleet",
    copy: "Kinetra auto-discovers your ROS2 topics, nodes, and vitals. No manual wiring. No config files.",
  },
  {
    num: "03",
    icon: LayoutDashboard,
    title: "Open the dashboard",
    copy: "Cloud-hosted or self-hosted — your choice. Your entire fleet, visible in one place, from day one.",
  },
];

const commands = [
  { comment: "# ROS2 Package", cmd: "apt install ros-humble-kinetra" },
  { comment: "# Python", cmd: "pip install kinetra" },
  { comment: "# Docker", cmd: "docker run kinetra/agent" },
];

function TerminalAnimation() {
  const [cmdIndex, setCmdIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState("typing");

  const currentCommand = commands[cmdIndex];
  const fullText = `${currentCommand.comment}\n$ ${currentCommand.cmd}`;

  const startTyping = useCallback(() => {
    setPhase("typing");
    setDisplayText("");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayText(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(interval);
        setPhase("waiting");
      }
    }, 35);
    return () => clearInterval(interval);
  }, [fullText]);

  useEffect(() => {
    const cleanup = startTyping();
    return cleanup;
  }, [startTyping]);

  useEffect(() => {
    if (phase !== "waiting") return;
    const timer = setTimeout(() => {
      setCmdIndex((prev) => (prev + 1) % commands.length);
    }, 2200);
    return () => clearTimeout(timer);
  }, [phase]);

  return (
    <div className="terminal-card max-w-md w-full">
      <div className="terminal-header">
        <div className="terminal-dot bg-[#FF5F56]" />
        <div className="terminal-dot bg-[#FFBD2E]" />
        <div className="terminal-dot bg-[#27C93F]" />
        <span className="ml-3 font-mono text-xs text-[#8B9EB0]">install.sh</span>
      </div>
      <div className="p-4 min-h-[80px]">
        <pre className="font-mono text-sm text-[#00E5FF] whitespace-pre-wrap leading-relaxed">
          {displayText}
          <span className="cursor-blink text-[#F0F4F8]">_</span>
        </pre>
      </div>
    </div>
  );
}

function RobotBootSequence() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isInView) {
      setPhase(0);
      return;
    }
    const stages = [0, 0.3, 0.6, 1.0];
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < stages.length) {
        setPhase(stages[step]);
      } else {
        clearInterval(interval);
      }
    }, 800);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <div ref={ref} className="flex justify-center">
      <RobotOnline phase={phase} className="transition-all duration-700" />
    </div>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      data-testid="how-it-works-section"
      className="relative py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs uppercase tracking-[0.2em] text-[#00E5FF] font-bold mb-4"
        >
          Setup
        </motion.p>

        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-16"
        >
          One command. Your fleet,{" "}
          <span className="text-[#00E5FF]">online.</span>
        </motion.h2>

        {/* Terminal + Robot side by side on desktop */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-16">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.15 }}
            data-testid="terminal-animation"
            className="w-full md:w-auto"
          >
            <TerminalAnimation />
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="hidden md:block"
          >
            <RobotBootSequence />
          </motion.div>
        </div>

        {/* Steps timeline */}
        <div className="relative">
          {/* Desktop timeline line */}
          <div className="hidden md:block absolute top-8 left-[calc(16.67%)] right-[calc(16.67%)] h-[2px] timeline-line" />

          {/* Mobile timeline line */}
          <div className="md:hidden absolute top-0 bottom-0 left-6 w-[2px] timeline-line-vertical" />

          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                data-testid={`how-step-${i + 1}`}
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                className="relative pl-14 md:pl-0 md:text-center"
              >
                {/* Step node */}
                <div className="absolute left-0 top-0 md:static md:mx-auto w-12 h-12 rounded-full bg-[#0D1117] border border-[#00E5FF]/40 flex items-center justify-center mb-4 relative">
                  <step.icon className="w-5 h-5 text-[#00E5FF]" />
                  <div className="absolute inset-0 rounded-full border border-[#00E5FF]/20 node-pulse-ring" />
                </div>

                <div className="font-mono text-xs text-[#00E5FF]/50 mb-1 md:mt-4">{step.num}</div>
                <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-2">{step.title}</h3>
                <p className="text-sm text-[#8B9EB0] leading-relaxed">{step.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
