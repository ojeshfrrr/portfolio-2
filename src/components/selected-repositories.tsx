import { selectedRepositories } from "@/lib/profile";
import { site } from "@/lib/site";
import { Atmosphere } from "./atmosphere";
import styles from "./selected-repositories.module.css";

export function SelectedRepositories() {
  return (
    <section className={styles.section} id="github" aria-labelledby="selected-github-title">
      <Atmosphere variant="editorial" />
      <div className={styles.header}>
        <h2 id="selected-github-title">Selected from GitHub</h2>
        <a className={styles.profileLink} href={`${site.githubUrl}?tab=repositories`} target="_blank" rel="noreferrer">
          All repositories <span aria-hidden="true">↗</span>
        </a>
      </div>
      <ul className={styles.list}>
        {selectedRepositories.slice(0, 3).map((repository) => (
          <li key={repository.name}>
            <a className={styles.row} href={repository.url} target="_blank" rel="noreferrer" aria-label={`View ${repository.name} on GitHub${"provenance" in repository ? " (public fork)" : ""}`}>
              <div className={styles.identity}>
                <h3>{repository.name}</h3>
                {"provenance" in repository ? <p className={styles.provenance}>{repository.provenance}</p> : null}
              </div>
              <p className={styles.description}>{repository.description}</p>
              <span className={styles.language}>{repository.language}</span>
              <span className={styles.arrow} aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
