"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Hujjat mundarijasi: o'qilayotgan bo'lim avtomatik belgilanadi
export function LegalTOC({ sections }: { sections: { id: string; title: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (vis) setActive(vis.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  return (
    <nav className="space-y-1">
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={cn(
            "block rounded-lg border-l-2 px-3 py-2 text-sm transition-colors",
            active === s.id ? "border-brand-400 bg-brand-500/10 text-white" : "border-transparent text-white/50 hover:text-white",
          )}
        >
          {s.title}
        </a>
      ))}
    </nav>
  );
}
