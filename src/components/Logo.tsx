import { cn } from "@/lib/utils";

/** Wordmark en dos tonos, como el logo real: "FOOT" en tinta y el resto en pizarra. */
export function Logo({
  className,
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <span
      className={cn(
        "titular inline-flex items-baseline whitespace-nowrap leading-none",
        className
      )}
    >
      <span className={light ? "text-paper" : "text-ink"}>foot</span>
      <span className={light ? "text-sky" : "text-slate"}>shootermzl</span>
      <span className="ml-0.5 inline-block size-[0.28em] translate-y-[-0.05em] rounded-full bg-accent" />
    </span>
  );
}
