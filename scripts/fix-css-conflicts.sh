#!/bin/bash

# Fix CSS conflicts where border-2 and border-brutal are both used
# border-brutal already defines 2px width, so border-2 is redundant

echo "Scanning for CSS conflicts in UI components..."
echo ""

count=0

find src/components/ui -name "*.tsx" -type f | while read file; do
  if grep -q "border-2 border-brutal\|border-brutal border-2" "$file"; then
    echo "Fixing: $file"
    count=$((count + 1))

    # Replace border-2 border-brutal with border-brutal
    sed -i '' 's/border-2 border-brutal/border-brutal/g' "$file"

    # Replace border-brutal border-2 with border-brutal
    sed -i '' 's/border-brutal border-2/border-brutal/g' "$file"

    echo "  ✓ Fixed"
  fi
done

echo ""
echo "Done! Fixed $count files."
