import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/manrope/latin-700.css";
import localFont from "next/font/local";
import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollReveals } from "@/components/scroll-reveals";
import { ProjectEntryProvider } from "@/components/project-entry";
import { site } from "@/lib/site";
import "./globals.css";

const display = localFont({
  src: "./fonts/bricolage-grotesque-latin.woff2",
  variable: "--font-display",
  weight: "400 700",
  display: "swap",
  fallback: ["Arial"],
});

const editorial = localFont({
  src: "./fonts/instrument-serif-latin-italic.woff2",
  variable: "--font-editorial",
  weight: "400",
  style: "italic",
  display: "swap",
  preload: false,
  adjustFontFallback: "Times New Roman",
  fallback: ["Georgia"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  title: {
    default: "Ojesh — Creative Developer",
    template: "%s — Ojesh",
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Ojesh — Creative Developer",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Ojesh — Creative Developer",
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${editorial.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <ProjectEntryProvider>
        <SmoothScroll />
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <ScrollReveals />
        </ProjectEntryProvider>
      </body>
    </html>
  );
}
