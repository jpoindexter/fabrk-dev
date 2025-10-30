# Database Hosting Guide

Comprehensive guide to hosting your PostgreSQL database in production.

---

## Quick Comparison

| Provider | Free Tier | Paid Start | Best For |
|----------|-----------|------------|----------|
| **Supabase** | 500MB | $25/mo | Full backend features |
| **Neon** | 3GB | $19/mo | Serverless, branching |
| **Vercel Postgres** | 256MB | $24/mo | Vercel deployments |
| **Railway** | $5 credit | ~$10/mo | Simplicity |
| **PlanetScale** | 5GB | $39/mo | Scalability |
| **AWS RDS** | 750hrs | ~$15/mo | Enterprise control |

---

## Recommended: Supabase

**Why Supabase?**
- Generous free tier (500MB)
- Built-in backups
- Real-time capabilities
- Easy to use
- Great documentation

### Setup (5 minutes)

1. **Create account:** [supabase.com](https://supabase.com)

2. **Create project:**
   - Click "New Project"
   - Name: `fabrk-production`
   - Database password: (generate strong password)
   - Region: Choose closest to users
   - Click "Create new project"

3. **Get connection string:**
   - Project Settings → Database
   - Scroll to "Connection string"
   - Select "URI"
   - Copy connection string:
     ```
     postgresql://postgres:[PASSWORD]@db.projectref.supabase.co:5432/postgres
     ```
   - Replace `[PASSWORD]` with your actual password

4. **Add to production environment:**

   **Vercel:**
   - Project Settings → Environment Variables
   - Add `DATABASE_URL`:
     ```
     postgresql://postgres:yourpassword@db.abcdefg.supabase.co:5432/postgres?pgbouncer=true
     ```
   - **Important:** Add `?pgbouncer=true` for connection pooling

5. **Add direct URL (for migrations):**
   ```env
   # Connection pooling (queries)
   DATABASE_URL="postgresql://postgres:pass@db.ref.supabase.co:6543/postgres?pgbouncer=true"

   # Direct connection (migrations)
   DIRECT_DATABASE_URL="postgresql://postgres:pass@db.ref.supabase.co:5432/postgres"
   ```

6. **Update Prisma schema:**
   ```prisma
   datasource db {
     provider  = "postgresql"
     url       = env("DATABASE_URL")
     directUrl = env("DIRECT_DATABASE_URL")
   }
   ```

7. **Run migrations:**
   ```bash
   npx prisma migrate deploy
   ```

### Supabase Features

**Backups:**
- Automatic daily backups
- 7-day retention (free tier)
- 30-day retention (paid)

**Monitoring:**
- Real-time database stats
- Query performance
- Connection pooling metrics

**Security:**
- SSL by default
- Row-level security (optional)
- Automatic scaling

---

## Alternative: Neon

**Why Neon?**
- Serverless (scales to zero)
- Instant database branching
- 3GB free tier
- Modern architecture

### Setup (5 minutes)

1. **Create account:** [neon.tech](https://neon.tech)

2. **Create project:**
   - Click "Create a project"
   - Name: `fabrk-production`
   - Region: Choose closest
   - Postgres version: 15
   - Click "Create Project"

3. **Get connection string:**
   - Automatically shown after creation
   - Format:
     ```
     postgresql://username:password@ep-cool-darkness-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
     ```

4. **Add to Vercel:**
   ```env
   DATABASE_URL="postgresql://username:password@ep-xxx.aws.neon.tech/neondb?sslmode=require"
   ```

5. **Run migrations:**
   ```bash
   npx prisma migrate deploy
   ```

### Neon Features

**Database Branching:**
- Create branch for each PR
- Test migrations safely
- Delete after merge

**Example workflow:**
```bash
# Create branch
neon branches create --name feature-branch

# Get connection string
neon connection-string feature-branch

# Test migration
DATABASE_URL=<branch-url> npx prisma migrate deploy

# Merge to main
git merge feature-branch

# Delete branch
neon branches delete feature-branch
```

**Autoscaling:**
- Scales compute based on load
- Scales to zero when idle
- Pay only for what you use

---

## Alternative: Railway

**Why Railway?**
- Extremely simple
- One-click PostgreSQL
- Built-in metrics
- GitHub integration

### Setup (3 minutes)

1. **Create account:** [railway.app](https://railway.app)

2. **Create project:**
   - "New Project"
   - "Provision PostgreSQL"
   - Wait 30 seconds

3. **Get connection string:**
   - Click PostgreSQL service
   - Go to "Variables" tab
   - Copy `DATABASE_URL`

4. **Add to Vercel:**
   ```env
   DATABASE_URL="postgresql://postgres:password@containers-us-west-1.railway.app:5432/railway"
   ```

5. **Run migrations:**
   ```bash
   npx prisma migrate deploy
   ```

### Railway Features

**Automatic Backups:**
- Snapshots available
- One-click restore
- Point-in-time recovery (paid)

**Monitoring:**
- Resource usage graphs
- Connection metrics
- Query logs

**Cost:**
- $5 free credit/month
- ~$5-15/month after
- Pay-as-you-go pricing

---

## Alternative: Vercel Postgres

**Why Vercel Postgres?**
- Zero-config with Vercel
- Automatic integration
- Same dashboard

### Setup (2 minutes)

1. **Create database:**
   - Vercel Dashboard → Storage
   - "Create Database" → "Postgres"
   - Choose region (same as app)
   - Name: `production-db`

2. **Connect to project:**
   - Click "Connect to Project"
   - Select your project
   - Vercel auto-adds `DATABASE_URL`

3. **Run migrations:**
   ```bash
   # Pull env vars
   vercel env pull

   # Run migration
   npx prisma migrate deploy
   ```

### Limitations

**Free tier:**
- 256MB storage (small)
- 60 hours compute
- Good for testing only

**Paid tier ($24/mo):**
- 10GB storage
- Better performance
- Still expensive for small apps

---

## Advanced: AWS RDS

**Why AWS RDS?**
- Enterprise-grade
- Full control
- Global infrastructure
- Integration with AWS services

### Setup (15 minutes)

1. **Go to AWS Console:** [console.aws.amazon.com/rds](https://console.aws.amazon.com/rds)

2. **Create database:**
   - Click "Create database"
   - Engine: PostgreSQL
   - Version: 15.x
   - Templates: Free tier (for testing) or Production
   - DB instance identifier: `fabrk-production`
   - Master username: `postgres`
   - Master password: (generate strong password)
   - DB instance class: db.t3.micro (free tier)
   - Storage: 20 GB
   - Public access: Yes (for now)
   - Create database

3. **Wait for creation:** ~5 minutes

4. **Get endpoint:**
   - Click database name
   - Copy "Endpoint"
   - Format:
     ```
     fabrk-production.abc123.us-east-1.rds.amazonaws.com
     ```

5. **Create connection string:**
   ```
   postgresql://postgres:password@endpoint:5432/postgres
   ```

6. **Configure security group:**
   - Click security group
   - Edit inbound rules
   - Add rule:
     - Type: PostgreSQL
     - Source: Anywhere (or your IP)
     - Save

7. **Add to Vercel:**
   ```env
   DATABASE_URL="postgresql://postgres:password@endpoint.rds.amazonaws.com:5432/postgres"
   ```

8. **Run migrations:**
   ```bash
   npx prisma migrate deploy
   ```

### AWS RDS Features

**Backups:**
- Automated daily backups
- 7-35 day retention
- Point-in-time recovery
- Manual snapshots

**Scaling:**
- Vertical scaling (instance size)
- Read replicas
- Multi-AZ deployment

**Monitoring:**
- CloudWatch metrics
- Performance Insights
- Enhanced monitoring

**Cost:**
- Free tier: 750 hours/month db.t3.micro
- Production: ~$15-50/month
- Pay for storage + compute

---

## Migration Between Providers

### Backup Current Database

```bash
# Using pg_dump
pg_dump -h old-host -U username -d database -F c -f backup.dump
```

### Restore to New Database

```bash
# Using pg_restore
pg_restore -h new-host -U username -d database backup.dump
```

### Using Prisma

```bash
# From old database
DATABASE_URL=old_url npx prisma db pull
npx prisma generate

# To new database
DATABASE_URL=new_url npx prisma db push
```

---

## Production Configuration

### Connection Pooling

**Why needed:**
- Serverless functions create many connections
- Databases have connection limits
- Improves performance

**Using Supabase:**
```env
# Pooled (port 6543)
DATABASE_URL="postgresql://user:pass@db.ref.supabase.co:6543/postgres?pgbouncer=true"

# Direct (port 5432)
DIRECT_DATABASE_URL="postgresql://user:pass@db.ref.supabase.co:5432/postgres"
```

**Using Neon:**
```env
# Neon has built-in pooling
DATABASE_URL="postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require"
```

**Using PgBouncer (self-hosted):**

1. Install PgBouncer
2. Configure:
   ```ini
   [databases]
   mydb = host=real-db-host port=5432 dbname=mydb

   [pgbouncer]
   listen_addr = 0.0.0.0
   listen_port = 6432
   pool_mode = transaction
   max_client_conn = 100
   default_pool_size = 20
   ```
3. Connect through PgBouncer:
   ```env
   DATABASE_URL="postgresql://user:pass@pgbouncer-host:6432/mydb"
   ```

### SSL Configuration

**Always use SSL in production:**

```env
# Most providers
DATABASE_URL="postgresql://...?sslmode=require"

# AWS RDS
DATABASE_URL="postgresql://...?sslmode=verify-full&sslrootcert=/path/to/rds-ca-bundle.pem"
```

### Read Replicas

For high-traffic apps:

**Primary (writes):**
```env
DATABASE_URL="postgresql://primary-host/db"
```

**Replica (reads):**
```env
DATABASE_REPLICA_URL="postgresql://replica-host/db"
```

**In code:**
```typescript
// Writes go to primary
await prisma.$executeRaw`INSERT INTO users ...`

// Reads can use replica
const users = await prisma.$queryRaw`SELECT * FROM users`
```

---

## Monitoring and Maintenance

### Regular Backups

**Automated backups (all providers):**
- Enabled by default
- 7-30 day retention
- Automatic restore available

**Manual backups:**
```bash
# Weekly backup script
pg_dump $DATABASE_URL -F c -f backup-$(date +%Y%m%d).dump

# Upload to S3 (optional)
aws s3 cp backup-*.dump s3://my-backups/
```

### Database Size Monitoring

```sql
-- Check database size
SELECT pg_size_pretty(pg_database_size('postgres'));

-- Check table sizes
SELECT
  relname as table_name,
  pg_size_pretty(pg_total_relation_size(relid))
FROM pg_catalog.pg_statio_user_tables
ORDER BY pg_total_relation_size(relid) DESC;
```

### Performance Monitoring

**Slow query log:**
```sql
-- Enable (Supabase/Neon)
ALTER DATABASE postgres SET log_min_duration_statement = 1000; -- 1 second

-- View slow queries
SELECT * FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 10;
```

**Index usage:**
```sql
-- Unused indexes
SELECT
  schemaname,
  tablename,
  indexname
FROM pg_stat_user_indexes
WHERE idx_scan = 0;
```

### Maintenance Tasks

**Vacuum (cleanup):**
```sql
-- Run weekly
VACUUM ANALYZE;

-- Or enable autovacuum (default on most providers)
```

**Reindex:**
```sql
-- If queries slow down
REINDEX DATABASE postgres;
```

---

## Cost Optimization

### Free Tier Strategies

**Start with free tier:**
1. Supabase (500MB) or Neon (3GB)
2. Monitor usage
3. Upgrade when needed

**Signs you need paid tier:**
- Database > 80% full
- Slow queries
- Connection errors
- Backup limitations

### Paid Tier Recommendations

**Small app (1-1000 users):**
- Supabase Pro: $25/mo (8GB)
- Neon Pro: $19/mo (3GB)
- Railway: ~$10/mo

**Medium app (1000-10,000 users):**
- Supabase Pro: $25-50/mo
- AWS RDS: $30-50/mo
- PlanetScale: $39-79/mo

**Large app (10,000+ users):**
- AWS RDS: $100-500/mo
- PlanetScale: $250+/mo
- Self-hosted cluster

### Cost Reduction Tips

1. **Clean old data:**
   ```sql
   DELETE FROM logs WHERE created_at < NOW() - INTERVAL '30 days';
   VACUUM FULL;
   ```

2. **Optimize queries:**
   - Add indexes
   - Limit result sizes
   - Cache frequently accessed data

3. **Use connection pooling:**
   - Reduces connection overhead
   - Improves performance
   - Lower resource usage

4. **Archive old records:**
   - Move to cheaper storage (S3)
   - Keep database lean
   - Faster queries

---

## Security Best Practices

### 1. Strong Passwords

```bash
# Generate secure password
openssl rand -base64 32
```

### 2. Rotate Credentials

- Every 90 days
- After team member leaves
- If exposed

### 3. IP Whitelisting

**Supabase/Neon:**
- Enable IP restrictions in dashboard
- Add Vercel IPs (if using)
- Add your office IP

**AWS RDS:**
- Configure security group
- Restrict to specific IPs
- Use VPN for admin access

### 4. Least Privilege

**Create read-only user:**
```sql
CREATE USER readonly WITH PASSWORD 'secure_password';
GRANT CONNECT ON DATABASE postgres TO readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly;
```

**Use for analytics:**
```env
ANALYTICS_DATABASE_URL="postgresql://readonly:pass@host/db"
```

### 5. Audit Logs

**Enable query logging:**
- Supabase: Built-in
- AWS RDS: Enable in parameter group
- Neon: Available in dashboard

**Monitor for:**
- Failed login attempts
- Unusual query patterns
- Data exports

---

## Disaster Recovery

### Backup Strategy

**3-2-1 Rule:**
- 3 copies of data
- 2 different storage types
- 1 offsite backup

**Implementation:**
```bash
# Automated backup script
#!/bin/bash

# Daily backup
pg_dump $DATABASE_URL -F c -f daily-backup.dump

# Upload to S3
aws s3 cp daily-backup.dump s3://backups/$(date +%Y%m%d)/

# Keep last 7 days locally
find backups/ -mtime +7 -delete
```

### Recovery Testing

**Test restores quarterly:**

1. Create test database
2. Restore from backup
3. Verify data integrity
4. Document time taken

### Failover Plan

**If database goes down:**

1. Check provider status page
2. Contact support
3. Restore from backup to new instance
4. Update `DATABASE_URL`
5. Redeploy app

**Recovery Time Objective (RTO):** < 1 hour

**Recovery Point Objective (RPO):** < 24 hours (last backup)

---

## Troubleshooting

### Connection Errors

**"Connection refused"**
- Check database is running
- Verify host/port correct
- Check firewall/security group

**"Too many connections"**
- Enable connection pooling
- Increase connection limit
- Check for connection leaks

**"SSL required"**
- Add `?sslmode=require` to URL
- Check SSL certificate valid

### Performance Issues

**Slow queries:**
- Add indexes
- Optimize queries
- Enable query logging

**Out of storage:**
- Delete old data
- Vacuum database
- Upgrade tier

### Migration Failures

**"Table already exists"**
```bash
# Reset migration history
npx prisma migrate resolve --rolled-back "migration-name"
npx prisma migrate deploy
```

**"Migration failed"**
```bash
# Manually fix in database
psql $DATABASE_URL

# Mark as applied
npx prisma migrate resolve --applied "migration-name"
```

---

## Next Steps

Database hosted! Now:

1. **Set up backups** - Automate daily backups
2. **Monitor performance** - Set up alerts
3. **Optimize queries** - Add indexes
4. **Plan scaling** - Know upgrade path

---

## Resources

- [Supabase Docs](https://supabase.com/docs)
- [Neon Docs](https://neon.tech/docs)
- [AWS RDS Guide](https://docs.aws.amazon.com/rds/)
- [Prisma Production Guide](https://www.prisma.io/docs/guides/deployment/deployment-guides)

---

## Support

**Need help?**
- Provider support (Supabase, Neon, etc.)
- [GitHub Discussions](https://github.com/prisma/prisma/discussions)
- Open issue with error details
