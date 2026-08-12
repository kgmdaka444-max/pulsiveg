# PulsiveG — Luxury Chauffeur & VIP Transport

Client site built by CultureCollecter. Vite + React + TypeScript + Tailwind v4. PWA-ready (installable as an app).

## Go-live checklist (the only things left)

1. **Plug the client's WhatsApp number** — edit [`src/config.ts`](src/config.ts):
   - `WHATSAPP_NUMBER` — country code, no `+`, e.g. `27821234567`
   - `PHONE_DISPLAY` — human-formatted, e.g. `+27 82 123 4567`
2. **Replace placeholder chauffeurs** — [`src/data/drivers.ts`](src/data/drivers.ts) has 6 fictional profiles. Swap in real names/stats. Optional headshots → `/public/drivers/`.
3. **Confirm pricing** — tiers live in [`src/data/pricing.ts`](src/data/pricing.ts), locked from R6,000. Full economics rationale in [ECONOMICS.md](ECONOMICS.md).

## Develop

```
npm install
npm run dev
```

## Build & deploy

```
npm run build
```

`dist/` is a static site — Vercel, Netlify, or any static host.

## How bookings work (zero backend)

Every CTA composes a structured WhatsApp message via `wa.me` deep link:
booking flow (service → vehicle → chauffeur → details) → one tap → the
message lands in the client's WhatsApp with everything needed to confirm
in seconds. The rate-card lead magnet works the same way — every lead
arrives as a WhatsApp conversation the client can close on the spot.

## App-convertible

PWA manifest + service worker are wired: visitors can "Add to Home Screen"
on iOS/Android and it launches standalone like a native app. The same
codebase can be wrapped with Capacitor for app-store distribution later.
