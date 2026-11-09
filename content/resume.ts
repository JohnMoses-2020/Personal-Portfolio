/**
 * Structured résumé content rendered at /resume.
 * Items marked PLACEHOLDER should be confirmed or replaced.
 */

export type ResumeEntry = {
  title: string;
  organization: string;
  location?: string;
  period: string;
  highlights: string[];
  placeholder?: boolean;
};

export const resume = {
  summary:
    "Software engineer focused on cloud infrastructure and distributed systems — designing, building, and operating reliable platforms at scale.",

  experience: [
    {
      title: "Software Engineer",
      organization: "Microsoft",
      location: "Microsoft 365 Infrastructure",
      period: "Dates — PLACEHOLDER",
      highlights: [
        "Works on Microsoft 365 infrastructure, with a focus on Kubernetes-based platforms, capacity management, and reliability.",
        "Descriptions of this role are kept at a level appropriate for public disclosure.",
      ],
      placeholder: true,
    },
  ] satisfies ResumeEntry[],

  education: [
    {
      title: "B.A. Computer Science, Human–Computer Interaction focus",
      organization: "University of Rochester",
      period: "Dates — PLACEHOLDER",
      highlights: ["Minor in Psychology."],
      placeholder: true,
    },
  ] satisfies ResumeEntry[],

  skills: [
    {
      group: "Infrastructure",
      items: ["Cloud infrastructure", "Kubernetes", "Capacity management", "Infrastructure as code"],
    },
    {
      group: "Systems",
      items: ["Distributed systems", "System design", "Reliability engineering", "Observability"],
    },
    {
      // Go and Python appear in the design reference; confirm before launch.
      group: "Languages & frameworks",
      items: ["C# / .NET", "Go", "Python"],
      placeholder: true,
    },
  ] satisfies { group: string; items: string[]; placeholder?: boolean }[],

  interests: ["Baseball", "Music", "Travel", "Fitness", "Technology"],
} as const;
