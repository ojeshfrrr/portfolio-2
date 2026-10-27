import type { Metadata } from "next";
import Link from "next/link";
import { Atmosphere } from "@/components/atmosphere";
import { ContactComposer } from "@/components/contact-composer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a conversation with Ojesh about a digital project.",
};

export default function ContactPage() {
  return (
    <div className="page-contact">
      <section className="contact-intro">
        <Atmosphere variant="closing" />
        <p className="eyebrow">Contact / Start a conversation</p>
        <h1>
          What are you
          <br />
          thinking about?
        </h1>
        <p>
          Share the early thought, the almost-finished brief, or the part that
          still needs solving.
        </p>
        <a className="contact-email" href={"mailto:" + site.contactEmail}>
          {site.contactEmail}
          <span aria-hidden="true">↗</span>
        </a>
      </section>

      <section aria-labelledby="contact-note-title" className="contact-workbench">
        <Atmosphere variant="grid" />
        <div className="contact-workbench__intro">
          <p className="eyebrow">A short brief / 01</p>
          <h2 id="contact-note-title">Give the idea<br />somewhere to start.</h2>
          <p>A few lines are enough. The useful detail is usually the one you are still figuring out.</p>
        </div>
        <ContactComposer />
      </section>

      <section className="contact-details section-wrap">
        <Atmosphere variant="editorial" />
        <div>
          <p className="eyebrow">A few useful links</p>
          <a className="text-link" href={site.githubUrl} rel="noreferrer" target="_blank">
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <Link className="text-link" href="/work">
            Selected work <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <p className="contact-note">
          Your email app will open a new message to this address.
        </p>
      </section>
    </div>
  );
}
