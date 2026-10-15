import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div>
          <p className="eyebrow">Have something in mind?</p>
          <Link className="site-footer__cta" href="/contact">
            Let&apos;s talk <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <a className="text-link" href={"mailto:" + site.contactEmail}>
          {site.contactEmail}
        </a>
      </div>
      <div className="site-footer__bottom">
        <span>© 2026 Ojesh</span>
        <a href={site.githubUrl} rel="noreferrer" target="_blank">
          GitHub <span aria-hidden="true">↗</span>
        </a>
        <Link href="/work">Selected work</Link>
      </div>
    </footer>
  );
}
