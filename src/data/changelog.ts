/**
 * Changelog Data
 *
 * Static changelog entries - can be auto-populated from GitHub releases
 * Run `npm run sync:changelog` to fetch latest releases from GitHub
 *
 * Change types: added, changed, fixed, removed, security, deprecated
 */

export type ChangeType = 'added' | 'changed' | 'fixed' | 'removed' | 'security' | 'deprecated';

export interface ChangelogEntry {
  /** Semantic version (e.g., "1.0.0") */
  version: string;
  /** Release date in YYYY-MM-DD format */
  date: string;
  /** Short title for the release */
  title: string;
  /** Optional GitHub release URL */
  url?: string;
  /** List of changes in this release */
  changes: {
    type: ChangeType;
    description: string;
  }[];
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: '1.0.0',
    date: '2025-12-13',
    title: 'INITIAL_RELEASE',
    changes: [
      { type: 'added', description: '77 production-ready UI components' },
      { type: 'added', description: '12 terminal color themes (CRT phosphor, retro computer, handheld)' },
      { type: 'added', description: 'Multi-provider payments (Stripe, Polar, Lemonsqueezy)' },
      { type: 'added', description: 'NextAuth v5 with JWT sessions' },
      { type: 'added', description: 'Email queue system with Resend' },
      { type: 'added', description: 'Prisma ORM with PostgreSQL' },
      { type: 'added', description: 'Complete documentation site' },
      { type: 'added', description: '100% TypeScript strict mode' },
      { type: 'added', description: 'WCAG 2.2 AA accessibility compliance' },
      { type: 'added', description: 'Pre-commit hooks with design system validation' },
    ],
  },
];

/**
 * Get changelog entries, optionally filtered by type
 */
export function getChangelogByType(type?: ChangeType): ChangelogEntry[] {
  if (!type) return CHANGELOG;
  return CHANGELOG.map((entry) => ({
    ...entry,
    changes: entry.changes.filter((c) => c.type === type),
  })).filter((entry) => entry.changes.length > 0);
}

/**
 * Get the latest version
 */
export function getLatestVersion(): string {
  return CHANGELOG[0]?.version ?? '0.0.0';
}
