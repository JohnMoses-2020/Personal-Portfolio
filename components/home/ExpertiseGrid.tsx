import { Cloud, CodeXml, Layers } from "lucide-react";
import { expertise, type ExpertiseIcon } from "@/content/home";
import { BaseballIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const icons: Record<ExpertiseIcon, typeof Cloud> = {
  cloud: Cloud,
  layers: Layers,
  code: CodeXml,
  baseball: BaseballIcon as typeof Cloud,
};

export function ExpertiseGrid({ className }: { className?: string }) {
  return (
    <ul
      aria-label="Areas of expertise"
      className={cn("grid grid-cols-2 gap-x-6 gap-y-9 md:grid-cols-4 md:gap-0", className)}
    >
      {expertise.map((item, index) => {
        const Icon = icons[item.icon];
        return (
          <li
            key={item.title}
            className={cn(
              "animate-rise md:border-l md:border-line/70 md:px-8 md:first:border-l-0 md:first:pl-0 md:last:pr-0",
            )}
            style={{ animationDelay: `${500 + index * 90}ms` }}
          >
            <Icon aria-hidden="true" className="size-5 text-ivory" strokeWidth={1.5} />
            <h3 className="mt-4 font-sans text-[0.875rem] font-semibold tracking-[0.005em] text-ivory">
              {item.title}
            </h3>
            <p className="mt-1.5 max-w-[16rem] text-[0.75rem] leading-relaxed text-mist">
              {item.description}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
