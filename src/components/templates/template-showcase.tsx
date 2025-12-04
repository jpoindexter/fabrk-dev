/**
 * FABRK COMPONENT
 * Template Showcase - Standard wrapper for individual template pages
 * Provides consistent header, features card, and code copy functionality
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Code, ExternalLink } from "lucide-react";

interface TemplateShowcaseProps {
  /** Template code identifier (e.g., "BLOG", "ANALYTICS") */
  code: string;
  /** Display name of the template */
  title: string;
  /** Short description of what the template provides */
  description: string;
  /** Optional badge (e.g., "New", "Popular", "Essential") */
  badge?: string;
  /** List of features this template includes */
  features: string[];
  /** The actual template content to display */
  children: React.ReactNode;
  /** Optional source code string for copy functionality */
  sourceCode?: string;
  /** Optional link to source file on GitHub */
  sourceUrl?: string;
  /** Additional note to display at the bottom of features card */
  note?: string;
}

export function TemplateShowcase({
  code,
  title,
  description,
  badge,
  features,
  children,
  sourceCode,
  sourceUrl,
  note,
}: TemplateShowcaseProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    if (!sourceCode) return;

    try {
      await navigator.clipboard.writeText(sourceCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div>
      <div className="container mx-auto max-w-7xl space-y-6 px-6 py-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="border-border inline-block border px-4 py-1">
              <span className="text-muted-foreground font-mono text-xs">[TEMPLATE]: {code}</span>
            </div>
            {badge && (
              <Badge variant="default" className="rounded-none font-mono text-xs">
                {badge.toUpperCase()}
              </Badge>
            )}
          </div>
          <h1 className="font-mono text-4xl font-semibold tracking-tight">{title}</h1>
          <p className="text-muted-foreground font-mono text-sm">{description}</p>

          {/* Action buttons */}
          <div className="flex items-center gap-2 pt-2">
            {sourceCode && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyCode}
                className="rounded-none font-mono text-xs"
                aria-label={copied ? "Code copied" : "Copy template code"}
              >
                {copied ? (
                  <>
                    <Check className="mr-1 h-3 w-3" />
                    COPIED
                  </>
                ) : (
                  <>
                    <Copy className="mr-1 h-3 w-3" />
                    &gt; COPY_CODE
                  </>
                )}
              </Button>
            )}
            {sourceUrl && (
              <Button
                variant="outline"
                size="sm"
                asChild
                className="rounded-none font-mono text-xs"
              >
                <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
                  <Code className="mr-1 h-3 w-3" />
                  &gt; VIEW_SOURCE
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Template Content */}
        {children}

        {/* Features Card */}
        <div className="border-border bg-card border">
          <div className="border-border flex items-center gap-2 border-b px-4 py-2">
            <span className="text-muted-foreground font-mono text-xs">[ features.md ]</span>
          </div>
          <div className="p-4">
            <div className="text-muted-foreground mb-4 font-mono text-xs">[TEMPLATE_FEATURES]:</div>
            <div className="grid gap-x-8 gap-y-1.5 font-mono text-xs md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div key={index}>
                  <span className="text-success">&gt;</span> {feature}
                </div>
              ))}
            </div>
            {note && (
              <div className="text-muted-foreground mt-4 font-mono text-xs">[NOTE]: {note}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
