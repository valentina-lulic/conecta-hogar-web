export function MapBackground() {
  const W = 800;
  const H = 1800;

  // City block grid
  const colGap = 38;
  const rowGap = 34;
  const cols = Math.ceil(W / colGap) + 1;
  const rows = Math.ceil(H / rowGap) + 1;

  // Thicker "avenue" every N lines
  const isAvenue = (i: number) => i % 5 === 0;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
      aria-hidden
    >
      <defs>
        {/* Main vertical gradient — sky → yellow → pink */}
        <linearGradient id="mapGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#a8e6f0" />
          <stop offset="18%"  stopColor="#55bcd9" />
          <stop offset="45%"  stopColor="#f5d318" />
          <stop offset="72%"  stopColor="#f5a623" />
          <stop offset="100%" stopColor="#e83360" />
        </linearGradient>

        {/* Subtle block-fill alternate tint */}
        <pattern id="blockFill" x="0" y="0" width={colGap * 2} height={rowGap * 2} patternUnits="userSpaceOnUse">
          <rect width={colGap} height={rowGap} fill="rgba(255,255,255,0.06)" />
          <rect x={colGap} y={rowGap} width={colGap} height={rowGap} fill="rgba(255,255,255,0.06)" />
        </pattern>

        <clipPath id="bounds">
          <rect width={W} height={H} />
        </clipPath>
      </defs>

      {/* Background gradient */}
      <rect width={W} height={H} fill="url(#mapGrad)" />

      {/* Checkerboard block tint */}
      <rect width={W} height={H} fill="url(#blockFill)" />

      <g clipPath="url(#bounds)" opacity="0.55">
        {/* Vertical streets */}
        {Array.from({ length: cols }, (_, i) => {
          const x = i * colGap;
          const avenue = isAvenue(i);
          return (
            <line
              key={`v${i}`}
              x1={x} y1={0} x2={x} y2={H}
              stroke="rgba(255,255,255,0.75)"
              strokeWidth={avenue ? 1.8 : 0.7}
            />
          );
        })}

        {/* Horizontal streets */}
        {Array.from({ length: rows }, (_, i) => {
          const y = i * rowGap;
          const avenue = isAvenue(i);
          return (
            <line
              key={`h${i}`}
              x1={0} y1={y} x2={W} y2={y}
              stroke="rgba(255,255,255,0.75)"
              strokeWidth={avenue ? 1.8 : 0.7}
            />
          );
        })}
      </g>

      {/* River / diagonal road 1 — top sweep */}
      <path
        d={`M -40,${H * 0.08} C ${W * 0.15},${H * 0.05} ${W * 0.4},${H * 0.14} ${W * 0.65},${H * 0.12} S ${W * 0.9},${H * 0.06} ${W + 40},${H * 0.1}`}
        fill="none"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d={`M -40,${H * 0.08} C ${W * 0.15},${H * 0.05} ${W * 0.4},${H * 0.14} ${W * 0.65},${H * 0.12} S ${W * 0.9},${H * 0.06} ${W + 40},${H * 0.1}`}
        fill="none"
        stroke="rgba(100,210,240,0.35)"
        strokeWidth="7"
        strokeLinecap="round"
      />

      {/* River / diagonal road 2 — mid sweep */}
      <path
        d={`M -40,${H * 0.38} C ${W * 0.2},${H * 0.34} ${W * 0.45},${H * 0.44} ${W * 0.7},${H * 0.4} S ${W * 0.88},${H * 0.36} ${W + 40},${H * 0.39}`}
        fill="none"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d={`M -40,${H * 0.38} C ${W * 0.2},${H * 0.34} ${W * 0.45},${H * 0.44} ${W * 0.7},${H * 0.4} S ${W * 0.88},${H * 0.36} ${W + 40},${H * 0.39}`}
        fill="none"
        stroke="rgba(100,210,240,0.3)"
        strokeWidth="7"
        strokeLinecap="round"
      />

      {/* Diagonal boulevard */}
      <path
        d={`M ${W * 0.1},0 L ${W * 0.55},${H}`}
        fill="none"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="2.5"
      />
      <path
        d={`M ${W * 0.55},0 L ${W * 0.95},${H}`}
        fill="none"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="2"
      />

      {/* Top fade to white */}
      <defs>
        <linearGradient id="fadeTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="white" stopOpacity="0.55" />
          <stop offset="18%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#fadeTop)" />
    </svg>
  );
}
