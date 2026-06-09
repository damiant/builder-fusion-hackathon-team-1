// Optimus Design System spring tokens mapped to Framer Motion format
// Source: Fantasy Motion Design System Tokens (CR App Internal Sandbox, May 2026)

export const springs = {
  SheetPresent:   { type: "spring" as const, stiffness: 68,  damping: 26 }, // 0.40s / 1.0
  NavPush:        { type: "spring" as const, stiffness: 82,  damping: 28 }, // 0.35s / 1.0
  LiquidGlassTap: { type: "spring" as const, stiffness: 111, damping: 18 }, // 0.30s / 0.60
  CardRush:       { type: "spring" as const, stiffness: 82,  damping: 26 }, // 0.35s / 0.90
  ListSlide:      { type: "spring" as const, stiffness: 82,  damping: 25 }, // 0.35s / 0.85
  BouncyButton:   { type: "spring" as const, stiffness: 63,  damping: 20 }, // 0.40s / 0.65
  FluidDrawer:    { type: "spring" as const, stiffness: 111, damping: 22 }, // 0.30s / 0.80
  Snappy:         { type: "spring" as const, stiffness: 160, damping: 32 }, // 0.25s / 1.0
  ExitFast:       { type: "spring" as const, stiffness: 250, damping: 40 }, // 0.20s / 1.0
};

// Linear transitions for opacity/color (property safety rules)
export const linear = {
  fast:   { duration: 0.15, ease: "linear" as const },
  normal: { duration: 0.30, ease: "linear" as const },
  slow:   { duration: 0.40, ease: "linear" as const },
};

// Reduced motion alternatives
export const reducedMotion = {
  opacity: { duration: 0.15, ease: "linear" as const },
  none: { duration: 0, ease: "linear" as const },
};
