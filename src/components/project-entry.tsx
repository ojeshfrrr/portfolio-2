"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, type ComponentProps, type ReactNode } from "react";
import { gsap } from "gsap";
import type { Project } from "@/lib/projects";
import styles from "./project-entry.module.css";

type Entry = { slug: string; href: string; source: HTMLImageElement; rect: DOMRect; clip: string; title: string };
type EntryHandler = (project: Project, link: HTMLAnchorElement) => boolean;
const EntryContext = createContext<EntryHandler>(() => false);
const rectangle = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

/** A separate, short-lived image surface owns route entry. It never writes to
 * the homepage's framing, scroll progress, pointer layer or blend weights. */
export function ProjectEntryProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const overlay = useRef<HTMLDivElement>(null);
  const surface = useRef<HTMLDivElement>(null);
  const curtain = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLParagraphElement>(null);
  const pending = useRef<Entry | null>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const token = useRef(0);

  const cancel = useCallback(() => {
    token.current++;
    clearTimeout(timeout.current);
    timeline.current?.kill();
    timeline.current = null;
    pending.current = null;
    if (overlay.current) overlay.current.dataset.active = "false";
    surface.current?.replaceChildren();
  }, []);

  const begin = useCallback<EntryHandler>((project, link) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    const image = Array.from(document.images).find(img => img.src.includes(encodeURIComponent(project.cover.src)) || img.getAttribute("src") === project.cover.src);
    // Missing/undecoded imagery takes the normal link path. Navigation is never
    // held hostage to an asset request or to the cinematic surface.
    if (!image?.complete || !image.naturalWidth || !surface.current || !overlay.current) return false;
    const source = link.closest<HTMLElement>("[data-entry-source]") ?? document.querySelector<HTMLElement>(`[data-entry-source="${project.slug}"]`);
    const rect = (source ?? link).getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return false;
    cancel();
    const currentToken = token.current;
    const clip = source ? getComputedStyle(source).clipPath : "none";
    const entry: Entry = { slug: project.slug, href: `/work/${project.slug}`, source: image, rect, clip: clip.startsWith("polygon") ? clip : rectangle, title: project.title };
    pending.current = entry;
    const clone = image.cloneNode() as HTMLImageElement;
    clone.removeAttribute("srcset"); clone.removeAttribute("sizes");
    clone.src = image.currentSrc || image.src;
    clone.alt = "";
    const imageRect = image.getBoundingClientRect();
    const fromHero = Boolean(source?.matches("[data-media-window]"));
    Object.assign(clone.style, { left: `${fromHero ? imageRect.left - rect.left : 0}px`, top: `${fromHero ? imageRect.top - rect.top : 0}px`, width: `${fromHero ? imageRect.width : rect.width}px`, height: `${fromHero ? imageRect.height : rect.height}px` });
    surface.current.replaceChildren(clone);
    overlay.current.dataset.active = "true";
    if (label.current) label.current.textContent = project.title;
    gsap.set(surface.current, { left: rect.left, top: rect.top, width: rect.width, height: rect.height, clipPath: entry.clip, opacity: 1 });
    gsap.set(curtain.current, { opacity: 0 });
    // Navigation starts immediately; this opening runs while the route loads.
    timeline.current = gsap.timeline().to(curtain.current, { opacity: 1, duration: .2 }, 0)
      .to(surface.current, { left: innerWidth * .08, top: innerHeight * .2, width: innerWidth * .84, height: innerHeight * .64, clipPath: rectangle, duration: .45, ease: "power3.inOut" }, 0)
      .to(clone, { left: 0, top: 0, width: innerWidth * .84, height: innerHeight * .64, duration: .45, ease: "power3.inOut" }, 0);
    router.push(entry.href);
    // A slow/failed route must never leave a persistent curtain over the site.
    timeout.current = setTimeout(() => { if (token.current === currentToken) cancel(); }, 2500);
    return true;
  }, [cancel, router]);

  useLayoutEffect(() => {
    const entry = pending.current;
    if (!entry) return;
    if (pathname !== entry.href) { cancel(); return; }
    const currentToken = token.current;
    const target = document.querySelector<HTMLElement>(`[data-case-entry="${entry.slug}"]`);
    const image = target?.querySelector("img");
    if (!target || !image) { cancel(); return; }
    // The destination must not appear behind a still-moving copy of itself.
    // Cover the route before its first paint; reveal only after alignment.
    timeline.current?.kill();
    gsap.set(curtain.current, { opacity: 1 });
    let frame = 0;
    const arrive = () => {
      if (currentToken !== token.current) return;
      frame = requestAnimationFrame(() => {
        if (currentToken !== token.current) return;
        const rect = target.getBoundingClientRect();
        const clone = surface.current?.querySelector("img");
        if (!clone) { cancel(); return; }
        // Same artwork, now at the decoded case-study resolution.
        clone.src = image.currentSrc || image.src;
        timeline.current?.kill();
        timeline.current = gsap.timeline({ onComplete: cancel })
          .to(surface.current, { left: rect.left, top: rect.top, width: rect.width, height: rect.height, clipPath: rectangle, duration: .6, ease: "power3.inOut" }, 0)
          .to(clone, { left: 0, top: 0, width: rect.width, height: rect.height, duration: .6, ease: "power3.inOut" }, 0)
          .to(curtain.current, { opacity: 0, duration: .2 }, .6)
          .to(surface.current, { opacity: 0, duration: .1 }, .8);
      });
    };
    void image.decode().then(arrive).catch(() => { if (currentToken === token.current) cancel(); });
    return () => cancelAnimationFrame(frame);
  }, [pathname, cancel]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onPreference = () => { if (preference.matches) cancel(); };
    const onResize = () => cancel();
    const onInput = () => { if (pending.current) cancel(); };
    window.addEventListener("resize", onResize);
    window.addEventListener("popstate", cancel);
    // User input wins over the handoff. Never intercept scrolling or keep
    // animating toward a rectangle that a gesture/focus action has moved.
    window.addEventListener("pointerdown", onInput, { passive: true });
    window.addEventListener("wheel", onInput, { passive: true });
    window.addEventListener("keydown", onInput, { passive: true });
    preference.addEventListener("change", onPreference);
    return () => { window.removeEventListener("resize", onResize); window.removeEventListener("popstate", cancel); window.removeEventListener("pointerdown", onInput); window.removeEventListener("wheel", onInput); window.removeEventListener("keydown", onInput); preference.removeEventListener("change", onPreference); cancel(); };
  }, [cancel]);

  return <EntryContext.Provider value={begin}>{children}
    <div ref={overlay} className={styles.overlay} aria-hidden="true" data-project-entry data-active="false">
      <div ref={curtain} className={styles.curtain} /><div ref={surface} className={styles.surface} data-entry-surface /><p ref={label} className={styles.label} />
    </div>
  </EntryContext.Provider>;
}

type ProjectLinkProps = Omit<ComponentProps<typeof Link>, "href" | "onNavigate"> & { project: Project };
export function ProjectLink({ project, ...props }: ProjectLinkProps) {
  const begin = useContext(EntryContext);
  const anchor = useRef<HTMLAnchorElement>(null);
  return <Link {...props} ref={anchor} href={`/work/${project.slug}`} onNavigate={event => {
    if (anchor.current && begin(project, anchor.current)) event.preventDefault();
    anchor.current?.closest("dialog")?.close();
  }} />;
}
