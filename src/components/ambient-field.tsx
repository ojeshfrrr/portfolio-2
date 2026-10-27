"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Shared atmospheric light behind the spatial hero and editorial sections.
 * CSS moves a pre-rendered nebula only while it is near the viewport;
 * distant stars stay static. It never creates another WebGL context.
 */
export function AmbientField({ className = "" }: { className?: string }) {
  const field = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const element = field.current;
    if (!element) return;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      element.dataset.active = "false";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        element.dataset.active = String(Boolean(entry?.isIntersecting));
      },
      { rootMargin: "100px 0px", threshold: 0 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      delete element.dataset.active;
    };
  }, [reducedMotion]);

  return (
    <div
      aria-hidden="true"
      className={`ambient-field ${className}`.trim()}
      data-active="false"
      data-motion={reducedMotion ? "reduced" : "standard"}
      ref={field}
    />
  );
}
