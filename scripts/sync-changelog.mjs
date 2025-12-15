#!/usr/bin/env node

/**
 * Sync Changelog from GitHub Releases
 *
 * Fetches releases from GitHub and updates src/data/changelog.ts
 *
 * Usage: npm run sync:changelog
 *
 * Environment variables:
 *   GITHUB_TOKEN - Optional, for private repos or higher rate limits
 *   GITHUB_OWNER - Repository owner (default: from package.json or "jpoindexter")
 *   GITHUB_REPO  - Repository name (default: from package.json or "fabrk_plate")
 *
 * Features:
 *   - Pagination support (fetches all releases, not just first 30)
 *   - Filters out drafts and prereleases
 *   - Validates generated TypeScript
 *   - Rate limit handling with retries
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Config
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const GITHUB_OWNER = process.env.GITHUB_OWNER || 'jpoindexter';
const GITHUB_REPO = process.env.GITHUB_REPO || 'fabrk_plate';
const CHANGELOG_PATH = join(projectRoot, 'src/data/changelog.ts');
const PER_PAGE = 100; // Max allowed by GitHub API
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Parse release body into change entries
function parseReleaseBody(body) {
  const changes = [];
  if (!body) return changes;

  const lines = body.split('\n');
  let currentType = 'added';

  const typeMap = {
    added: ['added', 'new', 'feature', 'feat'],
    changed: ['changed', 'updated', 'improved', 'enhancement'],
    fixed: ['fixed', 'fix', 'bug', 'bugfix'],
    removed: ['removed', 'deleted'],
    security: ['security', 'vulnerability', 'cve'],
    deprecated: ['deprecated'],
  };

  for (const line of lines) {
    const trimmed = line.trim();

    // Check for section headers like "### Added" or "## Fixed"
    const headerMatch = trimmed.match(/^#{1,3}\s*(\w+)/i);
    if (headerMatch) {
      const headerWord = headerMatch[1].toLowerCase();
      for (const [type, keywords] of Object.entries(typeMap)) {
        if (keywords.some((k) => headerWord.includes(k))) {
          currentType = type;
          break;
        }
      }
      continue;
    }

    // Parse list items
    const listMatch = trimmed.match(/^[-*]\s+(.+)/);
    if (listMatch) {
      changes.push({
        type: currentType,
        description: listMatch[1],
      });
    }
  }

  return changes;
}

// Format date to YYYY-MM-DD
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
}

// Clean version string
function cleanVersion(tagName) {
  return tagName.replace(/^v/, '');
}

// Generate title from version if not provided
function generateTitle(name, tagName) {
  if (name && name !== tagName) {
    return name.toUpperCase().replace(/\s+/g, '_');
  }
  return `RELEASE_${cleanVersion(tagName).replace(/\./g, '_')}`;
}

// Sleep helper for retries
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Fetch a single page of releases with retry logic
async function fetchReleasesPage(page, headers) {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases?per_page=${PER_PAGE}&page=${page}`;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(url, { headers });

      // Handle rate limiting
      if (response.status === 403) {
        const rateLimitRemaining = response.headers.get('x-ratelimit-remaining');
        const rateLimitReset = response.headers.get('x-ratelimit-reset');

        if (rateLimitRemaining === '0' && rateLimitReset) {
          const resetTime = parseInt(rateLimitReset, 10) * 1000;
          const waitTime = Math.max(0, resetTime - Date.now()) + 1000;
          console.log(`⏳ Rate limited. Waiting ${Math.ceil(waitTime / 1000)}s...`);
          await sleep(waitTime);
          continue;
        }
      }

      if (!response.ok) {
        if (response.status === 404) {
          return { releases: [], hasMore: false };
        }
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      const releases = await response.json();
      const linkHeader = response.headers.get('link');
      const hasMore = linkHeader?.includes('rel="next"') ?? false;

      return { releases, hasMore };
    } catch (error) {
      if (attempt < MAX_RETRIES) {
        console.log(`⚠️  Attempt ${attempt} failed, retrying in ${RETRY_DELAY}ms...`);
        await sleep(RETRY_DELAY);
      } else {
        throw error;
      }
    }
  }
}

// Fetch all releases with pagination
async function fetchAllReleases() {
  const headers = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'fabrk-changelog-sync',
  };

  if (GITHUB_TOKEN) {
    headers.Authorization = `token ${GITHUB_TOKEN}`;
  }

  console.log(`\n📡 Fetching releases from ${GITHUB_OWNER}/${GITHUB_REPO}...`);

  const allReleases = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const { releases, hasMore: more } = await fetchReleasesPage(page, headers);

    if (releases.length === 0) break;

    // Filter out drafts and prereleases
    const validReleases = releases.filter((r) => !r.draft && !r.prerelease);
    allReleases.push(...validReleases);

    console.log(`   Page ${page}: ${releases.length} releases (${validReleases.length} valid)`);

    hasMore = more;
    page++;

    // Safety limit to prevent infinite loops
    if (page > 50) {
      console.log('⚠️  Reached page limit (50), stopping pagination');
      break;
    }
  }

  return allReleases;
}

// Generate TypeScript file content
function generateChangelogFile(entries) {
  const entriesJson = JSON.stringify(entries, null, 2)
    .replace(/"type": "(\w+)"/g, "type: '$1'")
    .replace(/"(\w+)":/g, '$1:')
    .replace(/"/g, "'");

  return `/**
 * Changelog Data
 *
 * Auto-generated from GitHub releases
 * Last synced: ${new Date().toISOString()}
 *
 * Run \`npm run sync:changelog\` to update
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

export const CHANGELOG: ChangelogEntry[] = ${entriesJson};

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
`;
}

// Validate generated TypeScript
function validateTypeScript(filePath) {
  console.log('\n🔍 Validating TypeScript...');
  try {
    execSync(`npx tsc --noEmit "${filePath}"`, {
      cwd: projectRoot,
      stdio: 'pipe',
    });
    console.log('   ✅ TypeScript validation passed');
    return true;
  } catch (error) {
    console.error('   ❌ TypeScript validation failed:', error.message);
    return false;
  }
}

// Main execution
async function main() {
  console.log('🔄 Syncing changelog from GitHub releases...');

  try {
    const releases = await fetchAllReleases();

    if (releases.length === 0) {
      console.log('\n⚠️  No published releases found. Creating placeholder changelog.');

      // Create default entry if no releases
      const defaultEntry = {
        version: '1.0.0',
        date: formatDate(new Date().toISOString()),
        title: 'INITIAL_RELEASE',
        changes: [
          { type: 'added', description: '77 production-ready UI components' },
          { type: 'added', description: '12 terminal color themes' },
          { type: 'added', description: 'Multi-provider payments (Stripe, Polar, Lemonsqueezy)' },
          { type: 'added', description: 'NextAuth v5 with JWT sessions' },
          { type: 'added', description: '100% TypeScript strict mode' },
        ],
      };

      const content = generateChangelogFile([defaultEntry]);
      writeFileSync(CHANGELOG_PATH, content);

      // Validate
      if (!validateTypeScript(CHANGELOG_PATH)) {
        process.exit(1);
      }

      console.log(`\n✅ Created default changelog at ${CHANGELOG_PATH}`);
      return;
    }

    console.log(`\n📦 Found ${releases.length} published release(s)`);

    // Convert releases to changelog entries
    const entries = releases.map((release) => {
      const changes = parseReleaseBody(release.body);

      // If no changes parsed, create a generic entry
      if (changes.length === 0) {
        changes.push({
          type: 'added',
          description: release.name || `Release ${release.tag_name}`,
        });
      }

      return {
        version: cleanVersion(release.tag_name),
        date: formatDate(release.published_at || release.created_at),
        title: generateTitle(release.name, release.tag_name),
        url: release.html_url,
        changes,
      };
    });

    // Generate and write file
    const content = generateChangelogFile(entries);
    writeFileSync(CHANGELOG_PATH, content);

    // Validate TypeScript
    if (!validateTypeScript(CHANGELOG_PATH)) {
      console.error('\n❌ Generated file has TypeScript errors. Please check manually.');
      process.exit(1);
    }

    console.log(`\n✅ Synced ${entries.length} release(s) to changelog`);
    console.log(`   📁 ${CHANGELOG_PATH}`);

    // Show summary
    console.log('\n📋 Releases:');
    for (const entry of entries.slice(0, 5)) {
      console.log(`   v${entry.version} - ${entry.title} (${entry.date})`);
    }
    if (entries.length > 5) {
      console.log(`   ... and ${entries.length - 5} more`);
    }
  } catch (error) {
    console.error('\n❌ Error syncing changelog:', error.message);
    process.exit(1);
  }
}

main();
