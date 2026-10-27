import Link from "next/link";
import { IdentityStage } from "@/components/identity-stage";
import { HomeScroll } from "@/components/home-scroll";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";
import { desktopProjects, profile } from "@/lib/profile";
import styles from "@/components/profile.module.css";
import { Atmosphere } from "@/components/atmosphere";
import { SelectedRepositories } from "@/components/selected-repositories";

export default function HomePage() {
  return (
    <div className="page-home page-home--identity">
      <IdentityStage projects={projects} />
      <HomeScroll />
      <section className={`home-about ${styles.homeSection}`} id="about" aria-labelledby="home-about-title">
        <Atmosphere variant="profile" />
        <div className={styles.homeMeta}><p>Ojesh / {profile.location}</p><a href={site.githubUrl} rel="noreferrer" target="_blank">@{profile.handle} <span aria-hidden="true">↗</span></a></div>
        <div className={styles.homeGrid} data-home-about>
          <h2 className={styles.homeHeading} id="home-about-title">Curiosity,<br />put to work.</h2>
          <div className={`home-about__copy ${styles.homeCopy}`}>
            <p>I&apos;m Ojesh. {profile.introduction}</p>
            <p>{profile.description} The work above explores the web side; <a href={desktopProjects[0].url} rel="noreferrer" target="_blank">ClickForge</a> is one of my Windows tools.</p>
            <div className={styles.homeActions}><Link className={styles.textLink} href="/about">More about me <span aria-hidden="true">↗</span></Link><a className={styles.textLink} href={site.githubUrl} rel="noreferrer" target="_blank">Projects on GitHub <span aria-hidden="true">↗</span></a></div>
          </div>
        </div>
      </section>
      <SelectedRepositories />
      <section className="home-contact" id="contact" aria-labelledby="home-contact-title">
        <Atmosphere variant="closing" />
        <div className="home-contact__inner" data-home-contact>
          <p className="eyebrow">Have a good problem?</p>
          <h2 id="home-contact-title">What are you<br />thinking about?</h2>
          <div className="home-contact__bottom"><div><p>Share the early thought, the almost-finished brief, or the part that still needs solving.</p><a className="contact-email" href={`mailto:${site.contactEmail}`}>{site.contactEmail} <span aria-hidden="true">↗</span></a></div><Link className="text-link" href="/contact">Start a conversation <span aria-hidden="true">↗</span></Link></div>
        </div>
      </section>
    </div>
  );
}
