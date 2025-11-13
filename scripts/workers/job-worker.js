#!/usr/bin/env node

/**
 * Background Job Worker
 * Processes async jobs from the database queue
 *
 * Usage:
 *   node scripts/job-worker.js
 *   npm run jobs:worker
 */

import { startJobWorker } from "../src/lib/jobs/queue.js";

// Load environment variables
import { config } from "dotenv";
config();

const concurrency = parseInt(process.env.JOB_WORKER_CONCURRENCY || "5");
const interval = parseInt(process.env.JOB_WORKER_INTERVAL || "1000");

console.log(`
╔═══════════════════════════════════════════════════════════╗
║           Background Job Worker Starting                 ║
╚═══════════════════════════════════════════════════════════╝

  Concurrency: ${concurrency} workers
  Poll Interval: ${interval}ms

  Press Ctrl+C to stop
`);

// Start the worker
const stop = startJobWorker({ concurrency, interval });

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\n\n🛑 Shutting down job worker...");
  stop();

  setTimeout(() => {
    console.log("✅ Job worker stopped");
    process.exit(0);
  }, 2000);
});

process.on("SIGTERM", () => {
  console.log("\n\n🛑 Received SIGTERM, shutting down...");
  stop();

  setTimeout(() => {
    console.log("✅ Job worker stopped");
    process.exit(0);
  }, 2000);
});

// Log errors
process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  stop();
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  console.error("❌ Unhandled Rejection:", error);
  stop();
  process.exit(1);
});

console.log("✅ Job worker is running...\n");
