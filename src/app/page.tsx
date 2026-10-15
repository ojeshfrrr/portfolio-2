import Link from "next/link";
import { AmbientField } from "@/components/ambient-field";
import { PortalHero } from "@/components/portal-hero";
import { HomeScroll } from "@/components/home-scroll";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <div className="page-home">
      <PortalHero projects={projects} />
      <HomeScroll />
      <section className="home-about" id="about" aria-labelledby="home-about-title">
        <AmbientField />
        <p className="eyebrow">About the practice</p>
        <div data-home-about>
          <h2 id="home-about-title">The feeling is<br />in the behavior.</h2>
          <div className="home-about__copy"><p>I&apos;m Ojesh — a creative developer working where visual identity, interaction, and useful software meet.</p><p>I move between expressive campaign worlds and software people return to. A page should reward attention without making a task harder.</p><Link className="text-link" href="/about">More about my practice <span aria-hidden="true">↗</span></Link></div>
        </div>
      </section>
      <section className="home-contact" id="contact" aria-labelledby="home-contact-title">
        <AmbientField className="ambient-field--contact" />
        <div className="home-contact__inner" data-home-contact>
          <p className="eyebrow">Have a good problem?</p>
          <h2 id="home-contact-title">What are you<br />thinking about?</h2>
          <div className="home-contact__bottom"><div><p>Share the early thought, the almost-finished brief, or the part that still needs solving.</p><a className="contact-email" href={`mailto:${site.contactEmail}`}>{site.contactEmail} <span aria-hidden="true">↗</span></a></div><Link className="text-link" href="/contact">Start a conversation <span aria-hidden="true">↗</span></Link></div>
        </div>
      </section>
    </div>
  );
}
