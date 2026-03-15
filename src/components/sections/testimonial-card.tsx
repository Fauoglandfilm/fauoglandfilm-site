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
    <article className="border-t border-white/10 pt-4">
      <p className="font-display text-[1.7rem] leading-[1.08] text-white sm:text-[1.95rem]">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="mt-4 space-y-1">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/46">
          {name}
        </p>
        {meta ? <p className="text-sm text-white/82 sm:text-base">{meta}</p> : null}
        {note ? <p className="text-sm text-white/52">{note}</p> : null}
      </div>
    </article>
  );
}
