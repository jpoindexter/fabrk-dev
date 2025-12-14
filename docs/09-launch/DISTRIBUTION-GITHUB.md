# GitHub Repository Distribution

This guide explains how Fabrk uses GitHub to automatically deliver the boilerplate code to customers after purchase.

## Overview

When a customer purchases the Fabrk boilerplate:
1. Stripe processes their payment
2. Webhook triggers on `checkout.session.completed`
3. GitHub access is automatically granted to your private repository
4. Customer receives email with:
   - License key
   - Magic signin link
   - Repository access details
5. Customer can immediately clone and start using the boilerplate

**Benefits:**
- ✅ Automatic delivery (no manual GitHub invitations)
- ✅ Customers get automatic updates (pull latest changes)
- ✅ Professional developer experience
- ✅ No file hosting needed (leverage GitHub infrastructure)
- ✅ Easy access revocation for refunds

## Setup Instructions

### Step 1: Create a Private GitHub Repository

Create a private GitHub repository to hold the Fabrk boilerplate code:

```bash
# This can be done via GitHub UI or CLI
# Make sure it's PRIVATE (not public)
# Example: https://github.com/your-org/fabrk-boilerplate
```

### Step 2: Generate GitHub Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Click "Generate new token (classic)"
3. Give it a name: `fabrk-distribution`
4. Select scopes:
   - ✅ `admin:repo_hook` (manage repository webhooks)
   - ✅ `repo` (full control of private repositories)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again)

**Token format:** `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Step 3: Configure Environment Variables

Add these to your `.env.local` (or production environment):

```env
# GitHub Repository Access (for customer distribution)
GITHUB_ACCESS_TOKEN=ghp_your_personal_access_token_here
GITHUB_REPO_OWNER=your-github-username-or-org
GITHUB_REPO_NAME=fabrk-boilerplate
```

**Example:**
```env
GITHUB_ACCESS_TOKEN=ghp_abc123def456ghi789jkl012mno345pqr
GITHUB_REPO_OWNER=acme-corp
GITHUB_REPO_NAME=fabrk-boilerplate-private
```

### Step 4: Verify the Environment Variables

```bash
# Run the app - it will validate the GitHub configuration
npm run dev

# If configuration is wrong, you'll see:
# ❌ Invalid server environment variables: GITHUB_ACCESS_TOKEN...
```

The app validates that:
- `GITHUB_ACCESS_TOKEN` starts with `ghp_` (valid GitHub token)
- `GITHUB_REPO_OWNER` is a non-empty string
- `GITHUB_REPO_NAME` is a non-empty string

### Step 5: Test the Integration

#### Test 1: Verify GitHub API Connection

```bash
# Test that the GitHub integration works
npm run stripe:listen    # Terminal 1: Forward Stripe webhooks

npm run dev              # Terminal 2: Start app

# Terminal 3: Trigger a test checkout event
stripe trigger checkout.session.completed \
  --override metadata.userId=test123 \
  --override customer_email=test@example.com
```

Check the logs for:
```
✅ Attempting to grant GitHub repository access
✅ GitHub repository access granted successfully
```

#### Test 2: Check Repository Collaborators

```bash
# Verify the customer was added as a collaborator
curl -H "Authorization: token YOUR_GITHUB_TOKEN" \
  https://api.github.com/repos/YOUR_ORG/fabrk-boilerplate/collaborators
```

## How It Works

### 1. Customer Checkout Flow

When a customer creates a checkout session:

1. **Stripe Checkout** includes a custom field asking for GitHub username
2. **Customer provides** their GitHub username during checkout
3. **Payment processes** successfully
4. **Webhook fires** `checkout.session.completed` event

### 2. Automatic GitHub Access Grant

The webhook handler (`src/app/api/stripe/webhook/handlers/checkout.ts`):

```typescript
// 1. Extract GitHub username from checkout session
const githubUsername = session.custom_fields.values.github_username;

// 2. Call GitHub API
await handleGitHubAccessGrant(session);

// 3. Add them as collaborator with read-only (pull) access
await octokit.repos.addCollaborator({
  owner: GITHUB_REPO_OWNER,
  repo: GITHUB_REPO_NAME,
  username: githubUsername,
  permission: 'pull'  // read-only
});
```

### 3. Customer Email

Customer receives welcome email containing:
- ✅ License key for activation
- ✅ Magic signin link
- ✅ Repository URL: `https://github.com/your-org/fabrk-boilerplate`
- ✅ Clone instructions

### 4. Customer Clone

Customer can immediately clone:

```bash
git clone https://github.com/your-org/fabrk-boilerplate.git
cd fabrk-boilerplate
npm install --legacy-peer-deps
npm run dev
```

## API Reference

### `grantRepositoryAccess(githubUsername, permission)`

Grant a user access to the Fabrk repository.

**Parameters:**
- `githubUsername` (string) - GitHub username to grant access to
- `permission` (string, default: "pull") - Access level: "pull" (read-only), "push" (push), "admin"

**Returns:**
```typescript
{
  success: boolean;
  message: string;
  repoUrl?: string;
  error?: string;
}
```

**Example:**
```typescript
import { grantRepositoryAccess } from '@/lib/github';

const result = await grantRepositoryAccess('john-doe', 'pull');

if (result.success) {
  console.log(`Access granted! Repo: ${result.repoUrl}`);
} else {
  console.log(`Error: ${result.error}`);
}
```

### `revokeRepositoryAccess(githubUsername)`

Revoke a user's access (useful for refunds).

**Example:**
```typescript
import { revokeRepositoryAccess } from '@/lib/github';

const result = await revokeRepositoryAccess('john-doe');

if (result.success) {
  console.log('Access revoked');
}
```

### `checkRepositoryAccess(githubUsername)`

Check if a user has access.

**Example:**
```typescript
import { checkRepositoryAccess } from '@/lib/github';

const hasAccess = await checkRepositoryAccess('john-doe');
console.log(hasAccess); // true or false
```

### `listRepositoryCollaborators()`

List all collaborators on the repository (for auditing).

**Example:**
```typescript
import { listRepositoryCollaborators } from '@/lib/github';

const collaborators = await listRepositoryCollaborators();
collaborators.forEach(c => {
  console.log(`${c.username} has ${c.permission} access`);
});
```

## Stripe Custom Fields Setup

To collect GitHub username at checkout, add a custom field to your Stripe Payment Link:

### Via Stripe Dashboard:

1. Go to [Stripe Dashboard → Payment Links](https://dashboard.stripe.com/payment-links)
2. Create or edit a payment link
3. Scroll to "Custom fields"
4. Click "Add field"
5. Configure:
   - **Field type:** Text
   - **Name:** GitHub Username
   - **Label:** GitHub username
   - **Required:** Yes

### Via Stripe API:

```bash
curl https://api.stripe.com/v1/payment_links \
  -u sk_test_YOUR_KEY: \
  -d "line_items[0][price]=price_123" \
  -d "custom_fields[0][key]=github_username" \
  -d "custom_fields[0][label][type]=i18n_text" \
  -d "custom_fields[0][label][i18n_text][en]=GitHub username" \
  -d "custom_fields[0][type]=text" \
  -d "custom_fields[0][optional]=false"
```

## Troubleshooting

### Problem: "GitHub user not found"

**Cause:** Customer provided incorrect GitHub username

**Solution:**
1. Check the username is spelled correctly
2. Verify user exists at `https://github.com/username`
3. Ask customer to provide correct username and complete checkout again

### Problem: "API rate limit exceeded"

**Cause:** GitHub API rate limit reached (5,000 requests/hour for authenticated requests)

**Solution:**
- Wait 1 hour for rate limit to reset
- Or increase limits: upgrade GitHub token to use higher limits
- Consider implementing a queue system for high-volume sales

### Problem: "User already has access to the repository"

**Cause:** User was already added as a collaborator

**Solution:**
- This is handled gracefully - checkout still succeeds
- Customer can immediately access the repository

### Problem: "Webhook not processing GitHub access"

**Check:**
1. Verify `GITHUB_ACCESS_TOKEN` is set in environment
2. Verify `GITHUB_REPO_OWNER` and `GITHUB_REPO_NAME` are correct
3. Check webhook logs: `npm run stripe:listen` and `npm run dev`
4. Verify token has correct scopes: `admin:repo_hook` + `repo`

### Problem: Customer can't clone repository

**Causes:**
1. User doesn't have SSH key setup in GitHub
2. Network/firewall blocking git protocol

**Solution:**
1. Recommend HTTPS clone URL instead of SSH
2. Provide in welcome email:
   ```bash
   # HTTPS (works everywhere)
   git clone https://github.com/your-org/fabrk-boilerplate.git

   # SSH (requires GitHub SSH key setup)
   git clone git@github.com:your-org/fabrk-boilerplate.git
   ```

## Refunds and Access Revocation

When processing refunds, revoke GitHub access:

```typescript
// In your refund handler
import { revokeRepositoryAccess } from '@/lib/github';

const result = await revokeRepositoryAccess(githubUsername);

if (result.success) {
  logger.info(`Access revoked for ${githubUsername} due to refund`);
}
```

## Best Practices

### 1. Repository Setup

- ✅ Make repository **PRIVATE**
- ✅ Use descriptive name: `fabrk-boilerplate` or `fabrk-private`
- ✅ Add `.github/CODEOWNERS` file to control changes
- ✅ Add SECURITY.md for reporting vulnerabilities
- ✅ Add CHANGELOG.md to document updates

### 2. Access Control

- ✅ Grant **read-only ("pull")** access by default
- ✅ Keep admin access to maintainers only
- ✅ Regular audits: `listRepositoryCollaborators()`
- ✅ Revoke access immediately on refunds

### 3. Updates and Maintenance

- ✅ Use GitHub Discussions or Releases for announcements
- ✅ Document breaking changes in CHANGELOG.md
- ✅ Tag versions (e.g., `v1.0.0`, `v1.0.1`)
- ✅ Provide update instructions: `git pull origin main`

### 4. Security

- ✅ Never commit `.env.local` or sensitive files
- ✅ Use `.gitignore` to exclude:
  ```
  .env.local
  .env.production.local
  node_modules/
  .next/
  dist/
  .DS_Store
  ```
- ✅ Rotate GitHub token regularly
- ✅ Use GitHub branch protection rules for main branch

### 5. Communication

- ✅ Email with cloning instructions (included in welcome email)
- ✅ Link to documentation
- ✅ Provide support contact: `support@fabrek.dev`
- ✅ Include troubleshooting guide

## Migration from Manual GitHub Invitations

If you previously managed GitHub access manually:

1. **Update environment variables:**
   ```env
   GITHUB_ACCESS_TOKEN=ghp_xxx
   GITHUB_REPO_OWNER=your-org
   GITHUB_REPO_NAME=fabrk-boilerplate
   ```

2. **Existing customers:**
   - They already have access (no change needed)
   - Future customers will be auto-added

3. **Testing:**
   ```bash
   npm run stripe:listen
   npm run dev
   # Process a test checkout to verify automation works
   ```

## Hybrid Distribution (GitHub + ZIP Downloads)

For non-technical customers, you can offer both:

**GitHub:** For developers (auto-updates, version control)
**ZIP:** For non-technical users (one-time download)

Implement ZIP delivery:
1. Create separate Stripe product for ZIP delivery
2. Add handler in `src/app/api/stripe/webhook/handlers/zip-delivery.ts`
3. Generate signed AWS S3 URL on checkout
4. Send download link via email

See `/docs/DISTRIBUTION-ZIP.md` for details.

---

## Next Steps

1. ✅ Create private GitHub repository
2. ✅ Generate GitHub Personal Access Token
3. ✅ Configure `.env.local` with GitHub variables
4. ✅ Test webhook with `stripe trigger checkout.session.completed`
5. ✅ Deploy to production
6. ✅ Add Stripe custom field for GitHub username

**Estimated setup time:** 15-20 minutes
