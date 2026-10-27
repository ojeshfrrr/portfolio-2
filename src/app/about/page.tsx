import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { desktopProjects, profile } from "@/lib/profile";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";
import styles from "@/components/profile.module.css";
import { Atmosphere } from "@/components/atmosphere";

export const metadata: Metadata = {
  title: "About",
  description: "Ojesh, based in India. Building with TypeScript and C#, from web experiences to native Windows tools. Explore the projects and public source.",
};

const webProjects = projects.flatMap((project) => project.repository ? [{ ...project, repository: project.repository }] : []);

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <header className={styles.masthead}>
        <Atmosphere variant="profile" />
        <div className={styles.topline}>
          <p>About me</p>
          <a href={site.githubUrl} rel="noreferrer" target="_blank">@{profile.handle} <span aria-hidden="true">↗</span></a>
        </div>
        <div className={styles.identity}>
          <h1 className={styles.name}>Ojesh.</h1>
          <div className={styles.statement}>
            <p>{profile.introduction}</p>
            <a className={styles.textLink} href={site.githubUrl} rel="noreferrer" target="_blank">Explore my GitHub <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <dl className={styles.facts}>
          <div><dt>Based in</dt><dd>{profile.location}</dd></div>
          <div><dt>Mostly working with</dt><dd>TypeScript &amp; C#</dd></div>
          <div><dt>Making</dt><dd>Web experiences &amp; Windows tools</dd></div>
        </dl>
      </header>

      <section className={styles.intro} aria-labelledby="profile-note">
        <Atmosphere variant="editorial" />
        <h2 id="profile-note">From the browser to the desktop.</h2>
        <div>
          <p>{profile.description}</p>
          <p>That range includes event websites, a training log, and <a href={desktopProjects[0].url} rel="noreferrer" target="_blank">ClickForge</a>, a native Windows input utility. The projects below bring those two sides together.</p>
          <a className={styles.textLink} href="https://github.com/ojeshfrrr/portfolio-2" rel="noreferrer" target="_blank">This portfolio&apos;s source <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className={styles.web} aria-labelledby="profile-web">
        <Atmosphere variant="gallery" />
        <div className={styles.sectionHead}>
          <h2 id="profile-web">In the browser.</h2>
          <p>Event websites and training tools.<br />Built with TypeScript, React, and Next.js.</p>
        </div>
        {webProjects.map((project) => (
          <article className={styles.webProject} key={project.slug}>
            <Link className={styles.webImage} href={`/work/${project.slug}`} aria-label={`Explore the ${project.title} case study`}>
              <Image src={project.cover.src} alt={project.cover.alt} width={960} height={Math.round(960 / project.cover.aspect)} sizes="(max-width: 760px) 92vw, 48vw" quality={90} />
            </Link>
            <div>
              <p className={styles.projectKind}>{project.type}</p>
              <h3>{project.title}</h3>
              <p className={styles.projectDescription}>{project.repository.description}</p>
              <div className={styles.actions}>
                <Link className={styles.textLink} href={`/work/${project.slug}`}>View case study <span aria-hidden="true">↗</span></Link>
                <a className={styles.textLink} href={project.repository.url} rel="noreferrer" target="_blank">GitHub fork <span aria-hidden="true">↗</span></a>
              </div>
              <p className={styles.sourceNote}>{project.repository.note}</p>
            </div>
          </article>
        ))}
      </section>

      <section className={styles.desktop} aria-labelledby="profile-desktop">
        <Atmosphere variant="grid" />
        <div className={styles.sectionHead}>
          <h2 id="profile-desktop">On the desktop.</h2>
          <p>Native Windows utilities and hardware projects, including forks and independent customizations.</p>
        </div>
        {desktopProjects.map((project) => (
          <article className={styles.desktopProject} key={project.name}>
            <div><p className={styles.projectKind}>{project.kind}</p><h3>{project.name}</h3></div>
            <div><p className={styles.projectDescription}>{project.description}</p><p className={styles.technology}>{project.technology}</p></div>
            <a className={styles.textLink} href={project.url} rel="noreferrer" target="_blank" aria-label={`${project.linkLabel}: ${project.name}`}>{project.linkLabel} <span aria-hidden="true">↗</span></a>
          </article>
        ))}
      </section>

      <section className={styles.closing} aria-labelledby="profile-next">
        <Atmosphere variant="closing" />
        <div>
          <h2 id="profile-next">Following the next idea.</h2>
          <a className={styles.textLink} href={site.githubUrl} rel="noreferrer" target="_blank">See what I&apos;m building on GitHub <span aria-hidden="true">↗</span></a>
        </div>
        <Link className={styles.textLink} href="/contact">Get in touch <span aria-hidden="true">↗</span></Link>
      </section>
    </div>
  );
}
