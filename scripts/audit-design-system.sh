#!/bin/bash

# Design System Audit Script
# Detects violations of the "Terminal" aesthetic (no shadows, no colored dots, specific headers)

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting Design System Audit...${NC}\n"

VIOLATIONS=0

# 1. Check for Colored Dots (macOS style)
echo -e "${YELLOW}[1/3] Checking for Colored Dots Pattern (CRITICAL)...${NC}"
DOTS_COUNT=$(grep -r "bg-destructive/50.*size-2\|size-2.*bg-destructive/50" src/ --include="*.tsx" | wc -l)

if [ "$DOTS_COUNT" -gt 0 ]; then
  echo -e "${RED}✖ Found $DOTS_COUNT occurrences of Colored Dots pattern.${NC}"
  echo "   This violates the Terminal aesthetic. Use StyledCardHeader instead."
  grep -r "bg-destructive/50.*size-2\|size-2.*bg-destructive/50" src/ --include="*.tsx" | cut -c 1-100
  VIOLATIONS=$((VIOLATIONS + 1))
else
  echo -e "${GREEN}✔ No Colored Dots patterns found.${NC}"
fi

echo ""

# 2. Check for Shadows
echo -e "${YELLOW}[2/3] Checking for Shadows (HIGH)...${NC}"
SHADOW_COUNT=$(grep -r "shadow-sm\|shadow-md\|shadow-lg" src/ --include="*.tsx" | wc -l)

if [ "$SHADOW_COUNT" -gt 0 ]; then
  echo -e "${RED}✖ Found $SHADOW_COUNT occurrences of shadow-* classes.${NC}"
  echo "   The Terminal aesthetic is flat. Remove shadows."
  grep -r "shadow-sm\|shadow-md\|shadow-lg" src/ --include="*.tsx" | head -n 5
  echo "   ...and more."
  VIOLATIONS=$((VIOLATIONS + 1))
else
  echo -e "${GREEN}✔ No forbidden shadows found.${NC}"
fi

echo ""

# 3. Check for Hardcoded Hex Colors (Sample)
echo -e "${YELLOW}[3/3] Checking for Hardcoded Colors (Sample)...${NC}"
COLOR_COUNT=$(grep -r "bg-white\|text-white\|bg-black\|text-black" src/ --include="*.tsx" | wc -l)

if [ "$COLOR_COUNT" -gt 0 ]; then
  echo -e "${YELLOW}⚠ Found $COLOR_COUNT potential hardcoded colors (white/black).${NC}"
  echo "   Verify if these should be using design tokens (e.g., bg-background, text-foreground)."
else
  echo -e "${GREEN}✔ No basic hardcoded colors found.${NC}"
fi

echo ""
echo "----------------------------------------"
if [ "$VIOLATIONS" -gt 0 ]; then
  echo -e "${RED}Audit Failed with violations.${NC}"
  echo "Run this script locally or in CI to prevent regressions."
  exit 1
else
  echo -e "${GREEN}Audit Passed! Design system is consistent.${NC}"
  exit 0
fi
