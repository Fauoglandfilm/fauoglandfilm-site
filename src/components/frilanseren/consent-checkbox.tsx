type ConsentCheckboxProps = {
  name?: string;
  label: string;
  error?: string;
};

export function ConsentCheckbox({
  name = "consent",
  label,
  error,
}: ConsentCheckboxProps) {
  return (
    <label className="flex items-start gap-3 rounded-[1rem] border border-[color:var(--line)] bg-[color:var(--surface-muted)]/58 p-4">
      <input
        type="checkbox"
        name={name}
        className="mt-1 h-4 w-4 rounded border-[color:var(--line-strong)] text-[color:var(--accent)] focus:ring-[color:var(--accent)]"
      />
      <span className="space-y-2">
        <span className="block text-sm leading-6 text-[color:var(--foreground)]">{label}</span>
        {error ? <span className="block text-sm text-[#b42318]">{error}</span> : null}
      </span>
    </label>
  );
}
