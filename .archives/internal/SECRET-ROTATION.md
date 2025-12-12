# Secret Rotation Guide

This document outlines best practices for rotating secrets in the Fabrk boilerplate.

## Overview

Regular secret rotation is a critical security practice that limits the impact of compromised credentials. This guide covers rotation procedures for all secrets used in the application.

## Rotation Schedule

| Secret Type | Rotation Frequency | Priority |
|-------------|-------------------|----------|
| `AUTH_SECRET` | Every 90 days | Critical |
| `DATABASE_URL` password | Every 90 days | Critical |
| `POLAR_ACCESS_TOKEN` | Every 180 days | High |
| `POLAR_WEBHOOK_SECRET` | On compromise only | High |
| `RESEND_API_KEY` | Every 180 days | Medium |
| `UPSTASH_REDIS_*` | Every 180 days | Medium |
| API Keys (user-facing) | User-controlled | Medium |

## Rotation Procedures

### 1. AUTH_SECRET (NextAuth)

The `AUTH_SECRET` is used for signing JWT tokens and cookies.

**Steps:**
1. Generate a new secret:
   ```bash
   openssl rand -base64 32
   ```

2. Update in your deployment platform (Vercel/Railway/etc.):
   - Add the new secret as `AUTH_SECRET_NEW`
   - Keep the old `AUTH_SECRET` temporarily

3. Deploy the update

4. After 30 days (JWT expiry period), remove `AUTH_SECRET_NEW` and rename:
   - Set `AUTH_SECRET` to the new value
   - Remove the old secret

**Impact:** Users with active sessions will be logged out when old secret is removed.

### 2. DATABASE_URL Password

**Steps:**
1. In your database provider (Supabase/Neon/etc.):
   - Create a new database user with same permissions
   - Or update the existing user's password

2. Update `DATABASE_URL` in your deployment platform

3. Deploy the update

4. Verify database connectivity

5. Remove old user/password if applicable

**Impact:** Brief downtime during deployment. Use blue-green deployment to minimize.

### 3. POLAR_ACCESS_TOKEN

**Steps:**
1. Go to [Polar Dashboard](https://polar.sh) → Settings → API Keys

2. Create a new API key with same permissions

3. Update `POLAR_ACCESS_TOKEN` in deployment platform

4. Deploy and verify payment flows work

5. Revoke the old API key in Polar dashboard

**Impact:** None if done correctly. Test payment flow after rotation.

### 4. POLAR_WEBHOOK_SECRET

**Steps:**
1. In Polar Dashboard → Webhooks → Your webhook

2. Regenerate the webhook secret

3. Update `POLAR_WEBHOOK_SECRET` in deployment platform

4. Deploy immediately (webhook will fail until deployed)

**Impact:** Webhooks may fail during the brief deployment window.

### 5. RESEND_API_KEY

**Steps:**
1. Go to [Resend Dashboard](https://resend.com) → API Keys

2. Create a new API key

3. Update `RESEND_API_KEY` in deployment platform

4. Deploy and test email sending

5. Delete the old API key

**Impact:** None if done correctly. Test email sending after rotation.

### 6. UPSTASH_REDIS Credentials

**Steps:**
1. Go to [Upstash Console](https://console.upstash.com) → Your database

2. Regenerate the REST token (or create new database)

3. Update both:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

4. Deploy and verify rate limiting works

**Impact:** Rate limit counters will reset.

## Emergency Rotation

If a secret is compromised:

1. **Immediate:** Rotate the compromised secret following procedures above

2. **Audit:** Check logs for unauthorized access:
   ```bash
   # Check for unusual API activity
   grep -i "unauthorized\|failed\|error" logs/
   ```

3. **Notify:** If user data may be affected, follow incident response procedure

4. **Review:** Check for other potentially compromised secrets

## Automation

### GitHub Actions Secret Rotation Reminder

Add to `.github/workflows/maintenance.yml`:

```yaml
- name: Check secret age
  run: |
    echo "Reminder: Review and rotate secrets if older than 90 days"
    echo "Last rotation check: $(date)"
```

### Pre-deployment Checklist

Before each deployment, verify:
- [ ] No secrets in code or git history
- [ ] All secrets are set in deployment platform
- [ ] Secrets follow rotation schedule

## Secret Storage Best Practices

1. **Never commit secrets** to git, even in `.env.local`

2. **Use deployment platform secrets** (Vercel Environment Variables, etc.)

3. **Separate environments** - Different secrets for dev/staging/prod

4. **Audit access** - Regularly review who has access to secrets

5. **Use secret scanning** - Enable GitHub secret scanning

## Monitoring

Set up alerts for:
- Failed authentication attempts
- Unusual API usage patterns
- Database connection failures
- Payment processing errors

## Related Documentation

- [Environment Variables Guide](/docs/ENV-VALIDATION.md)
- [Security Best Practices](/docs/SECURITY.md)
- [Incident Response](/docs/INCIDENT-RESPONSE.md)
