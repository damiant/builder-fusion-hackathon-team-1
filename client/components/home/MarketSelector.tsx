import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ChevronDown, Check, X } from "lucide-react";
import { useMarket } from "@/context/MarketContext";
import { MarketId } from "@/lib/markets";
import { springs } from "@/lib/springTokens";
import { cn } from "@/lib/utils";

export function MarketSelector() {
  const { activeMarket, allMarkets, setMarket, detectionMethod } = useMarket();
  const [open, setOpen] = useState(false);

  const detectionLabel =
    detectionMethod === "gps"
      ? "Auto-detected"
      : detectionMethod === "booking"
      ? "From booking"
      : detectionMethod === "manual"
      ? "Your selection"
      : "Default";

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls="market-sheet"
        className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-3 py-1.5 text-white text-xs font-medium hover:bg-white/20 transition-colors"
      >
        <MapPin size={11} className="opacity-80" aria-hidden="true" />
        {activeMarket.name}
        <ChevronDown size={11} className="opacity-60" aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "linear" }}
              className="fixed inset-0 bg-black/60 z-[60]"
              onClick={() => setOpen(false)}
            />

            {/* Sheet */}
            <motion.div
              id="market-sheet"
              role="dialog"
              aria-modal="true"
              aria-label="Select your market"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={springs.SheetPresent}
              className="fixed bottom-0 left-0 right-0 z-[61] bg-[#1a0304] border-t border-white/10 rounded-t-3xl overflow-hidden"
              style={{ maxHeight: "70vh" }}
            >
              <div className="px-5 pt-5 pb-3 flex justify-between items-center">
                <div>
                  <h2 className="text-white font-semibold text-base">Select Market</h2>
                  <p className="text-white/40 text-xs mt-0.5">{detectionLabel}</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-colors"
                  aria-label="Close market selector"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="px-3 pb-8 space-y-1">
                {allMarkets.map((market) => {
                  const isActive = market.id === activeMarket.id;
                  return (
                    <button
                      key={market.id}
                      onClick={() => {
                        setMarket(market.id as MarketId, "manual");
                        setOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between rounded-2xl px-4 py-3.5 transition-colors",
                        isActive ? "bg-white/10" : "hover:bg-white/5"
                      )}
                    >
                      <div className="text-left">
                        <div className={cn("font-semibold text-sm", isActive ? "text-white" : "text-white/70")}>
                          {market.name}
                        </div>
                        <div className="text-white/40 text-xs mt-0.5">
                          {market.propertyCount} {market.propertyCount === 1 ? "property" : "properties"}
                        </div>
                      </div>
                      {isActive && (
                        <Check size={16} className="text-caesars-gold shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
