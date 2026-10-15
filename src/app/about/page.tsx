import type { Metadata } from "next";
import Link from "next/link";
import { AmbientField } from "@/components/ambient-field";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Ojesh, a creative developer working across digital products, campaigns, and interactive web experiences.",
};

export default function AboutPage() {
  return (
    <div className="page-about">
      <section className="page-intro page-intro--about">
        <AmbientField />
        <p className="eyebrow">About / Practice</p>
        <h1>
          The details
          <br />
          make the feeling.
        </h1>
        <p className="page-intro__summary">
          I&apos;m Ojesh — a creative developer working where visual identity,
          interaction, and useful software meet.
        </p>
      </section>

      <section className="about-lead section-wrap">
        <p className="eyebrow">A working note</p>
        <div>
        <h2>The feeling is in the behavior.</h2>
          <p>
            I move between expressive campaign worlds and software people
            return to. A page should reward attention without making a task
            harder; a product should feel useful while still having a point
            of view.
          </p>
        </div>
      </section>

      <section className="about-practice section-wrap">
        <div>
          <p className="eyebrow">Across the projects</p>
          <h2>Code can carry atmosphere.</h2>
        </div>
        <div className="about-practice__list">
          <article>
            <span aria-hidden="true">01</span>
            <h3>Brand in motion</h3>
            <p>Campaign systems, editorial layout, and interaction with character.</p>
          </article>
          <article>
            <span aria-hidden="true">02</span>
            <h3>Products in use</h3>
            <p>Responsive interfaces built around real tasks and everyday context.</p>
          </article>
          <article>
            <span aria-hidden="true">03</span>
            <h3>Code as material</h3>
            <p>Creative development, realtime graphics, and purposeful motion.</p>
          </article>
        </div>
      </section>

      <section className="about-end">
        <p className="eyebrow">Have a good problem?</p>
        <h2>Let&apos;s make something clear, useful, and hard to forget.</h2>
        <Link className="button button--primary" href="/contact">
          Get in touch <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </div>
  );
}
