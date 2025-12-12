"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { mode } from "@/design-system";

export interface AuthLayoutProps {
  /** Auth form content */
  children: React.ReactNode;
  /** Logo element or component */
  logo?: React.ReactNode;
  /** Title displayed in the logo area */
  logoTitle?: string;
  /** Side panel content (for split-screen layout) */
  sideContent?: React.ReactNode;
  /** Side panel background color class */
  sideBackground?: string;
  /** Footer content (links, copyright, etc.) */
  footer?: React.ReactNode;
  /** Max width of the form container */
  maxWidth?: "sm" | "md" | "lg";
  /** Additional className for the layout */
  className?: string;
}

export function AuthLayout({
  children,
  logo,
  logoTitle,
  sideContent,
  sideBackground = "bg-primary",
  footer,
  maxWidth = "sm",
  className,
}: AuthLayoutProps) {
  const maxWidthClasses = {
    sm: "max-w-[380px]",
    md: "max-w-[480px]",
    lg: "max-w-[560px]",
  };

  // Split-screen layout with side panel
  if (sideContent) {
    return (
      <div className={cn("bg-background min-h-screen lg:grid lg:grid-cols-2", className)}>
        {/* Side Panel - Hidden on mobile */}
        <div
          className={cn(
            "relative hidden lg:flex lg:flex-col lg:items-center lg:justify-center",
            sideBackground
          )}
        >
          <div className="absolute inset-0 overflow-hidden">
            {/* Terminal grid pattern overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                                  linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
              }}
            />
          </div>
          <div className="relative z-10 p-8">{sideContent}</div>
        </div>

        {/* Form Panel */}
        <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8">
          {/* Logo */}
          {(logo || logoTitle) && (
            <div className="mb-8 flex flex-col items-center">
              {logo && (
                <Link href="/" className="mb-2">
                  {logo}
                </Link>
              )}
              {logoTitle && (
                <span className={cn("text-foreground text-lg font-semibold", mode.font)}>
                  {logoTitle}
                </span>
              )}
            </div>
          )}

          {/* Form Container */}
          <div
            className={cn(
              "border-border bg-background w-full border p-6",
              maxWidthClasses[maxWidth],
              mode.radius
            )}
          >
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className={cn("text-muted-foreground mt-8 text-center text-xs", mode.font)}>
              {footer}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Centered layout (default)
  return (
    <div
      className={cn(
        "bg-background flex min-h-screen flex-col items-center justify-center p-4 sm:p-8",
        className
      )}
    >
      {/* Logo */}
      {(logo || logoTitle) && (
        <div className="mb-8 flex flex-col items-center">
          {logo && (
            <Link href="/" className="mb-2">
              {logo}
            </Link>
          )}
          {logoTitle && (
            <span className={cn("text-foreground text-lg font-semibold", mode.font)}>
              {logoTitle}
            </span>
          )}
        </div>
      )}

      {/* Form Container */}
      <div
        className={cn(
          "border-border bg-background w-full border p-6",
          maxWidthClasses[maxWidth],
          mode.radius
        )}
      >
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className={cn("text-muted-foreground mt-8 text-center text-xs", mode.font)}>
          {footer}
        </div>
      )}
    </div>
  );
}

/* ----- Auth Layout Compound Components ----- */

export interface AuthLayoutHeaderProps {
  /** Icon element displayed above the title */
  icon?: React.ReactNode;
  /** Main heading */
  title: string;
  /** Description text below the title */
  description?: string;
  /** Additional className */
  className?: string;
}

export function AuthLayoutHeader({ icon, title, description, className }: AuthLayoutHeaderProps) {
  return (
    <div className={cn("flex flex-col space-y-2 text-center", className)}>
      {icon && (
        <div
          className={cn(
            "border-border bg-card mx-auto mb-2 flex h-10 w-10 items-center justify-center border",
            mode.radius
          )}
        >
          {icon}
        </div>
      )}
      <h1 className={cn("text-2xl font-semibold tracking-tight", mode.font)}>{title}</h1>
      {description && (
        <p className={cn("text-muted-foreground text-xs", mode.font)}>{description}</p>
      )}
    </div>
  );
}

export interface AuthLayoutDividerProps {
  /** Divider text */
  text?: string;
  /** Additional className */
  className?: string;
}

export function AuthLayoutDivider({
  text = "Or continue with",
  className,
}: AuthLayoutDividerProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-0 flex items-center">
        <span className="border-border w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className={cn("bg-background text-muted-foreground px-2", mode.font)}>{text}</span>
      </div>
    </div>
  );
}

export interface AuthLayoutFooterLinksProps {
  /** Link text before the link */
  text: string;
  /** Link destination */
  href: string;
  /** Link label */
  linkText: string;
  /** Additional className */
  className?: string;
}

export function AuthLayoutFooterLinks({
  text,
  href,
  linkText,
  className,
}: AuthLayoutFooterLinksProps) {
  return (
    <p className={cn("text-muted-foreground text-center text-xs", mode.font, className)}>
      {text}{" "}
      <Link
        href={href}
        className={cn("hover:text-primary underline underline-offset-4", mode.font)}
      >
        {linkText}
      </Link>
    </p>
  );
}

export interface AuthLayoutSideContentProps {
  /** Quote or testimonial text */
  quote?: string;
  /** Author name */
  author?: string;
  /** Author title/role */
  authorTitle?: string;
  /** Additional className */
  className?: string;
  children?: React.ReactNode;
}

export function AuthLayoutSideContent({
  quote,
  author,
  authorTitle,
  className,
  children,
}: AuthLayoutSideContentProps) {
  if (children) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={cn("text-primary-foreground max-w-md space-y-6", className)}>
      {quote && (
        <blockquote className="space-y-2">
          <p className={cn("text-lg", mode.font)}>&ldquo;{quote}&rdquo;</p>
        </blockquote>
      )}
      {(author || authorTitle) && (
        <div className="flex flex-col">
          {author && <span className={cn("font-semibold", mode.font)}>{author}</span>}
          {authorTitle && (
            <span className={cn("text-xs opacity-80", mode.font)}>{authorTitle}</span>
          )}
        </div>
      )}
    </div>
  );
}
