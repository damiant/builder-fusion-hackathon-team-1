import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { springs } from "@/lib/springTokens";
import { X } from "lucide-react";

export type TierLevel = "gold" | "platinum" | "diamond";

interface TierConfig {
  level: TierLevel;
  headline: string;
  subtext: string;
  tierLabel: string;
  ctaLabel: string;
}

const TIERS: Record<TierLevel, TierConfig> = {
  gold: {
    level: "gold",
    headline: "You're golden!",
    subtext: "Welcome. You're now an official member with",
    tierLabel: "Gold",
    ctaLabel: "VIEW BENEFITS",
  },
  platinum: {
    level: "platinum",
    headline: "You're platinum!",
    subtext: "Welcome. You're now an official member with",
    tierLabel: "Platinum",
    ctaLabel: "VIEW BENEFITS",
  },
  diamond: {
    level: "diamond",
    headline: "Diamond status!",
    subtext: "Congratulations. You've achieved",
    tierLabel: "Diamond",
    ctaLabel: "VIEW BENEFITS",
  },
};

const BG_IMAGE =
  "https://cdn.builder.io/api/v1/image/assets%2F388662fb7ec843d0bed672fdc53e11a1%2Fa9b4c58fee3641b1bcae17d1c6678956?format=webp&width=800&height=1200";

// Individual floating dot — drifts upward with fade in/out
function FloatingDot({
  x,
  startY,
  size,
  color,
  duration,
  delay,
}: {
  x: string;
  startY: string;
  size: number;
  color: string;
  duration: number;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x,
        top: startY,
        width: size,
        height: size,
        background: color,
        boxShadow: `0 0 ${size * 2}px ${color}`,
      }}
      initial={{ opacity: 0, y: 0 }}
      animate={{
        opacity: [0, 0.9, 0.9, 0],
        y: [0, -30, -60, -90],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: 1.5 + Math.random() * 3,
        ease: "easeOut",
      }}
    />
  );
}

const DOTS = [
  { x: "12%",  startY: "24%", size: 5,   color: "#9FD070", duration: 3.2, delay: 0.0 },
  { x: "78%",  startY: "18%", size: 4,   color: "#7FBA5A", duration: 2.8, delay: 0.7 },
  { x: "88%",  startY: "32%", size: 5,   color: "#9FD070", duration: 3.6, delay: 1.4 },
  { x: "6%",   startY: "44%", size: 3.5, color: "#7FBA5A", duration: 2.5, delay: 2.1 },
  { x: "55%",  startY: "12%", size: 4,   color: "#9FD070", duration: 3.0, delay: 0.4 },
  { x: "22%",  startY: "62%", size: 4.5, color: "#7FBA5A", duration: 3.4, delay: 1.8 },
  { x: "82%",  startY: "58%", size: 4,   color: "#9FD070", duration: 2.9, delay: 0.9 },
  { x: "38%",  startY: "82%", size: 5,   color: "#7FBA5A", duration: 3.1, delay: 2.6 },
  { x: "68%",  startY: "75%", size: 3.5, color: "#9FD070", duration: 2.7, delay: 1.2 },
  { x: "15%",  startY: "80%", size: 4,   color: "#7FBA5A", duration: 3.3, delay: 3.0 },
  { x: "92%",  startY: "70%", size: 3,   color: "#9FD070", duration: 2.6, delay: 1.7 },
  { x: "44%",  startY: "22%", size: 3.5, color: "#7FBA5A", duration: 3.5, delay: 2.3 },
];

interface Props {
  tier: TierLevel;
  onDismiss: () => void;
}

export function TierMilestoneModal({ tier, onDismiss }: Props) {
  const config = TIERS[tier];
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  function dismiss() {
    setVisible(false);
    setTimeout(onDismiss, 400);
  }

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") dismiss();
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${config.headline} - Tier milestone`}
          className="absolute inset-0 z-50 flex flex-col items-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {/* Full-screen background image */}
          <img
            src={BG_IMAGE}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />

          {/* Dim overlay to ensure text readability */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "rgba(0,0,0,0.15)" }}
          />

          {/* Animated floating dots */}
          {!prefersReducedMotion &&
            DOTS.map((dot, i) => <FloatingDot key={i} {...dot} />)}

          {/* Close button */}
          <div className="w-full flex justify-end px-5 pt-14 z-10 flex-shrink-0">
            <motion.button
              onClick={dismiss}
              className="flex items-center justify-center w-10 h-10 rounded-full text-white"
              style={{
                background: "rgba(30,20,10,0.45)",
                border: "1px solid rgba(255,255,255,0.22)",
                backdropFilter: "blur(8px)",
              }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
              aria-label="Dismiss"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.3 }}
            >
              <X size={18} strokeWidth={2.5} />
            </motion.button>
          </div>

          {/* Headline */}
          <motion.h1
            className="text-white font-bold text-center z-10 flex-shrink-0 mt-5"
            style={{
              fontSize: 34,
              letterSpacing: -0.5,
              lineHeight: 1.1,
              textShadow: "0 2px 16px rgba(0,0,0,0.6)",
            }}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0.15 }
                : { ...springs.SheetPresent, delay: 0.2 }
            }
          >
            {config.headline}
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="text-center z-10 flex-shrink-0 mt-3 px-10"
            style={{
              color: "rgba(255,255,255,0.72)",
              fontSize: 15,
              lineHeight: 1.55,
              maxWidth: 300,
              textShadow: "0 1px 8px rgba(0,0,0,0.5)",
            }}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0.15 }
                : { ...springs.SheetPresent, delay: 0.35 }
            }
          >
            {config.subtext}{" "}
            <span className="text-white font-semibold">
              {config.tierLabel} tier status
            </span>
          </motion.p>

          {/* Spacer pushes CTA to bottom */}
          <div className="flex-1" />

          {/* Bottom CTA */}
          <motion.div
            className="w-full px-6 pb-10 z-10 flex-shrink-0"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0.15 }
                : { ...springs.SheetPresent, delay: 0.6 }
            }
          >
            <motion.button
              onClick={dismiss}
              whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
              transition={springs.LiquidGlassTap}
              className="w-full h-14 rounded-2xl flex items-center justify-center font-semibold"
              style={{
                background: "rgba(40,28,8,0.55)",
                border: "1px solid rgba(255,255,255,0.18)",
                backdropFilter: "blur(12px)",
                color: "rgba(255,255,255,0.82)",
                fontSize: 13,
                letterSpacing: "0.15em",
              }}
            >
              {config.ctaLabel}
            </motion.button>
          </motion.div>

          {/* Home indicator */}
          <div
            className="w-32 h-1 rounded-full mb-2 flex-shrink-0 z-10"
            style={{ background: "rgba(255,255,255,0.18)" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
