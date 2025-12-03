# Load Testing with k6

This directory contains load testing scripts using [k6](https://k6.io/), a modern load testing tool.

## Installation

```bash
# macOS
brew install k6

# Windows
choco install k6

# Linux
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

## Test Types

### Smoke Test (`smoke-test.js`)
Quick sanity check with 1 virtual user for 30 seconds.

```bash
k6 run tests/load/smoke-test.js
```

### Load Test (`k6-config.js`)
Standard load test ramping from 10 to 100 users over 8 minutes.

```bash
k6 run tests/load/k6-config.js
```

### Stress Test (`stress-test.js`)
Push the system to its limits with up to 400 concurrent users.

```bash
k6 run tests/load/stress-test.js
```

### Soak Test (`soak-test.js`)
Extended 2-hour test to detect memory leaks and performance degradation.

```bash
k6 run tests/load/soak-test.js
```

## Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `BASE_URL` | `http://localhost:3000` | Target URL |
| `API_KEY` | (empty) | API key for authenticated endpoints |

### Example

```bash
# Test against staging
k6 run -e BASE_URL=https://staging.fabrk.dev tests/load/smoke-test.js

# Test with API key
k6 run -e BASE_URL=https://api.fabrk.dev -e API_KEY=sk_test_xxx tests/load/k6-config.js
```

## Thresholds

Default performance thresholds:

| Metric | Threshold | Description |
|--------|-----------|-------------|
| `http_req_duration` | p95 < 500ms | 95% of requests under 500ms |
| `http_req_failed` | rate < 1% | Error rate under 1% |
| `health_check_duration` | p95 < 200ms | Health checks fast |

## Output

Test results are saved to `tests/load/reports/summary.json`.

## CI Integration

Load tests can be run in CI with the following workflow:

```yaml
- name: Run Smoke Test
  run: k6 run tests/load/smoke-test.js
```

For production deployments, run the full load test:

```yaml
- name: Run Load Test
  run: k6 run tests/load/k6-config.js
  env:
    BASE_URL: ${{ secrets.STAGING_URL }}
```

## Best Practices

1. **Start with smoke tests** - Verify the system works before heavy testing
2. **Test against staging** - Never run stress tests against production
3. **Monitor resources** - Watch CPU, memory, and database connections
4. **Set realistic thresholds** - Base on actual SLOs
5. **Run regularly** - Include in CI/CD pipeline for regression detection

## Related Documentation

- [SLA/SLO Definitions](../../SLA-SLO.md)
- [Capacity Planning](../../CAPACITY-PLANNING.md)
- [Incident Response](../../INCIDENT-RESPONSE.md)
