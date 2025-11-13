#!/bin/bash

# Health Check Script
# Verifies that the development environment is properly configured

set -e

echo "🏥 Fabrk Health Check"
echo "===================="
echo ""

ERRORS=0

# Check Node.js version
echo "Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -ge 18 ]; then
        echo "✅ Node.js $(node -v)"
    else
        echo "❌ Node.js version too old: $(node -v) (need 18+)"
        ERRORS=$((ERRORS + 1))
    fi
else
    echo "❌ Node.js not installed"
    ERRORS=$((ERRORS + 1))
fi

# Check npm
echo "Checking npm..."
if command -v npm &> /dev/null; then
    echo "✅ npm $(npm -v)"
else
    echo "❌ npm not installed"
    ERRORS=$((ERRORS + 1))
fi

# Check if node_modules exists
echo "Checking dependencies..."
if [ -d "node_modules" ]; then
    echo "✅ Dependencies installed"
else
    echo "❌ Dependencies not installed (run: npm install)"
    ERRORS=$((ERRORS + 1))
fi

# Check if .env.local exists
echo "Checking environment variables..."
if [ -f ".env.local" ]; then
    echo "✅ .env.local exists"

    # Check required variables
    REQUIRED_VARS=("DATABASE_URL" "NEXTAUTH_SECRET" "NEXTAUTH_URL")
    for VAR in "${REQUIRED_VARS[@]}"; do
        if grep -q "^${VAR}=" .env.local; then
            VALUE=$(grep "^${VAR}=" .env.local | cut -d'=' -f2 | tr -d '"' | tr -d "'")
            if [ -n "$VALUE" ] && [ "$VALUE" != "your-secret-key-here" ] && [ "$VALUE" != "postgresql://..." ]; then
                echo "  ✅ $VAR is set"
            else
                echo "  ⚠️  $VAR is not configured properly"
                ERRORS=$((ERRORS + 1))
            fi
        else
            echo "  ❌ $VAR is missing"
            ERRORS=$((ERRORS + 1))
        fi
    done
else
    echo "❌ .env.local not found (copy from .env.example)"
    ERRORS=$((ERRORS + 1))
fi

# Check PostgreSQL
echo "Checking PostgreSQL..."
if command -v psql &> /dev/null; then
    echo "✅ PostgreSQL installed"
else
    echo "⚠️  PostgreSQL not found (optional for local development)"
fi

# Check Prisma Client
echo "Checking Prisma Client..."
if [ -d "node_modules/@prisma/client" ] && [ -d "node_modules/.prisma" ]; then
    echo "✅ Prisma Client generated"
else
    echo "⚠️  Prisma Client not generated (run: npm run db:push)"
    ERRORS=$((ERRORS + 1))
fi

# Check TypeScript
echo "Checking TypeScript..."
npx tsc --noEmit --pretty false 2>&1 | head -10 || true
TS_ERRORS=$(npx tsc --noEmit 2>&1 | grep -c "error TS" || true)
if [ "$TS_ERRORS" -eq 0 ]; then
    echo "✅ No TypeScript errors"
else
    echo "⚠️  $TS_ERRORS TypeScript errors found (run: npm run type-check)"
fi

# Check ESLint
echo "Checking ESLint..."
ESLINT_RESULT=$(npm run lint 2>&1 || true)
if echo "$ESLINT_RESULT" | grep -q "No ESLint warnings or errors"; then
    echo "✅ No ESLint errors"
else
    echo "⚠️  ESLint warnings/errors found (run: npm run lint)"
fi

# Check Git
echo "Checking Git..."
if [ -d ".git" ]; then
    echo "✅ Git repository initialized"
    BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
    echo "  Branch: $BRANCH"
else
    echo "⚠️  Git repository not initialized"
fi

# Check Stripe CLI (optional)
echo "Checking Stripe CLI (optional)..."
if command -v stripe &> /dev/null; then
    echo "✅ Stripe CLI installed"
else
    echo "ℹ️  Stripe CLI not installed (needed for local webhook testing)"
fi

# Summary
echo ""
echo "===================="
if [ $ERRORS -eq 0 ]; then
    echo "✅ Health check passed! Everything looks good."
    echo ""
    echo "🚀 Ready to run:"
    echo "   npm run dev"
    exit 0
else
    echo "❌ Health check failed with $ERRORS error(s)."
    echo ""
    echo "📋 Fix the errors above and run this script again."
    exit 1
fi
