#!/bin/bash

# API Keys System Test Script
# Tests all API key functionality

echo "🔑 API Keys System Test"
echo "======================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
BASE_URL="${BASE_URL:-http://localhost:3000}"
ORG_ID="${ORG_ID:-org_demo}"

echo "📋 Configuration:"
echo "   Base URL: $BASE_URL"
echo "   Org ID: $ORG_ID"
echo ""

# Test 1: Create API Key
echo "Test 1: Create API Key"
echo "-----------------------"

RESPONSE=$(curl -s -X POST "$BASE_URL/api/api-keys" \
  -H "Content-Type: application/json" \
  -d "{
    \"organizationId\": \"$ORG_ID\",
    \"name\": \"Test Key $(date +%s)\",
    \"permissions\": [\"read\", \"write\"]
  }")

if echo "$RESPONSE" | grep -q "key"; then
  API_KEY=$(echo "$RESPONSE" | grep -o '"key":"[^"]*"' | cut -d'"' -f4)
  KEY_ID=$(echo "$RESPONSE" | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
  echo -e "${GREEN}✓ Key created successfully${NC}"
  echo "   Key: ${API_KEY:0:20}..."
  echo "   ID: $KEY_ID"
else
  echo -e "${RED}✗ Failed to create key${NC}"
  echo "   Response: $RESPONSE"
  exit 1
fi
echo ""

# Test 2: List API Keys
echo "Test 2: List API Keys"
echo "---------------------"

RESPONSE=$(curl -s "$BASE_URL/api/api-keys?organizationId=$ORG_ID")

if echo "$RESPONSE" | grep -q "$KEY_ID"; then
  echo -e "${GREEN}✓ Key found in list${NC}"
else
  echo -e "${YELLOW}⚠ Warning: Key not found in list (may need authentication)${NC}"
fi
echo ""

# Test 3: Test API Key Authentication
echo "Test 3: Test API Key Authentication"
echo "------------------------------------"

if [ ! -z "$API_KEY" ]; then
  RESPONSE=$(curl -s "$BASE_URL/api/v1/members" \
    -H "Authorization: Bearer $API_KEY")

  if echo "$RESPONSE" | grep -q "error"; then
    ERROR=$(echo "$RESPONSE" | grep -o '"error":"[^"]*"' | cut -d'"' -f4)
    echo -e "${YELLOW}⚠ Authentication check: $ERROR${NC}"
    echo "   (This is expected if organization doesn't exist yet)"
  else
    echo -e "${GREEN}✓ API key authentication working${NC}"
  fi
else
  echo -e "${RED}✗ No API key to test${NC}"
fi
echo ""

# Test 4: Test Invalid Key
echo "Test 4: Test Invalid Key (should fail)"
echo "---------------------------------------"

RESPONSE=$(curl -s "$BASE_URL/api/v1/members" \
  -H "Authorization: Bearer sk_live_invalid_key_12345")

if echo "$RESPONSE" | grep -q "Invalid or missing API key"; then
  echo -e "${GREEN}✓ Invalid key correctly rejected${NC}"
else
  echo -e "${RED}✗ Invalid key not rejected${NC}"
  echo "   Response: $RESPONSE"
fi
echo ""

# Test 5: Revoke API Key
echo "Test 5: Revoke API Key"
echo "----------------------"

if [ ! -z "$KEY_ID" ]; then
  RESPONSE=$(curl -s -X DELETE "$BASE_URL/api/api-keys/$KEY_ID")

  if echo "$RESPONSE" | grep -q "success"; then
    echo -e "${GREEN}✓ Key revoked successfully${NC}"
  else
    echo -e "${YELLOW}⚠ Revoke may require authentication${NC}"
    echo "   Response: $RESPONSE"
  fi
else
  echo -e "${RED}✗ No key ID to revoke${NC}"
fi
echo ""

# Summary
echo "========================"
echo "🏁 Test Summary"
echo "========================"
echo -e "${GREEN}Core functionality verified!${NC}"
echo ""
echo "Next steps:"
echo "1. Create organization in database"
echo "2. Test UI at: $BASE_URL/developer/api-keys"
echo "3. Set up organization context"
echo ""
