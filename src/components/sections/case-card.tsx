import Image from "next/image";
import Link from "next/link";

import type { CaseStudy } from "@/data/site-content";

import { ArrowUpRightIcon } from "../ui/icons";

type CaseCardProps = {
  caseStudy: CaseStudy;
  layout?: "stack" | "feature";
  showVerificationNote?: boolean;
};

export function CaseCard({
  caseStudy,
  layout = "stack",
  showVerificationNote = true,
}: CaseCardProps) {
  const image = caseStudy.image;
  const video = caseStudy.video;
  const isFeature = layout === "feature";

  return (
    <article
      className={`group overflow-hidden rounded-[1.5rem] border border-white/8 bg-white/[0.015] ${
        isFeature ? "lg:grid lg:grid-cols-[1.02fr_0.98fr]" : "md:grid md:grid-cols-[0.95fr_1.05fr]"
      }`}
    >
      <div
        className={`relative overflow-hidden ${
          isFeature ? "min-h-[14.5rem] sm:min-h-[16rem] lg:min-h-[19rem]" : "aspect-[1.25/0.82] min-h-[13rem] md:min-h-[14.5rem]"
        }`}
      >
        {video ? (
          <video
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
            autoPlay
            muted
            loop
            playsInline
            preload={isFeature ? "metadata" : "none"}
            poster={video.poster}
          >
            <source src={video.src} type="video/mp4" />
          </video>
        ) : image ? (
          <Image
            src={image}
            alt={caseStudy.imageAlt ?? caseStudy.client}
            fill
            sizes={isFeature ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1280px) 33vw, 100vw"}
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${
              caseStudy.palette ?? "from-[#1f2532] via-[#101520] to-[#05070c]"
            }`}
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,14,0.02),rgba(5,8,14,0.08)_36%,rgba(5,8,14,0.32))]" />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5 lg:p-6">
        <div className="space-y-2">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/46">
            {caseStudy.client}
          </p>
          <h3 className="max-w-xl font-display text-[1.65rem] leading-tight text-white sm:text-[2rem]">
            {caseStudy.title}
          </h3>
          <p className="max-w-2xl text-[0.95rem] leading-6 text-white/70 sm:text-base sm:leading-7">
            {caseStudy.summary}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "Behov", value: caseStudy.goal },
            { label: "Leveranse", value: caseStudy.deliverables.slice(0, 2).join(", ") },
            { label: "Effekt", value: caseStudy.impact },
          ].map((item) => (
            <div key={item.label} className="border-t border-white/8 pt-3">
              <p className="text-[0.66rem] uppercase tracking-[0.18em] text-white/42">
                {item.label}
              </p>
              <p className="mt-2 text-sm leading-6 text-white/66">{item.value}</p>
            </div>
          ))}
        </div>

        {caseStudy.metrics.length ? (
          <p className="text-sm font-medium text-white/76">
            {caseStudy.metrics
              .slice(0, 2)
              .map((metric) => `${metric.value} ${metric.label}`)
              .join(" · ")}
          </p>
        ) : null}

        {showVerificationNote && caseStudy.verificationNote ? (
          <div className="rounded-[1rem] border border-dashed border-[var(--accent)]/24 bg-[var(--accent)]/7 px-4 py-3 text-sm text-[var(--accent-2)]">
            {caseStudy.verificationNote}
          </div>
        ) : null}

        <div className="mt-auto pt-1">
          <Link
            href={`/case/${caseStudy.slug}`}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--accent-2)] transition hover:text-white"
          >
            Se hele caset
            <ArrowUpRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
