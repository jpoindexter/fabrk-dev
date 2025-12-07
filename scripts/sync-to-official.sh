#!/bin/bash
# Sync boilerplate to official customer repo
# Usage: ./scripts/sync-to-official.sh

set -e

OFFICIAL_REPO="/Users/jasonpoindexter/Documents/GitHub/fabrk-official"
DEV_REPO="$(pwd)"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}[SYNC] Starting sync to official repo...${NC}"

# Check if official repo exists
if [ ! -d "$OFFICIAL_REPO" ]; then
    echo -e "${YELLOW}[INFO] Cloning official repo...${NC}"
    git clone https://github.com/Theft-SUDO/fabrk-official.git "$OFFICIAL_REPO"
fi

# Files/folders to EXCLUDE (marketing, private, internal)
EXCLUDE_PATTERNS=(
    # ============================================
    # MARKETING / YOUR SITE (not for customers)
    # ============================================
    "marketing/"
    "src/app/page.tsx"
    "src/app/about/"
    "src/app/contact/"
    "src/app/features/"
    "src/app/pricing/"
    "src/app/purchase/"
    "src/app/success/"
    "src/app/blog/"
    "src/components/landing/"
    "src/components/home/"
    "src/components/marketing/"
    "src/app/components/sections/"

    # ============================================
    # INTERNAL DOCS & TOOLS
    # ============================================
    ".claude/"
    ".internal/"
    ".agent-workspace/"
    ".archive/"
    ".integrations/"
    ".vscode/"
    ".lighthouseci/"
    "design-inconsistency-report/"
    "design-system/"
    "assets/"
    "coverage/"
    "playwright-report/"
    "test-results/"

    # ============================================
    # REFERENCE / THIRD-PARTY BOILERPLATES
    # ============================================
    "reference/"
    "boilerplate-reference/"
    "shipfast/"
    "**/Boilerplate/"
    "**/boilerplate-copy/"

    # ============================================
    # PRIVATE CONFIG & DOCS
    # ============================================
    "CLAUDE.md"
    "GEMINI.md"
    "DESIGN_SYSTEM.md"
    "LAUNCH_PLAN.md"
    "SECRET-ROTATION.md"
    ".cursorrules"
    ".lighthouserc.json"
    "debug-storybook.log"
    "typedoc.json"

    # ============================================
    # GITHUB INTERNAL CONFIGS
    # ============================================
    ".github/WORKFLOWS-CREATED.txt"
    ".github/CI-CD-PIPELINE-SUMMARY.md"
    ".github/CI-CD-SETUP-GUIDE.md"

    # ============================================
    # MIGRATION/UTILITY SCRIPTS (internal paths)
    # ============================================
    "scripts/migrate-to-mode.mjs"

    # ============================================
    # ENVIRONMENT & SECRETS
    # ============================================
    ".env"
    ".env.local"

    # ============================================
    # GIT & BUILD ARTIFACTS
    # ============================================
    ".git/"
    ".next/"
    "node_modules/"
    "tsconfig.tsbuildinfo"
    ".DS_Store"

    # ============================================
    # THIS SYNC SCRIPT
    # ============================================
    "scripts/sync-to-official.sh"
)

# Build rsync exclude args
EXCLUDE_ARGS=""
for pattern in "${EXCLUDE_PATTERNS[@]}"; do
    EXCLUDE_ARGS="$EXCLUDE_ARGS --exclude=$pattern"
done

echo -e "${YELLOW}[INFO] Syncing files...${NC}"

# Sync with rsync (delete removes files not in source)
rsync -av --delete \
    $EXCLUDE_ARGS \
    "$DEV_REPO/" "$OFFICIAL_REPO/"

# Copy boilerplate landing page (replaces your marketing page)
echo -e "${YELLOW}[INFO] Adding boilerplate landing page...${NC}"
cp "$DEV_REPO/scripts/boilerplate-page.tsx" "$OFFICIAL_REPO/src/app/page.tsx"

# Create placeholder for landing components
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

# Process README (Copy and Clean)
echo -e "${YELLOW}[INFO] Processing README...${NC}"
cp "$DEV_REPO/README.md" "$OFFICIAL_REPO/README.md"

# Clean README using the utility script
node "$DEV_REPO/scripts/utilities/clean-readme.mjs" "$OFFICIAL_REPO/README.md"

# Remove any internal files that might have slipped through
echo -e "${YELLOW}[INFO] Cleaning up internal files...${NC}"

# Internal docs
rm -f "$OFFICIAL_REPO/CLAUDE.md" 2>/dev/null || true
rm -f "$OFFICIAL_REPO/GEMINI.md" 2>/dev/null || true
rm -f "$OFFICIAL_REPO/DESIGN_SYSTEM.md" 2>/dev/null || true
rm -f "$OFFICIAL_REPO/LAUNCH_PLAN.md" 2>/dev/null || true
rm -f "$OFFICIAL_REPO/SECRET-ROTATION.md" 2>/dev/null || true

# Internal folders
rm -rf "$OFFICIAL_REPO/.claude" 2>/dev/null || true
rm -rf "$OFFICIAL_REPO/marketing" 2>/dev/null || true
rm -rf "$OFFICIAL_REPO/design-inconsistency-report" 2>/dev/null || true
rm -rf "$OFFICIAL_REPO/design-system" 2>/dev/null || true
rm -rf "$OFFICIAL_REPO/assets" 2>/dev/null || true
rm -rf "$OFFICIAL_REPO/.internal" 2>/dev/null || true
rm -rf "$OFFICIAL_REPO/.archive" 2>/dev/null || true
rm -rf "$OFFICIAL_REPO/.agent-workspace" 2>/dev/null || true

# Reference boilerplates (CRITICAL - contains third-party code)
rm -rf "$OFFICIAL_REPO/reference" 2>/dev/null || true
rm -rf "$OFFICIAL_REPO/boilerplate-reference" 2>/dev/null || true
rm -rf "$OFFICIAL_REPO/shipfast" 2>/dev/null || true

# GitHub internal configs
rm -f "$OFFICIAL_REPO/.github/WORKFLOWS-CREATED.txt" 2>/dev/null || true
rm -f "$OFFICIAL_REPO/.github/CI-CD-PIPELINE-SUMMARY.md" 2>/dev/null || true
rm -f "$OFFICIAL_REPO/.github/CI-CD-SETUP-GUIDE.md" 2>/dev/null || true

# Scripts with hardcoded paths
rm -f "$OFFICIAL_REPO/scripts/migrate-to-mode.mjs" 2>/dev/null || true

# Test artifacts
rm -rf "$OFFICIAL_REPO/coverage" 2>/dev/null || true
rm -rf "$OFFICIAL_REPO/playwright-report" 2>/dev/null || true
rm -rf "$OFFICIAL_REPO/test-results" 2>/dev/null || true

echo -e "${GREEN}[SUCCESS] Sync complete!${NC}"
echo ""
echo -e "${YELLOW}[SUMMARY] What was synced:${NC}"
echo "  ✓ All UI components (src/components/ui/)"
echo "  ✓ Templates library (src/app/templates/)"
echo "  ✓ Dashboard pages (src/app/(dashboard)/)"
echo "  ✓ API routes (src/app/api/)"
echo "  ✓ Documentation (src/app/docs/)"
echo "  ✓ Libraries (src/lib/)"
echo "  ✓ Config files"
echo ""
echo -e "${YELLOW}[EXCLUDED] Private files:${NC}"
echo "  ✗ Your landing page (src/app/page.tsx)"
echo "  ✗ Marketing components (src/components/landing/)"
echo "  ✗ Internal docs (.claude/, CLAUDE.md, GEMINI.md)"
echo "  ✗ Environment files (.env, .env.local)"
echo ""
echo -e "${YELLOW}[NEXT STEPS]:${NC}"
echo "  cd $OFFICIAL_REPO"
echo "  git status"
echo "  git add -A && git commit -m 'Sync from dev'"
echo "  git push"
