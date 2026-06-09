import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, Star, ChevronRight } from "lucide-react";
import { springs } from "@/lib/springTokens";
import { useMarket } from "@/context/MarketContext";
import { getMarketContent } from "@/lib/content";

// ─── Stay data ──────────────────────────────────────────────────────────────
const STAY = {
  roomNumber: "302",
  roomType: "Deluxe King",
  checkIn: "April 26",
  checkOut: "April 28",
  property: "Paris Las Vegas",
  location: "Las Vegas, NV",
  credits: 3560,
  tierName: "Caesars Rewards Gold",
  tierDesc: "999 Tier credits to Platinum",
  tierProgress: 0.75,
  heroImg:
    "https://www.caesars.com/content/dam/empire/plv/property/exterior/1920x1080/plv-exterior-1920x1080.jpg",
};

// ─── Content data ─────────────────────────────────────────────────────────
const DINING_RESTAURANTS = [
  {
    name: "Nobu",
    location: "Caesars Palace",
    price: "$$$",
    rating: "4.8",
    img: "https://api.builder.io/api/v1/image/assets/TEMP/3cb59c998db998e7b030869df9bc057b006f1184?width=512",
    slots: ["7:00pm", "7:15pm", "7:30pm"],
    extraSlots: 13,
  },
  {
    name: "Gordon Ramsay's Hell's Kitchen",
    location: "Caesars Palace",
    price: "$$$",
    rating: "4.7",
    img: "https://api.builder.io/api/v1/image/assets/TEMP/3d19926a1a16040c500cfdc184c450f2d46cbbb4?width=512",
    slots: ["6:00pm", "6:30pm", "7:00pm"],
    extraSlots: 8,
  },
];

const OFFERS = [
  {
    title: "4th of July Earning",
    location: "Multiple Resorts",
    desc: "Valid: Jan 1 – Jul 4, 2026",
    img: "https://www.caesars.com/content/dam/empire/flv/things-to-do/pool/go-pool-day-club/1920x1080/flv-flamingo-go-pool-friends-drinks-smiles-1920x1080.jpg",
  },
  {
    title: "Special rates in Las Vegas",
    location: "Multiple resorts",
    desc: "Valid: Mar 1–30, 2026",
    img: "https://www.caesars.com/content/dam/empire/plv/rooms/versailles-tower/1920x1080/plv-tower-versailles-room-1920x1080.jpg",
  },
  {
    title: "$75 Free Table Play",
    location: "Caesars Palace",
    desc: "Valid: Mar 1–30, 2026",
    img: "https://www.caesars.com/content/dam/empire/clv/property/exterior/1920x1080/clv-property-exterior-and-fountain-02-1920x1080.jpg",
  },
];

const RESORTS = [
  {
    name: "Paris",
    location: "Las Vegas, NV",
    rating: "4.8",
    img: "https://www.caesars.com/content/dam/empire/plv/property/exterior/1920x1080/plv-exterior-1920x1080.jpg",
  },
  {
    name: "Flamingo",
    location: "Las Vegas, NV",
    rating: "4.8",
    img: "https://www.caesars.com/content/dam/empire/flv/property/exterior/1920x1080/flv-exterior-blvd-1920x1080.jpg",
  },
  {
    name: "Caesars Palace",
    location: "Las Vegas, NV",
    rating: "4.8",
    img: "https://www.caesars.com/content/dam/empire/clv/property/exterior/1920x1080/clv-property-exterior-and-fountain-02-1920x1080.jpg",
  },
  {
    name: "Nobu Hotel",
    location: "Las Vegas, NV",
    rating: "4.8",
    img: "https://www.caesars.com/content/dam/empire/cl1/rooms/deluxe-room/1920x1080/cl1-deluxe-room-2-1920x1080.jpg",
  },
];

const RESTAURANTS = [
  {
    name: "Nobu",
    location: "Caesars Palace, Las Vegas",
    price: "$$$$",
    badge: "Japanese",
    img: "https://www.caesars.com/content/dam/empire/clv/dining/nobu/1920x1080/clv-nobu-restaurant-1920x1080.jpg",
  },
  {
    name: "Gordon Ramsay's Hell's Kitchen",
    location: "Caesars Palace, Las Vegas",
    price: "$$$$",
    badge: "American",
    img: "https://www.caesars.com/content/dam/empire/clv/dining/hells-kitchen/1920x1080/clv-hells-kitchen-exterior-1920x1080.jpg",
  },
];

const ENTERTAINMENT = [
  {
    title: "Dolly Parton LIVE",
    location: "The Colosseum at Caesars Palace Las Vegas, NV",
    month: "APR",
    day: "26",
    img: "https://www.caesars.com/content/dam/empire/clv/shows/colosseum/1920x1080/clv-colosseum-interior-1920x1080.jpg",
  },
  {
    title: "Jerry Seinfeld",
    location: "The Colosseum at Caesars Palace Las Vegas, NV",
    month: "APR",
    day: "27",
    img: "https://www.caesars.com/content/dam/empire/las/shows/colosseum/1920x1080/las-colosseum-1920x1080.jpg",
  },
];

// Plans data for the "has plans" variant
const PLANS = [
  {
    type: "dining",
    name: "Nobu",
    detail: "Caesars Palace",
    time: "7:00 PM · Tonight",
    guests: "2 guests",
    img: "https://www.caesars.com/content/dam/empire/clv/dining/nobu/1920x1080/clv-nobu-restaurant-1920x1080.jpg",
    icon: "🍽️",
  },
  {
    type: "spa",
    name: "Qua Baths & Spa",
    detail: "Caesars Palace",
    time: "10:00 AM · Tomorrow",
    guests: "1 guest",
    img: "https://www.caesars.com/content/dam/empire/clv/spa/qua/1920x1080/clv-qua-spa-1920x1080.jpg",
    icon: "🧖",
  },
  {
    type: "pool",
    name: "Pool Cabana",
    detail: "The LINQ Hotel",
    time: "All day · Tomorrow",
    guests: "4 guests",
    img: "https://www.caesars.com/content/dam/empire/flv/things-to-do/pool/go-pool-day-club/1920x1080/flv-flamingo-go-pool-friends-drinks-smiles-1920x1080.jpg",
    icon: "🏖️",
  },
];

const QUICK_ACTIONS = [
  {
    label: "Offers",
    img: "https://api.builder.io/api/v1/image/assets/TEMP/18c76dbe533248445f242c62c3565a61db9d4152?width=200",
  },
  {
    label: "Concierge",
    img: "https://www.caesars.com/content/dam/empire/clv/amenities/concierge/1920x1080/clv-concierge-service-1920x1080.jpg",
  },
  {
    label: "Dining",
    img: "https://api.builder.io/api/v1/image/assets/TEMP/3d19926a1a16040c500cfdc184c450f2d46cbbb4?width=200",
  },
  {
    label: "Entertainment",
    img: "https://api.builder.io/api/v1/image/assets/TEMP/5e758c331d3492e529f6e59aeb05bb9d2a9d5bee?width=200",
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────
function HeartButton() {
  const [liked, setLiked] = useState(false);
  return (
    <button
      onClick={() => setLiked((l) => !l)}
      className="flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-md"
      aria-label={liked ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart size={16} strokeWidth={1.5} stroke="#121212" fill={liked ? "#121212" : "none"} />
    </button>
  );
}

function DateBadge({ month, day }: { month: string; day: string }) {
  return (
    <div className="flex flex-col justify-center items-center w-10 h-10 rounded-xl bg-white shadow">
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
      <span className="text-[14px] font-semibold text-[#121212] leading-[20px]">{day}</span>
    </div>
  );
}

function SectionHeading({ title, action }: { title: string; action?: string }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-[20px] font-semibold text-[#121212] leading-[26px] tracking-[-0.2px]">
        {title}
      </h2>
      {action && (
        <button className="text-[13px] font-semibold text-[#666] flex items-center gap-0.5">
          {action} <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}

function Img({
  src, alt, className, style,
}: { src: string; alt: string; className?: string; style?: React.CSSProperties }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={(e) => {
        const el = e.target as HTMLImageElement;
        el.style.background = "#F2F2F2";
        el.removeAttribute("src");
      }}
    />
  );
}

// ─── Plan item row (has-plans variant) ────────────────────────────────────
function PlanRow({ plan }: { plan: typeof PLANS[0] }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F8F8F8] border border-[#F0F0F0]">
      <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
        <Img src={plan.img} alt={plan.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-[15px] font-semibold text-[#121212] leading-[20px] truncate">
          {plan.name}
        </span>
        <span className="text-[13px] text-[#666] leading-[18px] truncate">
          {plan.detail}
        </span>
        <span className="text-[12px] text-[#999] leading-[18px]">{plan.time}</span>
      </div>
      <button className="h-8 px-3 rounded-lg bg-[#F2F2F2] text-[12px] font-semibold text-[#121212] shrink-0">
        View
      </button>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────
interface Props {
  hasPlans?: boolean;
}

export function StateActiveStay({ hasPlans = false }: Props) {
  const { activeMarket } = useMarket();
  const content = getMarketContent(activeMarket.id);
  const [unlocking, setUnlocking] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  function handleUnlock() {
    setUnlocking(true);
    setTimeout(() => setUnlocking(false), 2000);
  }

  return (
    <div className="relative w-full h-full overflow-y-auto" style={{ scrollbarWidth: "none" }}>

      {/* ── Sticky parallax hero ─────────────────────────────────────── */}
      <div className="sticky top-0 w-full z-0 overflow-hidden" style={{ height: 280 }}>
        <Img
          src={STAY.heroImg}
          alt={`${STAY.property} exterior`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        {/* Stay meta top-right */}
        <div className="absolute top-14 right-5">
          <div className="flex items-center gap-1.5 px-3 h-8 rounded-full bg-white/15 backdrop-blur-sm border border-white/25">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path d="M1.667 8.333H18.333M3.333 4.167H16.667C17.587 4.167 18.333 4.913 18.333 5.833V14.167C18.333 15.087 17.587 15.833 16.667 15.833H3.333C2.413 15.833 1.667 15.087 1.667 14.167V5.833C1.667 4.913 2.413 4.167 3.333 4.167Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[13px] font-semibold text-white">{STAY.credits.toLocaleString()}</span>
          </div>
        </div>

        {/* Property info bottom-left */}
        <div className="absolute bottom-8 left-5 right-5">
          <p className="text-white/60 text-[13px] font-medium leading-tight mb-0.5">
            {STAY.checkIn} – {STAY.checkOut} · Room {STAY.roomNumber}
          </p>
          <h1 className="text-white font-bold leading-tight" style={{ fontSize: 28, letterSpacing: -0.5 }}>
            {STAY.property}
          </h1>
        </div>
      </div>

      {/* ── White sheet slides over hero ──────────────────────────────── */}
      <div
        className="relative z-10 bg-white flex flex-col gap-7 px-6"
        style={{ borderRadius: "24px 24px 0 0", marginTop: -24, paddingTop: 20, paddingBottom: 160 }}
      >
        {/* Sheet handle */}
        <div className="flex justify-center -mt-1 -mb-3">
          <div className="w-10 h-1 rounded-full bg-[#E0E0E0]" />
        </div>

        {/* ── Quick actions ────────────────────────────────────────────── */}
        <div className="-mx-6 flex gap-3 overflow-x-auto px-6 pb-1" style={{ scrollbarWidth: "none" }}>
          {QUICK_ACTIONS.map((qa) => (
            <button
              key={qa.label}
              className="shrink-0 flex flex-col items-start gap-2 rounded-2xl overflow-hidden"
              style={{ width: 152, background: "#F8F7F5" }}
            >
              <div className="w-full flex items-start justify-start pt-4 px-4">
                <span className="text-[15px] font-semibold text-[#121212] leading-[20px]">{qa.label}</span>
              </div>
              <div className="w-full flex justify-end">
                <img
                  src={qa.img}
                  alt={qa.label}
                  className="h-20 object-contain"
                  style={{ maxWidth: "80%", marginRight: -4 }}
                />
              </div>
            </button>
          ))}
        </div>

        {/* ── Your plans (has-plans variant only) ─────────────────────── */}
        {hasPlans && (
          <div className="flex flex-col gap-3">
            <SectionHeading title="Your plans" action="See all" />
            <div className="flex flex-col gap-2">
              {PLANS.map((plan, i) => <PlanRow key={i} plan={plan} />)}
            </div>
            {/* Add plan CTA */}
            <button className="flex items-center justify-center gap-2 h-11 rounded-xl border-2 border-dashed border-[#E0E0E0] text-[13px] font-semibold text-[#999]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 5V19M5 12H19" stroke="#999" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Add a reservation
            </button>
          </div>
        )}

        {/* ── Stay summary card ── */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="text-[13px] font-normal text-[#999] leading-[18px]">Discover</span>
            <span className="text-[20px] font-semibold text-[#121212] leading-[26px] tracking-[-0.2px]">
              Today, 3 Guests
            </span>
          </div>
          <button className="flex items-center justify-center h-8 px-4 rounded-full bg-[#F2F2F2] text-[13px] font-semibold text-[#121212]">
            Edit
          </button>
        </div>

        {/* ── Dining ─────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          <SectionHeading title="Dining" action="See all" />
          <div className="-mx-6 flex gap-4 overflow-x-auto px-6" style={{ scrollbarWidth: "none" }}>
            {DINING_RESTAURANTS.map((rest, i) => (
              <div key={i} className="shrink-0 flex flex-col gap-3" style={{ width: 300 }}>
                <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: "3/2" }}>
                  <Img src={rest.img} alt={rest.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3"><HeartButton /></div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[16px] font-semibold text-[#121212] leading-[22px] truncate">{rest.name}</span>
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="text-[16px] font-semibold text-[#121212]">{rest.rating}</span>
                      <img
                        src="https://api.builder.io/api/v1/image/assets/TEMP/3cb59c998db998e7b030869df9bc057b006f1184?width=36"
                        alt="star"
                        className="w-[18px] h-[17px]"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] text-[#121212] leading-[20px]">{rest.location}</span>
                    <span className="text-[14px] text-[#666] leading-[20px]">{rest.price}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {rest.slots.map((slot) => (
                    <button
                      key={slot}
                      className="flex items-center justify-center h-9 px-3 rounded-lg bg-[#F2F2F2] text-[14px] font-medium text-[#121212] shrink-0"
                    >
                      {slot}
                    </button>
                  ))}
                  <button className="flex items-center justify-center h-9 px-3 rounded-lg bg-[#F2F2F2] text-[14px] font-medium text-[#121212] shrink-0">
                    + {rest.extraSlots} more
                  </button>
                </div>
              </div>
            ))}
            <div className="shrink-0 w-2" />
          </div>
        </div>

        {/* ── Resorts carousel (3:4 ratio cards) ───────────────────────── */}
        <div className="flex flex-col gap-4">
          <SectionHeading title="Resorts" action="See all" />
          <div className="-mx-6 flex gap-4 overflow-x-auto px-6" style={{ scrollbarWidth: "none" }}>
            {RESORTS.map((resort, i) => (
              <div key={i} className="shrink-0 flex flex-col gap-3" style={{ width: 200 }}>
                <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: "3/4" }}>
                  <Img src={resort.img} alt={resort.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3"><HeartButton /></div>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[16px] font-semibold text-[#121212] leading-[22px]">{resort.name}</p>
                    <p className="text-[14px] text-[#121212] leading-[20px]">{resort.location}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 mt-0.5">
                    <span className="text-[16px] font-semibold text-[#121212]">{resort.rating}</span>
                    <Star size={13} fill="#121212" stroke="none" />
                  </div>
                </div>
              </div>
            ))}
            <div className="shrink-0 w-2" />
          </div>
        </div>

        {/* ── Restaurants (1:1 cards with badge) ───────────────────────── */}
        <div className="flex flex-col gap-4">
          <SectionHeading title="Restaurants" action="See all" />
          <div className="-mx-6 flex gap-4 overflow-x-auto px-6" style={{ scrollbarWidth: "none" }}>
            {RESTAURANTS.map((rest, i) => (
              <div key={i} className="shrink-0 flex flex-col gap-3" style={{ width: 256 }}>
                <div className="relative rounded-xl overflow-hidden" style={{ height: 256, aspectRatio: "1/1" }}>
                  <Img src={rest.img} alt={rest.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3"><HeartButton /></div>
                  <div className="absolute top-3 left-3 flex h-6 items-center px-2 rounded bg-white">
                    <span className="text-[11px] font-medium text-[#121212]">{rest.badge}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[16px] font-semibold text-[#121212] leading-[22px]">{rest.name}</span>
                  <span className="text-[14px] text-[#121212] leading-[20px]">{rest.location}</span>
                  <span className="text-[14px] text-[#666] leading-[20px]">{rest.price}</span>
                </div>
              </div>
            ))}
            <div className="shrink-0 w-2" />
          </div>
        </div>

        {/* ── Entertainment (1:1 cards with date badge) ─────────────────── */}
        <div className="flex flex-col gap-4">
          <SectionHeading title="Entertainment" action="See all" />
          <div className="-mx-6 flex gap-4 overflow-x-auto px-6" style={{ scrollbarWidth: "none" }}>
            {ENTERTAINMENT.map((show, i) => (
              <div key={i} className="shrink-0 flex flex-col gap-3" style={{ width: 256 }}>
                <div className="relative rounded-xl overflow-hidden" style={{ height: 256, aspectRatio: "1/1" }}>
                  <Img src={show.img} alt={show.title} className="w-full h-full object-cover" />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)" }}
                  />
                  <div className="absolute top-3 right-3"><HeartButton /></div>
                  <div className="absolute top-3 left-3">
                    <DateBadge month={show.month} day={show.day} />
                  </div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[16px] font-semibold text-[#121212] leading-[22px]">{show.title}</span>
                  <span className="text-[13px] text-[#666] leading-[18px]">{show.location}</span>
                </div>
                <motion.button
                  whileTap={prefersReducedMotion ? {} : { scale: 0.96 }}
                  transition={springs.LiquidGlassTap}
                  className="flex h-9 items-center justify-center rounded-full text-[13px] font-semibold text-white"
                  style={{ background: "linear-gradient(0deg, #3D0406 0%, #6B0609 74%, #86080B 100%)" }}
                >
                  Find Tickets
                </motion.button>
              </div>
            ))}
            <div className="shrink-0 w-2" />
          </div>
        </div>

        {/* ── Flash sale / promos from market content ───────────────────── */}
        {content.offers.length > 0 && (
          <div className="flex flex-col gap-4">
            <SectionHeading title="Just for you" />
            <div className="-mx-6 flex gap-4 overflow-x-auto px-6" style={{ scrollbarWidth: "none" }}>
              {content.offers.map((offer, i) => (
                <div key={offer.id} className="shrink-0 flex flex-col gap-2" style={{ width: 200 }}>
                  <div className="relative rounded-xl overflow-hidden border border-[#F2F2F2]" style={{ aspectRatio: "3/2" }}>
                    <Img src={offer.imageUrl} alt={offer.title} className="w-full h-full object-cover" />
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)" }}
                    />
                    <div className="absolute top-3 right-3"><HeartButton /></div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white font-bold text-[13px] leading-tight">{offer.title}</p>
                    </div>
                  </div>
                  <p className="text-[13px] text-[#666]">{offer.cta}</p>
                </div>
              ))}
              <div className="shrink-0 w-2" />
            </div>
          </div>
        )}
      </div>

      {/* ── Fixed room key bar above BottomNav ─────────────────────────── */}
      <div
        className="fixed left-0 right-0 max-w-sm mx-auto z-40"
        style={{ bottom: "calc(68px + env(safe-area-inset-bottom, 0px))" }}
      >
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ background: "linear-gradient(90deg, #3D0406 0%, #6B0609 60%, #86080B 100%)" }}
        >
          <div className="flex flex-col">
            <span className="text-white/60 text-[11px] font-medium uppercase tracking-wider">
              Your Room
            </span>
            <span className="text-white font-bold text-[18px] leading-tight">
              Room {STAY.roomNumber}
            </span>
            <span className="text-white/60 text-[12px]">{STAY.roomType}</span>
          </div>
          <motion.button
            whileTap={prefersReducedMotion ? {} : { scale: 0.96 }}
            transition={springs.LiquidGlassTap}
            onClick={handleUnlock}
            className="flex h-11 items-center px-6 rounded-full font-bold text-[15px]"
            style={{
              background: unlocking ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.15)",
              border: "1.5px solid rgba(255,255,255,0.3)",
              color: "white",
            }}
          >
            {unlocking ? "Opening…" : "Unlock Room"}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
