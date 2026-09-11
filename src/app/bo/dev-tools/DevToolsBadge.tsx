import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const INTENT_CLASSES: Record<"success" | "warning" | "danger" | "neutral", string> = {
  success: "border-green-200 bg-green-50 text-green-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  danger: "border-rose-200 bg-rose-50 text-rose-700",
  neutral: "border-slate-200 bg-slate-100 text-slate-700",
};

/** Soft-colored status pill, built on the shared shadcn Badge — shadcn's
 * default/secondary/destructive/outline variants don't cover the
 * success/warning/danger/neutral states dev-tools needs. */
export function DevToolsBadge({
  intent,
  className,
  ...props
}: React.ComponentProps<typeof Badge> & { intent: keyof typeof INTENT_CLASSES }) {
  return <Badge variant="outline" className={cn(INTENT_CLASSES[intent], className)} {...props} />;
}
