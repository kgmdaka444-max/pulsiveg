import { useEffect, useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";

/** Scroll-reveal wrapper — fades/rises once when it enters the viewport. */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}

export function Kicker({ children }: { children: ReactNode }) {
  return <p className="kicker">{children}</p>;
}

/** Centered section intro — eyebrow, display headline, optional sub. */
export function SectionHead({ kicker, title, sub }: { kicker: string; title: ReactNode; sub?: string }) {
  return (
    <Reveal className="text-center max-w-3xl mx-auto">
      <Kicker>{kicker}</Kicker>
      <h2 className="font-display text-4xl sm:text-5xl mt-4">{title}</h2>
      {sub && <p className="text-mist text-lg mt-5">{sub}</p>}
    </Reveal>
  );
}

/** Page header used by every inner page. */
export function PageHeader({ kicker, title, sub }: { kicker: string; title: ReactNode; sub?: string }) {
  return (
    <div className="band">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-36 pb-20 text-center">
        <Reveal>
          <Kicker>{kicker}</Kicker>
          <h1 className="font-display text-5xl sm:text-6xl mt-4 max-w-3xl mx-auto">{title}</h1>
          {sub && <p className="text-mist text-lg max-w-xl mx-auto mt-6">{sub}</p>}
        </Reveal>
      </div>
    </div>
  );
}

export function GoldButton({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="btn-primary">
      {children}
    </Link>
  );
}

export function GhostButton({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="btn-secondary">
      {children}
    </Link>
  );
}

// Placeholder figures — confirm real numbers with the client before launch.
export const STATS = [
  { value: "1,200+", label: "Journeys completed" },
  { value: "4.9", label: "Client rating" },
  { value: "24/7", label: "Fleet desk" },
  { value: "98%", label: "On-time arrivals" },
];

export function StatsBar() {
  return (
    <div className="card grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/[0.07] overflow-hidden">
      {STATS.map((s) => (
        <div key={s.label} className="p-8 text-center">
          <p className="font-display text-4xl text-gold">{s.value}</p>
          <p className="text-[13px] text-mist mt-2">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

export function TrustStrip() {
  const sectors = ["Hotels & Lodges", "Corporate Accounts", "Production Houses", "Weddings & Events", "Government & Delegations"];
  return (
    <div className="border-y border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
        <span className="text-[12px] text-mist/70">Trusted across</span>
        {sectors.map((s) => (
          <span key={s} className="text-[13px] font-medium text-cream/45">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
