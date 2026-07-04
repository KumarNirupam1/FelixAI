import React from "react";

const ROWS = [9.2, 45.2, 81.2, 117.2, 153.2, 189.2, 225.2, 261.2, 297.2, 333.2, 369.2, 405.2, 441.2, 477.2, 513.2, 549.2, 585.2, 621.2, 657.2, 693.2, 729.2, 765.2];

const HIGHLIGHTS = [
  { x: 699.711, y: 81, opacity: 0.08 },
  { x: 195.711, y: 153, opacity: 0.09 },
  { x: 1023.71, y: 153, opacity: 0.09 },
  { x: 123.711, y: 225, opacity: 0.09 },
  { x: 1095.71, y: 225, opacity: 0.09 },
  { x: 951.711, y: 297, opacity: 0.09 },
  { x: 231.711, y: 333, opacity: 0.07 },
  { x: 303.711, y: 405, opacity: 0.07 },
  { x: 87.7109, y: 405, opacity: 0.09 },
  { x: 519.711, y: 405, opacity: 0.08 },
  { x: 771.711, y: 405, opacity: 0.09 },
  { x: 591.711, y: 477, opacity: 0.07 },
];

export function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 w-full overflow-hidden">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1220 810"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <g clipPath="url(#felix-hero-clip)">
          <mask
            id="felix-hero-mask"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="10"
            y="-1"
            width="1200"
            height="812"
          >
            <rect x="10" y="-0.84668" width="1200" height="811.693" fill="url(#felix-hero-mask-gradient)" />
          </mask>

          <g mask="url(#felix-hero-mask)">
            {[...Array(35)].map((_, i) => (
              <React.Fragment key={i}>
                {ROWS.map((y) => (
                  <rect
                    key={`${i}-${y}`}
                    x={-20.0891 + i * 36}
                    y={y}
                    width="35.6"
                    height="35.6"
                    stroke="hsl(var(--foreground))"
                    strokeOpacity="0.11"
                    strokeWidth="0.4"
                    strokeDasharray="2 2"
                  />
                ))}
              </React.Fragment>
            ))}

            {HIGHLIGHTS.map((cell) => (
              <rect
                key={`${cell.x}-${cell.y}`}
                x={cell.x}
                y={cell.y}
                width="36"
                height="36"
                fill="hsl(var(--foreground))"
                fillOpacity={cell.opacity}
              />
            ))}
          </g>

          <g filter="url(#felix-hero-blur-1)">
            <path
              d="M1447.45 -87.0203V-149.03H1770V1248.85H466.158V894.269C1008.11 894.269 1447.45 454.931 1447.45 -87.0203Z"
              fill="url(#felix-hero-light-1)"
            />
          </g>

          <g filter="url(#felix-hero-blur-2)">
            <path
              d="M1383.45 -151.02V-213.03H1706V1184.85H402.158V830.269C944.109 830.269 1383.45 390.931 1383.45 -151.02Z"
              fill="url(#felix-hero-light-2)"
              fillOpacity="0.69"
            />
          </g>

          <g style={{ mixBlendMode: "lighten" }} filter="url(#felix-hero-blur-3)">
            <path
              d="M1567.45 -231.02V-293.03H1890V1104.85H586.158V750.269C1128.11 750.269 1567.45 310.931 1567.45 -231.02Z"
              fill="url(#felix-hero-light-3)"
            />
          </g>

          <g style={{ mixBlendMode: "overlay" }} filter="url(#felix-hero-blur-4)">
            <path
              d="M65.625 750.269H284.007C860.205 750.269 1327.31 283.168 1327.31 -293.03H1650V1104.85H65.625V750.269Z"
              fill="url(#felix-hero-radial)"
              fillOpacity="0.64"
            />
          </g>
        </g>

        <rect
          x="0.5"
          y="0.5"
          width="1219"
          height="809"
          rx="15.5"
          stroke="hsl(var(--foreground))"
          strokeOpacity="0.06"
        />

        <defs>
          <filter id="felix-hero-blur-1" x="147.369" y="-467.818" width="1941.42" height="2035.46" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="159.394" result="effect1_foregroundBlur" />
          </filter>
          <filter id="felix-hero-blur-2" x="-554.207" y="-1169.39" width="3216.57" height="3310.61" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="478.182" result="effect1_foregroundBlur" />
          </filter>
          <filter id="felix-hero-blur-3" x="426.762" y="-452.424" width="1622.63" height="1716.67" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="79.6969" result="effect1_foregroundBlur" />
          </filter>
          <filter id="felix-hero-blur-4" x="-253.163" y="-611.818" width="2221.95" height="2035.46" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="159.394" result="effect1_foregroundBlur" />
          </filter>

          <linearGradient id="felix-hero-mask-gradient" x1="35.0676" y1="23.6807" x2="903.8" y2="632.086" gradientUnits="userSpaceOnUse">
            <stop stopColor="hsl(var(--foreground))" stopOpacity="0" />
            <stop offset="1" stopColor="hsl(var(--muted-foreground))" />
          </linearGradient>

          <linearGradient id="felix-hero-light-1" x1="1118.08" y1="-149.03" x2="1118.08" y2="1248.85" gradientUnits="userSpaceOnUse">
            <stop stopColor="hsl(var(--foreground))" />
            <stop offset="0.578125" stopColor="hsl(var(--primary-light))" />
            <stop offset="1" stopColor="hsl(var(--primary))" />
          </linearGradient>
          <linearGradient id="felix-hero-light-2" x1="1054.08" y1="-213.03" x2="1054.08" y2="1184.85" gradientUnits="userSpaceOnUse">
            <stop stopColor="hsl(var(--foreground))" />
            <stop offset="0.578125" stopColor="hsl(var(--primary-light))" />
            <stop offset="1" stopColor="hsl(var(--primary))" />
          </linearGradient>
          <linearGradient id="felix-hero-light-3" x1="1238.08" y1="-293.03" x2="1238.08" y2="1104.85" gradientUnits="userSpaceOnUse">
            <stop stopColor="hsl(var(--foreground))" />
            <stop offset="0.578125" stopColor="hsl(var(--primary-light))" />
            <stop offset="1" stopColor="hsl(var(--primary))" />
          </linearGradient>
          <radialGradient id="felix-hero-radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(989.13 557.24) rotate(47.9516) scale(466.313 471.424)">
            <stop stopColor="hsl(var(--foreground))" />
            <stop offset="0.157789" stopColor="hsl(var(--primary-light))" />
            <stop offset="1" stopColor="hsl(var(--primary))" />
          </radialGradient>

          <clipPath id="felix-hero-clip">
            <rect width="1220" height="810" rx="16" fill="hsl(var(--foreground))" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
