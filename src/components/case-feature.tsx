import Image from "next/image";
import styles from "./case-study.module.css";

/** A project-specific close look, separate from the unified website gallery.
 * Artwork is supplied; interface details are crops of real browser captures. */
export function CaseFeature({ slug }: { slug: string }) {
  if (slug === "teen-fiesta") return <section className={styles.filmFeature} aria-labelledby="film-feature-title">
    <div><p className={styles.label}>From the local export</p><h2 id="film-feature-title">The moving image.</h2><p>The supplied film shown in the website. Play it on demand; the page stays quiet until you choose.</p></div>
    <figure><video controls playsInline preload="none" width="1280" height="720" poster="/work/case-studies/teen-fiesta-film-poster.jpg" aria-label="Supplied Teen Fiesta event film"><source src="/work/case-studies/teen-fiesta-film.mp4" type="video/mp4" />Your browser cannot play this film.</video><figcaption>Supplied Teen Fiesta film · from the existing local export</figcaption></figure>
  </section>;

  const feature = slug === "lane" ? {
    label: "The visual source", title: "From poster to page.",
    text: "The supplied HEAT artwork sets the colour, density and tone. The website gives that identity a setting without redrawing the original poster.",
    src: "/work/case-studies/lane-original-artwork.webp", width: 1080, height: 1080,
    alt: "Original supplied HEAT by LANE red and black campaign poster.", caption: "Original supplied campaign artwork / website development by OVIO",
  } : slug === "arcus" ? {
    label: "Interface detail", title: "Narrow the next choice.",
    text: "Search, exercise groups and muscle filters sit together. This close view comes from the actual exercise library, with no personal workout records added for the presentation.",
    src: "/work/case-studies/arcus-library-detail.webp", width: 2200, height: 950,
    alt: "Close view of ARCUS exercise search, catalogue tabs and muscle filters.", caption: "Detail from the real local exercise-library capture",
  } : {
    label: "The public catalogue", title: "Let the media lead.",
    text: "The catalogue changes the rhythm from editorial introduction to browsing. Artwork, titles and visible metadata form the discovery surface; this is a capture of the public product, not a fabricated collection.",
    src: "/work/case-studies/rewatch-catalogue-detail.webp", width: 2200, height: 920,
    alt: "Detail of the actual Rewatch public catalogue's media artwork and titles.", caption: "Detail from the public browse page / captured 17 October 2026",
  };
  return <section className={`${styles.feature} ${slug === "lane" ? styles.artworkFeature : styles.interfaceFeature}`} aria-labelledby="case-feature-title">
    <div><p className={styles.label}>{feature.label}</p><h2 id="case-feature-title">{feature.title}</h2><p>{feature.text}</p></div>
    <figure><Image src={feature.src} alt={feature.alt} width={feature.width} height={feature.height} quality={90} sizes={slug === "lane" ? "(max-width: 760px) 90vw, 45vw" : "92vw"} loading="lazy" /><figcaption>{feature.caption}</figcaption></figure>
  </section>;
}
