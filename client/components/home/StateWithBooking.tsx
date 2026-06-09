import { motion, useReducedMotion } from "framer-motion";
import { Calendar, Users, BedDouble, ChevronRight, Heart, Star } from "lucide-react";
import { springs } from "@/lib/springTokens";
import { useMarket } from "@/context/MarketContext";
import { getMarketContent } from "@/lib/content";
import { useState } from "react";

interface Props {
  onCheckIn?: () => void;
  showCheckInButton?: boolean;
}

const RESERVATION = {
  property: "Caesars Palace",
  location: "Las Vegas, NV",
  status: "Upcoming",
  dates: "April 26–28",
  nights: 2,
  roomType: "Deluxe King",
  guests: 2,
  heroImg: "https://www.caesars.com/content/dam/empire/clv/property/exterior/1920x1080/clv-property-exterior-and-fountain-02-1920x1080.jpg",
};

function HeartButton() {
  const [liked, setLiked] = useState(false);
  return (
    <button
      onClick={() => setLiked((l) => !l)}
      className="flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-md"
      aria-label={liked ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart size={20} strokeWidth={1.5} stroke="#121212" fill={liked ? "#121212" : "none"} />
    </button>
  );
}

function DateBadge({ month, day }: { month: string; day: string }) {
  return (
    <div className="flex flex-col justify-center items-center w-10 h-10 rounded-xl bg-white">
      <span
        className="text-[9px] font-bold tracking-[2px] uppercase w-full text-center leading-none"
        style={{
          background: "linear-gradient(0deg, #3D0406 0%, #6B0609 74%, #86080B 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {month}
      </span>
      <span className="text-[14px] font-semibold text-[#121212] leading-[20px] tracking-[0.1px]">
        {day}
      </span>
    </div>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <h2 className="text-[20px] font-semibold text-[#121212] leading-[26px] tracking-[-0.2px]">
      {title}
    </h2>
  );
}

export function StateWithBooking({ onCheckIn, showCheckInButton = false }: Props) {
  const { activeMarket } = useMarket();
  const content = getMarketContent(activeMarket.id);
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = (delay: number) =>
    prefersReducedMotion
      ? { duration: 0.15, ease: "linear" as const }
      : { ...springs.ListSlide, delay };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="flex flex-col gap-8 px-6 pb-[100px]" style={{ paddingTop: "60px" }}>

        {/* ── Your Trip Header ── */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fadeUp(0)}
          className="flex flex-col gap-1"
        >
          <h1
            className="font-semibold leading-[36px] text-[#121212]"
            style={{ fontSize: 32, letterSpacing: -1 }}
          >
            Your Trip
          </h1>
          <p className="text-[14px] text-[#666] leading-[20px]">{activeMarket.name}</p>
        </motion.div>

        {/* ── Reservation Card ── */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fadeUp(0.067)}
          className="flex flex-col rounded-2xl overflow-hidden border border-[#F2F2F2]"
          style={{ boxShadow: "0 6px 20px 0 rgba(0,0,0,0.08)" }}
        >
          {/* Hero image */}
          <div className="relative" style={{ aspectRatio: "3/2" }}>
            <img
              src={RESERVATION.heroImg}
              alt={`${RESERVATION.property} exterior`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const el = e.target as HTMLImageElement;
                el.style.background = "#F2F2F2";
                el.removeAttribute("src");
              }}
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)" }}
            />
            {/* Status badge */}
            <div className="absolute top-3 left-3">
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full text-white"
                style={{ background: "linear-gradient(0deg, #3D0406 0%, #6B0609 74%, #86080B 100%)" }}>
                {RESERVATION.status}
              </span>
            </div>
            {/* Heart */}
            <div className="absolute top-3 right-3">
              <HeartButton />
            </div>
            {/* Property name over image */}
            <div className="absolute bottom-3 left-4 right-4">
              <h2 className="text-white font-bold text-[20px] leading-tight">
                {RESERVATION.property}
              </h2>
              <p className="text-white/70 text-[13px]">{RESERVATION.location}</p>
            </div>
          </div>

          {/* Details row */}
          <div className="bg-white px-4 py-4 flex gap-4">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-[#666] shrink-0" />
              <span className="text-[13px] text-[#121212]">{RESERVATION.dates}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BedDouble size={14} className="text-[#666] shrink-0" />
              <span className="text-[13px] text-[#121212]">{RESERVATION.roomType}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users size={14} className="text-[#666] shrink-0" />
              <span className="text-[13px] text-[#121212]">{RESERVATION.guests}</span>
            </div>
          </div>

          {/* CTA row */}
          <div className="flex gap-2 px-4 pb-4">
            <button className={`bg-[#F2F2F2] text-[#121212] font-semibold text-[14px] rounded-xl py-3 ${showCheckInButton ? 'flex-1' : 'w-full'}`}>
              Manage
            </button>
            {showCheckInButton && (
              <motion.button
                whileTap={prefersReducedMotion ? {} : { scale: 0.96 }}
                transition={springs.LiquidGlassTap}
                onClick={onCheckIn}
                className="flex-1 bg-[#121212] text-white font-bold text-[14px] rounded-xl py-3"
              >
                Begin Check-in
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* ── Upgrade & Save ── */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fadeUp(0.134)}
          className="flex items-center justify-between rounded-2xl overflow-hidden p-4"
          style={{ background: "linear-gradient(135deg, #86080B 0%, #6B0609 50%, #200203 100%)" }}
        >
          <div className="flex-1 mr-3">
            <p
              className="text-[11px] font-bold uppercase tracking-widest mb-1"
              style={{ color: "#C9A96E" }}
            >
              Upgrade &amp; Save
            </p>
            <h3 className="text-white font-bold text-[15px] leading-tight">
              {content.upgradeTagline}
            </h3>
          </div>
          <motion.button
            whileTap={prefersReducedMotion ? {} : { scale: 0.96 }}
            transition={springs.LiquidGlassTap}
            className="shrink-0 flex items-center gap-1 bg-white text-[#86080B] font-bold text-[13px] rounded-xl px-3 py-2"
          >
            Show upgrades <ChevronRight size={14} />
          </motion.button>
        </motion.div>

        {/* ── Offers you'll love ── */}
        <div className="flex flex-col gap-4">
          <SectionHeading title="Offers you'll love" />
          <div
            className="-mx-6 flex gap-3 overflow-x-auto px-6"
            style={{ scrollbarWidth: "none" }}
          >
            {content.offers.map((offer, i) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...springs.ListSlide, delay: 0.2 + i * 0.067 }}
                className="shrink-0 flex flex-col gap-2 w-48"
              >
                <div
                  className="relative rounded-xl overflow-hidden"
                  style={{ aspectRatio: "1/1" }}
                >
                  <img
                    src={offer.imageUrl}
                    alt={offer.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const el = e.target as HTMLImageElement;
                      el.style.background = "#F2F2F2";
                      el.removeAttribute("src");
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)" }}
                  />
                  {offer.badge && (
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-[#121212]">
                      {offer.badge}
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white font-bold text-[13px] leading-tight">{offer.title}</p>
                    <button className="mt-0.5 text-[#C9A96E] text-[11px] font-semibold flex items-center gap-0.5">
                      {offer.cta} <ChevronRight size={10} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            <div className="shrink-0 w-2" />
          </div>
        </div>

        {/* ── Elevate your stay ── */}
        <div className="flex flex-col gap-4">
          <SectionHeading title="Elevate your stay" />
          <div
            className="-mx-6 flex gap-3 overflow-x-auto px-6"
            style={{ scrollbarWidth: "none" }}
          >
            {content.events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...springs.ListSlide, delay: 0.3 + i * 0.067 }}
                className="shrink-0 flex flex-col gap-3 w-64"
              >
                <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: "1/1" }}>
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const el = e.target as HTMLImageElement;
                      el.style.background = "#F2F2F2";
                      el.removeAttribute("src");
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 55%)" }}
                  />
                  {/* Heart */}
                  <div className="absolute top-3 right-3">
                    <HeartButton />
                  </div>
                  {/* Date badge */}
                  <div className="absolute top-3 left-3">
                    <DateBadge month={event.date.split(" ")[0]?.toUpperCase() ?? "APR"} day={event.date.split(" ")[1] ?? "26"} />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white font-bold text-[14px] leading-tight">{event.title}</p>
                    <p className="text-white/70 text-[12px] mt-0.5">{event.subtitle}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            <div className="shrink-0 w-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
