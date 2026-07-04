const GRID_MASK =
  "radial-gradient(ellipse 100% 70% at 50% 0%, #000 0%, #000 28%, transparent 72%)";

export function AzureBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(125% 125% at 50% 100%, #000000 40%, #010133 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.14) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.14) 1px, transparent 1px)
          `,
          backgroundSize: "20px 30px",
          WebkitMaskImage: GRID_MASK,
          maskImage: GRID_MASK,
        }}
      />
    </div>
  );
}
