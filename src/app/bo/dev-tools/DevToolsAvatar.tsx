import { cn } from "@/lib/utils";

const SIZE_CLASSES = { sm: "h-8 w-8 text-xs", md: "h-10 w-10 text-sm" };

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
}

/** Initials avatar — dev-tools has no photo to show, just a name. */
export function DevToolsAvatar({ name, size = "sm" }: { name: string; size?: keyof typeof SIZE_CLASSES }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center shrink-0 rounded-full bg-slate-200 font-medium text-slate-700",
        SIZE_CLASSES[size]
      )}
    >
      {initials(name)}
    </span>
  );
}
