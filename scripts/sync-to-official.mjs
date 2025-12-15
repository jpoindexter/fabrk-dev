#!/usr/bin/env node

/**
 * Sync to Official Repository (Whitelist Mode)
 *
 * Only syncs files/directories explicitly listed in .syncinclude
 * Everything else is excluded from the official repo.
 *
 * Usage: npm run sync:official
 */

import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const OFFICIAL_REMOTE = 'official';
const OFFICIAL_REPO = 'Theft-SUDO/fabrk-official';

// Patterns to remove from commit messages (AI signatures)
const STRIP_PATTERNS = [
  /🤖\s*Generated with \[Claude.*?\]\(.*?\)\n*/gi,
  /Co-Authored-By:\s*Claude.*\n*/gi,
  /Co-Authored-By:\s*Anthropic.*\n*/gi,
  /Generated (with|by) (ChatGPT|GPT-?4|OpenAI).*\n*/gi,
  /Co-Authored-By:\s*OpenAI.*\n*/gi,
  /Generated (with|by) (GitHub )?Copilot.*\n*/gi,
  /Co-Authored-By:\s*(GitHub )?Copilot.*\n*/gi,
  /🤖.*\n*/g,
  /Generated (with|by) AI.*\n*/gi,
  /AI-assisted.*\n*/gi,
  /\n{3,}/g,
  /\n+$/g,
];

function exec(cmd, options = {}) {
  try {
    return execSync(cmd, { encoding: 'utf8', stdio: options.silent ? 'pipe' : 'inherit', ...options });
  } catch (error) {
    if (options.ignoreError) return '';
    throw error;
  }
}

function getOutput(cmd) {
  return execSync(cmd, { encoding: 'utf8' }).trim();
}

function cleanMessage(message) {
  let cleaned = message;
  for (const pattern of STRIP_PATTERNS) {
    cleaned = cleaned.replace(pattern, '');
  }
  return cleaned.trim();
}

/**
 * Read .syncinclude file and return list of patterns to include (whitelist)
 */
function getSyncIncludePatterns() {
  const syncIncludePath = join(process.cwd(), '.syncinclude');

  if (!existsSync(syncIncludePath)) {
    console.error('❌ No .syncinclude file found!');
    console.error('   Create a .syncinclude file listing files/dirs to sync.');
    process.exit(1);
  }

  const content = readFileSync(syncIncludePath, 'utf8');
  const patterns = content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#')); // Remove comments and empty lines

  return patterns;
}

/**
 * Stage only the whitelisted files/directories
 */
function stageWhitelistedFiles(patterns) {
  console.log('📦 Including in sync:');

  let addedCount = 0;

  for (const pattern of patterns) {
    const cleanPattern = pattern.replace(/\/$/, ''); // Remove trailing slash

    // Check if the path exists
    if (existsSync(cleanPattern)) {
      try {
        exec(`git add -f "${cleanPattern}"`, { silent: true });
        console.log(`   ✓ ${pattern}`);
        addedCount++;
      } catch (err) {
        console.log(`   ✗ ${pattern} (failed to add)`);
      }
    } else {
      // Try glob pattern (for files like *.md)
      try {
        const result = exec(`git add -f ${cleanPattern} 2>&1 || true`, { silent: true });
        if (!result.includes('did not match any files')) {
          console.log(`   ✓ ${pattern}`);
          addedCount++;
        }
      } catch {
        // Pattern didn't match anything, skip silently
      }
    }
  }

  console.log(`\n   Total: ${addedCount} items staged\n`);
  return addedCount;
}

async function main() {
  console.log('🔄 Syncing to official repository (whitelist mode)...\n');

  // Check if official remote exists
  const remotes = getOutput('git remote');
  if (!remotes.includes(OFFICIAL_REMOTE)) {
    console.log(`Adding remote '${OFFICIAL_REMOTE}'...`);
    exec(`git remote add ${OFFICIAL_REMOTE} https://github.com/${OFFICIAL_REPO}.git`);
  }

  // Fetch latest from official
  console.log('📥 Fetching from official...');
  exec(`git fetch ${OFFICIAL_REMOTE}`, { silent: true, ignoreError: true });

  // Get current branch
  const currentBranch = getOutput('git branch --show-current');
  console.log(`📍 Current branch: ${currentBranch}`);

  // Get sync include patterns (whitelist)
  const includePatterns = getSyncIncludePatterns();
  console.log(`📋 Found ${includePatterns.length} whitelist patterns\n`);

  // Get the last few commit messages to show what's being synced
  const recentCommits = getOutput('git log --oneline -5');
  console.log('Recent commits:');
  console.log(recentCommits);
  console.log('');

  // Create a clean sync commit
  const timestamp = new Date().toISOString().split('T')[0];
  const lastCommitMsg = getOutput('git log -1 --format=%s');
  const cleanedMsg = cleanMessage(lastCommitMsg);

  // Create temporary branch for clean push
  const tempBranch = `sync-official-${Date.now()}`;

  console.log('🔨 Creating clean sync...\n');

  // Stash any uncommitted changes
  exec('git stash --include-untracked', { silent: true, ignoreError: true });

  try {
    // Create orphan branch (empty, no history)
    exec(`git checkout --orphan ${tempBranch}`, { silent: true });

    // Reset staging area (start clean)
    exec('git reset', { silent: true });

    // Stage ONLY whitelisted files
    const stagedCount = stageWhitelistedFiles(includePatterns);

    if (stagedCount === 0) {
      throw new Error('No files were staged. Check your .syncinclude file.');
    }

    // Create clean commit
    const syncMessage = `Sync ${timestamp}: ${cleanedMsg}

Updates from development branch.`;

    exec(`git commit --no-verify -m "${syncMessage}"`, { silent: true });

    // Temporarily disable branch protection
    console.log('🔓 Temporarily disabling branch protection...');
    exec(`gh api repos/${OFFICIAL_REPO}/branches/main/protection -X DELETE`, { silent: true, ignoreError: true });

    // Force push to official
    console.log('📤 Pushing to official...');
    exec(`git push ${OFFICIAL_REMOTE} ${tempBranch}:main --force`);

    // Re-enable branch protection
    console.log('🔒 Re-enabling branch protection...');
    exec(`gh api repos/${OFFICIAL_REPO}/branches/main/protection -X PUT --input - << 'EOF'
{
  "required_status_checks": null,
  "enforce_admins": false,
  "required_pull_request_reviews": null,
  "restrictions": null,
  "allow_force_pushes": false,
  "allow_deletions": false
}
EOF`, { silent: true, ignoreError: true });

    console.log('\n✅ Successfully synced to official repository!');
    console.log(`   https://github.com/${OFFICIAL_REPO}`);

  } finally {
    // Clean up - switch back to original branch
    exec(`git checkout ${currentBranch}`, { silent: true });
    exec(`git branch -D ${tempBranch}`, { silent: true, ignoreError: true });
    exec('git stash pop', { silent: true, ignoreError: true });
  }
}

main().catch((error) => {
  console.error('\n❌ Sync failed:', error.message);
  process.exit(1);
});
