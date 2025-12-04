"use client";

import { DocsLayout } from "@/components/docs/docs-layout";
import { NavSection } from "@/components/docs/docs-sidebar";
import { templatesNavigation, toDisplayCase } from "@/app/templates/templates-nav-data";

// Cast templates navigation to NavSection[] (compatible interface)
const navigation = templatesNavigation as NavSection[];

// Format section titles with [01] prefix and terminal case
const formatSectionTitle = (title: string, index: number) =>
  `[${String(index + 1).padStart(2, "0")}] ${toDisplayCase(title)}`;

// Format item titles to terminal case
const formatItemTitle = (title: string) => toDisplayCase(title);

export default function TemplatesLayoutPage({ children }: { children: React.ReactNode }) {
  return (
    <DocsLayout
      navigation={navigation}
      formatSectionTitle={formatSectionTitle}
      formatItemTitle={formatItemTitle}
      showToc={false}
      fullWidth={true}
    >
      {children}
    </DocsLayout>
  );
}
