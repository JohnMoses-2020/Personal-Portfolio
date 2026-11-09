import type { ReactNode } from "react";
import type { SiteImage } from "@/lib/images";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { PhotoBackdrop } from "@/components/layout/PhotoBackdrop";
import { SectionHeader } from "@/components/ui/SectionHeader";

type PageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** Optional cinematic photograph behind the header. */
  image?: SiteImage;
  imagePosition?: string;
  layout?: "split" | "stacked";
  className?: string;
  children?: ReactNode;
};

/**
 * Top-of-page header. With an image it pulls up behind the transparent
 * navbar (negative top margin) so the photo reaches the top edge.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  image,
  imagePosition,
  layout = "stacked",
  className,
  children,
}: PageHeaderProps) {
  return (
    <section
      className={cn(
        "relative",
        image ? "-mt-16 overflow-hidden pt-36 md:-mt-[4.5rem] md:pt-48" : "pt-10 md:pt-16",
        className,
      )}
    >
      {image ? <PhotoBackdrop image={image} position={imagePosition} priority /> : null}
      <Container className="relative">
        <div className="animate-rise" style={{ animationDelay: "80ms" }}>
          <SectionHeader
            size="page"
            eyebrow={eyebrow}
            title={title}
            description={description}
            layout={layout}
          />
        </div>
        {children}
      </Container>
    </section>
  );
}
