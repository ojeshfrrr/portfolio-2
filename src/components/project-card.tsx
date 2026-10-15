import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <article className="project-card" data-project={project.slug}>
      <Link
        aria-label={"Open " + project.title + " case study"}
        className="project-card__image"
        data-scroll-reveal
        href={"/work/" + project.slug}
      >
        <Image
          alt={project.cover.alt}
          fill
          loading={index === 0 ? "eager" : "lazy"}
          sizes="(max-width: 760px) 100vw, 92vw"
          src={project.cover.src}
        />
        <div aria-hidden="true" className="project-card__overlay">
          <span className="project-card__index">{String(index + 1).padStart(2, "0")} / {project.year}</span>
          <div className="project-card__meta">
            <div>
              <p className="eyebrow">{project.type}</p>
              <h2>{project.title}</h2>
              <p>{project.summary}</p>
            </div>
            <span className="project-card__open">↗</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
