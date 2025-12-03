# Disaster Recovery Plan

This document outlines procedures for recovering from major system failures.

## Recovery Objectives

| Metric | Target | Current Capability |
|--------|--------|-------------------|
| **RTO** (Recovery Time Objective) | 4 hours | ~2-4 hours |
| **RPO** (Recovery Point Objective) | 1 hour | Depends on backup frequency |

---

## Disaster Scenarios & Recovery Procedures

### Scenario 1: Database Failure

**Impact:** Complete data unavailability, application non-functional

**Recovery Steps:**

1. **Assess Damage**
   ```
   □ Check Supabase status page
   □ Attempt database connection
   □ Identify scope (single table vs entire DB)
   ```

2. **For Supabase-hosted database:**
   ```
   □ Contact Supabase support (if their issue)
   □ Enable point-in-time recovery if available
   □ Restore from daily backup if needed
   ```

3. **Restore from Backup:**
   ```bash
   # Download latest backup from Supabase dashboard
   # Or use pg_restore if you have local backups

   # Restore to new database
   psql $NEW_DATABASE_URL < backup.sql

   # Update DATABASE_URL in deployment
   # Verify data integrity
   # Switch traffic to new database
   ```

4. **Post-Recovery:**
   ```
   □ Verify all tables restored
   □ Check row counts against last known good state
   □ Run application smoke tests
   □ Monitor for anomalies
   ```

---

### Scenario 2: Application Deployment Failure

**Impact:** New deployment causes errors or outage

**Recovery Steps:**

1. **Immediate Rollback (Vercel):**
   ```
   □ Go to Vercel Dashboard > Deployments
   □ Find last known good deployment
   □ Click "..." > "Promote to Production"
   □ Verify rollback successful
   ```

2. **If using Git-based deployment:**
   ```bash
   # Revert the problematic commit
   git revert HEAD
   git push origin main

   # Or reset to previous commit
   git reset --hard HEAD~1
   git push --force origin main  # Use with caution!
   ```

3. **Verify Recovery:**
   ```
   □ Check error rates returning to normal
   □ Verify key functionality works
   □ Monitor for 15-30 minutes
   ```

---

### Scenario 3: Third-Party Service Outage

**Impact:** Dependent service (Stripe, Resend, etc.) unavailable

**Recovery Steps:**

1. **For Payment Provider (Polar/Stripe):**
   ```
   □ Check provider status page
   □ Enable maintenance mode for checkout
   □ Queue webhook events for replay
   □ Communicate to affected customers
   ```

2. **For Email Provider (Resend):**
   ```
   □ Check Resend status page
   □ Emails will queue automatically (check EmailQueue table)
   □ Consider fallback provider if extended outage
   ```

3. **For Authentication Provider:**
   ```
   □ Check OAuth provider status
   □ Existing sessions should continue working
   □ New logins may fail - communicate to users
   ```

---

### Scenario 4: Complete Infrastructure Failure

**Impact:** All services unavailable (worst case)

**Recovery Steps:**

1. **Enable Status Page:**
   ```
   □ Update external status page (if hosted separately)
   □ Post to social media if needed
   □ Email affected customers
   ```

2. **Provision New Infrastructure:**
   ```bash
   # Create new Vercel project
   vercel link

   # Restore database to new Supabase project
   # Update all environment variables
   # Deploy application
   ```

3. **DNS Cutover:**
   ```
   □ Update DNS to point to new infrastructure
   □ Verify SSL certificates
   □ Test all endpoints
   ```

4. **Data Sync:**
   ```
   □ Restore from most recent backup
   □ Identify data loss window
   □ Communicate data loss to customers if applicable
   ```

---

## Backup Verification Procedures

### Monthly Backup Test

```bash
# 1. Download production backup
# (From Supabase Dashboard or automated backup location)

# 2. Restore to test database
psql $TEST_DATABASE_URL < production_backup.sql

# 3. Verify data integrity
SELECT COUNT(*) FROM "User";
SELECT COUNT(*) FROM "Organization";
SELECT COUNT(*) FROM "Payment";

# 4. Run smoke tests against restored data
npm run test:e2e -- --env DATABASE_URL=$TEST_DATABASE_URL

# 5. Document results and any issues found
```

### Backup Checklist

| Check | Frequency | Last Verified |
|-------|-----------|---------------|
| Database backup exists | Daily | [Date] |
| Backup can be restored | Monthly | [Date] |
| Environment variables documented | Monthly | [Date] |
| Recovery runbook up to date | Quarterly | [Date] |

---

## Communication Templates

### Status Page Update
```
[Investigating]
We are currently experiencing a major service disruption.
Our team is actively investigating and will provide updates every 30 minutes.

[Identified]
We have identified the issue affecting our services and are working on recovery.
Estimated recovery time: [X hours]

[Monitoring]
Services have been restored. We are monitoring the situation.

[Resolved]
The incident has been resolved. All services are operating normally.
We will publish a post-mortem within 48 hours.
```

### Customer Email
```
Subject: Service Disruption Notification

Dear Customer,

We are currently experiencing a service disruption that may affect your
ability to [specific impact].

What's happening:
[Brief, non-technical explanation]

What we're doing:
[Recovery efforts]

What you can do:
[Any customer actions needed]

We apologize for any inconvenience and will provide updates as the
situation develops.

Best regards,
The Fabrk Team
```

---

## Recovery Verification Checklist

After any disaster recovery, verify:

```
□ Application health check passes (/api/health)
□ Users can authenticate
□ Dashboard loads correctly
□ Payments can be processed (test mode)
□ Emails can be sent (test email)
□ Database queries returning expected data
□ Background jobs processing
□ Webhooks receiving events
□ Error rates normal
□ Response times normal
```

---

## Key Contacts

| Role | Contact | Notes |
|------|---------|-------|
| On-Call Engineer | [PagerDuty] | 24/7 |
| Supabase Support | support@supabase.io | Database issues |
| Vercel Support | [Support Portal] | Deployment issues |
| Domain Registrar | [Contact] | DNS issues |
| Legal | [Contact] | Data breach notification |

---

## Related Documentation

- [Backup Procedures](./BACKUP-PROCEDURES.md)
- [Incident Response](./INCIDENT-RESPONSE.md)
- [SLA/SLO Definitions](./SLA-SLO.md)
- [Secret Rotation](./SECRET-ROTATION.md)
