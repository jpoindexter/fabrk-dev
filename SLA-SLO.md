# Service Level Agreements (SLA) & Objectives (SLO)

This document defines the service level agreements and objectives for the Fabrk platform.

## Overview

| Term | Definition |
|------|------------|
| **SLA** | Service Level Agreement - Contractual commitment to customers |
| **SLO** | Service Level Objective - Internal target (typically stricter than SLA) |
| **SLI** | Service Level Indicator - The metric being measured |
| **Error Budget** | Allowable downtime/errors before SLO breach |

---

## Service Tiers

### Tier 1: Critical Path Services
Services that directly impact user authentication and payments.

| Service | SLI | SLO | SLA |
|---------|-----|-----|-----|
| Authentication | Request success rate | 99.95% | 99.9% |
| Payment Processing | Transaction success rate | 99.95% | 99.9% |
| API Gateway | Request success rate | 99.9% | 99.5% |

### Tier 2: Core Platform Services
Main application functionality.

| Service | SLI | SLO | SLA |
|---------|-----|-----|-----|
| Web Application | Availability | 99.9% | 99.5% |
| Database | Query success rate | 99.95% | 99.9% |
| Background Jobs | Completion rate | 99.5% | 99% |

### Tier 3: Supporting Services
Non-critical but important services.

| Service | SLI | SLO | SLA |
|---------|-----|-----|-----|
| Email Delivery | Delivery rate | 99% | 98% |
| Webhooks | Delivery rate | 99% | 98% |
| Analytics | Data freshness | 99% | 95% |

---

## Performance Objectives

### Response Time SLOs

| Endpoint Type | P50 | P95 | P99 |
|--------------|-----|-----|-----|
| Health Check | 50ms | 100ms | 200ms |
| API Read | 100ms | 300ms | 500ms |
| API Write | 200ms | 500ms | 1000ms |
| Page Load | 500ms | 1500ms | 3000ms |
| File Upload | 1000ms | 3000ms | 5000ms |

### Throughput SLOs

| Metric | Target |
|--------|--------|
| API Requests | 1000 req/s |
| Concurrent Users | 500 |
| Background Jobs | 100 jobs/min |
| Webhook Deliveries | 50/s |

---

## Availability Targets

### Monthly Availability

| Target | Monthly Downtime | Annual Downtime |
|--------|------------------|-----------------|
| 99.99% | 4.32 minutes | 52.56 minutes |
| 99.95% | 21.6 minutes | 4.38 hours |
| 99.9% | 43.2 minutes | 8.76 hours |
| 99.5% | 3.6 hours | 43.8 hours |
| 99% | 7.2 hours | 87.6 hours |

### Planned Maintenance Windows

- **Preferred**: Tuesday-Thursday, 02:00-06:00 UTC
- **Notice Period**: 48 hours minimum
- **Maximum Duration**: 2 hours
- **Frequency**: Monthly maximum

---

## Error Budget Policy

### Calculation

```
Error Budget = 1 - SLO

Example:
- SLO = 99.9%
- Error Budget = 0.1% = 43.2 minutes/month
```

### Budget Consumption Actions

| Consumption | Action |
|-------------|--------|
| 0-50% | Normal operations |
| 50-75% | Increase monitoring, prepare incident response |
| 75-90% | Freeze non-critical deployments |
| 90-100% | Emergency: freeze all changes, focus on reliability |
| >100% | Post-mortem required, remediation plan mandatory |

---

## Incident Classification

### Severity Levels

| Level | Impact | Response Time | Resolution Target |
|-------|--------|---------------|-------------------|
| SEV-1 | Complete outage | 15 minutes | 1 hour |
| SEV-2 | Major feature unavailable | 30 minutes | 4 hours |
| SEV-3 | Minor feature degraded | 2 hours | 24 hours |
| SEV-4 | Cosmetic/minor issue | 24 hours | 1 week |

### Escalation Matrix

| Severity | Initial Response | Escalation (30 min) | Escalation (2 hr) |
|----------|------------------|---------------------|-------------------|
| SEV-1 | On-call Engineer | Engineering Lead | CTO |
| SEV-2 | On-call Engineer | Engineering Lead | - |
| SEV-3 | Engineering Team | - | - |
| SEV-4 | Ticket Queue | - | - |

---

## Monitoring & Alerting

### Key Metrics to Monitor

1. **Availability**
   - Synthetic monitoring (every 1 min)
   - Real user monitoring (RUM)
   - Health check endpoints

2. **Latency**
   - P50, P95, P99 response times
   - Database query times
   - External API latency

3. **Error Rates**
   - HTTP 5xx rate
   - Application exceptions
   - Database errors

4. **Throughput**
   - Requests per second
   - Active connections
   - Queue depth

### Alert Thresholds

| Metric | Warning | Critical |
|--------|---------|----------|
| Error Rate | > 0.5% | > 1% |
| P95 Latency | > 500ms | > 1000ms |
| Availability | < 99.9% (5 min) | < 99.5% (5 min) |
| CPU Usage | > 70% | > 85% |
| Memory Usage | > 75% | > 90% |
| Disk Usage | > 70% | > 85% |

---

## Reporting

### Weekly Report Contents
- Availability percentage
- Error budget consumption
- P95 latency trends
- Incident summary
- Top errors

### Monthly Report Contents
- SLO compliance summary
- Error budget analysis
- Trend analysis
- Capacity projections
- Improvement recommendations

---

## Review Process

| Review Type | Frequency | Participants |
|-------------|-----------|--------------|
| SLO Review | Quarterly | Engineering, Product, Ops |
| Error Budget Review | Monthly | Engineering Lead |
| Incident Review | Per SEV-1/SEV-2 | Full team |
| Capacity Review | Quarterly | Engineering, Finance |

---

## Related Documentation

- [Incident Response Playbook](./INCIDENT-RESPONSE.md)
- [Capacity Planning](./CAPACITY-PLANNING.md)
- [Disaster Recovery](./DISASTER-RECOVERY.md)
- [Load Testing](./tests/load/README.md)
