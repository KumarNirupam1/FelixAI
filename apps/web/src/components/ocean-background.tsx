const OCEAN_GRADIENT =
  "radial-gradient(70% 55% at 50% 50%, #2a5d77 0%, #184058 18%, #0f2a43 34%, #0a1b30 50%, #071226 66%, #040d1c 80%, #020814 92%, #01040d 97%, #000309 100%), radial-gradient(160% 130% at 10% 10%, rgba(0,0,0,0) 38%, #000309 76%, #000208 100%), radial-gradient(160% 130% at 90% 90%, rgba(0,0,0,0) 38%, #000309 76%, #000208 100%)";

export function OceanBackground() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-black"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{ background: OCEAN_GRADIENT }}
        aria-hidden
      />
      {/* Soft ocean depth — matches gradient center tone */}
      <div
        className="pointer-events-none fixed left-1/2 top-[18%] z-0 h-[480px] w-[640px] -translate-x-1/2 rounded-full opacity-25 blur-[130px]"
        style={{ background: "radial-gradient(circle, #2a5d7744 0%, transparent 70%)" }}
        aria-hidden
      />
    </>
  );
}
