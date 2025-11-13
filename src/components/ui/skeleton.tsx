import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-brutal bg-muted border-2 border-black/10",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
