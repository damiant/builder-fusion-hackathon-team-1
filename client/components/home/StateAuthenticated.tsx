import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CreditCard, ArrowRight, Heart, Star } from "lucide-react";
import { springs } from "@/lib/springTokens";
import { useMarket } from "@/context/MarketContext";
import { getMarketContent } from "@/lib/content";
import { markets, MarketId } from "@/lib/markets";
import { cn } from "@/lib/utils";

interface Props {
  onBook: () => void;
}

const MEMBER = {
  name: "Jonathan S.",
  tier: "Gold",
  tierLabel: "Caesars Rewards Gold",
  tierProgressLabel: "999 Tier credits to Platinum",
  tierProgress: 0.75,
  credits: 3560,
  loyaltyCardImg: "https://www.caesars.com/content/dam/empire/rewards/tiers/gold-badge.png",
};

// Market-keyed offers data using Figma images
const offersByMarket: Record<string, Array<{ title: string; location: string; desc: string; img: string }>> = {
  "las-vegas": [
    {
      title: "4th of July Earning",
      location: "Multiple Resorts",
      desc: "Valid: Jan 1 - Jul 4, 2026",
      img: "https://www.caesars.com/content/dam/empire/clv/promotions/rewards/1920x1080/clv-4th-july-earning-1920x1080.jpg",
    },
    {
      title: "Special rates in Las Vegas",
      location: "Multiple resorts",
      desc: "Valid: Mar 1-30, 2026",
      img: "https://www.caesars.com/content/dam/empire/clv/property/exterior/1920x1080/clv-property-exterior-and-fountain-02-1920x1080.jpg",
    },
    {
      title: "$75 Free Table Play",
      location: "Caesars Palace",
      desc: "Valid: Mar 1-30, 2026",
      img: "https://www.caesars.com/content/dam/empire/flv/things-to-do/pool/go-pool-day-club/1920x1080/flv-flamingo-go-pool-friends-drinks-smiles-1920x1080.jpg",
    },
  ],
  "atlantic-city": [
    {
      title: "$50 Free Slot Play",
      location: "Caesars Atlantic City",
      desc: "Valid: Apr 1-30, 2026",
      img: "https://www.caesars.com/content/dam/empire/cac/casino/slots/1920x1080/cac-slots-1920x1080.jpg",
    },
    {
      title: "2-for-1 Dinner at Gordon Ramsay",
      location: "Caesars Atlantic City",
      desc: "Valid: Mar 1-30, 2026",
      img: "https://www.caesars.com/content/dam/empire/cac/dining/gordon-ramsay/1920x1080/cac-gordon-ramsay-1920x1080.jpg",
    },
    {
      title: "Boardwalk Cabana Access",
      location: "Multiple resorts",
      desc: "Valid: May 1 - Sep 1, 2026",
      img: "https://www.caesars.com/content/dam/empire/cac/pool/1920x1080/cac-pool-cabana-1920x1080.jpg",
    },
  ],
  "lake-tahoe": [
    {
      title: "$40 Free Table Play",
      location: "Harveys Lake Tahoe",
      desc: "Valid: Mar 1-30, 2026",
      img: "https://www.caesars.com/content/dam/empire/tah/casino/1920x1080/tah-casino-1920x1080.jpg",
    },
    {
      title: "Complimentary Ski Shuttle",
      location: "Caesars Republic Lake Tahoe",
      desc: "Valid: Dec 1, 2025 - Mar 31, 2026",
      img: "https://www.caesars.com/content/dam/empire/hlt/ski/1920x1080/hlt-ski-shuttle-1920x1080.jpg",
    },
    {
      title: "20% Off Lakeside Dining",
      location: "Multiple resorts",
      desc: "Valid: Jan 1 - Jun 30, 2026",
      img: "https://www.caesars.com/content/dam/empire/tah/dining/1920x1080/tah-lakeside-dining-1920x1080.jpg",
    },
  ],
  reno: [
    {
      title: "$50 Free Slot Play",
      location: "Harrah's Reno",
      desc: "Valid: Mar 1-30, 2026",
      img: "https://www.caesars.com/content/dam/empire/hre/casino/slots/1920x1080/hre-slots-1920x1080.jpg",
    },
    {
      title: "20% Off Dining",
      location: "Eldorado Resort Casino",
      desc: "Valid: Apr 1-30, 2026",
      img: "https://www.caesars.com/content/dam/empire/eld/dining/1920x1080/eld-dining-1920x1080.jpg",
    },
    {
      title: "Complimentary Breakfast",
      location: "Silver Legacy Resort Casino",
      desc: "Valid: Mar 1 - Jun 30, 2026",
      img: "https://www.caesars.com/content/dam/empire/slr/dining/breakfast/1920x1080/slr-breakfast-1920x1080.jpg",
    },
  ],
};

const resortsByMarket: Record<string, Array<{ name: string; location: string; rating: string; img: string }>> = {
  "las-vegas": [
    { name: "Paris", location: "Las Vegas, NV", rating: "4.8", img: "https://www.caesars.com/content/dam/empire/plv/property/exterior/1920x1080/plv-exterior-1920x1080.jpg" },
    { name: "Flamingo", location: "Las Vegas, NV", rating: "4.8", img: "https://www.caesars.com/content/dam/empire/flv/property/exterior/1920x1080/flv-exterior-blvd-1920x1080.jpg" },
    { name: "Caesars Palace", location: "Las Vegas, NV", rating: "4.8", img: "https://www.caesars.com/content/dam/empire/clv/property/exterior/1920x1080/clv-property-exterior-and-fountain-02-1920x1080.jpg" },
    { name: "Nobu Hotel", location: "Las Vegas, NV", rating: "4.9", img: "https://www.caesars.com/content/dam/empire/clv/property/exterior/1920x1080/clv-property-exterior-and-fountain-02-1920x1080.jpg" },
  ],
  "atlantic-city": [
    { name: "Caesars AC", location: "Atlantic City, NJ", rating: "4.6", img: "https://www.caesars.com/content/dam/empire/cac/property/exterior/1600x900/cac-exterior-tower-1600x900.jpg" },
    { name: "Harrah's AC", location: "Atlantic City, NJ", rating: "4.5", img: "https://www.caesars.com/content/dam/empire/atl/property/exterior/1920x1080/atl-harrahs-ac-exterior-1920x1080.jpg" },
    { name: "Tropicana AC", location: "Atlantic City, NJ", rating: "4.4", img: "https://www.caesars.com/content/dam/empire/tac/property/exterior/1600x900/tac-exterior-fireworks-night-1600x900.jpg" },
  ],
  "lake-tahoe": [
    { name: "Caesars Republic", location: "Lake Tahoe, NV", rating: "4.7", img: "https://www.caesars.com/content/dam/empire/hlt/property/exterior/1920x800/hlt-caesars-republic-exterior-south-1920x800.jpg" },
    { name: "Harveys", location: "Lake Tahoe, NV", rating: "4.6", img: "https://www.caesars.com/content/dam/empire/tah/property/exterior/1600x900/tah-exterior-tower-1600x900.jpg" },
  ],
  reno: [
    { name: "Harrah's Reno", location: "Reno, NV", rating: "4.5", img: "https://www.caesars.com/content/dam/empire/hre/property/exterior/1920x1080/hre-exterior-1920x1080.jpg" },
    { name: "Silver Legacy", location: "Reno, NV", rating: "4.4", img: "https://www.caesars.com/content/dam/empire/slr/property/exterior/1920x1080/slr-exterior-1920x1080.jpg" },
    { name: "Eldorado", location: "Reno, NV", rating: "4.5", img: "https://www.caesars.com/content/dam/empire/eld/property/exterior/1920x1080/eld-exterior-1920x1080.jpg" },
  ],
};

const restaurantsByMarket: Record<string, Array<{ name: string; location: string; price: string; badge: string; img: string }>> = {
  "las-vegas": [
    { name: "Nobu", location: "Caesars Palace, Las Vegas", price: "$$$$", badge: "Japanese", img: "https://www.caesars.com/content/dam/empire/clv/dining/nobu/1920x1080/clv-nobu-restaurant-1920x1080.jpg" },
    { name: "Gordon Ramsay's Hell's Kitchen", location: "Caesars Palace, Las Vegas", price: "$$$$", badge: "American", img: "https://www.caesars.com/content/dam/empire/clv/dining/hells-kitchen/1920x1080/clv-hells-kitchen-exterior-1920x1080.jpg" },
  ],
  "atlantic-city": [
    { name: "Gordon Ramsay Fish & Chips", location: "Caesars AC", price: "$$$", badge: "British", img: "https://www.caesars.com/content/dam/empire/cac/dining/gordon-ramsay/1920x1080/cac-gordon-ramsay-1920x1080.jpg" },
    { name: "Nero's Steakhouse", location: "Caesars AC", price: "$$$$", badge: "Steakhouse", img: "https://www.caesars.com/content/dam/empire/cac/dining/neros/1920x1080/cac-neros-steakhouse-1920x1080.jpg" },
  ],
  "lake-tahoe": [
    { name: "Tahoe Blue Bar", location: "Harveys Lake Tahoe", price: "$$$", badge: "American", img: "https://www.caesars.com/content/dam/empire/tah/dining/1920x1080/tah-lakeside-dining-1920x1080.jpg" },
    { name: "Ciera Steak + Chop House", location: "Caesars Republic", price: "$$$$", badge: "Steakhouse", img: "https://www.caesars.com/content/dam/empire/hlt/dining/1920x1080/hlt-dining-1920x1080.jpg" },
  ],
  reno: [
    { name: "Brew Brothers", location: "Eldorado, Reno", price: "$$", badge: "Pub", img: "https://www.caesars.com/content/dam/empire/eld/dining/brew-brothers/1920x1080/eld-brew-brothers-1920x1080.jpg" },
    { name: "Sichuan Garden", location: "Silver Legacy, Reno", price: "$$$", badge: "Chinese", img: "https://www.caesars.com/content/dam/empire/slr/dining/1920x1080/slr-dining-1920x1080.jpg" },
  ],
};

const entertainmentByMarket: Record<string, Array<{ title: string; location: string; month: string; day: string; img: string }>> = {
  "las-vegas": [
    { title: "Dolly Parton LIVE", location: "The Colosseum at Caesars Palace Las Vegas, NV", month: "APR", day: "26", img: "https://www.caesars.com/content/dam/empire/clv/shows/colosseum/1920x1080/clv-colosseum-interior-1920x1080.jpg" },
    { title: "Jerry Seinfeld", location: "The Colosseum at Caesars Palace Las Vegas, NV", month: "APR", day: "26", img: "https://www.caesars.com/content/dam/empire/las/shows/colosseum/1920x1080/las-colosseum-1920x1080.jpg" },
  ],
  "atlantic-city": [
    { title: "The Hook", location: "Caesars AC Showroom", month: "MAY", day: "10", img: "https://www.caesars.com/content/dam/empire/cac/shows/the-hook/1920x1080/cac-the-hook-illustration-1920x1080.jpg" },
    { title: "Beach Concert Series", location: "Atlantic City Boardwalk", month: "MAY", day: "25", img: "https://www.caesars.com/content/dam/empire/cac/shows/concerts/1920x1080/cac-concert-series-1920x1080.jpg" },
  ],
  "lake-tahoe": [
    { title: "Live at the Lake", location: "Harveys Outdoor Arena", month: "JUL", day: "12", img: "https://www.caesars.com/content/dam/empire/tah/shows/concerts/1920x1080/tah-concert-1920x1080.jpg" },
    { title: "NYE Gala", location: "Caesars Republic Lake Tahoe", month: "DEC", day: "31", img: "https://www.caesars.com/content/dam/empire/hlt/events/nye/1920x1080/hlt-nye-gala-1920x1080.jpg" },
  ],
  reno: [
    { title: "Reno Rodeo", location: "Silver Legacy Grand Ballroom", month: "JUN", day: "20", img: "https://www.caesars.com/content/dam/empire/slr/events/rodeo/1920x1080/slr-rodeo-1920x1080.jpg" },
    { title: "Hot August Nights", location: "Downtown Reno Resort Row", month: "AUG", day: "6", img: "https://www.caesars.com/content/dam/empire/hre/events/hot-august-nights/1920x1080/hre-hot-august-nights-1920x1080.jpg" },
  ],
};

const flashSalesByMarket: Record<string, Array<{ title: string; desc: string; img: string }>> = {
  "las-vegas": [
    { title: "Flash Sale Savings\nAdditional 20% off your stay", desc: "Book by May 1, 2026", img: "https://www.caesars.com/content/dam/empire/cl1/rooms/deluxe-room/1920x1080/cl1-deluxe-room-2-1920x1080.jpg" },
    { title: "Flash Sale Savings\nAdditional 20% off your stay", desc: "Book by May 1, 2026", img: "https://www.caesars.com/content/dam/empire/plv/rooms/versailles-tower/1920x1080/plv-tower-versailles-room-1920x1080.jpg" },
  ],
  "atlantic-city": [
    { title: "Flash Sale\n30% off weekend stays", desc: "Book by Apr 15, 2026", img: "https://www.caesars.com/content/dam/empire/cac/rooms/1920x1080/cac-oceanfront-room-1920x1080.jpg" },
    { title: "Flash Sale\nBonus rewards points", desc: "Book by May 1, 2026", img: "https://www.caesars.com/content/dam/empire/atl/rooms/1920x1080/atl-room-1920x1080.jpg" },
  ],
  "lake-tahoe": [
    { title: "Flash Sale\n25% off mountain view rooms", desc: "Book by Mar 31, 2026", img: "https://www.caesars.com/content/dam/empire/hlt/rooms/1920x1080/hlt-room-1920x1080.jpg" },
    { title: "Flash Sale\nSki & Stay package", desc: "Book by Feb 28, 2026", img: "https://www.caesars.com/content/dam/empire/tah/rooms/1920x1080/tah-room-1920x1080.jpg" },
  ],
  reno: [
    { title: "Flash Sale\n20% off downtown stays", desc: "Book by Apr 30, 2026", img: "https://www.caesars.com/content/dam/empire/hre/rooms/1920x1080/hre-room-1920x1080.jpg" },
    { title: "Flash Sale\nBonus 500 Reward Credits", desc: "Book by May 15, 2026", img: "https://www.caesars.com/content/dam/empire/slr/rooms/1920x1080/slr-room-1920x1080.jpg" },
  ],
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function HeartButton({ size = "lg" }: { size?: "sm" | "lg" }) {
  const [liked, setLiked] = useState(false);
  const dim = size === "lg" ? 36 : 24;
  const icon = size === "lg" ? 24 : 16;
  return (
    <button
      onClick={() => setLiked((l) => !l)}
      className="flex items-center justify-center rounded-full bg-white shadow-md"
      style={{ width: dim, height: dim }}
      aria-label={liked ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        size={icon}
        strokeWidth={1.5}
        stroke="#121212"
        fill={liked ? "#121212" : "none"}
      />
    </button>
  );
}

function StarIcon() {
  return <Star size={16} strokeWidth={0} fill="#121212" className="shrink-0" />;
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

// ─── Main Component ──────────────────────────────────────────────────────────

export function StateAuthenticated({ onBook }: Props) {
  const { activeMarket, setMarket } = useMarket();
  const mid = activeMarket.id;

  const offers = offersByMarket[mid] ?? offersByMarket["las-vegas"];
  const resorts = resortsByMarket[mid] ?? resortsByMarket["las-vegas"];
  const restaurants = restaurantsByMarket[mid] ?? restaurantsByMarket["las-vegas"];
  const entertainment = entertainmentByMarket[mid] ?? entertainmentByMarket["las-vegas"];
  const flashSales = flashSalesByMarket[mid] ?? flashSalesByMarket["las-vegas"];

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Scrollable content */}
      <div
        className="flex flex-col gap-8 px-6 pb-[100px]"
        style={{ paddingTop: "60px" }}
      >
        {/* ── Welcome Header ── */}
        <div className="flex items-start justify-between gap-4">
          <div
            className="flex-1 font-semibold leading-[36px]"
            style={{ fontSize: 32, letterSpacing: -1 }}
          >
            <span style={{ color: "#999" }}>Welcome{"\n"}</span>
            <br />
            <span style={{ color: "#121212" }}>{MEMBER.name}</span>
          </div>
          <div className="flex flex-col items-center mt-1">
            <button className="flex h-8 px-3 items-center gap-1 rounded-lg bg-[#F2F2F2]">
              <CreditCard size={20} strokeWidth={1.5} stroke="#121212" />
              <span className="text-[13px] font-semibold text-[#121212] leading-[18px]">
                {MEMBER.credits.toLocaleString()}
              </span>
            </button>
          </div>
        </div>

        {/* ── Loyalty Card ── */}
        <div className="flex flex-col gap-3 rounded-xl bg-[#F2F2F2] p-3">
          <div className="flex items-center gap-3">
            <div className="flex flex-col gap-0.5 flex-1">
              <div className="text-[14px] font-semibold text-[#121212] leading-[20px] tracking-[0.1px]">
                {MEMBER.tierLabel}
              </div>
              <div className="text-[14px] text-[#666] leading-[20px]">
                {MEMBER.tierProgressLabel}
              </div>
            </div>
            <img
              src={MEMBER.loyaltyCardImg}
              alt="Caesars Rewards Gold card"
              className="w-10 h-10 rounded-lg object-cover aspect-square"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </div>
          {/* Gold gradient progress bar */}
          <div
            className="h-2 rounded-full w-full"
            style={{ background: "#FFF", boxShadow: "0 0.5px 0.5px 0 rgba(0,0,0,0.15) inset" }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${MEMBER.tierProgress * 100}%`,
                background: "linear-gradient(270deg, #FFEDCD 1%, #FFD892 6%, #E1BB76 26%, #9C7303 100%)",
              }}
            />
          </div>
        </div>

        {/* ── Discover Caesars ── */}
        <div className="flex flex-col gap-4">
          <SectionHeading title="Discover Caesars" />

          {/* Search bar */}
          <div className="flex items-center gap-2 rounded-full border border-[#F2F2F2] bg-white px-5 py-0.5 shadow-[0_6px_20px_0_rgba(0,0,0,0.08)]">
            <span className="flex-1 text-[13px] text-[#121212] leading-[18px]">
              Search destinations
            </span>
            <button
              className="flex w-9 h-9 items-center justify-center rounded-full bg-[#121212] shrink-0"
              aria-label="Search"
            >
              <ArrowRight size={16} strokeWidth={1.5} stroke="white" />
            </button>
          </div>

          {/* Market chip tabs — horizontal scroll */}
          <div
            className="flex gap-2 overflow-x-auto"
            style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
            role="tablist"
            aria-label="Select market"
          >
            {markets.map((market) => {
              const isActive = market.id === mid;
              return (
                <button
                  key={market.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setMarket(market.id as MarketId, "manual")}
                  className={cn(
                    "shrink-0 flex h-8 items-center px-3 rounded-lg text-[13px] font-semibold leading-[18px] transition-colors",
                    isActive
                      ? "bg-[#1F1F1F] text-white shadow-[0_6px_20px_0_rgba(0,0,0,0.08)]"
                      : "bg-[#F2F2F2] text-[#121212]"
                  )}
                >
                  {market.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Offers you'll love ── */}
        <div className="flex flex-col gap-4">
          <SectionHeading title={`${activeMarket.name} offers you'll love`} />
          <div
            className="-mx-6 flex gap-3 overflow-x-auto px-6"
            style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
          >
            {offers.map((offer, i) => (
              <div key={i} className="shrink-0 flex flex-col gap-3 w-72">
                {/* 3:2 image card */}
                <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: "3/2" }}>
                  <img
                    src={offer.img}
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
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)" }}
                  />
                  {/* Favorite */}
                  <div className="absolute top-3 right-3">
                    <HeartButton size="lg" />
                  </div>
                </div>
                {/* Info */}
                <div className="flex flex-col gap-1">
                  <div className="text-[16px] font-semibold text-[#121212] leading-[22px]">
                    {offer.title}
                  </div>
                  <div className="text-[14px] text-[#121212] leading-[20px]">
                    {offer.location}
                  </div>
                  <div className="text-[14px] text-[#666] leading-[20px]">
                    {offer.desc}
                  </div>
                </div>
              </div>
            ))}
            <div className="shrink-0 w-2" />
          </div>
        </div>

        {/* ── Resorts ── */}
        <div className="flex flex-col gap-4">
          <SectionHeading title="Resorts" />
          <div
            className="-mx-6 flex gap-2 overflow-x-auto px-6"
            style={{ scrollbarWidth: "none" }}
          >
            {resorts.map((resort, i) => (
              <div key={i} className="shrink-0 flex flex-col gap-3 w-[342px]">
                {/* 3:4 portrait image */}
                <div
                  className="relative rounded-xl overflow-hidden"
                  style={{ aspectRatio: "3/4" }}
                >
                  <img
                    src={resort.img}
                    alt={resort.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const el = e.target as HTMLImageElement;
                      el.style.background = "#F2F2F2";
                      el.removeAttribute("src");
                    }}
                  />
                  {/* Favorite */}
                  <div className="absolute top-3 right-3">
                    <HeartButton size="lg" />
                  </div>
                </div>
                {/* Info */}
                <div className="flex items-start gap-2">
                  <div className="flex flex-col gap-1 flex-1">
                    <div className="text-[16px] font-semibold text-[#121212] leading-[22px]">
                      {resort.name}
                    </div>
                    <div className="text-[14px] text-[#121212] leading-[20px]">
                      {resort.location}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[16px] font-semibold text-[#121212] leading-[22px]">
                      {resort.rating}
                    </span>
                    <StarIcon />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Restaurants ── */}
        <div className="flex flex-col gap-4">
          <SectionHeading title="Restaurants" />
          <div
            className="-mx-6 flex gap-2 overflow-x-auto px-6"
            style={{ scrollbarWidth: "none" }}
          >
            {restaurants.map((r, i) => (
              <div key={i} className="shrink-0 flex flex-col gap-3 w-64">
                {/* 1:1 square image with badge */}
                <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: "1/1" }}>
                  <img
                    src={r.img}
                    alt={r.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const el = e.target as HTMLImageElement;
                      el.style.background = "#F2F2F2";
                      el.removeAttribute("src");
                    }}
                  />
                  {/* Favorite */}
                  <div className="absolute top-3 right-3">
                    <HeartButton size="sm" />
                  </div>
                  {/* Badge */}
                  <div className="absolute top-3 left-3 flex h-6 items-center px-2 rounded bg-white">
                    <span className="text-[12px] text-[#121212] font-normal">{r.badge}</span>
                  </div>
                </div>
                {/* Info */}
                <div className="flex flex-col gap-1">
                  <div className="text-[16px] font-semibold text-[#121212] leading-[22px]">{r.name}</div>
                  <div className="text-[14px] text-[#121212] leading-[20px]">{r.location}</div>
                  <div className="text-[14px] text-[#666] leading-[20px]">{r.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Entertainment ── */}
        <div className="flex flex-col gap-4">
          <SectionHeading title="Entertainment" />
          <div
            className="-mx-6 flex gap-2 overflow-x-auto px-6"
            style={{ scrollbarWidth: "none" }}
          >
            {entertainment.map((ev, i) => (
              <div key={i} className="shrink-0 flex flex-col gap-3 w-64">
                {/* 1:1 square image with date badge */}
                <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: "1/1" }}>
                  <img
                    src={ev.img}
                    alt={ev.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const el = e.target as HTMLImageElement;
                      el.style.background = "#F2F2F2";
                      el.removeAttribute("src");
                    }}
                  />
                  {/* Favorite */}
                  <div className="absolute top-3 right-3">
                    <HeartButton size="sm" />
                  </div>
                  {/* Date badge */}
                  <div className="absolute top-3 left-3">
                    <DateBadge month={ev.month} day={ev.day} />
                  </div>
                </div>
                {/* Info */}
                <div className="flex flex-col gap-1">
                  <div className="text-[16px] font-semibold text-[#121212] leading-[22px]">{ev.title}</div>
                  <div className="text-[14px] text-[#121212] leading-[20px]">{ev.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Flash Sale Savings ── */}
        <div className="flex flex-col gap-4">
          <SectionHeading title="Flash Sale Savings" />
          <div
            className="-mx-6 flex gap-2 overflow-x-auto px-6"
            style={{ scrollbarWidth: "none" }}
          >
            {flashSales.map((fs, i) => (
              <div key={i} className="shrink-0 flex flex-col gap-3 w-64">
                <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: "1/1" }}>
                  <img
                    src={fs.img}
                    alt={fs.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const el = e.target as HTMLImageElement;
                      el.style.background = "#F2F2F2";
                      el.removeAttribute("src");
                    }}
                  />
                </div>
                {/* Info */}
                <div className="flex flex-col gap-1">
                  <div className="text-[16px] font-semibold text-[#121212] leading-[22px] whitespace-pre-line">
                    {fs.title}
                  </div>
                  <div className="text-[14px] text-[#666] leading-[20px]">{fs.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
