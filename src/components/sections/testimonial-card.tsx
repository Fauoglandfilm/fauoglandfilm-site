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
    <article className="card-surface rounded-[1.6rem] p-4.5 sm:rounded-[1.7rem] sm:p-6">
      <p className="card-title text-[color:var(--foreground)] sm:text-[1.9rem]">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="mt-3.5 space-y-1">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
          {name}
        </p>
        {meta ? <p className="body-copy text-[color:var(--foreground)]">{meta}</p> : null}
        {note ? <p className="body-copy text-[var(--muted)]">{note}</p> : null}
      </div>
    </article>
  );
}
