# API Keys - Quick Start Guide

Get up and running with API keys in 5 minutes.

## 1. Database Setup

```bash
npm run db:push
```

This creates the `ApiKey` table and updates relations.

## 2. Create Your First API Key

### Via UI

1. Navigate to: http://localhost:3000/developer/api-keys
2. Click "Create API Key"
3. Enter name: "My First Key"
4. Select permissions: ✅ read, ✅ write
5. Click "Create API Key"
6. **Copy the key immediately** (shown only once!)

### Via API

```bash
curl -X POST http://localhost:3000/api/api-keys \
  -H "Content-Type: application/json" \
  -H "Cookie: your-session-cookie" \
  -d '{
    "organizationId": "org_123",
    "name": "My First Key",
    "permissions": ["read", "write"]
  }'
```

**Response:**
```json
{
  "key": "sk_live_A1b2C3d4E5f6G7h8I9j0K1l2M3n4O5p6Q7r8S9t0U1v2W3x4"
}
```

**⚠️ Save this key now! You won't see it again.**

## 3. Use Your API Key

### Example: List Members

```bash
curl http://localhost:3000/api/v1/members \
  -H "Authorization: Bearer sk_live_A1b2C3d4E5f6G7h8I9j0K1l2M3n4O5p6Q7r8S9t0U1v2W3x4"
```

### JavaScript

```javascript
const response = await fetch('/api/v1/members', {
  headers: {
    'Authorization': 'Bearer sk_live_A1b2C3d4E5f6G7h8I9j0K1l2M3n4O5p6Q7r8S9t0U1v2W3x4'
  }
});

const members = await response.json();
console.log(members);
```

### Python

```python
import requests

headers = {
    'Authorization': 'Bearer sk_live_A1b2C3d4E5f6G7h8I9j0K1l2M3n4O5p6Q7r8S9t0U1v2W3x4'
}

response = requests.get('http://localhost:3000/api/v1/members', headers=headers)
print(response.json())
```

## 4. Add API Key Authentication to Your Endpoint

```typescript
import { requirePermission } from "@/middleware/api-auth";
import { NextRequest, NextResponse } from "next/server";

// Require 'read' permission
export const GET = requirePermission("read", async (req, apiKey) => {
  // apiKey contains: { id, organizationId, userId, permissions }

  return NextResponse.json({
    message: "Success!",
    organization: apiKey.organizationId
  });
});

// Require 'write' permission
export const POST = requirePermission("write", async (req, apiKey) => {
  const body = await req.json();

  // Your create/update logic here

  return NextResponse.json({ success: true });
});
```

## 5. Common Tasks

### List All Keys

```bash
curl "http://localhost:3000/api/api-keys?organizationId=org_123" \
  -H "Cookie: your-session-cookie"
```

### Revoke a Key

```bash
curl -X DELETE http://localhost:3000/api/api-keys/key_abc123 \
  -H "Cookie: your-session-cookie"
```

### Update Key Permissions

```bash
curl -X PATCH http://localhost:3000/api/api-keys/key_abc123 \
  -H "Content-Type: application/json" \
  -H "Cookie: your-session-cookie" \
  -d '{
    "permissions": ["read", "write", "admin"]
  }'
```

## Permissions

### read
- View organization data
- List members
- Get resources

### write
- All `read` permissions
- Create/update resources
- Invite members

### admin
- All `read` and `write` permissions
- Delete resources
- Manage settings
- **⚠️ Use sparingly!**

## Security Best Practices

1. **Never commit keys to git**
   ```bash
   # .env.local
   API_KEY=sk_live_...
   ```

2. **Rotate keys regularly**
   - Create new key
   - Update apps
   - Revoke old key

3. **Use least privilege**
   - Only grant needed permissions
   - Prefer `read` when possible

4. **Monitor usage**
   - Check "Last used" dates
   - Revoke unused keys

## Troubleshooting

### 401 Unauthorized
- Check key is valid
- Verify format: `sk_live_...`
- Ensure key hasn't expired
- Check Authorization header format

### 403 Forbidden
- Verify key has required permission
- Check organization membership
- Ensure key belongs to correct org

### 404 Not Found
- Key may have been revoked
- Check key ID is correct

## Available Endpoints

### Public API (v1)

All require API key authentication.

**GET /api/v1/organizations/[id]**
- Permission: `read`
- Returns: Organization details

**GET /api/v1/members**
- Permission: `read`
- Returns: List of members

**POST /api/v1/members/invite**
- Permission: `write`
- Body: `{ email, role }`
- Returns: Invite object

## Next Steps

- Read full documentation: `docs/04-features/API-KEYS.md`
- Set up rate limiting for production
- Integrate organization context
- Add your own API endpoints

## Example: Protected Endpoint

```typescript
// src/app/api/v1/projects/route.ts
import { requirePermission } from "@/middleware/api-auth";
import { prisma } from "@/lib/prisma";

export const GET = requirePermission("read", async (req, apiKey) => {
  const projects = await prisma.project.findMany({
    where: {
      organizationId: apiKey.organizationId
    }
  });

  return NextResponse.json(projects);
});

export const POST = requirePermission("write", async (req, apiKey) => {
  const body = await req.json();

  const project = await prisma.project.create({
    data: {
      ...body,
      organizationId: apiKey.organizationId
    }
  });

  return NextResponse.json(project);
});
```

That's it! You now have a production-ready API key system.
