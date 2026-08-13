import { useState } from "react";
import { FAQ } from "../data/faq";

export default function FaqAccordion({ limit }: { limit?: number }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const items = limit ? FAQ.slice(0, limit) : FAQ;
  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {items.map((f, i) => (
        <div key={f.q}>
          <button
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full flex items-center justify-between gap-6 py-5 text-left cursor-pointer group"
          >
            <span className="font-display text-lg group-hover:text-gold transition-colors">{f.q}</span>
            <span className="text-gold text-xl shrink-0">{openIdx === i ? "−" : "+"}</span>
          </button>
          {openIdx === i && <p className="text-mist text-sm pb-6 max-w-2xl leading-relaxed">{f.a}</p>}
        </div>
      ))}
    </div>
  );
}
