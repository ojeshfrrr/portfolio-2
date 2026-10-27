"use client";

import Image, { getImageProps } from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import type { Project, ProjectImage } from "@/lib/projects";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

function imageSizes(image: ProjectImage) {
  return image.aspect < 1 ? "(max-width: 760px) calc(100vw - 2.2rem), 400px" : "(max-width: 760px) calc(100vw - 2.2rem), 92vw";
}

function GalleryThumbnail({ image }: { image: ProjectImage }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className="case-gallery__thumbnail" aria-hidden="true">
      {!failed ? <Image alt="" fill loading="lazy" onError={() => setFailed(true)} sizes="(max-width: 760px) 76px, 92px" src={image.src} /> : null}
    </span>
  );
}

function GalleryImage({ image, eager, changed, reduced }: {
  image: ProjectImage; eager: boolean; changed: boolean; reduced: boolean;
}) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);

  return (
    <motion.div
      aria-busy={status === "loading"}
      className="case-gallery__frame"
      exit={changed && !reduced ? { opacity: 1 } : undefined}
      initial={changed && !reduced ? { opacity: 0 } : false}
      transition={reduced ? { duration: 0 } : { duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
      animate={{ opacity: 1 }}
    >
      {status !== "error" ? (
        <Image
          alt={image.alt}
          fill
          key={attempt}
          loading={eager ? "eager" : "lazy"}
          onError={() => setStatus("error")}
          onLoad={() => setStatus("ready")}
          sizes={imageSizes(image)}
          quality={90}
          src={image.src}
        />
      ) : null}
      {status === "loading" ? <p className="case-gallery__status" role="status">Loading image…</p> : null}
      {status === "error" ? (
        <div className="case-gallery__status" role="status">
          <p>This image is unavailable.</p>
          <p>Try again or choose another image.</p>
          <button className="button button--dark" onClick={(event) => {
            setStatus("loading");
            setAttempt((current) => current + 1);
            event.currentTarget.closest<HTMLElement>(".case-gallery__image")?.focus({ preventScroll: true });
          }} type="button">Retry image</button>
        </div>
      ) : null}
    </motion.div>
  );
}

export function ProjectGallery({ project, lead = false }: { project: Project; lead?: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasChangedImage, setHasChangedImage] = useState(false);
  const [pending, setPending] = useState(false);
  const [failedIndex, setFailedIndex] = useState<number | null>(null);
  const requested = useRef(0);
  const request = useRef(0);
  const reduced = usePrefersReducedMotion();
  // Keep the cover and supporting material in one visual sequence. This makes
  // the lead image navigable and gives each project a complete image index.
  const images = [project.cover, ...project.gallery];
  const image = images[activeIndex];
  const imageCount = images.length;
  useLayoutEffect(() => () => { request.current++; }, []);

  if (!image || imageCount === 0) return null;

  function selectImage(index: number) {
    requested.current = index;
    const token = ++request.current;
    const next = images[index];
    const preload = new window.Image();
    const { props } = getImageProps({ src: next.src, alt: "", fill: true, quality: 90, sizes: imageSizes(next) });
    preload.sizes = props.sizes ?? "";
    preload.srcset = props.srcSet ?? "";
    preload.src = props.src;
    setPending(true);
    setFailedIndex(null);
    void preload.decode().then(() => {
      if (request.current !== token) return;
      setActiveIndex(index);
      setHasChangedImage(true);
      setPending(false);
    }).catch(() => {
      if (request.current !== token) return;
      setFailedIndex(index);
      setPending(false);
    });
  }

  function moveImage(direction: -1 | 1) {
    selectImage((requested.current + direction + imageCount) % imageCount);
  }

  function handleViewerKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveImage(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      moveImage(1);
    }
  }

  return (
    <section aria-label={`${project.title} project images`} className={`case-gallery${lead ? " case-gallery--lead" : ""}`}>
      <div
        aria-label={`Image ${activeIndex + 1} of ${imageCount}: ${image.caption}. Use left and right arrow keys to browse.`}
        aria-roledescription="image viewer"
        className="case-gallery__image"
        id="case-gallery-image"
        data-case-entry={project.slug}
        data-portrait={image.aspect < 1}
        onKeyDown={handleViewerKeyDown}
        role="group"
        style={{ aspectRatio: String(image.aspect) }}
        tabIndex={0}
      >
        <AnimatePresence initial={false}>
          <GalleryImage
            key={image.src}
            image={image}
            eager
            changed={hasChangedImage}
            reduced={reduced}
          />
        </AnimatePresence>
      </div>

      <div className="case-gallery__caption">
        <p aria-live="polite" aria-atomic="true"><span className="visually-hidden">Image {activeIndex + 1} of {imageCount}. </span>{image.caption}</p>
        <div aria-label="Gallery navigation" className="case-gallery__navigation">
          <span aria-hidden="true">{String(activeIndex + 1).padStart(2, "0")} / {String(imageCount).padStart(2, "0")}</span>
          <button aria-label="Previous image" onClick={() => moveImage(-1)} type="button">←</button>
          <button aria-label="Next image" onClick={() => moveImage(1)} type="button">→</button>
        </div>
      </div>

      <div className="case-gallery__request" role="status" aria-live="polite">
        {pending ? "Loading selected image…" : failedIndex !== null ? <><span>The selected image couldn’t load. Your current view is still available.</span><button type="button" onClick={() => selectImage(failedIndex)}>Retry image</button></> : null}
      </div>

      <div aria-label="Choose an image" className="case-gallery__choices" role="group">
        {images.map((item, index) => (
          <button
            aria-label={`Show image ${index + 1}: ${item.caption}`}
            aria-pressed={activeIndex === index}
            className={`case-gallery__choice${activeIndex === index ? " is-selected" : ""}`}
            key={item.src}
            onClick={() => selectImage(index)}
            type="button"
          >
            <GalleryThumbnail image={item} />
            <span className="case-gallery__choice-copy">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <small>{item.caption}</small>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
