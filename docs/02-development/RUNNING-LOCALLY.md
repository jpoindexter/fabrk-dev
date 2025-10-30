# Running Locally - Development Workflow

This guide covers the day-to-day development workflow after initial setup.

---

## Quick Start Commands

```bash
# Start development server
npm run dev

# Open database browser
npm run db:studio

# Listen for Stripe webhooks (separate terminal)
npm run stripe:listen

# Run linter
npm run lint

# Type check
npm run type-check
```

---

## Development Server

### Starting the Server

```bash
npm run dev
```

**Expected output:**
```
  ▲ Next.js 15.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local

 ✓ Ready in 2.1s
```

**Access your app:** [http://localhost:3000](http://localhost:3000)

### Hot Reload

Changes are automatically applied:

- **React components** → Instant update
- **API routes** → Server restart (~1-2 seconds)
- **Environment variables** → Requires manual restart
- **Database schema** → Run `npm run db:push`

**Restart server:** Press `Ctrl+C` then `npm run dev`

---

## Development Workflow

### 1. Check Current Status

```bash
git status
```

See what files have changed.

### 2. Create Feature Branch

```bash
git checkout -b feature/new-feature-name
```

**Naming conventions:**
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation
- `refactor/` - Code improvements

### 3. Make Changes

Edit files in your code editor.

**Most common files:**
- `src/app/` - Pages and routes
- `src/components/` - React components
- `src/lib/` - Utilities and configurations
- `prisma/schema.prisma` - Database schema

### 4. Test Changes

```bash
# View in browser
# http://localhost:3000

# Check types
npm run type-check

# Check linting
npm run lint
```

### 5. Commit Changes

```bash
git add .
git commit -m "Add: description of changes"
```

**Commit message format:**
- `Add:` - New features
- `Fix:` - Bug fixes
- `Update:` - Improvements
- `Docs:` - Documentation
- `Refactor:` - Code cleanup

### 6. Push to Remote

```bash
git push origin feature/new-feature-name
```

---

## Working with the Database

### View Data

```bash
npm run db:studio
```

Opens Prisma Studio at [http://localhost:5555](http://localhost:5555)

**Features:**
- Browse tables
- Edit records
- Filter data
- Delete records

### Update Schema

After editing `prisma/schema.prisma`:

```bash
npm run db:push
```

**Expected output:**
```
✓ Generated Prisma Client
🚀 Your database is now in sync with your Prisma schema.
```

**Important:** Stop and restart dev server after schema changes.

### Common Database Tasks

**Add new model:**

1. Edit `prisma/schema.prisma`
2. Run `npm run db:push`
3. Restart dev server
4. Import updated Prisma Client:
   ```typescript
   import { prisma } from '@/lib/prisma'
   ```

**Reset database (WARNING: deletes all data):**

```bash
npx prisma migrate reset
```

---

## Testing Stripe Integration

### Start Webhook Forwarding

**In a separate terminal:**

```bash
npm run stripe:listen
```

**Expected output:**
```
Ready! Your webhook signing secret is whsec_xxxxx
> Listening on http://localhost:3000/api/webhooks/stripe
```

**Copy the webhook secret** and add to `.env.local`:

```env
STRIPE_WEBHOOK_SECRET="whsec_xxxxx"
```

### Test Payment Flow

1. Go to [http://localhost:3000/pricing](http://localhost:3000/pricing)
2. Click "Get Started" on any plan
3. Use test card:
   - **Number:** `4242 4242 4242 4242`
   - **Expiry:** Any future date (e.g., `12/34`)
   - **CVC:** Any 3 digits (e.g., `123`)
   - **ZIP:** Any 5 digits (e.g., `12345`)
4. Complete checkout

**Check webhook terminal** for events:
```
[200] POST /api/webhooks/stripe [evt_abc123]
```

### Stripe Test Cards

| Card Number | Scenario |
|-------------|----------|
| `4242 4242 4242 4242` | Success |
| `4000 0025 0000 3155` | Requires authentication (3D Secure) |
| `4000 0000 0000 9995` | Declined (insufficient funds) |
| `4000 0000 0000 0002` | Declined (generic) |

More at: [stripe.com/docs/testing](https://stripe.com/docs/testing)

---

## Environment Variables

### Updating Variables

1. Edit `.env.local`
2. **Restart dev server** (environment variables only load on startup)

```bash
# Stop server
Ctrl+C

# Start again
npm run dev
```

### Common Variables to Change

**When switching databases:**
```env
DATABASE_URL="postgresql://new-connection-string"
```

**When testing OAuth:**
```env
GOOGLE_CLIENT_ID="your-new-client-id"
GOOGLE_CLIENT_SECRET="your-new-client-secret"
```

**When testing emails:**
```env
RESEND_API_KEY="your-api-key"
EMAIL_FROM="test@yourdomain.com"
```

See [ENVIRONMENT.md](../01-getting-started/ENVIRONMENT.md) for all variables.

---

## Code Quality Tools

### Linting

**Check for issues:**
```bash
npm run lint
```

**Auto-fix issues:**
```bash
npm run lint:fix
```

**Expected output:**
```
✔ No ESLint warnings or errors
```

### Type Checking

```bash
npm run type-check
```

**Expected output:**
```
No errors found.
```

**Common TypeScript errors:**

```typescript
// ❌ Error: Property 'name' does not exist
user.name

// ✅ Fixed: Check for undefined
user?.name
```

### Code Formatting

**Format all files:**
```bash
npm run format
```

**Auto-format on save** (VS Code):

1. Install Prettier extension
2. Add to `.vscode/settings.json`:
   ```json
   {
     "editor.formatOnSave": true
   }
   ```

---

## Debugging

### Browser DevTools

**Open DevTools:** `F12` or `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)

**Useful tabs:**
- **Console** - JavaScript errors
- **Network** - API requests
- **Application** - Cookies, localStorage

### Server Logs

Dev server logs appear in your terminal:

```
POST /api/auth/signin 200 in 234ms
GET /api/user 200 in 45ms
```

### Debug API Routes

Add console logs:

```typescript
// src/app/api/user/route.ts
export async function GET(req: Request) {
  console.log('GET /api/user called')

  const user = await getUser()
  console.log('User:', user)

  return Response.json(user)
}
```

**View logs** in terminal running `npm run dev`.

### Debug React Components

Use React DevTools:

1. Install [React DevTools extension](https://react.dev/learn/react-developer-tools)
2. Open browser DevTools
3. Click "Components" tab
4. Inspect component state and props

---

## Common Development Tasks

### Adding a New Page

1. Create file in `src/app/`:
   ```typescript
   // src/app/about/page.tsx
   export default function AboutPage() {
     return <div>About Page</div>
   }
   ```

2. Access at: [http://localhost:3000/about](http://localhost:3000/about)

### Creating API Route

1. Create file in `src/app/api/`:
   ```typescript
   // src/app/api/hello/route.ts
   export async function GET() {
     return Response.json({ message: 'Hello!' })
   }
   ```

2. Test: [http://localhost:3000/api/hello](http://localhost:3000/api/hello)

### Adding UI Component

1. Create in `src/components/`:
   ```typescript
   // src/components/MyComponent.tsx
   export function MyComponent() {
     return <div>My Component</div>
   }
   ```

2. Import and use:
   ```typescript
   import { MyComponent } from '@/components/MyComponent'

   export default function Page() {
     return <MyComponent />
   }
   ```

### Database Query

```typescript
// src/app/api/users/route.ts
import { prisma } from '@/lib/prisma'

export async function GET() {
  const users = await prisma.user.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' }
  })

  return Response.json(users)
}
```

---

## Multiple Terminals Setup

For best experience, use 3 terminals:

**Terminal 1: Dev Server**
```bash
npm run dev
```

**Terminal 2: Database Studio**
```bash
npm run db:studio
```

**Terminal 3: Stripe Webhooks**
```bash
npm run stripe:listen
```

**Tips:**
- Use terminal tabs or split panes
- Name each tab for clarity
- Use VS Code integrated terminal

---

## File Watching Issues

### Changes Not Updating?

**Restart dev server:**
```bash
Ctrl+C
npm run dev
```

**Clear Next.js cache:**
```bash
rm -rf .next
npm run dev
```

### Too Many Files Open Error

**macOS:**
```bash
# Increase file watch limit
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

---

## Performance Tips

### Fast Refresh Not Working?

**Common causes:**
- Anonymous components → Add display names
- Class components → Use function components
- Syntax errors → Check console

**Fix:**
```typescript
// ❌ Anonymous
export default () => <div>Hello</div>

// ✅ Named
export default function Hello() {
  return <div>Hello</div>
}
```

### Slow Development Server?

**Solutions:**

1. **Reduce file watchers:**
   - Close unused files
   - Exclude node_modules from editor

2. **Restart occasionally:**
   ```bash
   Ctrl+C
   npm run dev
   ```

3. **Clear cache:**
   ```bash
   rm -rf .next node_modules/.cache
   npm run dev
   ```

---

## Troubleshooting

### Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Module Not Found

**Error:**
```
Module not found: Can't resolve 'something'
```

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors After Git Pull

**Solution:**
```bash
# Regenerate Prisma Client
npm run db:push

# Restart VS Code TypeScript server
# CMD+Shift+P → "TypeScript: Restart TS Server"
```

### Environment Variables Not Loading

**Checklist:**
- File named `.env.local` (not `.env`)
- No spaces around `=` in env vars
- Server restarted after changes
- Variables not commented out

---

## Keyboard Shortcuts

### VS Code

| Shortcut | Action |
|----------|--------|
| `Cmd+P` / `Ctrl+P` | Quick open file |
| `Cmd+Shift+F` / `Ctrl+Shift+F` | Search in files |
| `Cmd+B` / `Ctrl+B` | Toggle sidebar |
| `Cmd+J` / `Ctrl+J` | Toggle terminal |
| `Cmd+Shift+P` / `Ctrl+Shift+P` | Command palette |

### Browser

| Shortcut | Action |
|----------|--------|
| `Cmd+R` / `Ctrl+R` | Reload page |
| `Cmd+Shift+R` / `Ctrl+Shift+R` | Hard reload |
| `Cmd+Option+I` / `F12` | DevTools |
| `Cmd+K` / `Ctrl+L` | Clear console |

---

## Next Steps

Ready for more? Check out:

- [TESTING.md](./TESTING.md) - Write tests for your features
- [MCP-SERVERS.md](./MCP-SERVERS.md) - Set up Claude integration
- [STRIPE-SETUP.md](../03-deployment/STRIPE-SETUP.md) - Configure products

---

## Daily Workflow Checklist

Starting work:
- [ ] `git pull` - Get latest changes
- [ ] `npm install` - Update dependencies
- [ ] `npm run dev` - Start server
- [ ] `npm run db:studio` - Open database
- [ ] `npm run stripe:listen` - Start webhooks

Before committing:
- [ ] `npm run lint` - Check code quality
- [ ] `npm run type-check` - Verify types
- [ ] Test in browser
- [ ] Review changes: `git diff`

End of day:
- [ ] Commit work: `git add . && git commit`
- [ ] Push to remote: `git push`
- [ ] Stop all servers: `Ctrl+C`
