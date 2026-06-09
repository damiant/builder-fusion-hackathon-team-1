import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from "framer-motion";
import { springs } from "@/lib/springTokens";
import { useMarket } from "@/context/MarketContext";
import { getMarketContent } from "@/lib/content";

interface Props {
  onSignIn: () => void;
  onJoin: () => void;
}

const COMMIT_VELOCITY = 180;
const COMMIT_DISPLACEMENT = 28;
const AUTOPLAY_INTERVAL = 3000;

// ── Slide data ──────────────────────────────────────────────────────────────
interface Slide {
  id: string;
  headline: string;
  subtext: string | null;
  extraCta?: string;
  visual: "cards" | "loyalty" | "room" | "coin";
}

const SLIDES: Slide[] = [
  {
    id: "stay",
    headline: "Stay, dine, or play\nat any Caesars resort",
    subtext: "Access over 50 resorts across the US, all under one great membership",
    visual: "cards",
  },
  {
    id: "earn",
    headline: "Earn a credit for every\ndollar you spend",
    subtext: "No minimum spend. Credits add up from your very first dollar.",
    visual: "loyalty",
  },
  {
    id: "redeem",
    headline: "Redeem on stays,\ndining, shows & more",
    subtext: "From a free stay to front-row seats, credits go further than you think.",
    visual: "room",
  },
  {
    id: "unlock",
    headline: "Unlock more with\nCaesars Rewards",
    subtext: null,
    extraCta: "EXPLORE BENEFITS",
    visual: "coin",
  },
];

// ── Visuals ──────────────────────────────────────────────────────────────────

interface CardsVisualProps {
  properties: { id: string; name: string; shortName: string; imageUrl: string }[];
}

function CardsVisual({ properties }: CardsVisualProps) {
  const cards = properties.slice(0, 3);
  const configs = [
    { rotate: -9, tx: -52, ty: 18, scale: 0.88, z: 0 },
    { rotate: 5, tx: 44, ty: 24, scale: 0.88, z: 1 },
    { rotate: -1, tx: 0, ty: 0, scale: 1.0, z: 2 },
  ];
  return (
    <div className="relative" style={{ width: 240, height: 300 }}>
      {cards.map((p, i) => {
        const c = configs[i] ?? { rotate: 0, tx: 0, ty: 0, scale: 1, z: i };
        return (
          <div
            key={p.id}
            className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
            style={{
              transform: `rotate(${c.rotate}deg) translate(${c.tx}px, ${c.ty}px) scale(${c.scale})`,
              zIndex: c.z,
            }}
          >
            <img
              src={p.imageUrl}
              alt={p.name}
              className="w-full h-full object-cover"
              draggable={false}
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)" }}
            />
            <div className="absolute bottom-3 left-3">
              <p className="text-white font-bold text-sm leading-tight drop-shadow">{p.shortName}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function LoyaltyCardVisual() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 280, height: 300 }}>
      {/* Floating coins */}
      {[
        { size: 64, top: "4%", left: "2%", opacity: 0.85, delay: 0 },
        { size: 44, top: "60%", left: "-2%", opacity: 0.6, delay: 0.4 },
        { size: 52, top: "8%", right: "0%", opacity: 0.7, delay: 0.2 },
        { size: 36, top: "70%", right: "4%", opacity: 0.55, delay: 0.6 },
        { size: 28, top: "35%", left: "4%", opacity: 0.45, delay: 0.3 },
      ].map((coin, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: coin.size,
            height: coin.size,
            top: coin.top,
            left: (coin as { left?: string }).left,
            right: (coin as { right?: string }).right,
            opacity: coin.opacity,
            background: "linear-gradient(135deg, #FFD892 0%, #E1BB76 40%, #9C7303 100%)",
            boxShadow: "0 4px 16px rgba(201,169,110,0.4)",
          }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: coin.delay }}
        />
      ))}

      {/* Loyalty card */}
      <motion.div
        className="relative rounded-2xl overflow-hidden shadow-2xl"
        style={{
          width: 210,
          height: 134,
          background: "linear-gradient(135deg, #C9A96E 0%, #E1BB76 30%, #9C7303 70%, #C9A96E 100%)",
        }}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 p-4 flex flex-col justify-between">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-black/50">Julius Caesar</p>
            <p className="text-[9px] font-semibold text-black/50">Gold Member</p>
          </div>
          <div>
            <p className="text-[8px] font-bold uppercase tracking-[2px] text-black/50">Rewards Credits</p>
            <p className="text-[38px] font-extrabold text-black/75 leading-none mt-0.5">4750</p>
          </div>
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)" }}
        />
      </motion.div>
    </div>
  );
}

function RoomVisual() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 280, height: 300 }}>
      {/* Main hotel room card */}
      <div
        className="absolute rounded-2xl overflow-hidden shadow-2xl"
        style={{ width: 210, height: 200, top: "12%", left: "50%", transform: "translateX(-50%) rotate(-2deg)" }}
      >
        <img
          src="https://www.caesars.com/content/dam/empire/cl1/rooms/deluxe-room/1920x1080/cl1-deluxe-room-2-1920x1080.jpg"
          alt="Luxury hotel room"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>
      {/* Steak plate card */}
      <motion.div
        className="absolute rounded-2xl overflow-hidden shadow-xl"
        style={{ width: 110, height: 110, top: "2%", right: "4%" }}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      >
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/a0aec7389b59c267fe9e6cb147a75e605ac97963?width=220"
          alt="Fine dining"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </motion.div>
      {/* Entertainer card */}
      <motion.div
        className="absolute rounded-2xl overflow-hidden shadow-xl"
        style={{ width: 100, height: 120, bottom: "2%", left: "0%" }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/5e758c331d3492e529f6e59aeb05bb9d2a9d5bee?width=200"
          alt="Entertainment show"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </motion.div>
    </div>
  );
}

function CoinVisual() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 280, height: 300 }}>
      {/* Background glow */}
      <div
        className="absolute rounded-full blur-3xl opacity-25"
        style={{ width: 220, height: 220, background: "#C9A96E" }}
      />
      {/* Large coin */}
      <motion.div
        className="relative rounded-full shadow-2xl flex items-center justify-center"
        style={{
          width: 140,
          height: 140,
          background: "linear-gradient(135deg, #FFD892 0%, #E1BB76 35%, #9C7303 65%, #C9A96E 100%)",
          boxShadow: "0 8px 40px rgba(201,169,110,0.6), inset 0 2px 8px rgba(255,255,255,0.3)",
        }}
        animate={{ y: [0, -10, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute rounded-full" style={{ inset: 12, border: "2px solid rgba(0,0,0,0.12)" }} />
        <span className="text-[36px] font-extrabold select-none" style={{ color: "rgba(0,0,0,0.22)" }}>C</span>
      </motion.div>
      {/* Scattered coins */}
      {[
        { size: 60, top: "2%", left: "2%", delay: 0.5, rotate: -20 },
        { size: 48, top: "0%", right: "4%", delay: 1.0, rotate: 30 },
        { size: 36, bottom: "8%", left: "0%", delay: 1.5, rotate: -10 },
        { size: 52, bottom: "4%", right: "2%", delay: 0.8, rotate: 15 },
        { size: 28, top: "38%", left: "2%", delay: 0.3, rotate: 5 },
      ].map((c, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: c.size,
            height: c.size,
            top: (c as { top?: string }).top,
            bottom: (c as { bottom?: string }).bottom,
            left: (c as { left?: string }).left,
            right: (c as { right?: string }).right,
            background: "linear-gradient(135deg, #FFD892 0%, #9C7303 100%)",
            boxShadow: "0 3px 10px rgba(201,169,110,0.4)",
            transform: `rotate(${c.rotate}deg)`,
          }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: c.delay }}
        />
      ))}
    </div>
  );
}

// ── Parallax variants ─────────────────────────────────────────────────────────

// Text enters/exits at 0.3x distance = parallax depth effect
const textVariants = {
  enter: (dir: number) => ({ x: dir * 28, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -28, opacity: 0 }),
};

// Visual enters/exits at full distance (1.0x)
const visualVariants = {
  enter: (dir: number) => ({ x: dir * 80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -80, opacity: 0 }),
};

// ── Main component ────────────────────────────────────────────────────────────

export function StateUnauthenticated({ onSignIn, onJoin }: Props) {
  const { activeMarket } = useMarket();
  const content = getMarketContent(activeMarket.id);
  const properties = content.featuredProperties;
  const prefersReducedMotion = useReducedMotion();

  const [slideIndex, setSlideIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  // Parallax motion values
  const dragX = useMotionValue(0);
  // Text layer moves at 0.3x during drag (creates depth)
  const textParallaxX = useTransform(dragX, (v) => v * 0.3);
  // Visual layer moves at full 1.0x during drag
  const visualParallaxX = useTransform(dragX, (v) => v * 1.0);

  const dragStartX = useRef(0);
  const isDragging = useRef(false);
  const velocityRef = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(Date.now());

  const total = SLIDES.length;

  const goTo = useCallback(
    (idx: number, loop = false) => {
      const next = loop ? ((idx % total) + total) % total : Math.max(0, Math.min(total - 1, idx));
      setDirection(next > slideIndex || (loop && slideIndex === total - 1 && next === 0) ? 1 : -1);
      setSlideIndex(next);
      dragX.set(0);
    },
    [slideIndex, total, dragX]
  );

  // Auto-play: advance every 3 seconds
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const id = setInterval(() => {
      setDirection(1);
      setSlideIndex((i) => (i + 1) % total);
      dragX.set(0);
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(id);
  }, [isPaused, prefersReducedMotion, total, dragX]);

  // Reset to slide 0 when market changes
  useEffect(() => {
    setSlideIndex(0);
  }, [activeMarket.id]);

  function handlePointerDown(e: React.PointerEvent) {
    if (e.button !== 0) return;
    dragStartX.current = e.clientX;
    lastX.current = e.clientX;
    lastTime.current = Date.now();
    isDragging.current = true;
    setIsPaused(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStartX.current;
    const atStart = slideIndex === 0 && dx > 0;
    const atEnd = slideIndex === total - 1 && dx < 0;
    dragX.set(dx * (atStart || atEnd ? 0.25 : 1));
    const now = Date.now();
    const dt = Math.max(now - lastTime.current, 1);
    velocityRef.current = ((e.clientX - lastX.current) / dt) * 1000;
    lastX.current = e.clientX;
    lastTime.current = now;
  }

  function handlePointerUp() {
    if (!isDragging.current) return;
    isDragging.current = false;
    const dx = dragX.get();
    const vel = velocityRef.current;
    const commit = Math.abs(vel) > COMMIT_VELOCITY || Math.abs(dx) > COMMIT_DISPLACEMENT;

    if (commit) {
      if (dx < 0 && slideIndex < total - 1) goTo(slideIndex + 1);
      else if (dx > 0 && slideIndex > 0) goTo(slideIndex - 1);
      else animate(dragX, 0, springs.Snappy);
    } else {
      animate(dragX, 0, springs.Snappy);
    }

    velocityRef.current = 0;
    // Resume auto-play after short delay
    setTimeout(() => setIsPaused(false), 1000);
  }

  // Keyboard nav
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") goTo(slideIndex + 1);
    else if (e.key === "ArrowLeft") goTo(slideIndex - 1);
    else if (e.key === "Home") goTo(0);
    else if (e.key === "End") goTo(total - 1);
  }

  const current = SLIDES[slideIndex];

  return (
    <div
      className="relative flex flex-col overflow-hidden select-none"
      style={{ minHeight: "100svh" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Resort properties"
      aria-roledescription="carousel"
    >
      {/* ── Background gradient ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #86080B 0%, #6B0609 45%, #200203 100%)" }}
      />

      {/* Ambient gold glow */}
      <div
        aria-hidden="true"
        className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[180%] h-72 opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, #C9A96E 0%, transparent 70%)" }}
      />

      {/* Status bar spacer */}
      <div className="relative shrink-0 pt-16" />

      {/* ── Text layer — parallax at 0.3x ── */}
      <motion.div
        style={prefersReducedMotion ? {} : { x: textParallaxX }}
        className="relative shrink-0 px-6 pt-2 pb-4 text-center"
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={`text-${current.id}`}
            custom={direction}
            variants={prefersReducedMotion ? {} : textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={
              prefersReducedMotion
                ? { duration: 0.12 }
                : { ...springs.SheetPresent }
            }
          >
            <h1 className="text-white font-extrabold text-[28px] sm:text-[30px] leading-[1.2] tracking-tight whitespace-pre-line">
              {current.headline}
            </h1>
            {current.subtext && (
              <p className="text-white/60 mt-3 text-sm leading-relaxed max-w-[280px] mx-auto">
                {current.subtext}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ── Visual layer — parallax at 1.0x ── */}
      <motion.div
        style={prefersReducedMotion ? {} : { x: visualParallaxX }}
        className="relative flex-1 flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={`visual-${current.id}`}
            custom={direction}
            variants={prefersReducedMotion ? {} : visualVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={
              prefersReducedMotion
                ? { duration: 0.12 }
                : { ...springs.CardRush }
            }
            className="flex items-center justify-center"
          >
            {current.visual === "cards" && <CardsVisual properties={properties} />}
            {current.visual === "loyalty" && <LoyaltyCardVisual />}
            {current.visual === "room" && <RoomVisual />}
            {current.visual === "coin" && <CoinVisual />}
          </motion.div>
        </AnimatePresence>

        {/* Extra CTA for coin slide — centered inside visual area */}
        {current.extraCta && (
          <motion.div
            className="absolute bottom-4 left-0 right-0 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button className="px-7 py-3 rounded-full border border-white/30 bg-white/10 text-white text-xs font-bold tracking-[2px] uppercase backdrop-blur-sm">
              {current.extraCta}
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* ── Pagination dots ── */}
      <div
        className="relative flex justify-center gap-2 py-4 shrink-0"
        role="group"
        aria-label="Slide pagination"
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === slideIndex ? "true" : undefined}
            className="p-2 -m-2 flex items-center justify-center"
            style={{ minWidth: 44, minHeight: 44 }}
          >
            <motion.div
              animate={{
                width: i === slideIndex ? 20 : 6,
                opacity: i === slideIndex ? 1 : 0.35,
              }}
              transition={springs.Snappy}
              className="h-1.5 rounded-full bg-white"
            />
          </button>
        ))}
      </div>

      {/* ── CTAs ── */}
      <div className="relative px-6 pb-24 flex flex-col gap-3 shrink-0">
        <motion.button
          whileTap={prefersReducedMotion ? {} : { scale: 0.96 }}
          transition={springs.LiquidGlassTap}
          onClick={onSignIn}
          className="w-full bg-black text-white font-bold text-sm rounded-2xl py-4 tracking-wide"
          style={{ minHeight: 52 }}
        >
          SIGN IN
        </motion.button>
        <motion.button
          whileTap={prefersReducedMotion ? {} : { scale: 0.96 }}
          transition={springs.LiquidGlassTap}
          onClick={onJoin}
          className="w-full bg-white font-bold text-sm rounded-2xl py-4 tracking-wide"
          style={{ color: "#200203", minHeight: 52 }}
        >
          JOIN US
        </motion.button>
      </div>

      {/* Screen-reader live region */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {`Slide ${slideIndex + 1} of ${total}: ${current.headline.replace(/\n/g, " ")}`}
      </div>
    </div>
  );
}
