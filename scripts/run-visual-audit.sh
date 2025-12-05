#!/bin/bash

# Run the automated visual audit
# Usage: ./scripts/run-visual-audit.sh [--update]

GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting Automated Visual Audit...${NC}"

if [ "$1" == "--update" ]; then
  echo "Updating baseline snapshots..."
  npx playwright test tests/visual/auto-audit.spec.ts --update-snapshots
else
  echo "Comparing against baselines..."
  npx playwright test tests/visual/auto-audit.spec.ts
fi
