/**
 * Utility functions for webhook detail components
 */

import * as React from "react";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString();
}

export function getStatusIcon(status: string): React.ReactNode {
  switch (status) {
    case "success":
      return <CheckCircle className="h-4 w-4 text-success" />;
    case "failed":
      return <XCircle className="h-4 w-4 text-destructive" />;
    case "pending":
      return <Clock className="h-4 w-4 text-warning" />;
    default:
      return null;
  }
}

export function getStatusBadge(status: string): React.ReactNode {
  const variants: Record<string, "default" | "accent" | "secondary"> = {
    success: "default",
    failed: "accent",
    pending: "secondary",
  };

  return (
    <Badge variant={variants[status] || "secondary"}>
      {status}
    </Badge>
  );
}
