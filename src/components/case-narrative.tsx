import type { Project } from "@/lib/projects";
import type { CaseStudy } from "@/lib/case-studies";
import styles from "./case-study.module.css";

export function CaseNarrative({ project, study }: { project: Project; study: CaseStudy }) {
  return (
    <section className={styles.story} aria-labelledby="case-story-title">
      <div className={styles.storyLead}>
        <p className={styles.label}>Behind the work</p>
        <h2 id="case-story-title">{study.line}</h2>
        <p>{study.opening}</p>
      </div>
      <div className={styles.decisions}>
        {study.decisions.map((decision) => <section key={decision.title}>
          <h3>{decision.title}</h3><p>{decision.text}</p>
        </section>)}
      </div>
      <aside className={styles.evidence} aria-label="Project scope and evidence">
        <span>{project.liveUnavailable ? "Local presentation" : "What this study shows"}</span>
        <p>{study.evidence}</p>
      </aside>
    </section>
  );
}
