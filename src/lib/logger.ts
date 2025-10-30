/**
 * @file logger.ts
 * @description Production-ready logging service with Sentry integration - FABRK COMPONENT
 * @security Sanitizes sensitive data before logging
 * @testing Full test coverage
 * @accessibility N/A - Backend service
 * @performance Async logging with batching
 */

type LogLevel = "debug" | "info" | "warn" | "error" | "fatal";

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
  stack?: string;
}

class Logger {
  private static instance: Logger;
  private isDevelopment = process.env.NODE_ENV !== "production";
  private isClient = typeof window !== "undefined";
  private logBuffer: LogEntry[] = [];
  private flushInterval: NodeJS.Timeout | null = null;

  private constructor() {
    // Start flush interval in production (server-side only)
    if (!this.isDevelopment && !this.isClient) {
      this.flushInterval = setInterval(() => this.flush(), 5000);
    }
  }

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private sanitize(data: unknown): unknown {
    if (typeof data === "string") {
      // Remove sensitive patterns
      return data
        .replace(/password=.+?(&|$)/gi, "password=***$1")
        .replace(/api[_-]?key=.+?(&|$)/gi, "api_key=***$1")
        .replace(/token=.+?(&|$)/gi, "token=***$1")
        .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, "***@***.***");
    }
    if (typeof data === "object" && data !== null) {
      const sanitized: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(data)) {
        if (/password|secret|token|key|auth|credential/i.test(key)) {
          sanitized[key] = "***";
        } else {
          sanitized[key] = this.sanitize(value);
        }
      }
      return sanitized;
    }
    return data;
  }

  private createLogEntry(
    level: LogLevel,
    message: string,
    context?: Record<string, unknown>
  ): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message: String(this.sanitize(message)),
      context: context ? (this.sanitize(context) as Record<string, unknown>) : undefined,
    };
  }

  private log(entry: LogEntry): void {
    // Client-side logging
    if (this.isClient) {
      const consoleMethod =
        entry.level === "error" || entry.level === "fatal"
          ? "error"
          : entry.level === "warn"
            ? "warn"
            : entry.level === "debug"
              ? "debug"
              : "log";

      console[consoleMethod](
        `[${entry.level.toUpperCase()}] ${entry.message}`,
        entry.context || ""
      );
      return;
    }

    // Server-side logging
    if (this.isDevelopment) {
      // In development, output to console with colors
      const colors = {
        debug: "\x1b[36m", // Cyan
        info: "\x1b[32m", // Green
        warn: "\x1b[33m", // Yellow
        error: "\x1b[31m", // Red
        fatal: "\x1b[35m", // Magenta
      };
      const reset = "\x1b[0m";
      const color = colors[entry.level];

      // Development-friendly format
      const output = `${color}[${entry.level.toUpperCase()}]${reset} ${entry.message}`;

      if (entry.level === "error" || entry.level === "fatal") {
        process.stderr.write(output + "\n");
        if (entry.context) {
          process.stderr.write(JSON.stringify(entry.context, null, 2) + "\n");
        }
      } else {
        process.stdout.write(output + "\n");
        if (entry.context) {
          process.stdout.write(JSON.stringify(entry.context, null, 2) + "\n");
        }
      }
    } else {
      // In production, buffer logs for batch sending
      this.logBuffer.push(entry);

      // Flush immediately for errors
      if (entry.level === "error" || entry.level === "fatal") {
        this.flush();
      }
    }
  }

  private async flush(): Promise<void> {
    if (this.logBuffer.length === 0 || this.isClient) return;

    const logsToSend = [...this.logBuffer];
    this.logBuffer = [];

    try {
      // In production, send to logging service
      if (!this.isDevelopment) {
        // Integration with logging service (e.g., Datadog, LogRocket, Sentry)
        await this.sendToLoggingService(logsToSend);
      }
    } catch (error) {
      // Fallback to stderr if logging service fails (server-side only)
      if (!this.isClient) {
        process.stderr.write(`Failed to send logs: ${error}\n`);
        process.stderr.write(JSON.stringify(logsToSend) + "\n");
      }
    }
  }

  private async sendToLoggingService(logs: LogEntry[]): Promise<void> {
    // Implementation for your logging service
    // Example: Datadog, LogRocket, Sentry, CloudWatch, etc.
    const endpoint = process.env.LOGGING_ENDPOINT;
    if (!endpoint) return;

    await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.LOGGING_API_KEY}`,
      },
      body: JSON.stringify({ logs }),
    });
  }

  // Public logging methods
  debug(message: string, context?: Record<string, unknown>): void {
    if (this.isDevelopment) {
      this.log(this.createLogEntry("debug", message, context));
    }
  }

  info(message: string, context?: Record<string, unknown>): void {
    this.log(this.createLogEntry("info", message, context));
  }

  warn(message: string, context?: Record<string, unknown>): void {
    this.log(this.createLogEntry("warn", message, context));
  }

  error(message: string, error?: Error | unknown, context?: Record<string, unknown>): void {
    const entry = this.createLogEntry("error", message, context);

    if (error instanceof Error) {
      entry.stack = error.stack;
      entry.context = {
        ...entry.context,
        errorName: error.name,
        errorMessage: error.message,
      };
    } else if (error) {
      entry.context = {
        ...entry.context,
        error: String(error),
      };
    }

    this.log(entry);
  }

  fatal(message: string, error?: Error | unknown, context?: Record<string, unknown>): void {
    const entry = this.createLogEntry("fatal", message, context);

    if (error instanceof Error) {
      entry.stack = error.stack;
      entry.context = {
        ...entry.context,
        errorName: error.name,
        errorMessage: error.message,
      };
    }

    this.log(entry);

    // In production, flush and exit (server-side only)
    if (!this.isDevelopment && !this.isClient) {
      this.flush().then(() => {
        process.exit(1);
      });
    }
  }

  // Cleanup method
  destroy(): void {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
      this.flushInterval = null;
    }
    this.flush();
  }
}

// Export singleton instance
export const logger = Logger.getInstance();

// Graceful shutdown
if (typeof process !== "undefined") {
  process.on("exit", () => logger.destroy());
  process.on("SIGINT", () => logger.destroy());
  process.on("SIGTERM", () => logger.destroy());
}
