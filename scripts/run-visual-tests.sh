#!/bin/bash

# Visual Regression Test Runner
# Run visual tests by category or all at once

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Print usage
usage() {
  echo -e "${BLUE}Visual Regression Test Runner${NC}"
  echo ""
  echo "Usage: $0 [category] [options]"
  echo ""
  echo "Categories:"
  echo "  all              - Run all visual tests (default)"
  echo "  marketing        - Marketing pages (homepage, pricing, etc.)"
  echo "  legal            - Legal pages (privacy, terms, etc.)"
  echo "  docs-components  - Component documentation (99 pages)"
  echo "  docs-features    - Feature guides (features, security, tutorials)"
  echo "  templates        - Template pages (30 categories)"
  echo "  validation       - Site-wide validation tests"
  echo ""
  echo "Options:"
  echo "  --update         - Update baseline snapshots"
  echo "  --headed         - Run in headed mode (see browser)"
  echo "  --debug          - Run in debug mode (step through)"
  echo "  --ui             - Run in UI mode (Playwright inspector)"
  echo "  --report         - Open test report after running"
  echo ""
  echo "Examples:"
  echo "  $0 all                    # Run all tests"
  echo "  $0 marketing --headed     # Run marketing tests in headed mode"
  echo "  $0 templates --update     # Update template snapshots"
  echo "  $0 validation --report    # Run validation and show report"
}

# Parse arguments
CATEGORY="${1:-all}"
shift || true

EXTRA_ARGS=""
OPEN_REPORT=false

while [[ $# -gt 0 ]]; do
  case $1 in
    --update)
      EXTRA_ARGS="$EXTRA_ARGS --update-snapshots"
      shift
      ;;
    --headed)
      EXTRA_ARGS="$EXTRA_ARGS --headed"
      shift
      ;;
    --debug)
      EXTRA_ARGS="$EXTRA_ARGS --debug"
      shift
      ;;
    --ui)
      EXTRA_ARGS="$EXTRA_ARGS --ui"
      shift
      ;;
    --report)
      OPEN_REPORT=true
      shift
      ;;
    --help|-h)
      usage
      exit 0
      ;;
    *)
      echo -e "${RED}Unknown option: $1${NC}"
      usage
      exit 1
      ;;
  esac
done

# Run tests based on category
run_tests() {
  local test_file=$1
  local description=$2

  echo -e "${BLUE}Running: ${description}${NC}"
  npx playwright test "$test_file" $EXTRA_ARGS
}

case $CATEGORY in
  all)
    echo -e "${GREEN}Running ALL visual regression tests...${NC}"
    echo ""
    run_tests "tests/visual/full-site.visual.spec.ts" "Marketing, Legal, Docs Main"
    run_tests "tests/visual/docs-components.visual.spec.ts" "Component Documentation (99 pages)"
    run_tests "tests/visual/docs-features.visual.spec.ts" "Feature Guides"
    run_tests "tests/visual/templates-full.visual.spec.ts" "Template Pages"
    run_tests "tests/visual/site-wide-validation.spec.ts" "Site-wide Validation"
    ;;

  marketing)
    echo -e "${GREEN}Running marketing page tests...${NC}"
    npx playwright test tests/visual/full-site.visual.spec.ts --grep "Marketing Pages" $EXTRA_ARGS
    ;;

  legal)
    echo -e "${GREEN}Running legal page tests...${NC}"
    npx playwright test tests/visual/full-site.visual.spec.ts --grep "Legal Pages" $EXTRA_ARGS
    ;;

  docs-components)
    echo -e "${GREEN}Running component documentation tests (99 pages)...${NC}"
    echo -e "${YELLOW}This may take a while...${NC}"
    run_tests "tests/visual/docs-components.visual.spec.ts" "Component Documentation"
    ;;

  docs-features)
    echo -e "${GREEN}Running feature guide tests...${NC}"
    run_tests "tests/visual/docs-features.visual.spec.ts" "Feature Guides"
    ;;

  templates)
    echo -e "${GREEN}Running template page tests...${NC}"
    run_tests "tests/visual/templates-full.visual.spec.ts" "Template Pages"
    ;;

  validation)
    echo -e "${GREEN}Running site-wide validation tests...${NC}"
    run_tests "tests/visual/site-wide-validation.spec.ts" "Site-wide Validation"
    ;;

  *)
    echo -e "${RED}Unknown category: $CATEGORY${NC}"
    echo ""
    usage
    exit 1
    ;;
esac

# Open report if requested
if [ "$OPEN_REPORT" = true ]; then
  echo ""
  echo -e "${GREEN}Opening test report...${NC}"
  npx playwright show-report
fi

echo ""
echo -e "${GREEN}✓ Tests complete!${NC}"
