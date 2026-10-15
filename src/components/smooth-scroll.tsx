"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function SmoothScroll() {
  const pathname = usePathname();
  const reduceMotion = usePrefersReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reduceMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({
      autoRaf: false,
      anchors: { offset: -88 },
      syncTouch: false,
      lerp: 0.1,
    });
    // Let browser keyboard/focus scrolling take over from any in-flight wheel tween.
    // No default keys are cancelled; Lenis resumes from the resulting native scroll.
    const settleForKeyboard = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.isContentEditable || target?.matches("input, textarea, select")) return;
      if (["Tab", "PageUp", "PageDown", "Home", "End", "ArrowUp", "ArrowDown", " ", "Enter"].includes(event.key)) {
        lenis.scrollTo(window.scrollY, { immediate: true, force: true });
      }
    };
    const settleForFocus = () => lenis.scrollTo(window.scrollY, { immediate: true, force: true });
    window.addEventListener("keydown", settleForKeyboard, { passive: true });
    document.addEventListener("focusin", settleForFocus, { passive: true });
    const tick = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    lenisRef.current = lenis;

    return () => {
      window.removeEventListener("keydown", settleForKeyboard);
      document.removeEventListener("focusin", settleForFocus);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduceMotion]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      lenisRef.current?.resize();
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
