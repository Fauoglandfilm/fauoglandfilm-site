type TestimonialCardProps = {
  quote: string;
  name: string;
  role?: string;
  company: string;
  note?: string;
};

export function TestimonialCard({
  quote,
  name,
  role,
  company,
  note,
}: TestimonialCardProps) {
  const meta = [role, company].filter(Boolean).join(" · ");

  return (
    <article className="card-surface rounded-[1.7rem] p-5 sm:p-6">
      <p className="font-display text-[1.55rem] leading-[1.02] text-[#111111] sm:text-[1.95rem]">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="mt-3.5 space-y-1">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
          {name}
        </p>
        {meta ? <p className="text-sm text-[#111111] sm:text-base">{meta}</p> : null}
        {note ? <p className="text-sm text-[var(--muted)]">{note}</p> : null}
      </div>
    </article>
  );
}
