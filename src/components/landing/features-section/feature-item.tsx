/**
 * Feature Item Component
 * Single feature with icon, title and description
 */

interface FeatureItemProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export function FeatureItem({ icon: Icon, title, description }: FeatureItemProps) {
  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0">
        <Icon className="size-4 text-primary" />
      </div>
      <div>
        <span className="font-mono text-xs font-semibold text-foreground">├─ {title}</span>
        <span className="ml-2 font-mono text-xs text-muted-foreground">{description}</span>
      </div>
    </div>
  );
}

export type { FeatureItemProps };
