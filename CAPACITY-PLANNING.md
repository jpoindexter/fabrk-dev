# Capacity Planning Guide

This document provides guidelines for planning and scaling the Fabrk infrastructure.

## Current Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CDN (Vercel)                             │
│  - Static assets cached at edge                                  │
│  - Automatic SSL termination                                     │
└───────────────────────────┬─────────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────────┐
│                    Application (Next.js)                         │
│  - Serverless functions (Vercel)                                │
│  - Edge runtime for middleware                                  │
│  - Auto-scaling based on traffic                                │
└───────────────────────────┬─────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
┌───────▼───────┐   ┌───────▼───────┐   ┌───────▼───────┐
│   Database    │   │    Cache      │   │   Storage     │
│   (Supabase)  │   │   (Upstash)   │   │   (S3/R2)     │
│   PostgreSQL  │   │    Redis      │   │               │
└───────────────┘   └───────────────┘   └───────────────┘
```

---

## Resource Sizing Guidelines

### Database (Supabase/PostgreSQL)

| User Count | Recommended Tier | Connections | Storage |
|------------|------------------|-------------|---------|
| 0-1,000 | Free | 50 | 500 MB |
| 1,000-10,000 | Pro | 100 | 8 GB |
| 10,000-50,000 | Pro (scaled) | 200 | 50 GB |
| 50,000+ | Enterprise | 500+ | 100+ GB |

**Scaling Triggers:**
- Connection pool utilization > 70%
- Query latency P95 > 100ms
- Storage utilization > 80%

### Cache (Upstash Redis)

| Request Volume | Recommended Tier | Max Commands/Day |
|----------------|------------------|------------------|
| Development | Free | 10,000 |
| Small | Pay-as-you-go | 100,000 |
| Medium | Pro | 1,000,000 |
| Large | Enterprise | Unlimited |

**Scaling Triggers:**
- Cache hit rate < 90%
- Memory utilization > 80%
- Command latency > 10ms

### Application (Vercel)

| Traffic | Recommended Plan | Concurrent Executions |
|---------|------------------|----------------------|
| Low | Hobby | 10 |
| Medium | Pro | 100 |
| High | Enterprise | 1000+ |

**Scaling Notes:**
- Serverless functions auto-scale automatically
- Edge functions have separate limits
- Consider Enterprise for high-traffic applications

---

## Load Projections

### Estimating User Growth

```
Monthly Active Users (MAU) Projection:
- Month 1: 100 users (launch)
- Month 3: 500 users (early growth)
- Month 6: 2,000 users (product-market fit)
- Month 12: 10,000 users (scaling)
- Month 24: 50,000 users (mature)
```

### Request Volume Estimation

```
Average requests per user per session: 50
Average sessions per user per month: 10
Requests per user per month: 500

At 10,000 MAU:
- Monthly requests: 5,000,000
- Daily requests: ~167,000
- Peak hourly (3x avg): ~21,000
- Peak per minute: ~350
```

---

## Scaling Checklist

### Before Scaling

```
□ Review current metrics (CPU, memory, connections)
□ Identify bottleneck (database, cache, compute)
□ Check cost implications
□ Plan rollback strategy
□ Schedule during low-traffic window
```

### Database Scaling

```bash
# Check current connections
SELECT count(*) FROM pg_stat_activity;

# Check slow queries
SELECT * FROM pg_stat_statements
ORDER BY total_time DESC
LIMIT 10;

# Check table sizes
SELECT
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename))
FROM pg_tables
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### Optimization Before Scaling

1. **Add indexes for slow queries**
   ```sql
   CREATE INDEX CONCURRENTLY idx_user_email ON "User"(email);
   ```

2. **Implement query caching**
   ```typescript
   // Use Redis for expensive queries
   const cached = await redis.get(`user:${id}`);
   if (cached) return JSON.parse(cached);
   ```

3. **Optimize N+1 queries**
   ```typescript
   // Bad: N+1 queries
   const users = await prisma.user.findMany();
   for (const user of users) {
     await prisma.organization.findMany({ where: { userId: user.id }});
   }

   // Good: Single query with include
   const users = await prisma.user.findMany({
     include: { organizations: true }
   });
   ```

---

## Cost Projections

### Monthly Cost by Scale

| Scale | Database | Cache | Compute | Email | Total |
|-------|----------|-------|---------|-------|-------|
| Free tier | $0 | $0 | $0 | $0 | $0 |
| 1K users | $25 | $10 | $20 | $10 | ~$65 |
| 10K users | $100 | $30 | $50 | $50 | ~$230 |
| 50K users | $300 | $100 | $200 | $200 | ~$800 |
| 100K users | $500 | $200 | $500 | $400 | ~$1,600 |

**Notes:**
- Costs are estimates and vary by usage patterns
- Storage and bandwidth costs not included
- Enterprise pricing negotiable at scale

### Cost Optimization Tips

1. **Database**
   - Use connection pooling (PgBouncer)
   - Archive old data to cold storage
   - Use read replicas for analytics

2. **Compute**
   - Implement aggressive caching
   - Use Edge functions where possible
   - Optimize cold start times

3. **Storage**
   - Use CDN for static assets
   - Compress images on upload
   - Implement lifecycle policies

---

## Monitoring for Capacity

### Key Metrics to Watch

| Metric | Warning | Critical | Action |
|--------|---------|----------|--------|
| DB CPU | > 60% | > 80% | Scale up or optimize |
| DB Connections | > 70% | > 90% | Increase pool or scale |
| API Latency P95 | > 500ms | > 1000ms | Investigate and optimize |
| Error Rate | > 0.5% | > 1% | Investigate errors |
| Cache Hit Rate | < 90% | < 80% | Optimize cache strategy |

### Alerts to Configure

```yaml
# Example alert configuration (for monitoring tool)
alerts:
  - name: High Database CPU
    metric: database.cpu_percent
    condition: "> 70"
    duration: 5m
    severity: warning

  - name: Connection Pool Exhaustion
    metric: database.connections_used_percent
    condition: "> 85"
    duration: 2m
    severity: critical
```

---

## Quarterly Review Template

```markdown
## Capacity Review - Q[X] [Year]

### Current State
- MAU: [Number]
- Daily Requests: [Number]
- Database Size: [Size]
- Error Rate: [Percentage]

### Growth Since Last Quarter
- MAU Change: +[X]%
- Traffic Change: +[X]%
- Cost Change: +[X]%

### Bottlenecks Identified
1. [Issue 1]
2. [Issue 2]

### Recommendations
1. [Recommendation 1]
2. [Recommendation 2]

### Budget Impact
- Current Monthly: $[X]
- Projected Next Quarter: $[X]
- Approved Budget: $[X]
```

---

## Related Documentation

- [SLA/SLO Definitions](./SLA-SLO.md)
- [Load Testing](./tests/load/README.md)
- [Disaster Recovery](./DISASTER-RECOVERY.md)
- [Incident Response](./INCIDENT-RESPONSE.md)
