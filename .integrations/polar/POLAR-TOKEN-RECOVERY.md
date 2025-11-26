# Polar.sh Token Not Showing - Quick Fix

## Issue
After creating an access token, Polar.sh only shows it ONCE for security reasons. If you closed the modal or navigated away, you need to create a new token.

## Solution: Create New Token

### Step 1: Revoke Old Token (Optional)
1. Go to https://polar.sh/settings
2. Find the token you just created under "Access Tokens"
3. Click "Revoke" to remove it (optional, but cleaner)

### Step 2: Create New Token

1. Go to https://polar.sh/settings
2. Click **"Create Organization Access Token"** button
3. Fill in the form:
   - **Name:** `Fabrk Production`
   - **Description:** `Production checkout and webhooks`

4. **Select ONLY these scopes:**
   ```
   ✅ products:read
   ✅ products:write
   ✅ checkouts:read
   ✅ checkouts:write
   ✅ customers:read
   ✅ orders:read
   ✅ files:read
   ✅ files:write
   ✅ webhooks:read
   ✅ webhooks:write
   ```

5. Click **"Create"**

6. **IMMEDIATELY COPY THE TOKEN** - It looks like:
   ```
   polar_at_1234567890abcdefghijklmnopqrstuvwxyz...
   ```

7. **Paste it into your `.env.local` RIGHT NOW:**
   ```bash
   POLAR_ACCESS_TOKEN="polar_at_paste_here"
   ```

### Step 3: Verify Token Works

Test the token immediately:

```bash
# In your terminal
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  https://api.polar.sh/v1/products
```

You should see a JSON response with your products (or empty array if none created yet).

## ⚠️ CRITICAL: Copy Token Immediately

The token is shown **ONLY ONCE** in a modal dialog after clicking "Create". If you:
- Close the modal
- Refresh the page
- Navigate away

**The token is GONE FOREVER.** You must create a new one.

## What the Token Looks Like

```
polar_at_1234567890abcdefghijklmnopqrstuvwxyz1234567890
         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
         64 characters of random alphanumeric text
```

## Best Practice

After copying the token:
1. ✅ Paste into `.env.local` immediately
2. ✅ Save a backup copy in your password manager (1Password, LastPass, etc)
3. ✅ Test it works with the curl command above
4. ✅ Never commit it to git (`.env.local` is in `.gitignore`)

## Next Steps After Token is Set

Once you have the token in `.env.local`:

1. **Create your product** in Polar.sh dashboard
2. **Get the product ID** (looks like `prod_01ABCDEFGH...`)
3. **Add to `.env.local`:**
   ```bash
   NEXT_PUBLIC_POLAR_PRODUCT_ID="prod_01ABCDEFGH..."
   ```
4. **Set up webhook** and get webhook secret
5. **Add to `.env.local`:**
   ```bash
   POLAR_WEBHOOK_SECRET="whsec_..."
   ```

---

**Pro Tip:** Keep the Polar.sh settings tab open until you've successfully pasted and tested the token.
