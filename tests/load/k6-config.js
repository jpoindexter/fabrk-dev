/**
 * k6 Load Testing Configuration
 *
 * Install k6: brew install k6 (macOS) or see https://k6.io/docs/getting-started/installation/
 * Run: k6 run tests/load/k6-config.js
 */

import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');
const healthCheckDuration = new Trend('health_check_duration');
const apiResponseTime = new Trend('api_response_time');

// Test configuration
export const options = {
  // Test stages - ramp up, sustain, ramp down
  stages: [
    { duration: '30s', target: 10 }, // Ramp up to 10 users
    { duration: '1m', target: 10 }, // Stay at 10 users
    { duration: '30s', target: 50 }, // Ramp up to 50 users
    { duration: '2m', target: 50 }, // Stay at 50 users
    { duration: '30s', target: 100 }, // Ramp up to 100 users
    { duration: '2m', target: 100 }, // Stay at 100 users
    { duration: '1m', target: 0 }, // Ramp down to 0
  ],

  // Thresholds - test fails if these are not met
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
    http_req_failed: ['rate<0.01'], // Error rate should be below 1%
    errors: ['rate<0.01'], // Custom error rate
    health_check_duration: ['p(95)<200'], // Health check should be fast
  },

  // Output configuration
  summaryTrendStats: ['avg', 'min', 'med', 'max', 'p(90)', 'p(95)', 'p(99)'],
};

// Environment configuration
const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';
const API_KEY = __ENV.API_KEY || '';

// Common headers
const headers = {
  'Content-Type': 'application/json',
  ...(API_KEY && { 'X-API-Key': API_KEY }),
};

export default function () {
  // Health Check
  group('Health Check', () => {
    const start = Date.now();
    const res = http.get(`${BASE_URL}/api/health`);
    healthCheckDuration.add(Date.now() - start);

    const success = check(res, {
      'health check status is 200': (r) => r.status === 200,
      'health check returns ok': (r) => {
        try {
          const body = JSON.parse(r.body);
          return body.status === 'ok';
        } catch {
          return false;
        }
      },
    });
    errorRate.add(!success);
  });

  sleep(1);

  // Public Pages
  group('Public Pages', () => {
    const pages = ['/', '/docs', '/components', '/templates', '/features'];

    for (const page of pages) {
      const res = http.get(`${BASE_URL}${page}`);
      apiResponseTime.add(res.timings.duration);

      const success = check(res, {
        [`${page} returns 200`]: (r) => r.status === 200,
        [`${page} loads within 2s`]: (r) => r.timings.duration < 2000,
      });
      errorRate.add(!success);
    }
  });

  sleep(1);

  // API Endpoints (public)
  group('Public API', () => {
    // OpenAPI docs
    const docsRes = http.get(`${BASE_URL}/api/docs`);
    check(docsRes, {
      'OpenAPI docs returns 200': (r) => r.status === 200,
      'OpenAPI docs is valid JSON': (r) => {
        try {
          JSON.parse(r.body);
          return true;
        } catch {
          return false;
        }
      },
    });
  });

  sleep(1);
}

// Lifecycle hooks
export function setup() {
  console.log(`Starting load test against ${BASE_URL}`);

  // Verify target is reachable
  const res = http.get(`${BASE_URL}/api/health`);
  if (res.status !== 200) {
    throw new Error(`Target ${BASE_URL} is not reachable`);
  }

  return { startTime: Date.now() };
}

export function teardown(data) {
  const duration = (Date.now() - data.startTime) / 1000;
  console.log(`Load test completed in ${duration.toFixed(2)} seconds`);
}

// Handle test summary
export function handleSummary(data) {
  return {
    'tests/load/reports/summary.json': JSON.stringify(data, null, 2),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}

// Text summary helper
function textSummary(data, options) {
  const { metrics } = data;

  let summary = '\n========== LOAD TEST SUMMARY ==========\n\n';

  // HTTP metrics
  if (metrics.http_req_duration) {
    summary += 'HTTP Request Duration:\n';
    summary += `  Average: ${metrics.http_req_duration.values.avg.toFixed(2)}ms\n`;
    summary += `  P95: ${metrics.http_req_duration.values['p(95)'].toFixed(2)}ms\n`;
    summary += `  P99: ${metrics.http_req_duration.values['p(99)'].toFixed(2)}ms\n\n`;
  }

  if (metrics.http_reqs) {
    summary += `Total Requests: ${metrics.http_reqs.values.count}\n`;
    summary += `Requests/sec: ${metrics.http_reqs.values.rate.toFixed(2)}\n\n`;
  }

  if (metrics.http_req_failed) {
    summary += `Failed Requests: ${(metrics.http_req_failed.values.rate * 100).toFixed(2)}%\n\n`;
  }

  // Custom metrics
  if (metrics.health_check_duration) {
    summary += 'Health Check Duration:\n';
    summary += `  Average: ${metrics.health_check_duration.values.avg.toFixed(2)}ms\n`;
    summary += `  P95: ${metrics.health_check_duration.values['p(95)'].toFixed(2)}ms\n\n`;
  }

  summary += '========================================\n';

  return summary;
}
