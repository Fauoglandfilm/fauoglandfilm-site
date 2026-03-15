import { ButtonLink } from "@/components/ui/button-link";
import type { ServiceArea } from "@/data/site-content";

type ServiceCardProps = {
  service: ServiceArea;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="group rounded-[1.4rem] border border-white/8 bg-white/[0.015] p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-5">
        <div className="space-y-1.5">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-white/42">
            {service.eyebrow}
          </p>
          <h3 className="font-display text-[1.4rem] leading-tight text-white sm:text-[1.7rem]">
            {service.title}
          </h3>
        </div>

        <div className="shrink-0">
          <ButtonLink href={service.href} variant="ghost" fullWidth className="sm:w-auto">
            {service.ctaLabel}
          </ButtonLink>
        </div>
      </div>

      <div className="mt-3 border-t border-white/8 pt-3">
        <p className="max-w-2xl text-[0.95rem] leading-6 text-white/72 sm:text-[0.95rem]">
          {service.summary}
        </p>
        <p className="mt-2 text-sm leading-6 text-white/56">{service.value}</p>
      </div>
    </article>
  );
}
