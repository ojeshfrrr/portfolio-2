import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectGallery } from "@/components/project-gallery";
import { getProject, projects } from "@/lib/projects";
import { caseStudies } from "@/lib/case-studies";
import { CaseNarrative } from "@/components/case-narrative";
import { CaseFeature } from "@/components/case-feature";
import { ProjectLink } from "@/components/project-entry";
import profileStyles from "@/components/profile.module.css";
import { Atmosphere } from "@/components/atmosphere";
import styles from "@/components/case-study.module.css";

type CaseStudyProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title + " — Ojesh",
      description: project.summary,
      images: [project.cover.src],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((item) => item.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const study = caseStudies[project.slug];

  return (
    <article className={`case-page ${styles.page}`} data-project={project.slug}>
      <Atmosphere variant="case" />
      <div className={styles.back}>
        <Link className="text-link" href="/work">
          <span aria-hidden="true">←</span> Back to work
        </Link>
        <span>{project.type} / {project.year}</span>
      </div>

      <header className={styles.opening}>
        <div>
          <p className={styles.label}>{project.intro?.eyebrow ?? project.type}</p>
          <h1 className={styles.title}>{project.intro ? project.intro.headline.map((line) => <span key={line}>{line}</span>) : project.title}</h1>
        </div>
        <div className={styles.description}>
          <p>{project.summary}</p>
          {project.liveUnavailable ? (
            <span>Local website export · public deployment unavailable</span>
          ) : project.liveUrl ? (
            <a
              className="text-link"
              href={project.liveUrl}
              rel="noreferrer"
              target="_blank"
            >
              Visit the project <span aria-hidden="true">↗</span>
            </a>
          ) : null}
        </div>
      </header>
      <ProjectGallery key={project.slug} project={project} lead />
      <div className={styles.meta}><span>{study.scope}</span><span>{project.role}</span></div>
      <CaseNarrative project={project} study={study} />
      {project.repository ? (
        <aside className={profileStyles.repository} aria-label={`${project.title} public source`}>
          <a className={profileStyles.textLink} href={project.repository.url} rel="noreferrer" target="_blank">Explore the GitHub fork <span aria-hidden="true">↗</span></a>
          <p>{project.repository.note}</p>
        </aside>
      ) : null}
      <CaseFeature slug={project.slug} />
      <ProjectLink className={styles.next} project={nextProject}>
        <div><small>Next project</small><strong>{nextProject.title}</strong></div><span aria-hidden="true">↗</span>
      </ProjectLink>
    </article>
  );
}
