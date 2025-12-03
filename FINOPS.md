# FinOps & Cost Monitoring Guide

This document provides guidelines for monitoring and optimizing cloud costs.

## Cost Centers

### Infrastructure Costs

| Service | Provider | Typical Cost | Scaling Factor |
|---------|----------|--------------|----------------|
| Compute | Vercel | $20-500/mo | Requests, bandwidth |
| Database | Supabase | $0-300/mo | Storage, connections |
| Cache | Upstash | $0-100/mo | Commands, storage |
| Email | Resend | $0-100/mo | Emails sent |
| Payments | Polar/Stripe | 2.9% + $0.30 | Transaction volume |
| Storage | S3/R2 | $0-50/mo | Storage, bandwidth |
| Monitoring | Various | $0-100/mo | Data points |

### Cost Breakdown by Scale

| Users | Compute | Database | Cache | Email | Storage | Total |
|-------|---------|----------|-------|-------|---------|-------|
| 100 | $0 | $0 | $0 | $0 | $0 | ~$0 |
| 1,000 | $20 | $25 | $10 | $10 | $5 | ~$70 |
| 10,000 | $100 | $100 | $30 | $50 | $20 | ~$300 |
| 50,000 | $300 | $300 | $100 | $200 | $50 | ~$950 |
| 100,000 | $500 | $500 | $200 | $400 | $100 | ~$1,700 |

---

## Cost Monitoring Setup

### Vercel Cost Monitoring

1. **Dashboard**: Settings → Usage
2. **Alerts**: Configure spend alerts
3. **Key Metrics**:
   - Function invocations
   - Bandwidth usage
   - Build minutes
   - Edge requests

### Supabase Cost Monitoring

1. **Dashboard**: Settings → Billing
2. **Key Metrics**:
   - Database size
   - Egress bandwidth
   - Auth MAUs
   - Storage usage

### Upstash Cost Monitoring

1. **Dashboard**: Console → Database → Usage
2. **Key Metrics**:
   - Daily commands
   - Storage used
   - Bandwidth

---

## Cost Optimization Strategies

### 1. Compute Optimization

**Quick Wins:**
```typescript
// Use Edge Runtime for simple endpoints (cheaper)
export const runtime = 'edge';

// Implement response caching
export const revalidate = 3600; // Cache for 1 hour
```

**Advanced:**
- Use ISR (Incremental Static Regeneration) for semi-static pages
- Implement client-side data fetching for user-specific data
- Use Suspense boundaries to reduce blocking

### 2. Database Optimization

**Quick Wins:**
```sql
-- Add indexes for frequently queried columns
CREATE INDEX CONCURRENTLY idx_user_email ON "User"(email);
CREATE INDEX CONCURRENTLY idx_org_slug ON "Organization"(slug);

-- Use connection pooling
-- Configure in Supabase: Settings → Database → Connection Pooling
```

**Advanced:**
- Archive old data to cold storage
- Implement read replicas for analytics queries
- Use materialized views for complex aggregations

### 3. Cache Optimization

**Quick Wins:**
```typescript
// Cache expensive queries
const cacheKey = `user:${userId}:orgs`;
const cached = await redis.get(cacheKey);
if (cached) return JSON.parse(cached);

const data = await prisma.organization.findMany({...});
await redis.set(cacheKey, JSON.stringify(data), { ex: 3600 });
return data;
```

**Advanced:**
- Implement cache warming for hot data
- Use cache invalidation patterns (write-through, write-behind)
- Set appropriate TTLs based on data freshness needs

### 4. Email Optimization

**Quick Wins:**
- Batch transactional emails when possible
- Use email queuing to smooth out spikes
- Implement unsubscribe to reduce sends

**Advanced:**
- Segment users for targeted campaigns
- A/B test to improve engagement (fewer re-sends)
- Clean email lists regularly

### 5. Storage Optimization

**Quick Wins:**
```typescript
// Compress images on upload
import sharp from 'sharp';

const optimized = await sharp(buffer)
  .resize(1920, 1080, { fit: 'inside' })
  .webp({ quality: 80 })
  .toBuffer();
```

**Advanced:**
- Implement lifecycle policies (auto-delete old files)
- Use appropriate storage classes (hot vs cold)
- CDN caching for frequently accessed files

---

## Budget Alerts

### Recommended Alert Thresholds

| Service | Warning (% of budget) | Critical (% of budget) |
|---------|----------------------|------------------------|
| Vercel | 70% | 90% |
| Supabase | 70% | 85% |
| Upstash | 80% | 95% |
| Overall | 75% | 90% |

### Setting Up Alerts

**Vercel:**
1. Settings → Billing → Spend Management
2. Set monthly budget
3. Configure email alerts

**Supabase:**
1. Settings → Billing
2. Enable usage alerts
3. Set threshold percentages

**Custom Monitoring:**
```typescript
// Track costs in your application
interface CostMetric {
  service: string;
  cost: number;
  period: 'daily' | 'monthly';
  timestamp: Date;
}

// Log to your analytics system
await trackCost({
  service: 'api_calls',
  cost: calculateApiCost(requestCount),
  period: 'daily',
  timestamp: new Date(),
});
```

---

## Monthly Cost Review Template

```markdown
## Cost Review - [Month] [Year]

### Summary
| Category | Budget | Actual | Variance |
|----------|--------|--------|----------|
| Compute | $X | $X | +/-X% |
| Database | $X | $X | +/-X% |
| Cache | $X | $X | +/-X% |
| Email | $X | $X | +/-X% |
| Storage | $X | $X | +/-X% |
| **Total** | **$X** | **$X** | **+/-X%** |

### Key Metrics
- MAU: [Number]
- API Requests: [Number]
- Database Queries: [Number]
- Emails Sent: [Number]

### Cost per User
- Current: $X/user/month
- Previous: $X/user/month
- Target: $X/user/month

### Action Items
1. [ ] [Action to reduce costs]
2. [ ] [Action to optimize usage]

### Recommendations
- [Recommendation 1]
- [Recommendation 2]
```

---

## Cost Forecasting

### Simple Projection Model

```
Monthly Cost = (Fixed Costs) + (Variable Costs × Scale Factor)

Where:
- Fixed Costs = Base tier fees (~$50)
- Variable Costs = Per-unit costs
- Scale Factor = MAU / 1000

Example at 10,000 MAU:
Monthly Cost = $50 + ($25 × 10) = $300
```

### Growth Planning

| Growth Rate | 3 Month | 6 Month | 12 Month |
|-------------|---------|---------|----------|
| 10%/month | 1.33x | 1.77x | 3.14x |
| 20%/month | 1.73x | 2.99x | 8.92x |
| 50%/month | 3.38x | 11.39x | 129.75x |

---

## Vendor Cost Comparison

### Database Options

| Provider | Free Tier | Starter | Pro |
|----------|-----------|---------|-----|
| Supabase | 500MB, 50K MAU | $25/mo | $100/mo |
| PlanetScale | 5GB, 1B reads | $29/mo | $99/mo |
| Neon | 512MB | $19/mo | $69/mo |

### Cache Options

| Provider | Free Tier | Paid |
|----------|-----------|------|
| Upstash | 10K cmd/day | Pay-as-you-go |
| Redis Cloud | 30MB | $5/mo+ |
| Momento | 50GB transfer | Pay-as-you-go |

### Compute Options

| Provider | Free Tier | Pro |
|----------|-----------|-----|
| Vercel | 100GB BW | $20/mo |
| Netlify | 100GB BW | $19/mo |
| Railway | $5 credit | Pay-as-you-go |

---

## Related Documentation

- [Capacity Planning](./CAPACITY-PLANNING.md)
- [SLA/SLO Definitions](./SLA-SLO.md)
- [Architecture Overview](./ARCHITECTURE.md)
