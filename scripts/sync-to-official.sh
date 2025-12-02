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
    # Marketing site content
    "marketing/"
    "src/app/page.tsx"
    "src/app/about/"
    "src/app/contact/"
    "src/app/features/"
    "src/app/pricing/"
    "src/app/purchase/"
    "src/app/success/"
    "src/components/landing/"
    "src/components/home/"
    "src/components/marketing/"
    "src/app/components/sections/"

    # Internal docs and tools
    ".claude/"
    ".internal/"
    ".agent-workspace/"
    ".archive/"
    ".integrations/"
    ".vscode/"

    # Environment and secrets
    ".env"
    ".env.local"

    # Internal documentation
    "DESIGN_SYSTEM.md"
    "LAUNCH_PLAN.md"

    # Git and build artifacts
    ".git/"
    ".next/"
    "node_modules/"

    # This sync script itself
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
echo "  ✗ Internal docs (.claude/, .internal/)"
echo "  ✗ Environment files (.env, .env.local)"
echo ""
echo -e "${YELLOW}[NEXT STEPS]:${NC}"
echo "  cd $OFFICIAL_REPO"
echo "  git status"
echo "  git add -A && git commit -m 'Sync from dev'"
echo "  git push"
