#!/bin/bash
# Sync boilerplate to official customer repo - WHITELIST APPROACH
# This script ensures only designated files are copied to the official repo.
# Everything else (marketing site, internal tools, dev scripts) is excluded by default.
# Usage:
#   Normal:   ./.internal/scripts/sync-to-official.sh
#   Dry-run:  DRY_RUN=true ./.internal/scripts/sync-to-official.sh
#   Custom:   FABRK_OFFICIAL_REPO=/path/to/repo ./.internal/scripts/sync-to-official.sh

set -e

# Configuration - can be overridden via environment variables
OFFICIAL_REPO="${FABRK_OFFICIAL_REPO:-/Users/jasonpoindexter/Documents/GitHub/fabrk-official}"
DEV_REPO="$(pwd)"
DRY_RUN="${DRY_RUN:-false}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Dry-run mode
if [ "$DRY_RUN" = "true" ]; then
    echo -e "${BLUE}[DRY RUN MODE] No files will be modified${NC}"
    echo -e "${BLUE}[DRY RUN MODE] This will show what would be synced${NC}"
    echo ""
fi

# Helper functions for dry-run mode
safe_mkdir() {
    if [ "$DRY_RUN" = "true" ]; then
        echo -e "${BLUE}[DRY RUN] Would create directory: $1${NC}"
    else
        mkdir -p "$1"
    fi
}

safe_cp() {
    if [ "$DRY_RUN" = "true" ]; then
        echo -e "${BLUE}[DRY RUN] Would copy: $1 → $2${NC}"
    else
        cp "$@"
    fi
}

safe_rsync() {
    if [ "$DRY_RUN" = "true" ]; then
        echo -e "${BLUE}[DRY RUN] Would rsync: $*${NC}"
    else
        rsync "$@"
    fi
}

echo -e "${GREEN}[SYNC] Starting whitelist sync to official repo...${NC}"
echo -e "${YELLOW}[INFO] Official repo: $OFFICIAL_REPO${NC}"
echo -e "${YELLOW}[INFO] Dev repo: $DEV_REPO${NC}"
echo ""

# ============================================================================
# PRE-FLIGHT SAFETY CHECKS
# ============================================================================

echo -e "${BLUE}[SECURITY] Running pre-flight safety checks...${NC}"

# 1. Check for secrets in .env.example
echo -e "${YELLOW}[CHECK 1/4] Scanning .env.example for real secrets...${NC}"
if grep -qE "sk_live_|ghp_[a-zA-Z0-9]{36}|AKIA[0-9A-Z]{16}|promo_[0-9A-Z]{24,}" .env.example 2>/dev/null; then
    echo -e "${RED}[ERROR] Real secrets detected in .env.example!${NC}"
    echo -e "${RED}[ERROR] Found patterns matching real API keys.${NC}"
    echo -e "${YELLOW}[FIX] Replace with placeholders before syncing.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ No secrets found in .env.example${NC}"

# 2. Check for secrets in committed files
echo -e "${YELLOW}[CHECK 2/4] Scanning for secrets in tracked files...${NC}"
if git grep -qE "sk_live_|ghp_[a-zA-Z0-9]{36}|AKIA[0-9A-Z]{16}" -- ':(exclude).env.local' ':(exclude).env' 2>/dev/null; then
    echo -e "${RED}[ERROR] Potential secrets found in tracked files!${NC}"
    echo -e "${YELLOW}[FIX] Review and remove before syncing.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ No secrets found in tracked files${NC}"

# 3. Verify official repo path exists or can be created
echo -e "${YELLOW}[CHECK 3/4] Verifying official repo path...${NC}"
if [ ! -d "$OFFICIAL_REPO" ] && [ ! -d "$(dirname "$OFFICIAL_REPO")" ]; then
    echo -e "${RED}[ERROR] Parent directory does not exist: $(dirname "$OFFICIAL_REPO")${NC}"
    echo -e "${YELLOW}[FIX] Create the parent directory first.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Official repo path is valid${NC}"

# 4. Check for uncommitted changes in dev repo
echo -e "${YELLOW}[CHECK 4/4] Checking for uncommitted changes...${NC}"
if ! git diff-index --quiet HEAD -- 2>/dev/null; then
    echo -e "${YELLOW}[WARNING] You have uncommitted changes in dev repo${NC}"
    echo -e "${YELLOW}[WARNING] Consider committing before syncing${NC}"
    read -p "Continue anyway? (yes/no): " continue_dirty
    if [ "$continue_dirty" != "yes" ]; then
        echo -e "${RED}[ABORT] Sync cancelled${NC}"
        exit 0
    fi
fi
echo -e "${GREEN}✓ All pre-flight checks passed${NC}"
echo ""

# ============================================================================
# CONFIRMATION PROMPT (skip in dry-run mode)
# ============================================================================

if [ "$DRY_RUN" != "true" ]; then
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${YELLOW}[WARNING] This will DELETE all contents of:${NC}"
    echo -e "${YELLOW}          $OFFICIAL_REPO${NC}"
    echo -e "${YELLOW}[WARNING] Except the .git directory${NC}"
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    read -p "Type 'yes' to proceed, anything else to cancel: " confirm
    if [ "$confirm" != "yes" ]; then
        echo -e "${RED}[ABORT] Sync cancelled by user${NC}"
        exit 0
    fi
    echo ""
fi

# ============================================================================
# REPO INITIALIZATION
# ============================================================================

# 1. Ensure official repo exists and is clean
if [ ! -d "$OFFICIAL_REPO" ]; then
    if [ "$DRY_RUN" = "true" ]; then
        echo -e "${BLUE}[DRY RUN] Would clone official repo to: $OFFICIAL_REPO${NC}"
    else
        echo -e "${YELLOW}[INFO] Cloning official repo...${NC}"
        git clone https://github.com/Theft-SUDO/fabrk-official.git "$OFFICIAL_REPO"
    fi
else
    if [ "$DRY_RUN" = "true" ]; then
        echo -e "${BLUE}[DRY RUN] Would clean existing official repo content (except .git)${NC}"
    else
        echo -e "${YELLOW}[INFO] Cleaning existing official repo content...${NC}"
        # Remove all contents except the .git directory
        find "$OFFICIAL_REPO" -mindepth 1 -maxdepth 1 ! -name ".git" -exec rm -rf {} +
    fi
fi

# 2. Recreate core directories in official repo
echo -e "${YELLOW}[INFO] Recreating core directories...${NC}"
safe_mkdir "$OFFICIAL_REPO/src/app"
safe_mkdir "$OFFICIAL_REPO/src/components"
safe_mkdir "$OFFICIAL_REPO/src/lib"
safe_mkdir "$OFFICIAL_REPO/prisma"
safe_mkdir "$OFFICIAL_REPO/public"


# 3. Copy Whitelisted Files/Folders
echo -e "${YELLOW}[INFO] Copying whitelisted files/folders...${NC}"

# --- App Router Pages ---
# Copy core app functionality: (platform), (auth), api, layout.tsx, global-error.tsx, error.tsx, robots.ts, sitemap.ts
safe_cp -r "$DEV_REPO/src/app/(platform)" "$OFFICIAL_REPO/src/app/"
safe_cp -r "$DEV_REPO/src/app/(auth)" "$OFFICIAL_REPO/src/app/"
safe_cp -r "$DEV_REPO/src/app/(marketing)/library" "$OFFICIAL_REPO/src/app/"
safe_cp -r "$DEV_REPO/src/app/(marketing)/docs" "$OFFICIAL_REPO/src/app/"
safe_cp -r "$DEV_REPO/src/app/api" "$OFFICIAL_REPO/src/app/"
safe_cp "$DEV_REPO/src/app/layout.tsx" "$OFFICIAL_REPO/src/app/"
safe_cp "$DEV_REPO/src/app/global-error.tsx" "$OFFICIAL_REPO/src/app/"
safe_cp "$DEV_REPO/src/app/error.tsx" "$OFFICIAL_REPO/src/app/"
safe_cp "$DEV_REPO/src/app/robots.ts" "$OFFICIAL_REPO/src/app/"
safe_cp "$DEV_REPO/src/app/sitemap.ts" "$OFFICIAL_REPO/src/app/"
safe_cp "$DEV_REPO/src/app/globals.css" "$OFFICIAL_REPO/src/app/" # global styles
safe_cp "$DEV_REPO/src/app/not-found.tsx" "$OFFICIAL_REPO/src/app/" # 404 page

# --- Overwrite Library/Docs Layouts for Customer (Adds Nav/Footer) ---
echo -e "${YELLOW}[INFO] Configuring customer library/docs layouts...${NC}"
safe_cp "$DEV_REPO/.internal/scripts/customer-library-layout.tsx" "$OFFICIAL_REPO/src/app/library/layout.tsx"
safe_cp "$DEV_REPO/.internal/scripts/customer-docs-layout.tsx" "$OFFICIAL_REPO/src/app/docs/layout.tsx"

# --- Core Components ---
# Copy all src/components except marketing/landing/home, excluding test files
safe_rsync -a --exclude='landing/' --exclude='marketing/' --exclude='home/' --exclude='*.test.ts' --exclude='*.test.tsx' --exclude='*.spec.ts' --exclude='*.spec.tsx' "$DEV_REPO/src/components/" "$OFFICIAL_REPO/src/components/"

# --- Libraries ---
# Copy all libraries excluding test files
safe_rsync -a --exclude='*.test.ts' --exclude='*.test.tsx' --exclude='*.spec.ts' --exclude='*.spec.tsx' "$DEV_REPO/src/lib/" "$OFFICIAL_REPO/src/lib/"

# --- i18n ---
safe_cp -r "$DEV_REPO/src/i18n" "$OFFICIAL_REPO/src/"

# --- Design System (CRITICAL - required by all components) ---
safe_cp -r "$DEV_REPO/src/design-system" "$OFFICIAL_REPO/src/"

# --- Config (CRITICAL - required by many components) ---
safe_cp "$DEV_REPO/src/config.js" "$OFFICIAL_REPO/src/"

# --- Hooks ---
safe_cp -r "$DEV_REPO/src/hooks" "$OFFICIAL_REPO/src/"

# --- Email Templates ---
safe_cp -r "$DEV_REPO/src/emails" "$OFFICIAL_REPO/src/"

# --- Instrumentation ---
safe_cp "$DEV_REPO/src/instrumentation-client.ts" "$OFFICIAL_REPO/src/" 2>/dev/null || true
safe_cp "$DEV_REPO/src/instrumentation.ts" "$OFFICIAL_REPO/src/" 2>/dev/null || true

# --- Types ---
safe_cp -r "$DEV_REPO/src/types" "$OFFICIAL_REPO/src/" 2>/dev/null || true

# --- Database ---
safe_cp -r "$DEV_REPO/prisma" "$OFFICIAL_REPO/"

# --- Public Assets ---
safe_cp -r "$DEV_REPO/public" "$OFFICIAL_REPO/"

# --- Root Config/Metadata Files ---
safe_cp "$DEV_REPO/package.json" "$OFFICIAL_REPO/"
safe_cp "$DEV_REPO/package-lock.json" "$OFFICIAL_REPO/"
safe_cp "$DEV_REPO/tsconfig.json" "$OFFICIAL_REPO/"
safe_cp "$DEV_REPO/next.config.ts" "$OFFICIAL_REPO/"
safe_cp "$DEV_REPO/postcss.config.mjs" "$OFFICIAL_REPO/"
safe_cp "$DEV_REPO/.gitignore" "$OFFICIAL_REPO/"
safe_cp "$DEV_REPO/.env.example" "$OFFICIAL_REPO/" # Must have a valid .env.example
safe_cp "$DEV_REPO/LICENSE.md" "$OFFICIAL_REPO/"

# --- GitHub Workflows & Security ---
echo -e "${YELLOW}[INFO] Copying GitHub workflows and security config...${NC}"
safe_cp -r "$DEV_REPO/.github" "$OFFICIAL_REPO/"

# --- Docs (customer-facing) ---
safe_cp -r "$DEV_REPO/docs" "$OFFICIAL_REPO/"
# Remove any remaining internal docs from the docs folder if they slipped through
find "$OFFICIAL_REPO/docs" -name "MONOREPO_RESTRUCTURE.md" -delete
find "$OFFICIAL_REPO/docs" -name "CLAUDE.md" -delete
find "$OFFICIAL_REPO/docs" -name "GEMINI.md" -delete
find "$OFFICIAL_REPO/docs" -name "*.md" -type f -exec sed -i '' '/discord.gg/d; /twitter.com/d; /Twitter thread/d; /@fabrk_dev/d; /Active Discord/d; /Join our Discord/d' {} +
find "$OFFICIAL_REPO/docs" -name "*.md" -type f -exec sed -i '' 's/@fabrk.dev/@fabrek.dev/g' {} +

# 4. Copy Boilerplate Landing Page (replaces your marketing page)
echo -e "${YELLOW}[INFO] Adding boilerplate landing page...${NC}"
safe_cp "$DEV_REPO/.internal/scripts/boilerplate-page.tsx" "$OFFICIAL_REPO/src/app/page.tsx"

# 5. Create placeholder for internal components (if the whitelist above copied `src/components/landing`, this overwrites it.)
safe_mkdir "$OFFICIAL_REPO/src/components/landing"
if [ "$DRY_RUN" = "true" ]; then
    echo -e "${BLUE}[DRY RUN] Would create landing component index file${NC}"
else
    cat > "$OFFICIAL_REPO/src/components/landing/index.ts" << 'EOF'
/**
 * Landing Components
 *
 * Add your custom landing page components here.
 * See /templates/landing-variations for examples.
 */

export {};
EOF
fi

# 6. Process README (Copy and Clean) - Always last for content
echo -e "${YELLOW}[INFO] Processing README...${NC}"
safe_cp "$DEV_REPO/README.md" "$OFFICIAL_REPO/README.md" # Copy the original
if [ "$DRY_RUN" = "true" ]; then
    echo -e "${BLUE}[DRY RUN] Would clean README.md${NC}"
else
    node "$DEV_REPO/.internal/scripts/utilities/clean-readme.mjs" "$OFFICIAL_REPO/README.md" # Clean it up
fi

# 7. Final cleanup - remove any remaining internal files (safeguard)
if [ "$DRY_RUN" = "true" ]; then
    echo -e "${BLUE}[DRY RUN] Would remove: .internal/, marketing/, .claude/${NC}"
else
    rm -rf "$OFFICIAL_REPO/.internal" 2>/dev/null || true
    rm -rf "$OFFICIAL_REPO/marketing" 2>/dev/null || true
    rm -rf "$OFFICIAL_REPO/.claude" 2>/dev/null || true
fi


echo -e "${GREEN}[SUCCESS] Sync complete!${NC}"
echo ""
echo -e "${YELLOW}[SUMMARY] What was synced:${NC}"
echo "  ✓ Core App (src/app/(platform)/)"
echo "  ✓ Auth Pages (src/app/(auth)/)"
echo "  ✓ API Routes (src/app/api/)"
echo "  ✓ Root Layout & Global CSS (src/app/)"
echo "  ✓ Core UI Components (src/components/ui/)"
echo "  ✓ Dashboard Components (src/components/dashboard/)"
echo "  ✓ Libraries (src/lib/)"
echo "  ✓ Database Schema (prisma/)"
echo "  ✓ Public Assets (public/)"
echo "  ✓ Boilerplate Configs (package.json, tsconfig.json, etc.)"
echo "  ✓ Customer-facing Docs (docs/)"
echo "  ✓ Cleaned README.md"
echo ""
echo -e "${YELLOW}[EXCLUDED] Private files:${NC}"
echo "  ✗ Your Marketing Site (src/app/(marketing)/)"
echo "  ✗ Your Marketing Components (src/components/landing/, src/components/marketing/, src/components/home/)"
echo "  ✗ All internal scripts, audits, plans (/.internal/)"
echo "  ✗ Private Environment Variables (.env, .env.local)"
echo ""
echo -e "${YELLOW}[NEXT STEPS]:${NC}"
echo "  cd $OFFICIAL_REPO"
echo "  git status"
echo "  git add -A && git commit -m 'Sync from dev'"
echo "  git push"