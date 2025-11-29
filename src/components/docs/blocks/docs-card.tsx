/**
 * DocsCard - Standardized card wrapper for documentation content
 */

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { docsSpacing } from "../spacing";

interface DocsCardProps {
  /** Card content */
  children: React.ReactNode;
  /** Optional className for custom styling */
  className?: string;
}

export function DocsCard({ children, className }: DocsCardProps) {
  return (
    <Card className={cn("rounded-none", className)}>
      <CardContent className={`${docsSpacing.cardPadding} ${docsSpacing.cardContent}`}>
        {children}
      </CardContent>
    </Card>
  );
}
