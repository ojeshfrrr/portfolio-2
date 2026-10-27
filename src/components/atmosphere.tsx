import styles from "./atmosphere.module.css";

type AtmosphereVariant = "stage" | "profile" | "editorial" | "gallery" | "grid" | "closing" | "case";

/** Static decorative CSS layers with no observers, external assets or motion. */
export function Atmosphere({ variant }: { variant: AtmosphereVariant }) {
  return (
    <span aria-hidden="true" className={styles.surface} data-atmosphere={variant}>
      <span className={styles.light} />
      <span className={styles.plane} />
      <span className={styles.mesh} />
    </span>
  );
}
