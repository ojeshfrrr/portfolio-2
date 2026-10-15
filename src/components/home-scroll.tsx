"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function HomeScroll() {
  const reduced = usePrefersReducedMotion();
  const pathname = usePathname();
  useEffect(() => {
    if (reduced) return;
    const root = document.querySelector<HTMLElement>(".page-home");
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.fromTo("[data-home-about]", { y: 24 }, { y: 0, ease: "none", scrollTrigger: {
        trigger: ".home-about", start: "top 85%", end: "top 30%", scrub: .5,
      } });
      gsap.fromTo("[data-home-contact]", { y: 20, autoAlpha: .82 }, { y: 0, autoAlpha: 1, ease: "none", scrollTrigger: {
        trigger: ".home-contact", start: "top 88%", end: "top 38%", scrub: .45,
      } });
    }, root);
    return () => context.revert();
  }, [reduced, pathname]);
  return null;
}
