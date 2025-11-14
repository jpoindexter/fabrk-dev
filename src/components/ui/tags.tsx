"use client";

/**
 * ✅ FABRK COMPONENT
 * Tags input component.
 *
 * @example
 * ```tsx
 * <tags />
 * ```
 */

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/design-system/utils";
import { X } from "lucide-react";
import * as React from "react";

export interface Tag {
  id: string;
  label: string;
  value: string;
}

export interface TagsProps {
  tags: Tag[];
  onTagsChange?: (tags: Tag[]) => void;
  placeholder?: string;
  maxTags?: number;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  variant?: "default" | "secondary" | "destructive" | "outline";
}

const Tags = React.forwardRef<HTMLDivElement, TagsProps>(
  (
    {
      tags = [],
      onTagsChange,
      placeholder = "Add a tag...",
      maxTags,
      className,
      disabled = false,
      readOnly = false,
      variant = "secondary",
    },
    ref
  ) => {
    const [inputValue, setInputValue] = React.useState("");
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled || readOnly) return;

      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        addTag();
      } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
        removeTag(tags[tags.length - 1].id);
      }
    };

    const addTag = () => {
      const trimmedValue = inputValue.trim();

      if (!trimmedValue) return;
      if (maxTags && tags.length >= maxTags) return;
      if (tags.some((tag) => tag.value === trimmedValue)) return;

      const newTag: Tag = {
        id: `tag-${Date.now()}-${Math.random()}`,
        label: trimmedValue,
        value: trimmedValue,
      };

      onTagsChange?.([...tags, newTag]);
      setInputValue("");
    };

    const removeTag = (id: string) => {
      if (disabled || readOnly) return;
      onTagsChange?.(tags.filter((tag) => tag.id !== id));
    };

    return (
      <div data-slot="tags"
        ref={ref}
        className={cn(
          "flex flex-wrap items-center gap-2 rounded-md border border-input bg-background px-3 py-3",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
        onClick={() => inputRef.current?.focus()}
      >
        {tags.map((tag) => (
          <Badge key={tag.id} variant={variant} className="gap-1 pr-1">
            <span>{tag.label}</span>
            {!readOnly && !disabled && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(tag.id);
                }}
                className="ml-1 rounded-sm hover:bg-accent/50"
                aria-label={`Remove ${tag.label} tag`}
              >
                <X className="size-3" />
              </button>
            )}
          </Badge>
        ))}
        {!readOnly && (!maxTags || tags.length < maxTags) && (
          <Input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={addTag}
            placeholder={tags.length === 0 ? placeholder : ""}
            disabled={disabled}
            className={`"text-sm" h-auto flex-1 border-0 bg-background/0 p-0 outline-none placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0`}
          />
        )}
      </div>
    );
  }
);
Tags.displayName = "Tags";

export { Tags };
