#!/bin/bash

# Local Development Setup Script
# This script automates the initial setup for Fabrk development

set -e

echo "🚀 Fabrk Local Setup"
echo "===================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version is too old. Please upgrade to Node.js 18+."
    echo "   Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm $(npm -v) detected"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo ""
    echo "📝 Creating .env.local from .env.example..."
    cp .env.example .env.local

    # Generate NEXTAUTH_SECRET
    if command -v openssl &> /dev/null; then
        echo ""
        echo "🔐 Generating NEXTAUTH_SECRET..."
        SECRET=$(openssl rand -base64 32)
        if [[ "$OSTYPE" == "darwin"* ]]; then
            sed -i '' "s/NEXTAUTH_SECRET=\"your-secret-key-here\"/NEXTAUTH_SECRET=\"$SECRET\"/" .env.local
        else
            sed -i "s/NEXTAUTH_SECRET=\"your-secret-key-here\"/NEXTAUTH_SECRET=\"$SECRET\"/" .env.local
        fi
        echo "✅ NEXTAUTH_SECRET generated"
    else
        echo "⚠️  openssl not found. Please manually set NEXTAUTH_SECRET in .env.local"
    fi

    echo ""
    echo "⚠️  IMPORTANT: Update the following in .env.local:"
    echo "   - DATABASE_URL (PostgreSQL connection string)"
    echo "   - STRIPE_SECRET_KEY"
    echo "   - STRIPE_WEBHOOK_SECRET"
    echo "   - RESEND_API_KEY"
else
    echo ""
    echo "✅ .env.local already exists"
fi

# Check if PostgreSQL is installed
echo ""
echo "🗄️  Checking PostgreSQL..."
if command -v psql &> /dev/null; then
    echo "✅ PostgreSQL detected"

    # Ask if user wants to create database
    read -p "📊 Create local database? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Database name (default: fabrk): " DB_NAME
        DB_NAME=${DB_NAME:-fabrk}

        echo "Creating database: $DB_NAME"
        createdb "$DB_NAME" 2>/dev/null || echo "⚠️  Database might already exist"

        # Update DATABASE_URL in .env.local
        if [[ "$OSTYPE" == "darwin"* ]]; then
            sed -i '' "s|DATABASE_URL=.*|DATABASE_URL=\"postgresql://localhost:5432/$DB_NAME\"|" .env.local
        else
            sed -i "s|DATABASE_URL=.*|DATABASE_URL=\"postgresql://localhost:5432/$DB_NAME\"|" .env.local
        fi

        echo "✅ Database created and .env.local updated"

        # Push schema
        echo ""
        echo "📤 Pushing Prisma schema to database..."
        npm run db:push

        # Seed database
        read -p "🌱 Seed database with example data? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            npm run db:seed
        fi
    fi
else
    echo "⚠️  PostgreSQL not detected. You'll need to:"
    echo "   1. Install PostgreSQL"
    echo "   2. Create a database"
    echo "   3. Update DATABASE_URL in .env.local"
    echo "   4. Run: npm run db:push"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Update .env.local with your API keys"
echo "   2. Run: npm run dev"
echo "   3. Open: http://localhost:3000"
echo ""
echo "📚 Documentation: docs/QUICK-START.md"
echo ""
