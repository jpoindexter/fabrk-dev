# Third-Party Vendor SLA Tracking

This document tracks the SLAs and status pages for all third-party services used by Fabrk.

## Critical Services

### Vercel (Hosting & Compute)

| Metric | SLA Commitment | Our Dependency |
|--------|---------------|----------------|
| Uptime | 99.99% | Critical |
| Response Time | N/A | High |
| Support Response | 24h (Pro) | Medium |

- **Status Page**: https://www.vercel-status.com/
- **SLA Document**: https://vercel.com/legal/sla
- **Support**: support@vercel.com

**Fallback Strategy:**
- DNS failover to backup deployment
- Static export for emergency mode

---

### Supabase (Database & Auth)

| Metric | SLA Commitment | Our Dependency |
|--------|---------------|----------------|
| Database Uptime | 99.9% (Pro) | Critical |
| Auth Uptime | 99.9% | Critical |
| Backup Frequency | Daily | High |

- **Status Page**: https://status.supabase.com/
- **SLA Document**: https://supabase.com/sla
- **Support**: support@supabase.io

**Fallback Strategy:**
- Read replica for failover
- Local session cache for auth
- Point-in-time recovery for data

---

### Polar.sh (Payments)

| Metric | SLA Commitment | Our Dependency |
|--------|---------------|----------------|
| API Uptime | 99.9% | Critical |
| Webhook Delivery | 99.9% | High |
| Payout Processing | 2-3 business days | Medium |

- **Status Page**: https://polar.sh/status (if available)
- **Support**: support@polar.sh

**Fallback Strategy:**
- Queue failed webhooks for retry
- Maintenance mode for checkout
- Manual reconciliation process

---

### Stripe (Payment Processing)

| Metric | SLA Commitment | Our Dependency |
|--------|---------------|----------------|
| API Uptime | 99.99% | Critical (if used) |
| Webhook Delivery | Best effort | High |

- **Status Page**: https://status.stripe.com/
- **SLA Document**: https://stripe.com/legal/sla
- **Support**: https://support.stripe.com/

**Fallback Strategy:**
- Webhook retry logic built-in
- Idempotency keys for retries

---

### Resend (Email)

| Metric | SLA Commitment | Our Dependency |
|--------|---------------|----------------|
| API Uptime | 99.9% | Medium |
| Delivery Rate | 99%+ | Medium |

- **Status Page**: https://resend-status.com/
- **Support**: support@resend.com

**Fallback Strategy:**
- Email queue with retry logic
- Fallback SMTP provider
- In-app notifications as backup

---

### Upstash (Redis Cache)

| Metric | SLA Commitment | Our Dependency |
|--------|---------------|----------------|
| Uptime | 99.99% | Medium |
| Latency | <1ms (same region) | Medium |

- **Status Page**: https://status.upstash.com/
- **SLA Document**: https://upstash.com/legal/sla
- **Support**: support@upstash.com

**Fallback Strategy:**
- In-memory fallback cache
- Graceful degradation without cache
- Rate limiting bypass for critical ops

---

## Supporting Services

### GitHub (Source Control & CI/CD)

| Metric | SLA Commitment | Our Dependency |
|--------|---------------|----------------|
| Uptime | 99.9% | High |
| Actions Minutes | Varies by plan | Medium |

- **Status Page**: https://www.githubstatus.com/
- **Support**: https://support.github.com/

---

### Cloudflare (CDN/DNS) - If Used

| Metric | SLA Commitment | Our Dependency |
|--------|---------------|----------------|
| Uptime | 100% (Enterprise) | Medium |
| DDoS Protection | Always on | High |

- **Status Page**: https://www.cloudflarestatus.com/
- **SLA Document**: https://www.cloudflare.com/business-sla/

---

## Monitoring Setup

### Status Page Subscriptions

Subscribe to status updates for all critical services:

1. **Vercel**: https://www.vercel-status.com/ → Subscribe
2. **Supabase**: https://status.supabase.com/ → Subscribe
3. **Stripe**: https://status.stripe.com/ → Subscribe
4. **Resend**: https://resend-status.com/ → Subscribe
5. **Upstash**: https://status.upstash.com/ → Subscribe

### Automated Monitoring

```typescript
// Example: Check vendor status programmatically
const VENDOR_STATUS_URLS = {
  vercel: 'https://www.vercel-status.com/api/v2/status.json',
  supabase: 'https://status.supabase.com/api/v2/status.json',
  stripe: 'https://status.stripe.com/api/v2/status.json',
};

async function checkVendorStatus(vendor: string): Promise<boolean> {
  try {
    const response = await fetch(VENDOR_STATUS_URLS[vendor]);
    const data = await response.json();
    return data.status.indicator === 'none';
  } catch {
    return false; // Assume degraded if can't reach status page
  }
}
```

---

## Incident History Log

### Template

```markdown
## [Date] - [Vendor] Incident

**Duration:** [Start Time] - [End Time] ([Duration])
**Impact:** [Description of impact on our service]
**Vendor RCA:** [Link to vendor's post-mortem if available]

**Our Actions:**
1. [Action taken]
2. [Action taken]

**Lessons Learned:**
- [Lesson 1]
- [Lesson 2]
```

### Recent Incidents

_(Track vendor incidents that affected our service here)_

---

## SLA Compliance Tracking

### Monthly Review Template

```markdown
## Vendor SLA Review - [Month] [Year]

| Vendor | SLA Target | Actual Uptime | Incidents | Status |
|--------|------------|---------------|-----------|--------|
| Vercel | 99.99% | X.XX% | X | ✅/⚠️ |
| Supabase | 99.9% | X.XX% | X | ✅/⚠️ |
| Polar | 99.9% | X.XX% | X | ✅/⚠️ |
| Resend | 99.9% | X.XX% | X | ✅/⚠️ |
| Upstash | 99.99% | X.XX% | X | ✅/⚠️ |

### Notable Incidents
- [Incident 1]
- [Incident 2]

### Action Items
- [ ] [Action 1]
- [ ] [Action 2]
```

---

## Escalation Contacts

| Vendor | Free Tier | Pro Support | Enterprise |
|--------|-----------|-------------|------------|
| Vercel | Community | Email (24h) | Dedicated |
| Supabase | Community | Email | Slack |
| Stripe | Email | Phone | Dedicated |
| Resend | Email | Email | - |
| Upstash | Email | Email | Slack |

---

## Related Documentation

- [Incident Response](./INCIDENT-RESPONSE.md)
- [Disaster Recovery](./DISASTER-RECOVERY.md)
- [SLA/SLO Definitions](./SLA-SLO.md)
