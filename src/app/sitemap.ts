import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.hasPublicOrigin) return [];

  const pages = [
    "",
    "/work",
    "/about",
    "/contact",
    ...projects.map((project) => "/work/" + project.slug),
  ];

  return pages.map((path) => ({
    url: new URL(path, site.origin).toString(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path.startsWith("/work/") ? 0.7 : 0.8,
  }));
}
