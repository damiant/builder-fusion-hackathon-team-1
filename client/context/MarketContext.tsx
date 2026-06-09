import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Market,
  MarketId,
  detectMarketFromCoords,
  getMarketById,
  markets,
} from "@/lib/markets";

type DetectionMethod = "gps" | "booking" | "manual" | "default";

interface MarketContextValue {
  activeMarket: Market;
  detectionMethod: DetectionMethod;
  setMarket: (id: MarketId, method?: DetectionMethod) => void;
  isDetecting: boolean;
  allMarkets: Market[];
}

const MarketContext = createContext<MarketContextValue | null>(null);

export function MarketProvider({ children }: { children: React.ReactNode }) {
  const [activeMarket, setActiveMarket] = useState<Market>(markets[0]);
  const [detectionMethod, setDetectionMethod] = useState<DetectionMethod>("default");
  const [isDetecting, setIsDetecting] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) return;
    setIsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const detected = detectMarketFromCoords(pos.coords.latitude, pos.coords.longitude);
        if (detected) {
          setActiveMarket(detected);
          setDetectionMethod("gps");
        }
        setIsDetecting(false);
      },
      () => {
        setIsDetecting(false);
      },
      { timeout: 5000 }
    );
  }, []);

  function setMarket(id: MarketId, method: DetectionMethod = "manual") {
    setActiveMarket(getMarketById(id));
    setDetectionMethod(method);
  }

  return (
    <MarketContext.Provider
      value={{ activeMarket, detectionMethod, setMarket, isDetecting, allMarkets: markets }}
    >
      {children}
    </MarketContext.Provider>
  );
}

export function useMarket(): MarketContextValue {
  const ctx = useContext(MarketContext);
  if (!ctx) throw new Error("useMarket must be used within MarketProvider");
  return ctx;
}
