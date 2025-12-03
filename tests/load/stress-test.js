/**
 * k6 Stress Test
 *
 * Push the system to its limits to find breaking points.
 * Run: k6 run tests/load/stress-test.js
 *
 * WARNING: This test generates significant load. Use with caution.
 */

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '2m', target: 100 }, // Ramp up to 100 users
    { duration: '5m', target: 100 }, // Stay at 100 users
    { duration: '2m', target: 200 }, // Ramp up to 200 users
    { duration: '5m', target: 200 }, // Stay at 200 users
    { duration: '2m', target: 300 }, // Ramp up to 300 users
    { duration: '5m', target: 300 }, // Stay at 300 users
    { duration: '2m', target: 400 }, // Ramp up to 400 users
    { duration: '5m', target: 400 }, // Stay at 400 users
    { duration: '10m', target: 0 }, // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<3000'], // 95% under 3s during stress
    http_req_failed: ['rate<0.10'], // Allow up to 10% errors during stress
    errors: ['rate<0.10'],
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export default function () {
  const responses = http.batch([
    ['GET', `${BASE_URL}/api/health`],
    ['GET', `${BASE_URL}/`],
    ['GET', `${BASE_URL}/docs`],
  ]);

  for (const res of responses) {
    const success = check(res, {
      'status is not 5xx': (r) => r.status < 500,
    });
    errorRate.add(!success);
  }

  sleep(Math.random() * 2); // Random sleep 0-2 seconds
}
