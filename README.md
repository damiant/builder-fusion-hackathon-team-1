# Caesars Rewards CR App — Prototype

A fully client-side, no-database interactive prototype of the Caesars Rewards mobile app, built with React 18, TypeScript, TailwindCSS, and Framer Motion.

---

## Tech Stack

- **React 18** + **TypeScript**
- **React Router 6**
- **TailwindCSS 3**
- **Framer Motion** (page transitions, spring tokens, reduced-motion support)
- **Lucide React** (icons)

---

## Screens & States

The app is driven by a client-side state machine in `client/pages/Index.tsx`. All authentication and data are simulated — no backend required.

### State Switcher

A prototype pill at the top of the screen lets you jump directly to any state for design review.

| State ID | Description |
|---|---|
| `unauthenticated` | Guest landing screen (1A) |
| `signin` | Sign-in form |
| `join` | Join / registration form |
| `authenticated` | Authenticated home (1B) |
| `booking` | Booking flow |
| `checkin` | Check-in flow |
| `activestay` | Active stay home (1E) |
| `activestay_plans` | Active stay with plans (1E variant) |

---

## Flows

### 1. Guest → Sign In → Authenticated Home

1. **1A Guest screen** — Two CTAs: "Sign In" and "Join Us"
2. Tap **Sign In** → navigates to the sign-in form (`StateSignIn.tsx`)
3. Enter any valid email + password and submit
4. 900 ms simulated loading delay with spinner
5. **Gold Milestone Modal** (`TierMilestoneModal.tsx`) appears — full-screen overlay with animated floating dots
6. Dismiss via the × button, Escape key, or "View Benefits" CTA
7. **1B Authenticated Home** (`StateAuthenticated.tsx`) — greets "Jonathan S.", shows 3,560 credits and Gold tier status

### 2. Guest → Join Us

1. **1A Guest screen** — tap **Join Us**
2. Navigates to the join/registration form (`StateJoin.tsx`)
3. On submit → same `handleAuthSuccess()` path as sign-in (Gold milestone → 1B home)

### 3. Authenticated Home (1B)

- Welcome greeting with member name and credit balance
- Caesars Rewards Gold loyalty card with progress bar
- Horizontally scrollable content carousels: Offers, Resorts, Restaurants, Entertainment

### 4. Active Stay (1E)

Accessed via the state switcher or after a booking flow.

- **Parallax hero image** — property exterior photo with stay info (room number, dates)
- **White bottom sheet** slides over the hero (rounded top corners)
- **Quick actions rail** — horizontal scroll: Offers, Concierge, Dining, Entertainment
- **Stay summary card** — "Discover · Today, 3 Guests · Edit"
- **Dining section** — restaurant booking cards with food photos, rating, location, price tier, and available time slot pills (e.g. 7:00pm, 7:15pm, 7:30pm, + 13 more)
- **Resorts carousel** — 3:4 portrait cards with brand logos
- **Restaurants carousel** — 1:1 square cards with cuisine badge
- **Entertainment carousel** — 1:1 square cards with date badge and "Find Tickets" CTA
- **Fixed room key bar** — above the bottom nav, with "Unlock Room" button and 2-second simulated door unlock animation

### 4a. Active Stay with Plans (1E — `hasPlans` variant)

Same as 1E, but includes a "Your plans" section with reservation rows (dining, spa, pool) and an "Add a reservation" CTA.

---

## Key Components

| File | Purpose |
|---|---|
| `client/pages/Index.tsx` | App shell, state machine, nav visibility |
| `client/components/home/StateSwitcher.tsx` | Prototype state jump pill |
| `client/components/home/StateUnauthenticated.tsx` | 1A guest screen |
| `client/components/home/StateSignIn.tsx` | Sign-in form with simulated auth |
| `client/components/home/StateJoin.tsx` | Join / registration form |
| `client/components/home/TierMilestoneModal.tsx` | Gold tier milestone overlay post sign-in |
| `client/components/home/StateAuthenticated.tsx` | 1B authenticated home |
| `client/components/home/StateWithBooking.tsx` | Booking flow |
| `client/components/home/StateCheckIn.tsx` | Check-in flow |
| `client/components/home/StateActiveStay.tsx` | 1E active stay experience |
| `client/components/BottomNav.tsx` | Persistent bottom navigation (authenticated states only) |

---

## Design Notes

- **No real authentication** — any valid-format email + password works
- **Hardcoded demo persona** — "Jonathan S.", Gold tier, 3,560 credits
- **Gold tier is always shown** in the milestone modal (demo always signs in as Gold)
- **Market context** — `MarketContext` drives region-specific offers (Las Vegas default)
- **Reduced motion** — all animations respect `prefers-reduced-motion`
- **Spring tokens** — shared animation config in `client/lib/springTokens.ts`
- **Safe area** — bottom nav and fixed bars account for `env(safe-area-inset-bottom)`
