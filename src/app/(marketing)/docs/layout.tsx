"use client";

import { DocsSidebar, NavSection } from "@/components/docs/docs-sidebar";
import { DocsToc } from "@/components/docs/docs-toc";
import { useRef } from "react";
import { docsNavigation } from "./docs-nav-data";

export default function DocsLayoutPage({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLElement>(null);

  return (
    <div className="flex flex-1">
      <DocsSidebar navigation={docsNavigation} />

      <main ref={mainRef} className="min-w-0 flex-1">
        <div className="mx-auto max-w-3xl px-6 py-8 lg:px-8">{children}</div>
      </main>

      <DocsToc mainRef={mainRef} />
    </div>
  );
}
