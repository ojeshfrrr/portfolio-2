"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState, type KeyboardEvent } from "react";
import type { Project, ProjectImage } from "@/lib/projects";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

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
      exit={changed && !reduced ? { opacity: 0, y: -5, scale: 0.995 } : undefined}
      initial={changed && !reduced ? { opacity: 0, y: 7, scale: 0.995 } : false}
      transition={reduced ? { duration: 0 } : { duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
    >
      {status !== "error" ? (
        <Image
          alt={image.alt}
          fill
          key={attempt}
          loading={eager ? "eager" : "lazy"}
          onError={() => setStatus("error")}
          onLoad={() => setStatus("ready")}
          sizes={image.aspect < 1
            ? "(max-width: 760px) calc(100vw - 2.2rem), (min-height: 1000px) 42rem, 34rem"
            : "(max-width: 760px) calc(100vw - 2.2rem), (min-width: 2096px) calc(100vw - 11rem), 91.6vw"}
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
  const reduced = usePrefersReducedMotion();
  // Keep the cover and supporting material in one visual sequence. This makes
  // the lead image navigable and gives each project a complete image index.
  const images = [project.cover, ...project.gallery];
  const image = images[activeIndex];
  const imageCount = images.length;

  if (!image || imageCount === 0) return null;

  function selectImage(index: number) {
    setActiveIndex(index);
    setHasChangedImage(true);
  }

  function moveImage(direction: -1 | 1) {
    setActiveIndex((current) => (current + direction + imageCount) % imageCount);
    setHasChangedImage(true);
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
      <div className="case-gallery__caption">
        <p aria-live="polite" aria-atomic="true"><span className="visually-hidden">Image {activeIndex + 1} of {imageCount}. </span>{image.caption}</p>
        <div aria-label="Gallery navigation" className="case-gallery__navigation">
          <span aria-hidden="true">{String(activeIndex + 1).padStart(2, "0")} / {String(imageCount).padStart(2, "0")}</span>
          <button aria-label="Previous image" onClick={() => moveImage(-1)} type="button">←</button>
          <button aria-label="Next image" onClick={() => moveImage(1)} type="button">→</button>
        </div>
      </div>

      <div
        aria-label={`Image ${activeIndex + 1} of ${imageCount}: ${image.caption}. Use left and right arrow keys to browse.`}
        aria-roledescription="image viewer"
        className="case-gallery__image"
        id="case-gallery-image"
        onKeyDown={handleViewerKeyDown}
        role="group"
        style={{ aspectRatio: String(image.aspect) }}
        tabIndex={0}
      >
        <AnimatePresence initial={false} mode="wait">
          <GalleryImage
            key={image.src}
            image={image}
            eager={activeIndex === 0}
            changed={hasChangedImage}
            reduced={reduced}
          />
        </AnimatePresence>
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
