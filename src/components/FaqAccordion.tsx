import { useState } from "react";
import { FAQ } from "../data/faq";

export default function FaqAccordion({ limit }: { limit?: number }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const items = limit ? FAQ.slice(0, limit) : FAQ;
  return (
    <div className="space-y-3">
      {items.map((f, i) => {
        const open = openIdx === i;
        return (
          <div key={f.q} className={`card px-6 transition-colors ${open ? "bg-white/[0.08]" : ""}`}>
            <button
              onClick={() => setOpenIdx(open ? null : i)}
              className="w-full flex items-center justify-between gap-6 py-5 text-left press"
              aria-expanded={open}
            >
              <span className="text-[17px] font-semibold">{f.q}</span>
              <span
                className="text-gold text-xl shrink-0 transition-transform duration-300"
                style={{ transform: open ? "rotate(45deg)" : "none", transitionTimingFunction: "var(--ease-fluid)" }}
              >
                +
              </span>
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-400"
              style={{ gridTemplateRows: open ? "1fr" : "0fr", transitionTimingFunction: "var(--ease-fluid)" }}
            >
              <div className="overflow-hidden">
                <p className="text-mist text-[15px] pb-6 max-w-2xl leading-relaxed">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
