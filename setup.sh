#!/bin/bash

# ============================================================================
# FABRK BOILERPLATE - QUICK SETUP SCRIPT
# ============================================================================
# This script automates the initial setup process
# Run: chmod +x setup.sh && ./setup.sh
# ============================================================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
print_header() {
    echo -e "\n${BLUE}============================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}============================================${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

# ============================================================================
# 1. CHECK PREREQUISITES
# ============================================================================
print_header "Step 1: Checking Prerequisites"

# Check Node.js version
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed"
    print_info "Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18 or higher is required (you have v$NODE_VERSION)"
    print_info "Please upgrade from https://nodejs.org"
    exit 1
fi

print_success "Node.js $(node -v) detected"

# Check npm
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed"
    exit 1
fi

print_success "npm $(npm -v) detected"

# ============================================================================
# 2. INSTALL DEPENDENCIES
# ============================================================================
print_header "Step 2: Installing Dependencies"

print_info "Running npm install (this may take a few minutes)..."
if npm install --legacy-peer-deps; then
    print_success "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# ============================================================================
# 3. SETUP ENVIRONMENT FILE
# ============================================================================
print_header "Step 3: Setting Up Environment Variables"

if [ -f ".env" ]; then
    print_warning ".env file already exists"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_info "Keeping existing .env file"
    else
        cp .env.example .env
        print_success "Created .env from .env.example"
    fi
else
    cp .env.example .env
    print_success "Created .env from .env.example"
fi

print_warning "IMPORTANT: Edit .env and add your API keys before running the app!"

# ============================================================================
# 4. GENERATE PRISMA CLIENT
# ============================================================================
print_header "Step 4: Generating Prisma Client"

print_info "Running prisma generate..."
if npx prisma generate; then
    print_success "Prisma client generated successfully"
else
    print_error "Failed to generate Prisma client"
    exit 1
fi

# ============================================================================
# 5. SETUP SUMMARY
# ============================================================================
print_header "Setup Complete! 🎉"

echo -e "${GREEN}Your boilerplate is ready to go!${NC}\n"

echo -e "${YELLOW}NEXT STEPS:${NC}"
echo -e "1. ${BLUE}Edit .env${NC} with your actual API keys:"
echo -e "   - NEXTAUTH_SECRET (generate with: openssl rand -base64 32)"
echo -e "   - DATABASE_URL (your PostgreSQL connection string)"
echo -e "   - STRIPE_SECRET_KEY (from Stripe Dashboard)"
echo -e "   - RESEND_API_KEY (from Resend Dashboard)"
echo -e ""
echo -e "2. ${BLUE}Setup your database:${NC}"
echo -e "   npx prisma db push"
echo -e ""
echo -e "3. ${BLUE}Start the development server:${NC}"
echo -e "   npm run dev"
echo -e ""
echo -e "4. ${BLUE}Open http://localhost:3000${NC} in your browser"
echo -e ""

echo -e "${YELLOW}DOCUMENTATION:${NC}"
echo -e "  • Quick Start: ${BLUE}docs/getting-started/QUICKSTART.md${NC}"
echo -e "  • Full Setup:  ${BLUE}docs/getting-started/SETUP.md${NC}"
echo -e "  • Development: ${BLUE}docs/development/WORKFLOW.md${NC}"
echo -e ""

echo -e "${GREEN}Need help? Check the docs folder or README.md${NC}\n"

# Ask if user wants to open setup guide
read -p "Open the setup guide now? (Y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Nn]$ ]]; then
    if [ -f "docs/getting-started/SETUP.md" ]; then
        # Try to open with various commands depending on OS
        if command -v open &> /dev/null; then
            open docs/getting-started/SETUP.md
        elif command -v xdg-open &> /dev/null; then
            xdg-open docs/getting-started/SETUP.md
        elif command -v start &> /dev/null; then
            start docs/getting-started/SETUP.md
        else
            print_info "Could not auto-open. View at: docs/getting-started/SETUP.md"
        fi
    fi
fi

print_success "Setup script completed successfully!"
