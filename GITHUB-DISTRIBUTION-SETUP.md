# GitHub Distribution Setup - Verification Checklist

**Status:** ✅ CONFIGURED AND READY TO TEST

---

## ✅ What You've Done

1. ✅ Generated GitHub Personal Access Token (classic)
   - Token: `ghp_your_personal_access_token_here`
   - Scopes: `repo` + `admin:repo_hook`
   - **Note:** Copy the token immediately when generated - you won't see it again. Keep it secret!

2. ✅ Added to `.env`:
   ```env
   GITHUB_ACCESS_TOKEN="your_github_token_here"
   GITHUB_REPO_OWNER="jpoindexter"
   GITHUB_REPO_NAME="fabrk-boilerplate-private"
   ```

3. ✅ TypeScript validation passes
4. ✅ Environment variables validated

---

## 📋 Next Steps

### Step 1: Create Private GitHub Repository

```bash
# Go to GitHub and create a new private repository:
# https://github.com/new

# Configure:
- Name: fabrk-boilerplate-private
- Visibility: PRIVATE (not public)
- Initialize with: README.md (recommended)
- .gitignore: Node
- License: MIT (optional)

# Click "Create repository"
```

**Verify:**
```bash
# Should be able to access:
https://github.com/jpoindexter/fabrk-boilerplate-private
```

### Step 2: Push Fabrk Code to Private Repo

```bash
# In your fabrk_plate directory:
cd /Users/jasonpoindexter/Documents/GitHub/Fabrk_plate

# Add the private repository as a remote
git remote add distribution https://github.com/jpoindexter/fabrk-boilerplate-private.git

# Push the code
git push -u distribution main

# Verify it's there:
# https://github.com/jpoindexter/fabrk-boilerplate-private
```

### Step 3: Verify GitHub Token Works

```bash
# Test that the token can access the repository
# The environment variables are already configured

npm run dev

# Check the console for:
# ✅ Environment variables validated
# (No GitHub errors means the token is valid)
```

### Step 4: Test the Webhook Flow

**Terminal 1: Forward Stripe webhooks**
```bash
npm run stripe:listen
```

You should see:
```
> Ready! Your webhook signing secret is: whsec_...
```

**Terminal 2: Start the app**
```bash
npm run dev
```

Check for:
```
✅ Environment variables validated
```

**Terminal 3: Trigger a test checkout event**
```bash
stripe trigger checkout.session.completed \
  --override customer_email=test@example.com
```

**What to look for in logs:**
```
✅ Attempting to grant GitHub repository access
✅ GitHub repository access granted successfully
```

---

## 🔍 How to Verify Everything Works

### Check 1: GitHub Token Validity

```bash
# Test the token directly (if you have curl)
curl -H "Authorization: token your_github_token_here" \
  https://api.github.com/user

# You should get your GitHub user info back (JSON)
```

### Check 2: Repository Access

```bash
# The token should have access to the repository
curl -H "Authorization: token your_github_token_here" \
  https://api.github.com/repos/jpoindexter/fabrk-boilerplate-private

# Should return repo info (not 404)
```

### Check 3: Environment Variables

```bash
# The app should validate them on startup
npm run dev

# Should NOT see:
# ❌ Invalid server environment variables: GITHUB_*

# Should see:
# ✅ Environment variables validated
```

---

## 📦 Configuration Summary

| Variable | Value | Purpose |
|----------|-------|---------|
| `GITHUB_ACCESS_TOKEN` | `your_github_token_here` | Authenticate with GitHub API |
| `GITHUB_REPO_OWNER` | `jpoindexter` | Your GitHub username/org |
| `GITHUB_REPO_NAME` | `fabrk-boilerplate-private` | Repository to grant access to |

---

## 🔒 Security Notes

✅ **Good Practices:**
- Token is in `.env` (not committed to git)
- Token has minimal required scopes (just `repo` + `admin:repo_hook`)
- Token is read-only for customers (they get `pull` permission)
- Token can be rotated anytime

⚠️ **Important:**
- Never commit `.env` to git
- Never share the token in code or documentation
- If token is ever leaked, regenerate it on GitHub Settings
- Consider setting expiration (1 year) for security

---

## 🧪 Testing Webhook Flow

When everything is set up, here's what happens:

```
1. Customer purchases Fabrk
   ↓
2. Stripe checkout collects their GitHub username
   ↓
3. Payment succeeds
   ↓
4. Webhook fires: checkout.session.completed
   ↓
5. Our webhook handler (src/app/api/stripe/webhook/route.ts) is called
   ↓
6. handleGitHubAccessGrant() is invoked
   ↓
7. GitHub API adds customer as collaborator (read-only)
   ↓
8. Welcome email sent with repo URL
   ↓
9. Customer can immediately: git clone https://github.com/jpoindexter/fabrk-boilerplate-private.git
```

---

## ❓ Troubleshooting

### "GitHub user not found"
**Solution:** Customer provided wrong GitHub username
- Ask them to verify at https://github.com/their-username

### "API rate limit exceeded"
**Solution:** Too many requests to GitHub API
- Wait 1 hour for limit reset
- Consider adding request queue for high volume

### "Webhook not processing"
**Checklist:**
- [ ] GITHUB_ACCESS_TOKEN is in `.env`
- [ ] GITHUB_REPO_OWNER is correct
- [ ] GITHUB_REPO_NAME is correct
- [ ] Repository exists and is private
- [ ] Token has `repo` + `admin:repo_hook` scopes
- [ ] Run `npm run dev` to validate env vars

### "Permission denied"
**Solution:** Token scopes might be wrong
1. Go to GitHub Settings → Personal access tokens
2. Verify token has:
   - ✅ `admin:repo_hook`
   - ✅ `repo`
3. If not, regenerate token with correct scopes

---

## 📚 Documentation

For more details, see:
- **`DISTRIBUTION-SUMMARY.md`** - Overview of the system
- **`docs/DISTRIBUTION-GITHUB.md`** - Complete technical guide
- **`src/lib/github.ts`** - GitHub API client code
- **`src/app/api/stripe/webhook/handlers/github-access.ts`** - Webhook handler

---

## ✅ Ready to Launch

Once you complete the 4 steps above:

1. ✅ Private repository created
2. ✅ Code pushed to private repo
3. ✅ Webhook tested locally
4. ✅ No errors in logs

**You are ready to:**
- Deploy to production
- Start selling Fabrk
- Customers get automatic GitHub access on purchase

---

**Commit:** `09f84fe` + `e67813e` - GitHub distribution system implemented
**Setup Time:** 20-30 minutes (mostly creating repo)
**Testing Time:** 5 minutes
**Customer Onboarding:** Automatic (0 manual work)

