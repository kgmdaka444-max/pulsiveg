// Self-service quote engine — computes an exact, line-itemed quote from the
// published rate card so the fleet desk only has to confirm availability.

import { TIERS, formatZAR } from "./pricing";

export const EXTRA_HOUR_RATE = 1150;
export const EXTRA_KM_RATE = 14;
export const AFTER_HOURS_PCT = 0.15; // 22:00–05:00
export const HOLIDAY_PCT = 0.2;
export const DEPOSIT_PCT = 0.5;

/** Included hours/km per tier (mirrors the published inclusions). */
export const INCLUSIONS: Record<string, { hours: number; km: number }> = {
  transfer: { hours: 4, km: 80 },
  fullday: { hours: 8, km: 250 },
  events: { hours: 8, km: 150 },
};

// SA public holidays 2026 (incl. observed Monday for Aug 9).
const HOLIDAYS_2026 = new Set([
  "2026-01-01", "2026-03-21", "2026-04-03", "2026-04-06", "2026-04-27",
  "2026-05-01", "2026-06-16", "2026-08-09", "2026-08-10", "2026-09-24",
  "2026-12-16", "2026-12-25", "2026-12-26",
]);

export interface QuoteInput {
  tierId: string;
  vehiclePremium: number;
  date: string; // yyyy-mm-dd
  time: string; // HH:mm
  hours: number; // estimated hours on the road
  km: number; // estimated distance
}

export interface QuoteLine {
  label: string;
  amount: number;
}

export interface Quote {
  ref: string;
  lines: QuoteLine[];
  total: number;
  deposit: number;
}

export function isAfterHours(time: string): boolean {
  if (!time) return false;
  const h = parseInt(time.slice(0, 2), 10);
  return h >= 22 || h < 5;
}

export function isHoliday(date: string): boolean {
  return HOLIDAYS_2026.has(date);
}

function makeRef(): string {
  return "PG-" + Math.random().toString(36).slice(2, 6).toUpperCase();
}

/** Corporate is retainer-based — no instant quote; it routes to qualification. */
export function isInstantQuotable(tierId: string): boolean {
  return tierId in INCLUSIONS;
}

export function computeQuote(q: QuoteInput): Quote | null {
  const tier = TIERS.find((t) => t.id === q.tierId);
  const inc = INCLUSIONS[q.tierId];
  if (!tier || !inc) return null;

  const lines: QuoteLine[] = [
    { label: `${tier.name} base (${inc.hours} hrs / ${inc.km} km included)`, amount: tier.from },
  ];
  if (q.vehiclePremium > 0) lines.push({ label: "Vehicle premium", amount: q.vehiclePremium });

  const extraHours = Math.max(0, Math.ceil(q.hours) - inc.hours);
  if (extraHours > 0)
    lines.push({ label: `${extraHours} extra hour${extraHours > 1 ? "s" : ""} × ${formatZAR(EXTRA_HOUR_RATE)}`, amount: extraHours * EXTRA_HOUR_RATE });

  const extraKm = Math.max(0, Math.round(q.km) - inc.km);
  if (extraKm > 0)
    lines.push({ label: `${extraKm} extra km × R${EXTRA_KM_RATE}`, amount: extraKm * EXTRA_KM_RATE });

  const subtotal = lines.reduce((s, l) => s + l.amount, 0);

  if (isAfterHours(q.time))
    lines.push({ label: "After-hours surcharge (22:00–05:00, +15%)", amount: Math.round(subtotal * AFTER_HOURS_PCT) });
  if (isHoliday(q.date))
    lines.push({ label: "Public holiday surcharge (+20%)", amount: Math.round(subtotal * HOLIDAY_PCT) });

  const total = lines.reduce((s, l) => s + l.amount, 0);
  return {
    ref: makeRef(),
    lines,
    total,
    deposit: Math.round(total * DEPOSIT_PCT),
  };
}
