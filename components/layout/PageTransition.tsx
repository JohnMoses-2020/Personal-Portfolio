import { ViewTransition, type ReactNode } from "react";

/**
 * Wraps a page's content so route navigations crossfade / slide using the
 * browser View Transitions API (via React's <ViewTransition>). Browsers
 * without support render instantly; reduced-motion users get no animation
 * (see globals.css). Must wrap page content, not layouts.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      <div className="flex min-h-full flex-1 flex-col">{children}</div>
    </ViewTransition>
  );
}
