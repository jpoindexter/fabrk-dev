/**
 * ✅ FABRK COMPONENT
 * Documentation Layout Template - Terminal console style
 * Production-ready ✓
 */

"use client";

import { useState } from "react";
import { DocsSidebar } from "./components/docs-sidebar";
import { DocsContent } from "./components/docs-content";
import { TableOfContents } from "./components/table-of-contents";
import { TemplateFeatures } from "./components/template-features";
import { docContent } from "./components/docs-data";

export default function DocumentationLayoutTemplate() {
  const [activeDoc, setActiveDoc] = useState("quick-start");

  const currentDoc = docContent[activeDoc as keyof typeof docContent];

  return (
    <div>
      {/* Page Content */}
      <div className="flex">
        {/* Sidebar */}
        <DocsSidebar activeDoc={activeDoc} onDocChange={setActiveDoc} />

        {/* Main Content */}
        <DocsContent currentDoc={currentDoc} />

        {/* Table of Contents (Right Sidebar) */}
        <TableOfContents />
      </div>

      {/* Implementation Note */}
      <TemplateFeatures />
    </div>
  );
}
