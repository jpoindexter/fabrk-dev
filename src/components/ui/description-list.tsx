/**
 * ✅ FABRK COMPONENT
 * Description list component for key-value pairs.
 *
 * @example
 * ```tsx
 * <description-list>Content</description-list>
 * ```
 */

import { tokens } from "@/lib/design-system/tokens";
import { cn } from "@/lib/design-system/utils";
import * as React from "react";

export interface DescriptionListProps extends React.HTMLAttributes<HTMLDListElement> {
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "striped" | "bordered";
  size?: "sm" | "md" | "lg";
}

export interface DescriptionListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  term: React.ReactNode;
  description?: React.ReactNode;
}

const DescriptionList = React.forwardRef<HTMLDListElement, DescriptionListProps>(
  (
    { orientation = "vertical", variant = "default", size = "md", className, children, ...props },
    ref
  ) => {
    const sizeClasses = {
      sm: `"text-sm"`,
      md: `${tokens.text.size.base}`,
      lg: `"text-lg"`,
    };

    return (
      <dl data-slot="description-list"
        ref={ref}
        className={cn(
          "divide-y divide-border",
          variant === "striped" && "[&>div:nth-child(even)]:bg-card/50",
          variant === "bordered" && "rounded-lg border",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </dl>
    );
  }
);
DescriptionList.displayName = "DescriptionList";

const DescriptionListItem = React.forwardRef<HTMLDivElement, DescriptionListItemProps>(
  ({ term, description, className, ...props }, ref) => {
    const list = React.useContext(DescriptionListContext);
    const orientation = list?.orientation || "vertical";

    return (
      <div data-slot="description-list-item"
        ref={ref}
        className={cn(
          "px-6 py-3",
          orientation === "horizontal" ? "sm:grid sm:grid-cols-3 sm:gap-6" : "space-y-1",
          className
        )}
        {...props}
      >
        <dt
          className={cn(
            "font-medium text-foreground",
            orientation === "horizontal" && "sm:col-span-1"
          )}
        >
          {term}
        </dt>
        {description && (
          <dd
            className={cn(
              "text-muted-foreground",
              orientation === "horizontal" && "sm:col-span-2 sm:mt-0"
            )}
          >
            {description}
          </dd>
        )}
      </div>
    );
  }
);
DescriptionListItem.displayName = "DescriptionListItem";

const DescriptionListContext = React.createContext<{
  orientation?: "horizontal" | "vertical";
} | null>(null);

const DescriptionListProvider: React.FC<{
  children: React.ReactNode;
  orientation?: "horizontal" | "vertical";
}> = ({ children, orientation = "vertical" }) => {
  return (
    <DescriptionListContext.Provider value={{ orientation }}>
      {children}
    </DescriptionListContext.Provider>
  );
};

export { DescriptionList, DescriptionListItem, DescriptionListProvider };
