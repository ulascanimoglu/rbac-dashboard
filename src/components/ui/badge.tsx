import { type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type Tone = "neutral" | "primary" | "success" | "warning";

const dotTones: Record<Tone, string> = {
  neutral: "bg-muted-foreground",
  primary: "bg-foreground",
  success: "bg-success",
  warning: "bg-warning",
};

export function Badge({
  children,
  tone = "neutral",
  dot = false,
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  dot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-0.5 text-xs font-medium text-foreground",
        className,
      )}
    >
      {dot ? <span className={cn("h-1.5 w-1.5 rounded-full", dotTones[tone])} aria-hidden /> : null}
      {children}
    </span>
  );
}
