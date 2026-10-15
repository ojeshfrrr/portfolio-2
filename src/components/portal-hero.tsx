"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Component, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/lib/projects";
import { site } from "@/lib/site";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { SceneScroll } from "@/components/spatial-scene";

const SpatialScene = dynamic(() => import("@/components/spatial-scene"), { ssr: false });
class SceneBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export function PortalHero({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [indexOpen, setIndexOpen] = useState(false);
  const [indexPresent, setIndexPresent] = useState(false);
  const [ready, setReady] = useState(false);
  const root = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const scroll = useRef<SceneScroll>({ progress: 0, invalidate: null });
  const registerInvalidation = useCallback((callback: (() => void) | null) => { scroll.current.invalidate = callback; }, []);
  const reduced = usePrefersReducedMotion();
  const markReady = useCallback(() => setReady(true), []);
  const markFailed = useCallback(() => setReady(false), []);
  const select = useCallback((index: number) => setSelected(index), []);
  const project = selected === null ? null : projects[selected];

  useEffect(() => {
    const canvas = root.current?.querySelector("canvas");
    if (!ready || !canvas) return;
    canvas.addEventListener("webglcontextlost", markFailed);
    return () => canvas.removeEventListener("webglcontextlost", markFailed);
  }, [ready, markFailed]);

  useEffect(() => {
    if (!indexOpen) return;
    panel.current?.querySelector<HTMLButtonElement>("button")?.focus();
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setIndexOpen(false); toggle.current?.focus(); }
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [indexOpen]);

  useLayoutEffect(() => {
    if (reduced || !ready) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(min-width: 1000px) and (min-aspect-ratio: 1/1)", () => {
      const context = gsap.context(() => {
        const timeline = gsap.timeline({ scrollTrigger: {
          id: "portfolio-flight", trigger: root.current, start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 1.5)}`,
          pin: true, scrub: .65, anticipatePin: 1, invalidateOnRefresh: true, refreshPriority: 1,
        } });
        timeline.to(scroll.current, { progress: 1, duration: .85, ease: "power1.inOut", onUpdate: () => scroll.current.invalidate?.() }, 0)
          .to(".spatial-note, .spatial-scroll", { autoAlpha: 0, y: -18, duration: .2 }, 0)
          .to(".spatial-focus", { autoAlpha: 0, duration: .2 }, .2)
          .fromTo(".spatial-arrival", { autoAlpha: 0, y: 15 }, { autoAlpha: 1, y: 0, duration: .2 }, .65)
          .fromTo(".spatial-progress span", { scaleX: 0 }, { scaleX: 1, ease: "none", duration: 1 }, 0);
      }, root);
      // Textures become ready after the chapter triggers have measured their
      // positions. Re-measure after inserting the pin spacer, with the pin first.
      const refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => { cancelAnimationFrame(refreshFrame); context.revert(); scroll.current.progress = 0; scroll.current.invalidate?.(); };
    });
    return () => media.revert();
  }, [reduced, ready, scroll]);

  return (
    <section className="spatial-hero" ref={root} aria-label="Spatial project overview">
      <h1 className="visually-hidden">Ojesh — selected creative development projects</h1>
      <div className="spatial-note">Independent creative developer<br /><span>Agra, India · Available worldwide</span></div>
      <div className="spatial-stage">
        <div className={"spatial-fallback" + (ready ? " is-hidden" : "")}>
          {projects.map((item, i) => <Link href={`/work/${item.slug}`} key={item.slug}
            style={{ "--plane": i, "--aspect": item.cover.aspect } as CSSProperties}>
            <Image src={item.cover.src} alt={item.cover.alt} fill sizes="(max-width: 760px) 75vw, 42vw" loading="eager" />
          </Link>)}
        </div>
        <div className={"spatial-webgl" + (ready ? " is-ready" : "")} aria-hidden="true"><SceneBoundary onFailure={markFailed}>
          <SpatialScene projects={projects} selected={selected} reduced={reduced} scroll={scroll} onInvalidate={registerInvalidation} onSelect={select} onReady={markReady} onLoading={markFailed} />
        </SceneBoundary></div>
      </div>
      <div className="spatial-arrival"><span>Inside the work / {String((selected ?? 0) + 1).padStart(2, "0")}</span><p>{(project ?? projects[0]).title}</p><Link href={`/work/${(project ?? projects[0]).slug}`}>Explore the case study ↗</Link></div>
      <div className="spatial-progress" aria-hidden="true"><span /></div>
      <div className="spatial-focus" aria-live="polite" aria-atomic="true">
        {project ? <><p>{project.title}<span>{project.type}</span></p>
          {!indexPresent ? <Link href={`/work/${project.slug}`}>View case study ↗</Link> : null}</> : <p>Selected digital work<span>Explore a surface or open the index.</span></p>}
      </div>
      <div className="spatial-footer">
        <a className="spatial-contact" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
        <div className="spatial-switch" role="group" aria-label="Project views">
          <button type="button" aria-pressed={selected === null && !indexOpen} onClick={() => { setSelected(null); setIndexOpen(false); }}>Overview</button>
          <button type="button" ref={toggle} aria-expanded={indexOpen} aria-controls="spatial-index" onClick={() => {
            if (indexOpen) setIndexOpen(false);
            else { setIndexPresent(true); setIndexOpen(true); }
          }}>Index <span>{indexOpen ? "−" : "+"}</span></button>
        </div>
      </div>
      <AnimatePresence initial={false} onExitComplete={() => { if (!indexOpen) setIndexPresent(false); }}>
        {indexOpen && <motion.div
          className="spatial-index"
          id="spatial-index"
          ref={panel}
          role="region"
          aria-label="Project index"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 320, damping: 32, mass: 0.7 }}
        >
          <div className="spatial-index__head"><span>Selected work / {String(projects.length).padStart(2, "0")}</span><button aria-label="Close project index" type="button" onClick={() => { setIndexOpen(false); toggle.current?.focus(); }}>×</button></div>
          {projects.map((item, i) => <div className="spatial-index__row" key={item.slug}>
            <button className="spatial-index__select" type="button" aria-pressed={selected === i} onClick={() => select(i)}>
              <span className="spatial-index__thumb" aria-hidden="true">
                <Image alt="" fill loading="lazy" sizes="72px" src={item.cover.src} />
              </span>
              <span className="spatial-index__details">
                <span className="spatial-index__title"><span>{String(i + 1).padStart(2, "0")}</span>{item.title}</span>
                <small>{item.type}</small>
              </span>
            </button>
            <Link href={`/work/${item.slug}`} aria-label={`Open ${item.title} case study`}>↗</Link>
          </div>)}
        </motion.div>}
      </AnimatePresence>
      <a href="#about" className="spatial-scroll" aria-label="Continue to about and contact"><span>Continue below</span> ↓</a>
    </section>
  );
}


