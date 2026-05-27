export function AMRRobot({ className = "", size = 80 }) {
  return (
    <svg viewBox="0 0 80 60" width={size} height={size * 0.75} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="15" y="12" width="50" height="28" rx="4" />
      <circle cx="25" cy="46" r="6" />
      <circle cx="55" cy="46" r="6" />
      <line x1="19" y1="46" x2="31" y2="46" />
      <line x1="49" y1="46" x2="61" y2="46" />
      <path d="M32 12 L32 6 Q40 2 48 6 L48 12" />
      <circle cx="40" cy="6" r="2" />
      <rect x="22" y="20" width="8" height="4" rx="1" />
      <rect x="50" y="20" width="8" height="4" rx="1" />
      <line x1="34" y1="26" x2="46" y2="26" />
    </svg>
  );
}

export function RoboticArm({ className = "", size = 80 }) {
  return (
    <svg viewBox="0 0 80 80" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="25" y="68" width="30" height="8" rx="2" />
      <circle cx="40" cy="68" r="4" />
      <line x1="40" y1="64" x2="26" y2="40" />
      <circle cx="26" cy="40" r="3.5" />
      <line x1="26" y1="36" x2="50" y2="18" />
      <circle cx="50" cy="18" r="3.5" />
      <path d="M53 15 L62 8" />
      <path d="M53 21 L62 28" />
      <circle cx="40" cy="52" r="1.5" />
    </svg>
  );
}

export function Quadruped({ className = "", size = 80 }) {
  return (
    <svg viewBox="0 0 80 60" width={size} height={size * 0.75} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="18" y="16" width="38" height="16" rx="3" />
      <rect x="52" y="12" width="16" height="12" rx="2" />
      <circle cx="63" cy="17" r="2" />
      <line x1="56" y1="24" x2="52" y2="24" />
      <path d="M23 32 L20 48 L26 48" />
      <path d="M33 32 L30 48 L36 48" />
      <path d="M43 32 L40 48 L46 48" />
      <path d="M53 32 L50 48 L56 48" />
      <line x1="14" y1="22" x2="18" y2="22" />
      <line x1="14" y1="26" x2="18" y2="26" />
    </svg>
  );
}

export function Humanoid({ className = "", size = 80 }) {
  return (
    <svg viewBox="0 0 60 80" width={size * 0.75} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="30" cy="10" r="8" />
      <line x1="24" y1="9" x2="36" y2="9" />
      <circle cx="26" cy="7" r="1" />
      <circle cx="34" cy="7" r="1" />
      <line x1="30" y1="18" x2="30" y2="24" />
      <rect x="20" y="24" width="20" height="22" rx="3" />
      <path d="M20 28 L10 40 L7 52" />
      <path d="M40 28 L50 40 L53 52" />
      <circle cx="7" cy="52" r="2" />
      <circle cx="53" cy="52" r="2" />
      <path d="M24 46 L21 68 L17 72" />
      <path d="M36 46 L39 68 L43 72" />
      <line x1="17" y1="72" x2="13" y2="72" />
      <line x1="43" y1="72" x2="47" y2="72" />
    </svg>
  );
}

export function Drone({ className = "", size = 80 }) {
  return (
    <svg viewBox="0 0 80 60" width={size} height={size * 0.75} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="32" y="24" width="16" height="12" rx="4" />
      <line x1="32" y1="27" x2="12" y2="14" />
      <line x1="48" y1="27" x2="68" y2="14" />
      <line x1="32" y1="33" x2="12" y2="46" />
      <line x1="48" y1="33" x2="68" y2="46" />
      <circle cx="12" cy="14" r="7" strokeDasharray="3 2" />
      <circle cx="68" cy="14" r="7" strokeDasharray="3 2" />
      <circle cx="12" cy="46" r="7" strokeDasharray="3 2" />
      <circle cx="68" cy="46" r="7" strokeDasharray="3 2" />
      <circle cx="40" cy="38" r="2.5" />
      <line x1="40" y1="40" x2="40" y2="46" />
    </svg>
  );
}

/* Inline SVG path data for embedding robots inside the constellation */
const robotPaths = {
  drone: (
    <g>
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
  arm: (
    <g>
      <rect x="-10" y="8" width="20" height="5" rx="1" />
      <circle cx="0" cy="8" r="2.5" />
      <line x1="0" y1="5.5" x2="-8" y2="-6" />
      <circle cx="-8" cy="-6" r="2" />
      <line x1="-8" y1="-8" x2="6" y2="-16" />
      <circle cx="6" cy="-16" r="2" />
      <line x1="8" y1="-17.5" x2="14" y2="-22" />
      <line x1="8" y1="-14.5" x2="14" y2="-10" />
    </g>
  ),
  humanoid: (
    <g>
      <circle cx="0" cy="-18" r="5" />
      <line x1="-4" y1="-19" x2="4" y2="-19" />
      <line x1="0" y1="-13" x2="0" y2="-9" />
      <rect x="-7" y="-9" width="14" height="14" rx="2" />
      <path d="M-7 -6 L-14 0 L-16 8" />
      <path d="M7 -6 L14 0 L16 8" />
      <path d="M-3 5 L-5 18 L-8 20" />
      <path d="M3 5 L5 18 L8 20" />
    </g>
  ),
  quadruped: (
    <g>
      <rect x="-14" y="-6" width="24" height="10" rx="2" />
      <rect x="8" y="-9" width="10" height="8" rx="1.5" />
      <circle cx="15" cy="-6" r="1.5" />
      <path d="M-10 4 L-12 16 L-8 16" />
      <path d="M-3 4 L-5 16 L-1 16" />
      <path d="M4 4 L2 16 L6 16" />
      <path d="M10 4 L8 16 L12 16" />
    </g>
  ),
  amr: (
    <g>
      <rect x="-16" y="-9" width="32" height="16" rx="3" />
      <circle cx="-8" cy="10" r="4" />
      <circle cx="8" cy="10" r="4" />
      <path d="M-5 -9 L-5 -13 Q0 -16 5 -13 L5 -9" />
      <circle cx="0" cy="-14" r="1.5" />
    </g>
  ),
};

export function FleetConstellation({ variant = "connected", className = "" }) {
  const isCyan = variant === "connected" || variant === "online";
  const color = isCyan ? "#00E5FF" : "#FFB300";
  const lineOpacity = variant === "disconnected" ? 0 : variant === "online" ? 0.35 : 0.12;
  const robotOpacity = variant === "disconnected" ? 0.2 : variant === "online" ? 0.7 : 0.45;

  const nodes = [
    { x: 200, y: 55, type: "drone", label: "Drone" },
    { x: 355, y: 130, type: "arm", label: "Arm" },
    { x: 300, y: 270, type: "humanoid", label: "Humanoid" },
    { x: 100, y: 270, type: "quadruped", label: "Quadruped" },
    { x: 45, y: 130, type: "amr", label: "AMR" },
  ];

  return (
    <svg viewBox="0 0 400 330" className={`w-full max-w-lg ${className}`} fill="none">
      {/* Connection lines */}
      {lineOpacity > 0 && nodes.map((n, i) =>
        nodes.slice(i + 1).map((m, j) => (
          <line
            key={`line-${i}-${j}`}
            x1={n.x} y1={n.y} x2={m.x} y2={m.y}
            stroke={color}
            strokeWidth="0.6"
            opacity={lineOpacity}
            strokeDasharray={variant === "online" ? "none" : "5 5"}
          >
            {variant === "online" && (
              <animate attributeName="opacity" values={`${lineOpacity};${lineOpacity * 1.8};${lineOpacity}`} dur="3s" repeatCount="indefinite" />
            )}
          </line>
        ))
      )}

      {/* Robot nodes */}
      {nodes.map((n, i) => (
        <g key={`node-${i}`} transform={`translate(${n.x}, ${n.y})`}>
          {/* Outer glow ring */}
          {variant === "online" && (
            <>
              <circle r="28" fill="none" stroke={color} strokeWidth="0.5" opacity="0.15">
                <animate attributeName="r" values="28;36;28" dur="3s" repeatCount="indefinite" begin={`${i * 0.5}s`} />
                <animate attributeName="opacity" values="0.15;0;0.15" dur="3s" repeatCount="indefinite" begin={`${i * 0.5}s`} />
              </circle>
            </>
          )}

          {/* Status dot */}
          <circle r="3" fill={color} opacity={isCyan ? 0.9 : 0.4}>
            {variant === "online" && (
              <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
            )}
          </circle>

          {/* Robot silhouette */}
          <g stroke={color} strokeWidth="1" opacity={robotOpacity} strokeLinecap="round" strokeLinejoin="round"
            style={{ filter: isCyan ? `drop-shadow(0 0 4px ${color}40)` : 'none' }}>
            {robotPaths[n.type]}
          </g>

          {/* Label */}
          <text y="32" textAnchor="middle" fill={isCyan ? "#8B9EB0" : "#FFB300"} fontSize="7" fontFamily="JetBrains Mono, monospace" opacity="0.5" letterSpacing="0.05em">
            {n.label.toUpperCase()}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* Heartbeat SVG animation: flatline (amber) → pulse (cyan) → flatline */
export function HeartbeatLine({ className = "" }) {
  return (
    <svg viewBox="0 0 300 50" className={`w-full ${className}`} fill="none" preserveAspectRatio="none">
      <defs>
        <linearGradient id="hb-grad-amber" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFB300" stopOpacity="0" />
          <stop offset="20%" stopColor="#FFB300" stopOpacity="0.6" />
          <stop offset="80%" stopColor="#FFB300" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FFB300" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hb-grad-cyan" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00E5FF" stopOpacity="0" />
          <stop offset="30%" stopColor="#00E5FF" stopOpacity="0.8" />
          <stop offset="70%" stopColor="#00E5FF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Flatline */}
      <line x1="0" y1="25" x2="300" y2="25" stroke="url(#hb-grad-amber)" strokeWidth="1.5">
        <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" />
      </line>
      {/* Heartbeat pulse that appears periodically */}
      <path
        d="M0 25 L100 25 L120 25 L130 10 L140 40 L150 5 L160 35 L170 25 L190 25 L300 25"
        stroke="url(#hb-grad-cyan)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0"
      >
        <animate attributeName="opacity" values="0;0;0.9;0.9;0" dur="4s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

/* Single robot that comes "online" - used in HowItWorks */
export function RobotOnline({ phase = 0, className = "" }) {
  const opacity = 0.15 + phase * 0.55;
  const color = phase < 0.5 ? "#FFB300" : "#00E5FF";
  const glowSize = phase * 8;

  return (
    <svg viewBox="0 0 120 120" className={`${className}`} fill="none" width="120" height="120">
      {/* Glow circle */}
      <circle cx="60" cy="60" r={20 + glowSize} fill="none" stroke={color} strokeWidth="0.5" opacity={phase * 0.3} />
      {phase > 0.5 && (
        <circle cx="60" cy="60" r={25 + glowSize} fill="none" stroke="#00E5FF" strokeWidth="0.3" opacity={phase * 0.15}>
          <animate attributeName="r" values={`${25 + glowSize};${35 + glowSize};${25 + glowSize}`} dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values={`${phase * 0.15};0;${phase * 0.15}`} dur="2s" repeatCount="indefinite" />
        </circle>
      )}
      {/* AMR robot */}
      <g transform="translate(60, 55)" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        opacity={opacity} style={{ filter: phase > 0.5 ? `drop-shadow(0 0 6px ${color}60)` : 'none' }}>
        <rect x="-20" y="-12" width="40" height="20" rx="4" />
        <circle cx="-10" cy="12" r="5" />
        <circle cx="10" cy="12" r="5" />
        <path d="M-6 -12 L-6 -17 Q0 -21 6 -17 L6 -12" />
        <circle cx="0" cy="-18" r="2" fill={phase > 0.7 ? color : "none"} />
      </g>
      {/* Status text */}
      <text x="60" y="100" textAnchor="middle" fill={color} fontSize="8" fontFamily="JetBrains Mono, monospace" opacity={0.4 + phase * 0.4}>
        {phase < 0.3 ? "OFFLINE" : phase < 0.7 ? "CONNECTING..." : "ONLINE"}
      </text>
    </svg>
  );
}
