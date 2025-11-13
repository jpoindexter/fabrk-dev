#!/usr/bin/env node

/**
 * Email Queue Worker
 * Processes queued emails from the EmailQueue table
 *
 * Usage:
 *   node scripts/email-worker.js
 *   npm run email:worker
 */

import { startEmailQueueWorker } from "../src/lib/jobs/queue.js";

// Load environment variables
import { config } from "dotenv";
config();

const interval = parseInt(process.env.EMAIL_WORKER_INTERVAL || "5000");

console.log(`
╔═══════════════════════════════════════════════════════════╗
║           Email Queue Worker Starting                    ║
╚═══════════════════════════════════════════════════════════╝

  Poll Interval: ${interval}ms (${interval / 1000} seconds)

  Environment:
  - RESEND_API_KEY: ${process.env.RESEND_API_KEY ? "✓ Configured" : "✗ Missing (emails will be logged only)"}
  - EMAIL_FROM: ${process.env.EMAIL_FROM || "noreply@yourdomain.com"}

  Press Ctrl+C to stop
`);

// Start the worker
const stop = startEmailQueueWorker({ interval });

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\n\n🛑 Shutting down email worker...");
  stop();

  setTimeout(() => {
    console.log("✅ Email worker stopped");
    process.exit(0);
  }, 2000);
});

process.on("SIGTERM", () => {
  console.log("\n\n🛑 Received SIGTERM, shutting down...");
  stop();

  setTimeout(() => {
    console.log("✅ Email worker stopped");
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

console.log("✅ Email worker is running...\n");
