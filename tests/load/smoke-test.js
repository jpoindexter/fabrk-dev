/**
 * k6 Smoke Test
 *
 * Quick sanity check that the system is working.
 * Run: k6 run tests/load/smoke-test.js
 */

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1, // 1 virtual user
  duration: '30s', // Run for 30 seconds
  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    http_req_failed: ['rate<0.01'], // Error rate must be below 1%
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export default function () {
  // Test health endpoint
  const healthRes = http.get(`${BASE_URL}/api/health`);
  check(healthRes, {
    'health check status is 200': (r) => r.status === 200,
  });

  // Test homepage
  const homeRes = http.get(`${BASE_URL}/`);
  check(homeRes, {
    'homepage status is 200': (r) => r.status === 200,
  });

  // Test docs page
  const docsRes = http.get(`${BASE_URL}/docs`);
  check(docsRes, {
    'docs status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
