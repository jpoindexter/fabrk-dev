/**
 * Application Logger
 * Structured logging with proper error tracking
 * Console logs only in development, silent in production
 */

type LogLevel = "info" | "warn" | "error" | "debug";

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: any;
  error?: Error;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development";

  private formatLog(entry: LogEntry): string {
    const { timestamp, level, message, data } = entry;
    const dataStr = data ? ` ${JSON.stringify(data)}` : "";
    return `[${timestamp}] ${level.toUpperCase()}: ${message}${dataStr}`;
  }

  private log(level: LogLevel, message: string, data?: any, error?: Error) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      data,
      error,
    };

    // In development, log to console
    if (this.isDevelopment) {
      const formatted = this.formatLog(entry);
      switch (level) {
        case "error":
          console.error(formatted, error || "");
          break;
        case "warn":
          console.warn(formatted);
          break;
        case "debug":
          console.debug(formatted);
          break;
        default:
          console.log(formatted);
      }
    }

    // In production, you would send to a logging service (Sentry, Datadog, etc.)
    // For now, only log errors to console.error (Next.js removes other console.* in production)
    if (!this.isDevelopment && level === "error") {
      console.error(message, error || data || "");
    }
  }

  info(message: string, data?: any) {
    this.log("info", message, data);
  }

  warn(message: string, data?: any) {
    this.log("warn", message, data);
  }

  error(message: string, error?: Error | any) {
    // Handle both Error objects and plain objects
    if (error instanceof Error) {
      this.log("error", message, undefined, error);
    } else {
      this.log("error", message, error);
    }
  }

  debug(message: string, data?: any) {
    this.log("debug", message, data);
  }
}

export const logger = new Logger();
