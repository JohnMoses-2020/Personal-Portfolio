/**
 * Site-wide configuration.
 *
 * Everything a visitor can click on or that identifies the owner lives here so
 * it can be changed in one place. Values marked PLACEHOLDER should be replaced
 * before launch (see README → "Customizing").
 */

export type NavItem = {
  label: string;
  href: "/work" | "/writing" | "/about";
};

export const siteConfig = {
  name: "John Moses",
  initials: "JM",
  role: "Cloud Infrastructure Engineer",
  tagline: "Building reliable systems at scale.",
  description:
    "Software engineer focused on cloud infrastructure, distributed systems, and the platforms that power products used by millions.",

  /**
   * Canonical production URL, used for metadata, Open Graph, sitemap and
   * robots. Override with NEXT_PUBLIC_SITE_URL at build time.
   * PLACEHOLDER until a domain is chosen.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",

  /** PLACEHOLDER — from the design reference; confirm or change. */
  location: "Los Angeles, CA",

  /** Contact & social links. PLACEHOLDER values until provided. */
  links: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@example.com",
    github: process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://www.linkedin.com/",
  },

  /**
   * Optional downloadable résumé. When unset the /resume page renders the
   * structured résumé only and hides the download button (no dead links).
   * Place the file in /public (e.g. /public/resume/john-moses-resume.pdf)
   * and set NEXT_PUBLIC_RESUME_PDF_URL=/resume/john-moses-resume.pdf
   */
  resumePdfUrl: process.env.NEXT_PUBLIC_RESUME_PDF_URL || null,

  nav: [
    { label: "Work", href: "/work" },
    { label: "Writing", href: "/writing" },
    { label: "About", href: "/about" },
  ] satisfies NavItem[],
} as const;

export const mailtoHref = `mailto:${siteConfig.links.email}`;
