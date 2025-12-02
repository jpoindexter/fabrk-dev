/**
 * FABRK COMPONENT
 * Modal Patterns Template - Terminal console style
 * Production-ready
 */

"use client";

import { useState } from "react";
import { ConfirmationDialog } from "./components/confirmation-dialog";
import { FormDialog } from "./components/form-dialog";
import { SideSheet } from "./components/side-sheet";
import { PopoverExample } from "./components/popover-example";
import { PatternComparison } from "./components/pattern-comparison";
import { FeaturesCard } from "./components/features-card";

export default function ModalsTemplate() {
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div>
      <div className="container mx-auto max-w-7xl px-6 py-8 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-block border border-border px-4 py-1">
            <span className="font-mono text-xs text-muted-foreground">
              [TEMPLATE]: MODAL_PATTERNS
            </span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight">Modal Patterns</h1>
          <p className="font-mono text-sm text-muted-foreground">
            Dialog, alert, sheet, and popover patterns for common interactions
          </p>
        </div>

        {/* Modal Types Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <ConfirmationDialog />
          <FormDialog open={formDialogOpen} onOpenChange={setFormDialogOpen} />
          <SideSheet open={sheetOpen} onOpenChange={setSheetOpen} />
          <PopoverExample />
        </div>

        {/* Pattern Comparison */}
        <PatternComparison />

        {/* Features Card */}
        <FeaturesCard />
      </div>
    </div>
  );
}
