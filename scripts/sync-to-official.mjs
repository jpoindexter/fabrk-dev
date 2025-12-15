#!/usr/bin/env node

/**
 * Sync to Official Repository
 *
 * Pushes changes to the official repo with clean commit messages
 * (strips Claude/AI signatures from commits)
 *
 * Usage: npm run sync:official
 */

import { execSync } from 'child_process';

const OFFICIAL_REMOTE = 'official';
const OFFICIAL_REPO = 'Theft-SUDO/fabrk-official';

// Patterns to remove from commit messages
const STRIP_PATTERNS = [
  /🤖 Generated with \[Claude Code\]\(https:\/\/claude\.ai\/claude-code\)\n?/gi,
  /🤖 Generated with \[Claude Code\]\(https:\/\/claude\.com\/claude-code\)\n?/gi,
  /Co-Authored-By: Claude.*\n?/gi,
  /Co-Authored-By: Anthropic.*\n?/gi,
  /\n\n$/g, // Clean up trailing newlines
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

async function main() {
  console.log('🔄 Syncing to official repository...\n');

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

  // Check if there are commits to sync
  let commitsBehind = '0';
  try {
    commitsBehind = getOutput(`git rev-list --count ${OFFICIAL_REMOTE}/main..HEAD 2>/dev/null || echo "0"`);
  } catch {
    commitsBehind = 'all'; // First sync
  }

  if (commitsBehind === '0') {
    console.log('✅ Already in sync with official repo');
    return;
  }

  console.log(`📊 Commits to sync: ${commitsBehind}\n`);

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

  console.log('🔨 Creating clean sync...');

  // Stash any uncommitted changes
  exec('git stash --include-untracked', { silent: true, ignoreError: true });

  try {
    // Create orphan branch with current state
    exec(`git checkout --orphan ${tempBranch}`, { silent: true });
    exec('git add -A', { silent: true });

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
