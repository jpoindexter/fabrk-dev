/**
 * Structured Logger
 * Pino-based logger: JSON in production, pretty in development.
 *
 * Usage:
 *   import { logger } from '@/lib/logger';
 *   logger.info('User signed in', { userId: '123' });
 *   logger.error('Payment failed', error);
 */

import pino from 'pino';

const isDev = process.env.NODE_ENV === 'development';
const LOG_LEVEL = process.env.LOG_LEVEL || (isDev ? 'debug' : 'info');

const pinoLogger = pino({
  level: LOG_LEVEL,
  ...(isDev
    ? {
        transport: {
          target: 'pino-pretty',
          options: { colorize: true, translateTime: 'HH:MM:ss', ignore: 'pid,hostname' },
        },
      }
    : {}),
  redact: {
    paths: ['password', 'token', 'secret', 'authorization', '*.password', '*.token', '*.secret'],
    censor: '[REDACTED]',
  },
});

type LogArg =
  | string
  | number
  | boolean
  | null
  | undefined
  | Error
  | Record<string, unknown>
  | unknown[];

/**
 * Wrapper that preserves the existing `logger.info(msg, ...args)` API
 * while delegating to Pino's structured logging.
 */
class Logger {
  info(message: string, ...args: LogArg[]) {
    pinoLogger.info(toMergeObject(args), message);
  }

  warn(message: string, ...args: LogArg[]) {
    pinoLogger.warn(toMergeObject(args), message);
  }

  error(message: string, error?: Error | unknown, ...args: LogArg[]) {
    if (error instanceof Error) {
      pinoLogger.error({ err: error, ...toMergeObject(args) }, message);
    } else {
      pinoLogger.error(toMergeObject([error as LogArg, ...args]), message);
    }
  }

  debug(message: string, ...args: LogArg[]) {
    pinoLogger.debug(toMergeObject(args), message);
  }

  /** Create a child logger with bound context */
  child(bindings: Record<string, unknown>) {
    const childPino = pinoLogger.child(bindings);
    const childLogger = new Logger();
    // Override the child's methods to use the child pino instance
    childLogger.info = (msg, ...a) => childPino.info(toMergeObject(a), msg);
    childLogger.warn = (msg, ...a) => childPino.warn(toMergeObject(a), msg);
    childLogger.error = (msg, err?, ...a) => {
      if (err instanceof Error) {
        childPino.error({ err, ...toMergeObject(a) }, msg);
      } else {
        childPino.error(toMergeObject([err as LogArg, ...a]), msg);
      }
    };
    childLogger.debug = (msg, ...a) => childPino.debug(toMergeObject(a), msg);
    return childLogger;
  }
}

/** Convert variadic args into a single merge object for Pino */
function toMergeObject(args: LogArg[]): Record<string, unknown> {
  if (args.length === 0) return {};

  // Single object arg → use directly
  if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && !Array.isArray(args[0]) && !(args[0] instanceof Error)) {
    return args[0] as Record<string, unknown>;
  }

  // Multiple args → store as `data` array
  const filtered = args.filter((a) => a !== undefined && a !== null);
  if (filtered.length === 0) return {};
  if (filtered.length === 1) return { data: filtered[0] };
  return { data: filtered };
}

export const logger = new Logger();
