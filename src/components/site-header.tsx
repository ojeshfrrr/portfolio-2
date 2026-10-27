"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (menuOpen && !dialog.open) dialog.showModal();
    if (!menuOpen && dialog.open) dialog.close();
  }, [menuOpen]);

  return (
    <header className={"site-header" + (pathname === "/" ? " site-header--identity" : "")}>
      <Link className="site-wordmark" href="/" aria-label="Ojesh — home">
        ojesh<span>.</span>
      </Link>

      <p className="site-header__role">Web &amp; Windows projects</p>

      <nav className="site-nav" aria-label="Main navigation">
        {links.slice(1).map((link) => (
          <Link
            aria-current={isActive(pathname, link.href) ? "page" : undefined}
            className={isActive(pathname, link.href) ? "is-current" : undefined}
            href={link.href}
            key={link.href}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <button
        aria-controls="mobile-navigation"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        className="site-menu-toggle"
        onClick={() => setMenuOpen((open) => !open)}
        ref={triggerRef}
        type="button"
      >
        <span />
        <span />
      </button>

      <dialog
        className="mobile-nav-dialog"
        id="mobile-navigation"
        onClose={() => {
          setMenuOpen(false);
          triggerRef.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === dialogRef.current) setMenuOpen(false);
        }}
        ref={dialogRef}
      >
        <div className="mobile-nav-dialog__inner">
          <div className="mobile-nav-dialog__top">
            <span>Navigate</span>
            <button
              aria-label="Close navigation"
              className="mobile-nav-dialog__close"
              onClick={() => setMenuOpen(false)}
              type="button"
            >
              Close <span aria-hidden="true">×</span>
            </button>
          </div>
          <AnimatePresence>
            {menuOpen ? (
              <motion.nav
                aria-label="Mobile navigation"
                animate={{ opacity: 1, y: 0 }}
                className="mobile-nav"
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.22, 0.61, 0.36, 1] }}
              >
                {links.map((link) => (
                  <Link
                    aria-current={isActive(pathname, link.href) ? "page" : undefined}
                    className={isActive(pathname, link.href) ? "is-current" : undefined}
                    href={link.href}
                    key={link.href}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>{link.label}</span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                ))}
              </motion.nav>
            ) : null}
          </AnimatePresence>
          <p className="mobile-nav-dialog__note">
            Digital work with a point of view.
          </p>
        </div>
      </dialog>
    </header>
  );
}
