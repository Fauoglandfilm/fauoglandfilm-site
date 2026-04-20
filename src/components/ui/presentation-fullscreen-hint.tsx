import { cn } from "@/lib/utils";

type PresentationFullscreenHintProps = {
  theme?: "dark" | "light";
  className?: string;
};

export function PresentationFullscreenHint({
  theme = "dark",
  className,
}: PresentationFullscreenHintProps) {
  const dark = theme === "dark";

  return (
    <div
      className={cn(
        "pointer-events-none absolute bottom-[4.9rem] right-3 z-[2] max-w-[12.5rem] sm:bottom-[5.6rem] sm:right-5 sm:max-w-[15rem]",
        className,
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-[1.15rem] border px-3.5 py-3 shadow-[0_18px_40px_rgba(0,0,0,0.16)] backdrop-blur-[16px] motion-safe:animate-[presentation-hint-float_4.8s_ease-in-out_infinite]",
          dark
            ? "border-white/16 bg-[rgba(10,13,18,0.78)] text-white"
            : "border-black/10 bg-[rgba(255,255,255,0.92)] text-[#181818]",
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-0",
            dark
              ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02)_40%,rgba(255,255,255,0)_100%)]"
              : "bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(255,255,255,0.08)_42%,rgba(255,255,255,0)_100%)]",
          )}
        />
        <div className="relative">
          <p
            className={cn(
              "text-[0.68rem] font-semibold uppercase tracking-[0.18em]",
              dark ? "text-white/58" : "text-black/46",
            )}
          >
            Beste visning
          </p>
          <p className="mt-1.5 text-[0.82rem] font-medium leading-5 sm:text-[0.9rem]">
            Trykk fullskjerm nede til høyre for best opplevelse.
          </p>
        </div>
      </div>

      <div className="absolute -bottom-8 right-7 h-10 w-10 motion-safe:animate-[presentation-arrow-nudge_2.8s_ease-in-out_infinite]">
        <span
          className={cn(
            "absolute bottom-2 right-[0.45rem] h-[1.5px] w-8 origin-right rotate-[38deg] rounded-full",
            dark ? "bg-white/62" : "bg-black/42",
          )}
        />
        <span
          className={cn(
            "absolute bottom-[0.1rem] right-0 h-2.5 w-2.5 rotate-45 border-r-2 border-b-2",
            dark ? "border-white/72" : "border-black/52",
          )}
        />
      </div>
    </div>
  );
}
