const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL?.trim();
let validPublicOrigin: string | undefined;

if (configuredOrigin) {
  try {
    const parsedOrigin = new URL(configuredOrigin);
    if (parsedOrigin.protocol === "https:" || parsedOrigin.protocol === "http:") {
      validPublicOrigin = parsedOrigin.origin;
    }
  } catch {
    validPublicOrigin = undefined;
  }
}

const publicOrigin = validPublicOrigin ?? "http://127.0.0.1:3000";

export const site = {
  name: "Ojesh",
  role: "Creative developer",
  description:
    "Creative development for products with a pulse and campaigns with a point of view.",
  origin: publicOrigin,
  hasPublicOrigin: Boolean(validPublicOrigin),
  contactEmail:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "workwithovio@gmail.com",
  githubUrl: "https://github.com/ojeshfrrr",
};
