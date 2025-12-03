# Incident Response Playbook

This document provides procedures for responding to production incidents.

## Quick Reference

### Incident Hotline
- **Slack**: #incidents
- **PagerDuty**: [Configure in your PagerDuty dashboard]
- **On-Call Schedule**: [Link to schedule]

### Key Dashboards
- **Monitoring**: Vercel Analytics / Your monitoring solution
- **Logs**: Vercel Logs / Your logging solution
- **Database**: Supabase Dashboard
- **Payments**: Polar/Stripe Dashboard

---

## Incident Severity Classification

| Severity | Definition | Examples |
|----------|------------|----------|
| **SEV-1** | Complete service outage | Site down, auth broken, payments failing |
| **SEV-2** | Major feature unavailable | Dashboard inaccessible, API errors >10% |
| **SEV-3** | Minor feature degraded | Slow performance, email delays |
| **SEV-4** | Cosmetic/minor issue | UI glitch, minor bugs |

---

## Incident Response Workflow

### 1. Detection & Alert (0-5 min)

```
┌─────────────────────────────────────────────────────┐
│  Alert received (PagerDuty/Slack/Monitoring)        │
│                                                     │
│  □ Acknowledge the alert                            │
│  □ Join #incidents Slack channel                    │
│  □ Start incident tracking doc                      │
│  □ Assess initial severity                          │
└─────────────────────────────────────────────────────┘
```

### 2. Initial Assessment (5-15 min)

```
□ What is the user impact?
□ When did it start?
□ What changed recently? (deployments, config changes)
□ What services are affected?
□ Is it getting worse or stable?
```

### 3. Communication (Ongoing)

**Internal Updates** (every 15-30 min):
```
[TIME] Incident Update
- Status: Investigating/Identified/Mitigating/Resolved
- Impact: [Description of user impact]
- Next Steps: [What we're doing next]
- ETA: [Estimated resolution time if known]
```

**External Status Page** (for SEV-1/SEV-2):
```
Investigating: We are investigating reports of [issue].
Identified: We have identified the issue and are working on a fix.
Monitoring: A fix has been deployed. We are monitoring the situation.
Resolved: The issue has been resolved.
```

### 4. Mitigation & Resolution

**Common Mitigation Actions:**

| Issue | Mitigation |
|-------|------------|
| High error rate | Rollback recent deployment |
| Database overload | Scale up / Kill long queries |
| Memory leak | Restart application servers |
| Third-party outage | Enable fallback / Show maintenance page |
| DDoS | Enable rate limiting / CDN protection |

### 5. Post-Incident (Within 48 hours)

- [ ] Write incident report
- [ ] Schedule post-mortem meeting
- [ ] Create action items
- [ ] Update runbooks if needed

---

## Incident Commander Checklist

### SEV-1 Response

```
□ Declare incident in #incidents
□ Page relevant engineers
□ Assign roles:
  - Incident Commander (you)
  - Technical Lead
  - Communications Lead
□ Start incident document
□ Update status page
□ Coordinate investigation
□ Approve mitigation actions
□ Coordinate customer comms
□ Declare resolution
□ Schedule post-mortem
```

### Communication Templates

**Internal Announcement:**
```
🚨 INCIDENT DECLARED - SEV-1

Impact: [Brief description]
Start Time: [Time in UTC]
Incident Commander: [Name]

Current Status: Investigating
Next Update: [Time]

Join #incidents for updates
```

**Customer Communication:**
```
Subject: [Service Name] Service Disruption

We are currently experiencing issues with [affected service].

Impact: [What users are experiencing]
Start Time: [Time]

Our team is actively investigating and we will provide updates every [30 minutes].

We apologize for any inconvenience this may cause.
```

---

## Runbooks by Service

### Authentication Issues

**Symptoms:**
- Users cannot log in
- Session errors
- OAuth callback failures

**Investigation:**
```bash
# Check auth service health
curl https://your-domain.com/api/health

# Check NextAuth configuration
# Verify AUTH_SECRET is set correctly
# Check OAuth provider status
```

**Common Fixes:**
1. Verify environment variables (AUTH_SECRET, NEXTAUTH_URL)
2. Check OAuth provider status pages
3. Clear session cache if using Redis
4. Verify database connectivity

### Database Issues

**Symptoms:**
- Slow queries
- Connection timeouts
- Data inconsistency

**Investigation:**
```bash
# Check database connections
# In Supabase: Settings > Database > Connection Pooling

# Check for long-running queries
# In Supabase: Query Performance
```

**Common Fixes:**
1. Kill long-running queries
2. Increase connection pool size
3. Add missing indexes
4. Scale database tier

### Payment Issues

**Symptoms:**
- Checkout failures
- Webhook errors
- Subscription sync issues

**Investigation:**
1. Check Polar/Stripe dashboard for webhook failures
2. Verify webhook secret is correct
3. Check for recent API changes

**Common Fixes:**
1. Resend failed webhooks
2. Update webhook secret
3. Verify payment provider status

### High Traffic / DoS

**Symptoms:**
- Slow response times
- High error rates
- Resource exhaustion

**Investigation:**
```bash
# Check traffic patterns in analytics
# Look for unusual IP patterns
# Check rate limit hits
```

**Common Fixes:**
1. Enable/increase rate limiting
2. Scale up resources
3. Enable CDN caching
4. Block abusive IPs

---

## Post-Mortem Template

```markdown
# Incident Post-Mortem: [Title]

**Date:** [Date]
**Duration:** [Start - End]
**Severity:** SEV-[1-4]
**Incident Commander:** [Name]

## Summary
[2-3 sentence summary of what happened]

## Timeline (UTC)
- HH:MM - [Event]
- HH:MM - [Event]

## Impact
- Users affected: [Number/Percentage]
- Revenue impact: [If applicable]
- SLA impact: [Minutes of downtime]

## Root Cause
[Detailed explanation of what caused the incident]

## Contributing Factors
1. [Factor 1]
2. [Factor 2]

## Resolution
[How the incident was resolved]

## Action Items
| Action | Owner | Due Date | Status |
|--------|-------|----------|--------|
| [Action 1] | [Name] | [Date] | [ ] |
| [Action 2] | [Name] | [Date] | [ ] |

## Lessons Learned
- What went well:
- What could be improved:

## Appendix
[Links to logs, dashboards, communication threads]
```

---

## Escalation Contacts

| Role | Contact | Availability |
|------|---------|--------------|
| On-Call Engineer | PagerDuty | 24/7 |
| Engineering Lead | [Contact] | Business hours |
| CTO | [Contact] | Emergency only |
| Legal (Data Breach) | [Contact] | Emergency only |

---

## Related Documentation

- [SLA/SLO Definitions](./SLA-SLO.md)
- [Disaster Recovery](./DISASTER-RECOVERY.md)
- [Secret Rotation](./SECRET-ROTATION.md)
