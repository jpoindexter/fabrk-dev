#!/bin/bash
# Sync boilerplate to official customer repo - WHITELIST APPROACH
# This script ensures only designated files are copied to the official repo.
# Everything else (marketing site, internal tools, dev scripts) is excluded by default.
# Usage: ./.internal/scripts/sync-to-official.sh

set -e

OFFICIAL_REPO="/Users/jasonpoindexter/Documents/GitHub/fabrk-official"
DEV_REPO="$(pwd)"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}[SYNC] Starting whitelist sync to official repo...${NC}"

# 1. Ensure official repo exists and is clean
if [ ! -d "$OFFICIAL_REPO" ]; then
    echo -e "${YELLOW}[INFO] Cloning official repo...${NC}"
    git clone https://github.com/Theft-SUDO/fabrk-official.git "$OFFICIAL_REPO"
else
    echo -e "${YELLOW}[INFO] Cleaning existing official repo content...${NC}"
    # Remove all contents except the .git directory
    find "$OFFICIAL_REPO" -mindepth 1 -maxdepth 1 ! -name ".git" -exec rm -rf {} +
fi

# 2. Recreate core directories in official repo
echo -e "${YELLOW}[INFO] Recreating core directories...${NC}"
mkdir -p "$OFFICIAL_REPO/src/app"
mkdir -p "$OFFICIAL_REPO/src/components"
mkdir -p "$OFFICIAL_REPO/src/lib"
mkdir -p "$OFFICIAL_REPO/prisma"
mkdir -p "$OFFICIAL_REPO/public"


# 3. Copy Whitelisted Files/Folders
echo -e "${YELLOW}[INFO] Copying whitelisted files/folders...${NC}"

# --- App Router Pages ---
# Copy core app functionality: (platform), (auth), api, layout.tsx, global-error.tsx, error.tsx, robots.ts, sitemap.ts
cp -r "$DEV_REPO/src/app/(platform)" "$OFFICIAL_REPO/src/app/"
cp -r "$DEV_REPO/src/app/(auth)" "$OFFICIAL_REPO/src/app/"
cp -r "$DEV_REPO/src/app/(marketing)/library" "$OFFICIAL_REPO/src/app/"
cp -r "$DEV_REPO/src/app/(marketing)/docs" "$OFFICIAL_REPO/src/app/"
cp -r "$DEV_REPO/src/app/api" "$OFFICIAL_REPO/src/app/"
cp "$DEV_REPO/src/app/layout.tsx" "$OFFICIAL_REPO/src/app/"
cp "$DEV_REPO/src/app/global-error.tsx" "$OFFICIAL_REPO/src/app/"
cp "$DEV_REPO/src/app/error.tsx" "$OFFICIAL_REPO/src/app/"
cp "$DEV_REPO/src/app/robots.ts" "$OFFICIAL_REPO/src/app/"
cp "$DEV_REPO/src/app/sitemap.ts" "$OFFICIAL_REPO/src/app/"
cp "$DEV_REPO/src/app/globals.css" "$OFFICIAL_REPO/src/app/" # global styles
cp "$DEV_REPO/src/app/not-found.tsx" "$OFFICIAL_REPO/src/app/" # 404 page

# --- Overwrite Library/Docs Layouts for Customer (Adds Nav/Footer) ---
echo -e "${YELLOW}[INFO] Configuring customer library/docs layouts...${NC}"
cp "$DEV_REPO/.internal/scripts/customer-library-layout.tsx" "$OFFICIAL_REPO/src/app/library/layout.tsx"
cp "$DEV_REPO/.internal/scripts/customer-docs-layout.tsx" "$OFFICIAL_REPO/src/app/docs/layout.tsx"

# --- Core Components ---
# Copy all src/components except marketing/landing/home, excluding test files
rsync -a --exclude='landing/' --exclude='marketing/' --exclude='home/' --exclude='*.test.ts' --exclude='*.test.tsx' --exclude='*.spec.ts' --exclude='*.spec.tsx' "$DEV_REPO/src/components/" "$OFFICIAL_REPO/src/components/"

# --- Libraries ---
# Copy all libraries excluding test files
rsync -a --exclude='*.test.ts' --exclude='*.test.tsx' --exclude='*.spec.ts' --exclude='*.spec.tsx' "$DEV_REPO/src/lib/" "$OFFICIAL_REPO/src/lib/"

# --- i18n ---
cp -r "$DEV_REPO/src/i18n" "$OFFICIAL_REPO/src/"

# --- Design System (CRITICAL - required by all components) ---
cp -r "$DEV_REPO/src/design-system" "$OFFICIAL_REPO/src/"

# --- Config (CRITICAL - required by many components) ---
cp "$DEV_REPO/src/config.js" "$OFFICIAL_REPO/src/"

# --- Hooks ---
cp -r "$DEV_REPO/src/hooks" "$OFFICIAL_REPO/src/"

# --- Email Templates ---
cp -r "$DEV_REPO/src/emails" "$OFFICIAL_REPO/src/"

# --- Instrumentation ---
cp "$DEV_REPO/src/instrumentation-client.ts" "$OFFICIAL_REPO/src/" 2>/dev/null || true
cp "$DEV_REPO/src/instrumentation.ts" "$OFFICIAL_REPO/src/" 2>/dev/null || true

# --- Types ---
cp -r "$DEV_REPO/src/types" "$OFFICIAL_REPO/src/" 2>/dev/null || true

# --- Database ---
cp -r "$DEV_REPO/prisma" "$OFFICIAL_REPO/"

# --- Public Assets ---
cp -r "$DEV_REPO/public" "$OFFICIAL_REPO/"

# --- Root Config/Metadata Files ---
cp "$DEV_REPO/package.json" "$OFFICIAL_REPO/"
cp "$DEV_REPO/package-lock.json" "$OFFICIAL_REPO/"
cp "$DEV_REPO/tsconfig.json" "$OFFICIAL_REPO/"
cp "$DEV_REPO/next.config.ts" "$OFFICIAL_REPO/"
cp "$DEV_REPO/postcss.config.mjs" "$OFFICIAL_REPO/"
cp "$DEV_REPO/.gitignore" "$OFFICIAL_REPO/"
cp "$DEV_REPO/.env.example" "$OFFICIAL_REPO/" # Must have a valid .env.example
cp "$DEV_REPO/LICENSE.md" "$OFFICIAL_REPO/"

# --- GitHub Workflows & Security ---
echo -e "${YELLOW}[INFO] Copying GitHub workflows and security config...${NC}"
cp -r "$DEV_REPO/.github" "$OFFICIAL_REPO/"

# --- Docs (customer-facing) ---
cp -r "$DEV_REPO/docs" "$OFFICIAL_REPO/"
# Remove any remaining internal docs from the docs folder if they slipped through
find "$OFFICIAL_REPO/docs" -name "MONOREPO_RESTRUCTURE.md" -delete
find "$OFFICIAL_REPO/docs" -name "CLAUDE.md" -delete
find "$OFFICIAL_REPO/docs" -name "GEMINI.md" -delete
find "$OFFICIAL_REPO/docs" -name "*.md" -type f -exec sed -i '' '/discord.gg/d; /twitter.com/d; /Twitter thread/d; /@fabrk_dev/d; /Active Discord/d; /Join our Discord/d' {} +
find "$OFFICIAL_REPO/docs" -name "*.md" -type f -exec sed -i '' 's/@fabrk.dev/@fabrek.dev/g' {} +

# 4. Copy Boilerplate Landing Page (replaces your marketing page)
echo -e "${YELLOW}[INFO] Adding boilerplate landing page...${NC}"
cp "$DEV_REPO/.internal/scripts/boilerplate-page.tsx" "$OFFICIAL_REPO/src/app/page.tsx"

# 5. Create placeholder for internal components (if the whitelist above copied `src/components/landing`, this overwrites it.)
mkdir -p "$OFFICIAL_REPO/src/components/landing"
cat > "$OFFICIAL_REPO/src/components/landing/index.ts" << 'EOF'
/**
 * Landing Components
 *
 * Add your custom landing page components here.
 * See /templates/landing-variations for examples.
 */

export {};
EOF

# 6. Process README (Copy and Clean) - Always last for content
echo -e "${YELLOW}[INFO] Processing README...${NC}"
cp "$DEV_REPO/README.md" "$OFFICIAL_REPO/README.md" # Copy the original
node "$DEV_REPO/.internal/scripts/utilities/clean-readme.mjs" "$OFFICIAL_REPO/README.md" # Clean it up

# 7. Final cleanup - remove any remaining internal files (safeguard)
rm -rf "$OFFICIAL_REPO/.internal" 2>/dev/null || true
rm -rf "$OFFICIAL_REPO/marketing" 2>/dev/null || true
rm -rf "$OFFICIAL_REPO/.claude" 2>/dev/null || true


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