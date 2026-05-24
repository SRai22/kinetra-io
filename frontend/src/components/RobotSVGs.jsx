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

export function FleetConstellation({ variant = "connected", className = "" }) {
  const isCyan = variant === "connected" || variant === "online";
  const color = isCyan ? "#00E5FF" : "#FFB300";
  const lineOpacity = variant === "disconnected" ? 0 : variant === "online" ? 0.4 : 0.15;
  const nodeGlow = variant === "online" ? "robot-svg-glow" : variant === "disconnected" ? "robot-svg-dim" : "robot-svg-glow";

  const nodes = [
    { x: 200, y: 60, label: "Drone" },
    { x: 360, y: 120, label: "Arm" },
    { x: 310, y: 260, label: "Humanoid" },
    { x: 90, y: 260, label: "Quadruped" },
    { x: 40, y: 120, label: "AMR" },
  ];

  return (
    <svg viewBox="0 0 400 320" className={`w-full max-w-lg ${className}`} fill="none">
      {lineOpacity > 0 && nodes.map((n, i) =>
        nodes.slice(i + 1).map((m, j) => (
          <line
            key={`${i}-${j}`}
            x1={n.x} y1={n.y} x2={m.x} y2={m.y}
            stroke={color}
            strokeWidth="0.5"
            opacity={lineOpacity}
            strokeDasharray={variant === "online" ? "none" : "4 4"}
          />
        ))
      )}
      {nodes.map((n, i) => (
        <g key={i} transform={`translate(${n.x - 12}, ${n.y - 12})`}>
          <circle cx="12" cy="12" r="4" fill={color} opacity={isCyan ? 0.8 : 0.4} />
          {variant === "online" && (
            <circle cx="12" cy="12" r="4" fill="none" stroke={color} strokeWidth="1" className="node-pulse-ring" />
          )}
          <text x="12" y="30" textAnchor="middle" fill={isCyan ? "#8B9EB0" : "#FFB300"} fontSize="8" fontFamily="JetBrains Mono" opacity="0.6">
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
