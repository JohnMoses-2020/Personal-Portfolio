/** Home page copy. Edit text here without touching components. */

export const hero = {
  eyebrow: "Cloud Infrastructure Engineer",
  headline: "Building reliable systems at scale.",
  description:
    "Software engineer focused on cloud infrastructure, distributed systems, and the platforms that power products used by millions.",
  primaryCta: { label: "Explore Work", href: "/work" },
  secondaryCta: { label: "Read Writing", href: "/writing" },
} as const;

export type ExpertiseIcon = "cloud" | "layers" | "code" | "baseball";

export const expertise: { icon: ExpertiseIcon; title: string; description: string }[] = [
  {
    icon: "cloud",
    title: "Infrastructure",
    description: "Designing, building, and operating reliable cloud platforms.",
  },
  {
    icon: "layers",
    title: "Distributed Systems",
    description: "Working with scalable, resilient, high-throughput systems.",
  },
  {
    icon: "code",
    title: "Engineering",
    description: "Turning technical designs into production systems.",
  },
  {
    icon: "baseball",
    title: "Baseball",
    description: "A lifelong appreciation for the game, its systems, and its data.",
  },
];
