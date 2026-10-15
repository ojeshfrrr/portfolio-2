import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectGallery } from "@/components/project-gallery";
import { getProject, projects } from "@/lib/projects";

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

  return (
    <article className="case-page" data-project={project.slug}>
      <div className="case-back">
        <Link className="text-link" href="/work">
          <span aria-hidden="true">←</span> Back to work
        </Link>
        <span>{project.type} / {project.year}</span>
      </div>

      <header className={`case-intro${project.intro ? " case-intro--editorial" : ""}`}>
        <div>
          <p className="eyebrow">{project.intro?.eyebrow ?? project.type}</p>
          <h1>{project.intro ? project.intro.headline.map((line) => <span key={line}>{line}</span>) : project.title}</h1>
        </div>
        <div className="case-intro__description">
          <p>{project.summary}</p>
          <span>{project.role}</span>
          {project.liveUnavailable ? (
            <span>Live deployment currently unavailable.</span>
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

      <section className="case-body">
        <div className="case-body__label">
          <p className="eyebrow">Overview</p>
        </div>
        <div className="case-body__content">
          <h2>{project.overview}</h2>
          <div className="case-columns">
            <div>
              <p className="eyebrow">What I focused on</p>
              <ul>
                {project.focus.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow">How it came together</p>
              <p>{project.approach}</p>
              {project.credit ? (
                <p className="case-credit">{project.credit}</p>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <Link className="next-case" href={"/work/" + nextProject.slug}>
        <span className="eyebrow">Next project</span>
        <span className="next-case__title">{nextProject.title}</span>
        <span aria-hidden="true" className="next-case__arrow">↗</span>
      </Link>
    </article>
  );
}
