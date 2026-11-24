/**
 * InViewPause — ekrandan tashqarida bo'lganda ichidagi barcha CSS animatsiyalarni to'xtatadi.
 * IntersectionObserver (rootMargin 150px) -> data-paused="true" -> globals.css dagi
 * `[data-paused="true"] *` qoidasi animation-play-state: paused qiladi.
 *
 * Usage:
 *   <InViewPause className="relative">
 *     <Orbit radius={140} duration={30} items={[...]} />
 *   </InViewPause>
 *   <InViewPause as="section" className="...">...</InViewPause>
 */
"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
  as?: ElementType;
  rootMargin?: string;
};

export function InViewPause({ children, className, as: Tag = "div", rootMargin = "150px" }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setPaused(!e.isIntersecting);
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <Tag ref={ref} className={className} data-paused={paused ? "true" : "false"}>
      {children}
    </Tag>
  );
}

export default InViewPause;
