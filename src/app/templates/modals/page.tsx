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
import { TemplatePageHeader } from "@/components/ui/card";

export default function ModalsTemplate() {
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div>
      <div className="container mx-auto max-w-7xl space-y-6 px-6 py-8">
        {/* Header */}
        <TemplatePageHeader
          badge="MODAL_PATTERNS"
          title="Modal Patterns"
          description="Dialog, alert, sheet, and popover patterns for common interactions"
        />

        {/* Modal Types Grid */}
        <div className="grid gap-6 md:grid-cols-2">
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
