export type MarketId = "las-vegas" | "atlantic-city" | "lake-tahoe" | "reno";

export interface Market {
  id: MarketId;
  name: string;
  city: string;
  state: string;
  coordinates: { lat: number; lng: number };
  bbox: { latMin: number; latMax: number; lngMin: number; lngMax: number };
  propertyCount: number;
}

export const markets: Market[] = [
  {
    id: "las-vegas",
    name: "Las Vegas",
    city: "Las Vegas",
    state: "NV",
    coordinates: { lat: 36.1147, lng: -115.1728 },
    bbox: { latMin: 35.9, latMax: 36.4, lngMin: -115.5, lngMax: -114.9 },
    propertyCount: 6,
  },
  {
    id: "atlantic-city",
    name: "Atlantic City",
    city: "Atlantic City",
    state: "NJ",
    coordinates: { lat: 39.3643, lng: -74.4229 },
    bbox: { latMin: 39.2, latMax: 39.5, lngMin: -74.6, lngMax: -74.2 },
    propertyCount: 3,
  },
  {
    id: "lake-tahoe",
    name: "Lake Tahoe",
    city: "Stateline",
    state: "NV",
    coordinates: { lat: 38.9596, lng: -119.9399 },
    bbox: { latMin: 38.8, latMax: 39.2, lngMin: -120.2, lngMax: -119.8 },
    propertyCount: 2,
  },
  {
    id: "reno",
    name: "Reno",
    city: "Reno",
    state: "NV",
    coordinates: { lat: 39.5296, lng: -119.8138 },
    bbox: { latMin: 39.4, latMax: 39.7, lngMin: -120.0, lngMax: -119.6 },
    propertyCount: 3,
  },
];

export function detectMarketFromCoords(lat: number, lng: number): Market | null {
  for (const market of markets) {
    const { bbox } = market;
    if (
      lat >= bbox.latMin &&
      lat <= bbox.latMax &&
      lng >= bbox.lngMin &&
      lng <= bbox.lngMax
    ) {
      return market;
    }
  }
  return null;
}

export function getMarketById(id: MarketId): Market {
  return markets.find((m) => m.id === id) ?? markets[0];
}
