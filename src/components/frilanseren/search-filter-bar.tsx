type SearchFilterBarProps = {
  query?: string;
  role?: string;
  placeholder: string;
  action: string;
  roleOptions?: ReadonlyArray<{ value: string; label: string }>;
};

export function SearchFilterBar({ query, role, placeholder, action, roleOptions = [] }: SearchFilterBarProps) {
  return (
    <form
      action={action}
      className="grid gap-3 rounded-[1.4rem] border border-[color:var(--line)] bg-[color:var(--surface)]/82 p-4 shadow-[0_18px_50px_rgba(12,14,18,0.08)] md:grid-cols-[minmax(0,1fr)_14rem_auto]"
    >
      <input name="q" defaultValue={query} placeholder={placeholder} className="form-input" />
      <select name="role" defaultValue={role ?? ""} className="form-input">
        <option value="">Alle roller</option>
        {roleOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button type="submit" className="button-base button-size-default button-primary">
        <span className="button-label-base">Søk</span>
      </button>
    </form>
  );
}
