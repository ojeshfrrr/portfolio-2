import type { NextConfig } from "next";

const portwaysExport = process.env.PORTWAYS_STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  output: portwaysExport ? "export" : undefined,
  trailingSlash: portwaysExport,
  images: { qualities: [75, 90], unoptimized: portwaysExport },
};

export default nextConfig;
