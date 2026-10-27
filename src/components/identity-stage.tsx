"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/lib/projects";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import styles from "./identity-stage.module.css";
import { ProjectLink } from "./project-entry";
import { Atmosphere } from "./atmosphere";

type Composition = { x: number; y: number; width: number; height: number; cut: number };
// Campaign energy, interface clarity, a film frame, and an editorial reversal.
// These only frame authentic screenshots; project data and image pixels stay intact.
const compositions: Record<string, Composition> = {
  lane: { x: 61, y: 49, width: 52, height: 38, cut: 20 },
  arcus: { x: 57, y: 48, width: 55, height: 43, cut: 0 },
  "teen-fiesta": { x: 50, y: 48, width: 68, height: 32, cut: 5 },
  rewatch: { x: 44, y: 49, width: 56, height: 39, cut: -16 },
};

/** The complete wordmark interlocks with one media stage. Selection supplies
 * framing, scroll supplies progress, and one renderer combines their state.
 * Pointer translation stays on a separate nested layer. */
export function IdentityStage({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState(0);
  const root = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const indexButton = useRef<HTMLButtonElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const images = useRef<(HTMLDivElement | null)[]>([]);
  const composition = useRef<Composition>({ ...compositions[projects[0].slug] });
  const flight = useRef({ progress: 0 });
  const desktop = useRef(false);
  const selectionTimeline = useRef<gsap.core.Timeline | null>(null);
  const weights = useRef(projects.map((_, index) => ({ value: index === 0 ? 1 : 0 })));
  const selectionRequest = useRef(0);
  const initialized = useRef(false);
  const reduced = usePrefersReducedMotion();
  const project = projects[selected];

  // Selection owns the base composition; ScrollTrigger owns progress only.
  // This is the single writer of the media window's final geometry.
  const renderComposition = useCallback(() => {
    if (!media.current || !desktop.current) return;
    const pose = composition.current;
    const progress = flight.current.progress;
    const mix = (from: number, to: number) => from + (to - from) * progress;
    const cut = pose.cut * (1 - progress);
    const polygon = cut >= 0
      ? `polygon(${cut}% 0%, 100% 0%, ${100 - cut}% 100%, 0% 100%)`
      : `polygon(0% 0%, ${100 + cut}% 0%, 100% 100%, ${-cut}% 100%)`;
    // Direct writes avoid creating GSAP set-tweens/snapshots on every frame.
    Object.assign(media.current.style, {
      left: `${mix(pose.x, 50)}%`, top: `${mix(pose.y, 49)}%`,
      width: `${mix(pose.width, 82)}%`, height: `${mix(pose.height, 62)}svh`, clipPath: polygon,
    });
  }, []);

  const renderImages = useCallback(() => {
    // Fixed DOM order, no z-index swaps. Convert blend weights to source-over
    // opacities so the combined surface remains opaque, even on interruption.
    let cumulative = 0;
    weights.current.forEach((weight, index) => {
      cumulative += weight.value;
      const image = images.current[index];
      if (image) image.style.opacity = String(cumulative > 0 ? weight.value / cumulative : 0);
    });
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const viewport = window.matchMedia("(min-width: 1000px) and (min-height: 680px)");
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const region = media.current;
    let context: gsap.Context | undefined;
    let frame = 0;
    const clear = () => {
      cancelAnimationFrame(frame);
      context?.revert();
      context = undefined;
      desktop.current = false;
      flight.current.progress = 0;
      ["left", "top", "width", "height", "clip-path"].forEach((property) => region?.style.removeProperty(property));
    };
    // The wordmark starts fully visible. Only scrolling opens it, so resizing
    // never replays an entrance. Native subscriptions are explicitly removed;
    // this GSAP version's matchMedia retains its MediaQueryList listeners.
    const configure = () => {
      clear();
      desktop.current = viewport.matches;
      flight.current.progress = 0;
      renderComposition();
      if (desktop.current && motion.matches) {
        context = gsap.context(() => {
          const timeline = gsap.timeline({ scrollTrigger: {
          id: "ovio-open-view", trigger: root.current, start: "top top", end: () => `+=${window.innerHeight * 1.15}`,
          pin: true, scrub: .55, invalidateOnRefresh: true, refreshPriority: 1,
        } });
        timeline.fromTo(flight.current, { progress: 0 }, { progress: 1, ease: "power2.inOut", duration: 1, onUpdate: renderComposition }, 0)
          .to("[data-wordmark-top], [data-outline-top]", { yPercent: -32, opacity: .08, ease: "power2.inOut", duration: 1 }, 0)
          .to("[data-wordmark-bottom], [data-outline-bottom]", { yPercent: 32, opacity: .08, ease: "power2.inOut", duration: 1 }, 0)
          .to("[data-identity-outline]", { opacity: 0, duration: .65 }, .1)
          .to("[data-opening-note]", { opacity: 0, y: -12, duration: .25 }, 0)
          .fromTo("[data-view-progress]", { scaleX: 0 }, { scaleX: 1, ease: "none", duration: 1 }, 0);
        }, root);
        frame = requestAnimationFrame(() => ScrollTrigger.refresh());
      }
    };
    configure();
    viewport.addEventListener("change", configure);
    motion.addEventListener("change", configure);
    return () => {
      viewport.removeEventListener("change", configure);
      motion.removeEventListener("change", configure);
      clear();
    };
  }, [renderComposition]);

  useLayoutEffect(() => {
    const current = images.current[selected];
    if (!current) return;
    const noMotion = reduced || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    selectionTimeline.current?.kill();
    const duration = noMotion || !initialized.current ? 0 : .75;
    const timeline = gsap.timeline({ onUpdate: () => { renderComposition(); renderImages(); } });
    weights.current.forEach((weight, index) => {
      timeline.to(weight, { value: index === selected ? 1 : 0, duration: duration * .75, ease: "power2.inOut" }, 0);
    });
    timeline.to(composition.current, { ...compositions[project.slug], duration, ease: "power3.inOut" }, 0);
    selectionTimeline.current = timeline;
    initialized.current = true;
    return () => { timeline.kill(); };
  }, [selected, reduced, project.slug, renderComposition, renderImages]);

  useLayoutEffect(() => () => { selectionRequest.current++; }, []);

  useEffect(() => {
    const region = media.current;
    if (!region) return;
    const query = window.matchMedia("(hover: hover) and (min-width: 1000px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)");
    let cleanup = () => {};
    const configure = () => {
      cleanup();
      cleanup = () => {};
      if (!query.matches) return;
      const target = region.querySelector("[data-pointer-layer]");
      let x: ReturnType<typeof gsap.quickTo>;
      let y: ReturnType<typeof gsap.quickTo>;
      const context = gsap.context(() => {
        x = gsap.quickTo(target, "x", { duration: .7, ease: "power2.out" });
        y = gsap.quickTo(target, "y", { duration: .7, ease: "power2.out" });
      }, region);
      const move = (event: PointerEvent) => {
        const rect = region.getBoundingClientRect();
        x(((event.clientX - rect.left) / rect.width - .5) * 10);
        y(((event.clientY - rect.top) / rect.height - .5) * 6);
      };
      const leave = () => { x(0); y(0); };
      region.addEventListener("pointermove", move);
      region.addEventListener("pointerleave", leave);
      cleanup = () => {
        region.removeEventListener("pointermove", move);
        region.removeEventListener("pointerleave", leave);
        context.revert();
      };
    };
    configure();
    query.addEventListener("change", configure);
    return () => { query.removeEventListener("change", configure); cleanup(); };
  }, []);

  function choose(index: number) {
    const request = ++selectionRequest.current;
    const image = images.current[index]?.querySelector("img");
    if (!image) return;
    // Keep the current image, label and destination while the requested image
    // loads. A superseded request can never commit after a newer selection.
    void image.decode().then(() => {
      if (request === selectionRequest.current) setSelected(index);
    }).catch(() => { /* Retain the working project if this image cannot decode. */ });
  }

  return (
    <section ref={root} className={styles.stage} aria-labelledby="ovio-identity">
      <Atmosphere variant="stage" />
      <h1 id="ovio-identity" className="visually-hidden">Ojesh — web experiences and Windows tools</h1>
      <div className={styles.introduction} data-opening-note>
        <p>Curiosity becomes code.<br />For the web and Windows.</p>
        <p>Ojesh, India<br /><span>TypeScript &amp; C#</span></p>
      </div>
      <div className={styles.identity} aria-hidden="true" data-identity-intro>
        <span className={styles.upper} data-wordmark-top data-mobile-identity>OVIO</span>
        <span className={styles.lower} data-wordmark-bottom>OVIO</span>
      </div>
      <div className={`${styles.identity} ${styles.outline}`} aria-hidden="true" data-identity-outline>
        <span className={styles.upper} data-outline-top>OVIO</span>
        <span className={styles.lower} data-outline-bottom>OVIO</span>
      </div>
      <div className={styles.window} data-media-window data-entry-source={project.slug} ref={media}>
        <ProjectLink className={styles.mediaLink} project={project} aria-label={`Explore ${project.title} case study`}>
          <div className={styles.pointer} data-pointer-layer>
            {projects.map((item, index) => <div key={item.slug} ref={(element) => { images.current[index] = element; }}
              className={styles.image} style={{ opacity: index === 0 ? 1 : 0, zIndex: index }} aria-hidden={selected !== index}>
              <Image src={item.cover.src} alt={selected === index ? item.cover.alt : ""} fill
                quality={90}
                sizes="(max-width: 760px) 92vw, 82vw" preload={index === 0} loading={index === 0 ? undefined : "lazy"} />
            </div>)}
          </div>
          <span className={styles.mediaHint} aria-hidden="true">Enter project ↗</span>
        </ProjectLink>
      </div>
      <div className={styles.caption}>
        <div data-project-caption aria-live="polite" aria-atomic="true"><span className={styles.projectType}>{project.type}</span><ProjectLink project={project} className={styles.projectName}>{project.title}<span aria-hidden="true">↗</span></ProjectLink></div>
        <p className={styles.cue} data-opening-note>Scroll to open the view<span aria-hidden="true">↓</span></p>
        <button type="button" ref={indexButton} className={styles.indexButton} onClick={() => dialog.current?.showModal()}>Project index <span aria-hidden="true">+</span></button>
      </div>
      <div className={styles.rail} role="group" aria-label="Select a project">
        {projects.map((item, index) => <button key={item.slug} type="button" aria-pressed={selected === index} onClick={() => choose(index)}
          onKeyDown={(event) => {
            if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
            event.preventDefault();
            const next = (index + (event.key === "ArrowRight" ? 1 : projects.length - 1)) % projects.length;
            choose(next); (event.currentTarget.parentElement?.children[next] as HTMLButtonElement)?.focus();
          }}><span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>{item.title}<span className={styles.selectionMark} aria-hidden="true">↗</span></button>)}
      </div>
      <div className={styles.progress} aria-hidden="true"><span data-view-progress /></div>
      <dialog ref={dialog} className={styles.index} aria-labelledby="project-index-title" onClose={() => indexButton.current?.focus()}
        onClick={(event) => { if (event.target === dialog.current) dialog.current?.close(); }}>
        <div className={styles.indexInner}>
          <div className={styles.indexHead}><p id="project-index-title">Four different worlds.</p><button type="button" aria-label="Close project index" onClick={() => dialog.current?.close()}>Close ×</button></div>
          <div className={styles.indexList}>{projects.map((item, index) => <div key={item.slug} className={styles.indexRow} data-entry-source={item.slug}>
            <button type="button" onClick={() => { choose(index); dialog.current?.close(); }} aria-label={`Preview ${item.title}`}><small>{String(index + 1).padStart(2, "0")}</small><span>{item.title}</span><small>{item.type}</small></button>
            <ProjectLink project={item} aria-label={`Open ${item.title} case study`}>↗</ProjectLink>
          </div>)}</div>
          <Link className={styles.archiveLink} href="/work" onClick={() => dialog.current?.close()}>Visit the work archive ↗</Link>
        </div>
      </dialog>
    </section>
  );
}
