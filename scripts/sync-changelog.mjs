#!/usr/bin/env node

/**
 * Sync Changelog from GitHub Releases
 *
 * Fetches releases from GitHub and updates src/data/changelog.ts
 * Only includes clean, customer-facing release notes.
 *
 * Usage: npm run sync:changelog
 *
 * Environment variables:
 *   GITHUB_TOKEN - Optional, for private repos or higher rate limits
 *   GITHUB_OWNER - Repository owner (default: "jpoindexter")
 *   GITHUB_REPO  - Repository name (default: "fabrk_plate")
 */

import { writeFileSync } from 'fs';
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
const PER_PAGE = 100;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

// Patterns to filter out (noise, auto-generated, internal stuff)
const NOISE_PATTERNS = [
  /claude/i,
  /co-authored-by/i,
  /generated with/i,
  /auto-generated/i,
  /\[bot\]/i,
  /dependabot/i,
  /renovate/i,
  /bump version/i,
  /merge (pull request|branch|conflict)/i,
  /wip:/i,
  /work in progress/i,
  /todo:/i,
  /fixup!/i,
  /squash!/i,
  /revert "revert/i,
  /chore\(deps\)/i,
  /chore\(release\)/i,
  /update (yarn|npm|pnpm)\.lock/i,
  /^\s*$/,
  /^\.$/,
];

// Clean up a change description
function cleanDescription(text) {
  if (!text) return null;

  let cleaned = text
    // Remove commit hashes
    .replace(/\b[a-f0-9]{7,40}\b/gi, '')
    // Remove PR/issue references like (#123)
    .replace(/\s*\(#\d+\)\s*/g, ' ')
    // Remove GitHub usernames @mentions
    .replace(/@[\w-]+/g, '')
    // Remove emoji shortcodes :emoji:
    .replace(/:\w+:/g, '')
    // Remove common prefixes
    .replace(/^(feat|fix|chore|docs|style|refactor|perf|test|build|ci)(\(.+?\))?:\s*/i, '')
    // Remove trailing punctuation patterns
    .replace(/\s*[-–—]\s*$/, '')
    // Clean up whitespace
    .replace(/\s+/g, ' ')
    .trim();

  // Check against noise patterns
  for (const pattern of NOISE_PATTERNS) {
    if (pattern.test(cleaned)) {
      return null;
    }
  }

  // Skip if too short (likely not meaningful)
  if (cleaned.length < 10) {
    return null;
  }

  // Capitalize first letter
  cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);

  return cleaned;
}

// Parse release body into change entries
function parseReleaseBody(body) {
  const changes = [];
  if (!body) return changes;

  // First, clean the entire body of noise
  const cleanedBody = body
    .replace(/🤖.*Generated with.*\n?/gi, '')
    .replace(/Co-Authored-By:.*\n?/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');

  const lines = cleanedBody.split('\n');
  let currentType = 'added';

  const typeMap = {
    added: ['added', 'new', 'feature', 'feat'],
    changed: ['changed', 'updated', 'improved', 'enhancement', 'update'],
    fixed: ['fixed', 'fix', 'bug', 'bugfix', 'resolve'],
    removed: ['removed', 'deleted', 'remove'],
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
      const cleaned = cleanDescription(listMatch[1]);
      if (cleaned) {
        changes.push({
          type: currentType,
          description: cleaned,
        });
      }
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
    // Clean up the name
    let title = name
      .replace(/🤖.*$/g, '')
      .replace(/\s*[-–—]\s*$/, '')
      .trim();

    if (title.length > 3) {
      return title.toUpperCase().replace(/\s+/g, '_');
    }
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
        console.log(`⚠️  Attempt ${attempt} failed, retrying...`);
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

    // Filter: only published releases (no drafts, no prereleases)
    const validReleases = releases.filter((r) => !r.draft && !r.prerelease);
    allReleases.push(...validReleases);

    console.log(`   Page ${page}: ${releases.length} total, ${validReleases.length} published`);

    hasMore = more;
    page++;

    if (page > 50) {
      console.log('⚠️  Reached page limit, stopping');
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
 */

export type ChangeType = 'added' | 'changed' | 'fixed' | 'removed' | 'security' | 'deprecated';

export interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  url?: string;
  changes: {
    type: ChangeType;
    description: string;
  }[];
}

export const CHANGELOG: ChangelogEntry[] = ${entriesJson};

export function getChangelogByType(type?: ChangeType): ChangelogEntry[] {
  if (!type) return CHANGELOG;
  return CHANGELOG.map((entry) => ({
    ...entry,
    changes: entry.changes.filter((c) => c.type === type),
  })).filter((entry) => entry.changes.length > 0);
}

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
    console.log('   ✅ Valid');
    return true;
  } catch (error) {
    console.error('   ❌ TypeScript error');
    return false;
  }
}

// Main execution
async function main() {
  console.log('🔄 Syncing changelog from GitHub releases...');
  console.log('   (Only clean, customer-facing entries will be included)\n');

  try {
    const releases = await fetchAllReleases();

    if (releases.length === 0) {
      console.log('\n⚠️  No published releases found. Creating placeholder.');

      const defaultEntry = {
        version: '1.0.0',
        date: formatDate(new Date().toISOString()),
        title: 'INITIAL_RELEASE',
        changes: [
          { type: 'added', description: '77 production-ready UI components' },
          { type: 'added', description: '12 terminal color themes' },
          { type: 'added', description: 'Multi-provider payments (Stripe, Polar, Lemonsqueezy)' },
          { type: 'added', description: 'NextAuth v5 authentication' },
          { type: 'added', description: 'Full TypeScript support' },
        ],
      };

      const content = generateChangelogFile([defaultEntry]);
      writeFileSync(CHANGELOG_PATH, content);

      if (!validateTypeScript(CHANGELOG_PATH)) {
        process.exit(1);
      }

      console.log(`\n✅ Created default changelog`);
      return;
    }

    console.log(`\n📦 Found ${releases.length} published release(s)`);

    // Convert releases to changelog entries
    const entries = [];
    let skippedCount = 0;

    for (const release of releases) {
      const changes = parseReleaseBody(release.body);

      // Skip releases with no meaningful changes
      if (changes.length === 0) {
        skippedCount++;
        continue;
      }

      entries.push({
        version: cleanVersion(release.tag_name),
        date: formatDate(release.published_at || release.created_at),
        title: generateTitle(release.name, release.tag_name),
        url: release.html_url,
        changes,
      });
    }

    if (entries.length === 0) {
      console.log('\n⚠️  No releases with meaningful changes. Creating placeholder.');

      const defaultEntry = {
        version: '1.0.0',
        date: formatDate(new Date().toISOString()),
        title: 'INITIAL_RELEASE',
        changes: [
          { type: 'added', description: '77 production-ready UI components' },
          { type: 'added', description: '12 terminal color themes' },
          { type: 'added', description: 'Multi-provider payments (Stripe, Polar, Lemonsqueezy)' },
          { type: 'added', description: 'NextAuth v5 authentication' },
          { type: 'added', description: 'Full TypeScript support' },
        ],
      };

      entries.push(defaultEntry);
    }

    // Generate and write file
    const content = generateChangelogFile(entries);
    writeFileSync(CHANGELOG_PATH, content);

    if (!validateTypeScript(CHANGELOG_PATH)) {
      console.error('\n❌ Generated file has errors');
      process.exit(1);
    }

    console.log(`\n✅ Synced ${entries.length} release(s)`);
    if (skippedCount > 0) {
      console.log(`   ⏭️  Skipped ${skippedCount} release(s) with no meaningful changes`);
    }
    console.log(`   📁 ${CHANGELOG_PATH}`);

    // Show summary
    console.log('\n📋 Releases included:');
    for (const entry of entries.slice(0, 5)) {
      console.log(`   v${entry.version} - ${entry.title} (${entry.changes.length} changes)`);
    }
    if (entries.length > 5) {
      console.log(`   ... and ${entries.length - 5} more`);
    }
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main();
