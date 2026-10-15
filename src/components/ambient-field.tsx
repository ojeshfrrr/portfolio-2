"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * A small CSS-rendered light field for the editorial sections below the stack.
 * It remains static until it approaches the viewport and never creates a
 * second WebGL context.
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
