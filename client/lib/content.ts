import type { MarketId } from "./markets";

const CDN = "https://www.caesars.com";

export interface Property {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  imageUrl: string;
  logoUrl?: string;
  marketId: MarketId;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  marketId: MarketId;
  cta: string;
  badge?: string;
}

export interface Event {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  imageUrl: string;
  marketId: MarketId;
}

export interface MarketContent {
  marketId: MarketId;
  featuredProperties: Property[];
  offers: Offer[];
  events: Event[];
  upgradeTagline: string;
  upgradeSubtext: string;
  heroPropertyId: string;
}

// ─── Las Vegas ──────────────────────────────────────────────────────────────

const lasVegasProperties: Property[] = [
  {
    id: "clv",
    name: "Caesars Palace",
    shortName: "Caesars Palace",
    tagline: "Vegas' most iconic address",
    imageUrl: `${CDN}/content/dam/empire/clv/property/exterior/1920x1080/clv-property-exterior-and-fountain-02-1920x1080.jpg`,
    logoUrl: `${CDN}/content/dam/empire/logos/slider-logos/caesars.png`,
    marketId: "las-vegas",
  },
  {
    id: "plv",
    name: "Paris Las Vegas",
    shortName: "Paris Las Vegas",
    tagline: "A taste of the City of Light on the Strip",
    imageUrl: `${CDN}/content/dam/empire/plv/property/exterior/1920x1080/plv-exterior-1920x1080.jpg`,
    logoUrl: `${CDN}/content/dam/empire/logos/slider-logos/paris.png`,
    marketId: "las-vegas",
  },
  {
    id: "flv",
    name: "Flamingo Las Vegas",
    shortName: "Flamingo",
    tagline: "The original Vegas icon",
    imageUrl: `${CDN}/content/dam/empire/flv/property/exterior/1920x1080/flv-exterior-blvd-1920x1080.jpg`,
    marketId: "las-vegas",
  },
  {
    id: "ilv",
    name: "The LINQ Hotel + Experience",
    shortName: "The LINQ",
    tagline: "Center of the action on the Strip",
    imageUrl: `${CDN}/content/dam/empire/play/lnq_highroller.jpg`,
    logoUrl: `${CDN}/content/dam/empire/logos/slider-logos/linq.png`,
    marketId: "las-vegas",
  },
  {
    id: "phv",
    name: "Planet Hollywood Resort & Casino",
    shortName: "Planet Hollywood",
    tagline: "Where stars align on the Strip",
    imageUrl: `${CDN}/content/dam/empire/phv/property/exterior/1920x1080/phv-exterior-2-1920x1080.jpg`,
    logoUrl: `${CDN}/content/dam/empire/logos/slider-logos/phv.png`,
    marketId: "las-vegas",
  },
  {
    id: "las",
    name: "Harrah's Las Vegas",
    shortName: "Harrah's Las Vegas",
    tagline: "Vegas fun, center Strip",
    imageUrl: `${CDN}/content/dam/empire/las/property/exterior/1920x1080/las-exterior-dusk-june-2021-1920x1080.jpg`,
    logoUrl: `${CDN}/content/dam/empire/logos/slider-logos/harrahs.png`,
    marketId: "las-vegas",
  },
];

const lasVegasOffers: Offer[] = [
  {
    id: "lv-offer-1",
    title: "$75 Free Table Play",
    description: "Valid at Caesars Palace tables",
    imageUrl: `${CDN}/content/dam/empire/clv/casino/table-games/1920x1080/clv-casino-table-games-cards-1920x1080.jpg`,
    marketId: "las-vegas",
    cta: "Claim Offer",
    badge: "Limited Time",
  },
  {
    id: "lv-offer-2",
    title: "20% Off Spa at Qua Baths",
    description: "Caesars Palace luxury wellness",
    imageUrl: `${CDN}/content/dam/empire/clv/things-to-do/spa/qua/1920x1080/clv-qua-spa-pool-1920x1080.jpg`,
    marketId: "las-vegas",
    cta: "Book Spa",
  },
  {
    id: "lv-offer-3",
    title: "Complimentary Breakfast",
    description: "For Diamond & above members",
    imageUrl: `${CDN}/content/dam/empire/flv/things-to-do/pool/go-pool-day-club/1920x1080/flv-flamingo-go-pool-friends-drinks-smiles-1920x1080.jpg`,
    marketId: "las-vegas",
    cta: "View Offer",
    badge: "Members Only",
  },
];

const lasVegasEvents: Event[] = [
  {
    id: "lv-event-1",
    title: "Jerry Seinfeld",
    subtitle: "The Colosseum at Caesars Palace",
    date: "Fri, May 9",
    imageUrl: `${CDN}/content/dam/empire/clv/shows/jerry-seinfeld/1920x1080/clv-jerry-seinfeld-1920x1080.jpg`,
    marketId: "las-vegas",
  },
  {
    id: "lv-event-2",
    title: "Dolly Parton LIVE",
    subtitle: "Harrah's Las Vegas",
    date: "Sat, May 17",
    imageUrl: `${CDN}/content/dam/empire/las/shows/dolly-parton/1920x1080/las-dolly-parton-1920x1080.jpg`,
    marketId: "las-vegas",
  },
];

// ─── Atlantic City ───────────────────────────────────────────────────────────

const atlanticCityProperties: Property[] = [
  {
    id: "cac",
    name: "Caesars Atlantic City",
    shortName: "Caesars AC",
    tagline: "The boardwalk's crown jewel",
    imageUrl: `${CDN}/content/dam/empire/cac/property/exterior/1600x900/cac-exterior-tower-1600x900.jpg`,
    logoUrl: `${CDN}/content/dam/empire/logos/slider-logos/caesars.png`,
    marketId: "atlantic-city",
  },
  {
    id: "atl",
    name: "Harrah's Atlantic City",
    shortName: "Harrah's AC",
    tagline: "Marina District's waterfront resort",
    imageUrl: `${CDN}/content/dam/empire/atl/property/exterior/1920x1080/atl-harrahs-ac-exterior-1920x1080.jpg`,
    logoUrl: `${CDN}/content/dam/empire/logos/slider-logos/harrahs.png`,
    marketId: "atlantic-city",
  },
  {
    id: "tac",
    name: "Tropicana Atlantic City",
    shortName: "Tropicana AC",
    tagline: "Heart of the Atlantic City action",
    imageUrl: `${CDN}/content/dam/empire/tac/property/exterior/1600x900/tac-exterior-fireworks-night-1600x900.jpg`,
    marketId: "atlantic-city",
  },
];

const atlanticCityOffers: Offer[] = [
  {
    id: "ac-offer-1",
    title: "$50 Free Slot Play",
    description: "Valid at any Caesars AC slot machine",
    imageUrl: `${CDN}/content/dam/empire/cac/casino/slots/1920x1080/cac-slots-1920x1080.jpg`,
    marketId: "atlantic-city",
    cta: "Claim Offer",
    badge: "New Offer",
  },
  {
    id: "ac-offer-2",
    title: "2-for-1 Dinner",
    description: "Gordon Ramsay Fish & Chips",
    imageUrl: `${CDN}/content/dam/empire/cac/dining/gordon-ramsay/1920x1080/cac-gordon-ramsay-1920x1080.jpg`,
    marketId: "atlantic-city",
    cta: "Reserve Table",
  },
  {
    id: "ac-offer-3",
    title: "Boardwalk Cabana Access",
    description: "Exclusive members-only beach cabana",
    imageUrl: `${CDN}/content/dam/empire/cac/pool/1920x1080/cac-pool-cabana-1920x1080.jpg`,
    marketId: "atlantic-city",
    cta: "Reserve Now",
    badge: "Summer Special",
  },
];

const atlanticCityEvents: Event[] = [
  {
    id: "ac-event-1",
    title: "The Hook",
    subtitle: "Caesars AC Showroom",
    date: "Sat, May 10",
    imageUrl: `${CDN}/content/dam/empire/cac/shows/the-hook/1920x1080/cac-the-hook-illustration-1920x1080.jpg`,
    marketId: "atlantic-city",
  },
  {
    id: "ac-event-2",
    title: "Beach Concert Series",
    subtitle: "Atlantic City Boardwalk",
    date: "Sun, May 25",
    imageUrl: `${CDN}/content/dam/empire/cac/shows/concerts/1920x1080/cac-concert-series-1920x1080.jpg`,
    marketId: "atlantic-city",
  },
];

// ─── Lake Tahoe ──────────────────────────────────────────────────────────────

const lakeTahoeProperties: Property[] = [
  {
    id: "hlt",
    name: "Caesars Republic Lake Tahoe",
    shortName: "Caesars Republic",
    tagline: "Modern luxury in the Sierra Nevada",
    imageUrl: `${CDN}/content/dam/empire/hlt/property/exterior/1920x800/hlt-caesars-republic-exterior-south-1920x800.jpg`,
    logoUrl: `${CDN}/content/dam/empire/logos/slider-logos/caesars.png`,
    marketId: "lake-tahoe",
  },
  {
    id: "tah",
    name: "Harveys Lake Tahoe",
    shortName: "Harveys",
    tagline: "Classic Tahoe lakeside resort",
    imageUrl: `${CDN}/content/dam/empire/tah/property/exterior/1600x900/tah-exterior-tower-1600x900.jpg`,
    marketId: "lake-tahoe",
  },
];

const lakeTahoeOffers: Offer[] = [
  {
    id: "lt-offer-1",
    title: "$40 Free Table Play",
    description: "Valid at Harveys Lake Tahoe",
    imageUrl: `${CDN}/content/dam/empire/tah/casino/1920x1080/tah-casino-1920x1080.jpg`,
    marketId: "lake-tahoe",
    cta: "Claim Offer",
  },
  {
    id: "lt-offer-2",
    title: "Complimentary Ski Shuttle",
    description: "To Heavenly Mountain Resort",
    imageUrl: `${CDN}/content/dam/empire/hlt/ski/1920x1080/hlt-ski-shuttle-1920x1080.jpg`,
    marketId: "lake-tahoe",
    cta: "Reserve Seat",
    badge: "Winter Special",
  },
  {
    id: "lt-offer-3",
    title: "20% Off Lakeside Dining",
    description: "Exclusive member discount",
    imageUrl: `${CDN}/content/dam/empire/tah/dining/1920x1080/tah-lakeside-dining-1920x1080.jpg`,
    marketId: "lake-tahoe",
    cta: "View Menu",
  },
];

const lakeTahoeEvents: Event[] = [
  {
    id: "lt-event-1",
    title: "Live at the Lake",
    subtitle: "Summer Concert Series — Harveys",
    date: "Sat, Jul 12",
    imageUrl: `${CDN}/content/dam/empire/tah/shows/concerts/1920x1080/tah-concert-1920x1080.jpg`,
    marketId: "lake-tahoe",
  },
  {
    id: "lt-event-2",
    title: "New Year's Eve Gala",
    subtitle: "Caesars Republic Lake Tahoe",
    date: "Wed, Dec 31",
    imageUrl: `${CDN}/content/dam/empire/hlt/events/nye/1920x1080/hlt-nye-gala-1920x1080.jpg`,
    marketId: "lake-tahoe",
  },
];

// ─── Reno ─────────────────────────────────────────────────────────────────────

const renoProperties: Property[] = [
  {
    id: "hre",
    name: "Harrah's Reno",
    shortName: "Harrah's Reno",
    tagline: "Downtown Reno's premier resort",
    imageUrl: `${CDN}/content/dam/empire/hre/property/exterior/1920x1080/hre-exterior-1920x1080.jpg`,
    logoUrl: `${CDN}/content/dam/empire/logos/slider-logos/harrahs.png`,
    marketId: "reno",
  },
  {
    id: "slr",
    name: "Silver Legacy Resort Casino",
    shortName: "Silver Legacy",
    tagline: "The landmark dome on the Reno skyline",
    imageUrl: `${CDN}/content/dam/empire/slr/property/exterior/1920x1080/slr-exterior-1920x1080.jpg`,
    marketId: "reno",
  },
  {
    id: "eld",
    name: "Eldorado Resort Casino",
    shortName: "Eldorado",
    tagline: "Award-winning dining in downtown Reno",
    imageUrl: `${CDN}/content/dam/empire/eld/property/exterior/1920x1080/eld-exterior-1920x1080.jpg`,
    marketId: "reno",
  },
];

const renoOffers: Offer[] = [
  {
    id: "rn-offer-1",
    title: "$50 Free Slot Play",
    description: "Valid at Harrah's Reno or Silver Legacy",
    imageUrl: `${CDN}/content/dam/empire/hre/casino/slots/1920x1080/hre-slots-1920x1080.jpg`,
    marketId: "reno",
    cta: "Claim Offer",
    badge: "Members Only",
  },
  {
    id: "rn-offer-2",
    title: "20% Off Dining",
    description: "Eldorado resort restaurants",
    imageUrl: `${CDN}/content/dam/empire/eld/dining/1920x1080/eld-dining-1920x1080.jpg`,
    marketId: "reno",
    cta: "View Menu",
  },
  {
    id: "rn-offer-3",
    title: "Complimentary Breakfast",
    description: "For Gold tier and above",
    imageUrl: `${CDN}/content/dam/empire/hre/dining/breakfast/1920x1080/hre-breakfast-1920x1080.jpg`,
    marketId: "reno",
    cta: "View Offer",
  },
];

const renoEvents: Event[] = [
  {
    id: "rn-event-1",
    title: "Reno Rodeo",
    subtitle: "Silver Legacy Grand Ballroom",
    date: "Fri, Jun 20",
    imageUrl: `${CDN}/content/dam/empire/slr/events/rodeo/1920x1080/slr-rodeo-1920x1080.jpg`,
    marketId: "reno",
  },
  {
    id: "rn-event-2",
    title: "Hot August Nights",
    subtitle: "Downtown Reno Resort Row",
    date: "Wed, Aug 6",
    imageUrl: `${CDN}/content/dam/empire/hre/events/hot-august-nights/1920x1080/hre-hot-august-nights-1920x1080.jpg`,
    marketId: "reno",
  },
];

// ─── Compiled Market Content ─────────────────────────────────────────────────

export const marketContent: Record<MarketId, MarketContent> = {
  "las-vegas": {
    marketId: "las-vegas",
    featuredProperties: lasVegasProperties.slice(0, 3), // Caesars, Paris, Flamingo
    offers: lasVegasOffers,
    events: lasVegasEvents,
    upgradeTagline: "Upgrade to a Strip-view suite",
    upgradeSubtext: "From just $49/night — for Rewards members",
    heroPropertyId: "plv",
  },
  "atlantic-city": {
    marketId: "atlantic-city",
    featuredProperties: atlanticCityProperties,
    offers: atlanticCityOffers,
    events: atlanticCityEvents,
    upgradeTagline: "Upgrade to an Oceanfront suite",
    upgradeSubtext: "Wake up to Atlantic Ocean views — from $79/night",
    heroPropertyId: "cac",
  },
  "lake-tahoe": {
    marketId: "lake-tahoe",
    featuredProperties: lakeTahoeProperties,
    offers: lakeTahoeOffers,
    events: lakeTahoeEvents,
    upgradeTagline: "Upgrade to a Lake-view suite",
    upgradeSubtext: "Wake up to the Sierra Nevada — from $129/night",
    heroPropertyId: "hlt",
  },
  reno: {
    marketId: "reno",
    featuredProperties: renoProperties,
    offers: renoOffers,
    events: renoEvents,
    upgradeTagline: "Upgrade to a Downtown Skyline suite",
    upgradeSubtext: "City views over the Truckee River — from $59/night",
    heroPropertyId: "hre",
  },
};

export function getMarketContent(marketId: MarketId): MarketContent {
  return marketContent[marketId];
}

export function getProperty(marketId: MarketId, propertyId: string): Property | undefined {
  return marketContent[marketId]?.featuredProperties.find((p) => p.id === propertyId);
}
