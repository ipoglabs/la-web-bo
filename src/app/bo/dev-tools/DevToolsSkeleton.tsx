import { cn } from "@/lib/utils";

/** Loading placeholder for dev-tools panels — same shape API as la-web's
 * LaSkeleton so the ported panels only needed an import-path change. */
export function DevToolsSkeleton({
  shape = "block",
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { shape?: "block" | "text" | "circle" }) {
  return (
    <div
      className={cn(
        "animate-pulse bg-slate-200",
        shape === "circle" && "rounded-full",
        shape === "text" && "rounded h-4",
        shape === "block" && "rounded-lg",
        className
      )}
      {...props}
    />
  );
}
