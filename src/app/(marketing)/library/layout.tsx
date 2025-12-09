'use client';

import { DocsSidebar, NavSection } from '@/components/docs/docs-sidebar';
import { templatesNavigation, toDisplayCase } from './library-nav-data';

// Cast templates navigation to NavSection[] (compatible interface)
const navigation = templatesNavigation as NavSection[];

// Format section titles with [01] prefix and terminal case
const formatSectionTitle = (title: string, index: number) =>
  `[${String(index + 1).padStart(2, '0')}] ${toDisplayCase(title)}`;

// Format item titles to terminal case
const formatItemTitle = (title: string) => toDisplayCase(title);

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1">
      <DocsSidebar
        navigation={navigation}
        formatSectionTitle={formatSectionTitle}
        formatItemTitle={formatItemTitle}
      />

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
