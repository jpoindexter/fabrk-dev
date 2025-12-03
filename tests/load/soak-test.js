/**
 * k6 Soak Test
 *
 * Test system stability over an extended period.
 * Run: k6 run tests/load/soak-test.js
 *
 * This test runs for 2 hours to detect memory leaks and degradation.
 */

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

const errorRate = new Rate('errors');
const responseTime = new Trend('response_time');

export const options = {
  stages: [
    { duration: '5m', target: 50 }, // Ramp up
    { duration: '2h', target: 50 }, // Stay at 50 users for 2 hours
    { duration: '5m', target: 0 }, // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<1000'], // Performance should not degrade
    http_req_failed: ['rate<0.01'], // Very low error rate expected
    errors: ['rate<0.01'],
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export default function () {
  const start = Date.now();

  const res = http.get(`${BASE_URL}/api/health`);

  responseTime.add(Date.now() - start);

  const success = check(res, {
    'status is 200': (r) => r.status === 200,
    'response time under 500ms': (r) => r.timings.duration < 500,
  });

  errorRate.add(!success);

  // Also test a page load
  const pageRes = http.get(`${BASE_URL}/docs`);
  check(pageRes, {
    'page loads successfully': (r) => r.status === 200,
  });

  sleep(2); // 2 second pause between iterations
}
