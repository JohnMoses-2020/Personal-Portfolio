/**
 * Image manifest.
 *
 * Every photograph used by the site is referenced from here so assets can be
 * swapped without touching components or content. Content files (MDX
 * frontmatter) reference images by key, e.g. `image: project-kubernetes`.
 *
 * NOTE: The bundled images in /public/images are AI-generated placeholders
 * produced for this project (no third-party license attached). Replace them
 * with licensed or personal photography of the same aspect ratio when ready.
 */

export type SiteImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const images = {
  /* Page backdrops */
  "hero-clouds": {
    src: "/images/hero-clouds.jpg",
    alt: "Sunrise breaking over a vast sea of clouds seen from high altitude.",
    width: 1280,
    height: 720,
  },
  "writing-mountains": {
    src: "/images/writing-mountains.jpg",
    alt: "Layered mountain ridges wrapped in mist at blue hour.",
    width: 1280,
    height: 720,
  },
  "about-stadium": {
    src: "/images/about-stadium.jpg",
    alt: "A baseball stadium at sunset with light towers glowing above empty seats.",
    width: 864,
    height: 1152,
  },

  /* Projects */
  "project-kubernetes": {
    src: "/images/project-kubernetes.jpg",
    alt: "A dark data center aisle lined with server racks and status lights.",
    width: 1152,
    height: 864,
  },
  "project-provisioning": {
    src: "/images/project-provisioning.jpg",
    alt: "Earth at night from orbit, city lights tracing a glowing network.",
    width: 1152,
    height: 864,
  },
  "project-distributed": {
    src: "/images/project-distributed.jpg",
    alt: "Aerial view of highway interchanges glowing through low fog at night.",
    width: 1152,
    height: 864,
  },
  "project-baseball": {
    src: "/images/project-baseball.jpg",
    alt: "A stadium light tower glowing against a dusk sky.",
    width: 1152,
    height: 864,
  },

  /* Articles */
  "article-kubernetes-fleet": {
    src: "/images/article-kubernetes-fleet.jpg",
    alt: "Towering cumulus cloud tops lit by golden-hour light.",
    width: 1152,
    height: 864,
  },
  "article-sev2": {
    src: "/images/article-sev2.jpg",
    alt: "Rows of solar panels on an industrial rooftop at dusk.",
    width: 1152,
    height: 864,
  },
  "article-multi-tenant": {
    src: "/images/article-multi-tenant.jpg",
    alt: "A smooth layer of cloud at twilight seen from above.",
    width: 1152,
    height: 864,
  },
  "article-capacity": {
    src: "/images/article-capacity.jpg",
    alt: "Stacked shipping containers in a port yard at dusk.",
    width: 1152,
    height: 864,
  },
  "article-reliability": {
    src: "/images/article-reliability.jpg",
    alt: "A shaft of sunlight breaking through a dark storm front.",
    width: 1152,
    height: 864,
  },
} as const satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;

export function getImage(key: string): SiteImage {
  const image = (images as Record<string, SiteImage>)[key];
  if (!image) {
    throw new Error(
      `Unknown image key "${key}". Add it to lib/images.ts or fix the content frontmatter.`,
    );
  }
  return image;
}
