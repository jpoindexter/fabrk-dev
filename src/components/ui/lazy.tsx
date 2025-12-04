/**
 * Lazy-loaded heavy components for code splitting
 *
 * Use these exports instead of direct imports for better performance.
 * They will be loaded on-demand when first rendered.
 *
 * @example
 * ```tsx
 * import { LazyRichTextEditor } from "@/components/ui/lazy";
 *
 * // Optionally show loading state
 * <Suspense fallback={<div>Loading...</div>}>
 *   <LazyRichTextEditor value={value} onChange={onChange} />
 * </Suspense>
 * ```
 */

import * as React from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { mode } from "@/lib/design-system";

/**
 * Lazy-loaded Rich Text Editor
 * ~50KB bundle impact when loaded
 */
export const LazyRichTextEditor = dynamic(
  () => import("./rich-text-editor").then((mod) => mod.RichTextEditor),
  {
    ssr: false,
    loading: () => (
      <div className={cn("bg-muted flex h-48 items-center justify-center border", mode.radius)}>
        <span className={cn("text-muted-foreground text-xs", mode.font)}>Loading editor...</span>
      </div>
    ),
  }
);

/**
 * Lazy-loaded Markdown Editor
 * ~40KB bundle impact when loaded
 */
export const LazyMarkdownEditor = dynamic(
  () => import("./markdown-editor").then((mod) => mod.MarkdownEditor),
  {
    ssr: false,
    loading: () => (
      <div className={cn("bg-muted flex h-48 items-center justify-center border", mode.radius)}>
        <span className={cn("text-muted-foreground text-xs", mode.font)}>Loading editor...</span>
      </div>
    ),
  }
);

/**
 * Lazy-loaded Color Picker
 * ~30KB bundle impact when loaded
 */
export const LazyColorPicker = dynamic(
  () => import("./color-picker").then((mod) => mod.ColorPicker),
  {
    ssr: false,
    loading: () => (
      <div
        className={cn("bg-muted flex h-10 w-10 items-center justify-center border", mode.radius)}
      >
        <span className={cn("text-muted-foreground text-xs", mode.font)}>...</span>
      </div>
    ),
  }
);

/**
 * Lazy-loaded Image Cropper
 * ~80KB bundle impact when loaded
 */
export const LazyCropper = dynamic(() => import("./cropper").then((mod) => mod.Cropper), {
  ssr: false,
  loading: () => (
    <div className={cn("bg-muted flex h-64 items-center justify-center border", mode.radius)}>
      <span className={cn("text-muted-foreground text-xs", mode.font)}>Loading cropper...</span>
    </div>
  ),
});
