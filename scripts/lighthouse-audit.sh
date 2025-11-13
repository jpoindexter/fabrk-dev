#!/bin/bash

###############################################################################
# Lighthouse Performance Audit Script
#
# Runs Lighthouse CI locally and generates performance reports.
# Usage: npm run lighthouse
###############################################################################

set -e

echo "🔍 Starting Lighthouse Performance Audit..."
echo ""

# Check if @lhci/cli is installed
if ! command -v lhci &> /dev/null; then
    echo "Installing @lhci/cli globally..."
    npm install -g @lhci/cli
fi

# Ensure environment variables are set
if [ ! -f .env.local ]; then
    echo "⚠️  Warning: .env.local not found. Creating minimal config..."
    cat > .env.local << EOF
DATABASE_URL=postgresql://user:password@localhost:5432/test
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=test-secret-for-lighthouse
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_fake
STRIPE_SECRET_KEY=sk_test_fake
STRIPE_WEBHOOK_SECRET=whsec_fake
EOF
fi

# Build the application
echo "📦 Building application..."
npm run build

# Run Lighthouse CI
echo ""
echo "🚀 Running Lighthouse CI..."
echo "   Testing 5 pages with 3 runs each (median scores)"
echo ""

lhci autorun --config=lighthouserc.js

# Check if reports were generated
if [ -d ".lighthouseci" ]; then
    echo ""
    echo "✅ Lighthouse audit complete!"
    echo ""
    echo "📊 Reports saved to .lighthouseci/"
    echo "   View reports: ls -lh .lighthouseci/*.html"
    echo ""
    echo "💡 To view in browser:"
    echo "   open .lighthouseci/lhr-*.html"
else
    echo ""
    echo "❌ No reports generated. Check for errors above."
    exit 1
fi
