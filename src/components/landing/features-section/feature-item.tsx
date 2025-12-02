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
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <Icon className="text-primary size-4" />
      </div>
      <div>
        <span className="text-foreground font-mono text-xs font-semibold">├─ {title}</span>
        <span className="text-muted-foreground ml-2 font-mono text-xs">{description}</span>
      </div>
    </div>
  );
}

export type { FeatureItemProps };
