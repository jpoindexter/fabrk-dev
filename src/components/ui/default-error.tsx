"use client";

/**
 * ✅ FABRK COMPONENT
 * Default error component for error handling.
 *
 * @example
 * ```tsx
 * <default-error />
 * ```
 */

import { Button } from "@/components/ui/button";
import { tokens } from "@/lib/design-system/tokens";
import { cn } from "@/lib/design-system/utils";
import { AlertTriangle, RefreshCw } from "lucide-react";
import * as React from "react";

export interface DefaultErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  statusCode?: number;
  onRetry?: () => void;
  showRetry?: boolean;
  icon?: React.ReactNode;
}

const DefaultError = React.forwardRef<HTMLDivElement, DefaultErrorProps>(
  (
    {
      title = "Something went wrong",
      description = "An unexpected error occurred. Please try again later.",
      statusCode,
      onRetry,
      showRetry = true,
      icon,
      className,
      ...props
    },
    ref
  ) => {
    const errorMessages: Record<number, { title: string; description: string }> = {
      400: {
        title: "Bad Request",
        description: "The request could not be understood by the server.",
      },
      401: {
        title: "Unauthorized",
        description: "You need to be authenticated to access this resource.",
      },
      403: {
        title: "Forbidden",
        description: "You don't have permission to access this resource.",
      },
      404: {
        title: "Page Not Found",
        description: "The page you're looking for doesn't exist.",
      },
      500: {
        title: "Internal Server Error",
        description: "Something went wrong on our end. Please try again later.",
      },
      502: {
        title: "Bad Gateway",
        description: "We're having trouble connecting to our servers.",
      },
      503: {
        title: "Service Unavailable",
        description: "Our service is temporarily unavailable. Please try again later.",
      },
    };

    const errorInfo = statusCode ? errorMessages[statusCode] : null;
    const displayTitle = errorInfo?.title || title;
    const displayDescription = errorInfo?.description || description;

    return (
      <div data-slot="default-error"
        ref={ref}
        className={cn(
          "flex min-h-96 flex-col items-center justify-center p-8 text-center",
          className
        )}
        {...props}
      >
        <div className="mb-4">
          {icon || (
            <AlertTriangle className={`${tokens.sizes.avatar.lg} text-destructive opacity-80`} />
          )}
        </div>
        {statusCode && (
          <div className="mb-2 text-5xl font-medium text-muted-foreground">{statusCode}</div>
        )}
        <h2 className={`mb-2 text-2xl font-medium`}>{displayTitle}</h2>
        <p className="mb-6 max-w-md text-muted-foreground">{displayDescription}</p>
        {showRetry && onRetry && (
          <Button onClick={onRetry} variant="outline" className={`${tokens.spacing.gap[2]}`}>
            <RefreshCw className="size-4" />
            Try Again
          </Button>
        )}
      </div>
    );
  }
);
DefaultError.displayName = "DefaultError";

export { DefaultError };
