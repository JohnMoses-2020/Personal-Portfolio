import type { ComponentPropsWithoutRef } from "react";

/**
 * A few icons Lucide no longer ships (brand marks) plus a baseball, drawn in
 * the same 24px / 2px-stroke style so they sit next to Lucide icons cleanly.
 */

type IconProps = ComponentPropsWithoutRef<"svg">;

function Svg(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    />
  );
}

export function GithubIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </Svg>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </Svg>
  );
}

export function BaseballIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M6.3 5.2c2.4 1.7 3.9 4.1 3.9 6.8s-1.5 5.1-3.9 6.8" />
      <path d="M17.7 5.2c-2.4 1.7-3.9 4.1-3.9 6.8s1.5 5.1 3.9 6.8" />
      <path d="M8.6 8.4l1.3.6M8.9 15l1.2-.6M15.4 8.4l-1.3.6M15.1 15l-1.2-.6" strokeWidth="1.5" />
    </Svg>
  );
}
