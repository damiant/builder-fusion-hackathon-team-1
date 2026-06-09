import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/springTokens";

export type MemberState =
  | "unauthenticated"
  | "signin"
  | "join"
  | "authenticated"
  | "booking"
  | "checkin"
  | "activestay"
  | "activestay_plans";

const stateLabels: Record<MemberState, string> = {
  unauthenticated:     "1A · Guest",
  signin:              "Sign In",
  join:                "Join Us",
  authenticated:       "1B · Member",
  booking:             "1C · Booking",
  checkin:             "1D · Check-in",
  activestay:          "1E · No Plans",
  activestay_plans:    "1E · Has Plans",
};

interface StateSwitcherProps {
  state: MemberState;
  onChange: (state: MemberState) => void;
}

export function StateSwitcher({ state, onChange }: StateSwitcherProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute top-3 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 bg-black/70 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1.5 text-white text-xs font-medium hover:bg-black/80 transition-colors shadow-sm"
        aria-expanded={open}
        aria-label="Switch preview state"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-caesars-gold" />
        {stateLabels[state]}
        {open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={springs.Snappy}
            className="mt-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden flex flex-col min-w-[160px]"
          >
            {(Object.keys(stateLabels) as MemberState[]).map((s) => (
              <button
                key={s}
                onClick={() => {
                  onChange(s);
                  setOpen(false);
                }}
                className={cn(
                  "px-4 py-2.5 text-xs text-left transition-colors",
                  s === state
                    ? "text-white font-semibold bg-white/10"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                {stateLabels[s]}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
