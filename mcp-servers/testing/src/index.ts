#!/usr/bin/env node

/**
 * Fabrk Testing MCP Server
 * Provides efficient Playwright test execution and reporting
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { exec } from "child_process";
import * as fs from "fs/promises";
import * as path from "path";
import { promisify } from "util";

const execAsync = promisify(exec);

interface TestResult {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  duration: number;
  failures: Array<{
    test: string;
    file: string;
    error: string;
  }>;
}

interface TestSummary {
  totalTests: number;
  passRate: number;
  failuresByCategory: Record<string, number>;
  slowestTests: Array<{
    name: string;
    duration: number;
  }>;
}

class TestingServer {
  private server: Server;
  private workingDir: string;

  constructor() {
    this.server = new Server(
      {
        name: "fabrk-testing-server",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.workingDir = process.cwd();
    this.setupHandlers();
  }

  private setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: "run_tests",
          description:
            "Run Playwright E2E tests with structured output. Returns parsed results with pass/fail counts, failures, and duration.",
          inputSchema: {
            type: "object",
            properties: {
              pattern: {
                type: "string",
                description: "Test file pattern (e.g., 'tests/e2e/**/*.spec.ts' or specific file)",
              },
              project: {
                type: "string",
                description: "Browser project (chromium, firefox, webkit)",
                default: "chromium",
              },
              grep: {
                type: "string",
                description: "Filter tests by name pattern",
              },
              maxFailures: {
                type: "number",
                description: "Stop after N failures",
              },
            },
          },
        },
        {
          name: "get_test_summary",
          description:
            "Get comprehensive test summary including pass rates, failure categories, and performance metrics. Faster than running full suite.",
          inputSchema: {
            type: "object",
            properties: {
              cacheFile: {
                type: "string",
                description: "Path to cached test results JSON file",
                default: "./test-results.json",
              },
            },
          },
        },
        {
          name: "analyze_failures",
          description:
            "Analyze test failures and group by error patterns. Helps identify common issues quickly.",
          inputSchema: {
            type: "object",
            properties: {
              resultsFile: {
                type: "string",
                description: "Path to test results file",
                default: "./test-results.json",
              },
            },
          },
        },
        {
          name: "get_slow_tests",
          description:
            "Identify slowest tests for optimization. Returns top N slowest tests with durations.",
          inputSchema: {
            type: "object",
            properties: {
              limit: {
                type: "number",
                description: "Number of slow tests to return",
                default: 10,
              },
            },
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      try {
        switch (request.params.name) {
          case "run_tests":
            return await this.runTests(request.params.arguments);
          case "get_test_summary":
            return await this.getTestSummary(request.params.arguments);
          case "analyze_failures":
            return await this.analyzeFailures(request.params.arguments);
          case "get_slow_tests":
            return await this.getSlowTests(request.params.arguments);
          default:
            throw new Error(`Unknown tool: ${request.params.name}`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: "text",
              text: `Error: ${errorMessage}`,
            },
          ],
        };
      }
    });
  }

  private async runTests(args: any) {
    const pattern = args?.pattern || "tests/e2e";
    const project = args?.project || "chromium";
    const grep = args?.grep;
    const maxFailures = args?.maxFailures;

    let command = `pnpm exec playwright test ${pattern} --project=${project} --reporter=json`;

    if (grep) {
      command += ` --grep="${grep}"`;
    }

    if (maxFailures) {
      command += ` --max-failures=${maxFailures}`;
    }

    try {
      const { stdout, stderr } = await execAsync(command, {
        cwd: this.workingDir,
        maxBuffer: 10 * 1024 * 1024, // 10MB buffer
      });

      // Parse Playwright JSON output
      const results = this.parsePlaywrightOutput(stdout);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(results, null, 2),
          },
        ],
      };
    } catch (error: any) {
      // Even on failure, try to parse output
      const results = this.parsePlaywrightOutput(error.stdout || "");

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                ...results,
                error: error.message,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  }

  private parsePlaywrightOutput(output: string): TestResult {
    try {
      const data = JSON.parse(output);

      const total =
        data.suites?.reduce((acc: number, suite: any) => acc + (suite.specs?.length || 0), 0) || 0;

      let passed = 0;
      let failed = 0;
      let skipped = 0;
      const failures: Array<{ test: string; file: string; error: string }> = [];

      // Traverse test results
      data.suites?.forEach((suite: any) => {
        suite.specs?.forEach((spec: any) => {
          spec.tests?.forEach((test: any) => {
            const status = test.results?.[0]?.status;

            if (status === "passed") passed++;
            else if (status === "failed") {
              failed++;
              failures.push({
                test: spec.title,
                file: suite.file || "",
                error: test.results?.[0]?.error?.message || "Unknown error",
              });
            } else if (status === "skipped") skipped++;
          });
        });
      });

      return {
        total,
        passed,
        failed,
        skipped,
        duration: data.duration || 0,
        failures,
      };
    } catch {
      // Fallback: parse text output
      return this.parseTextOutput(output);
    }
  }

  private parseTextOutput(output: string): TestResult {
    const passedMatch = output.match(/(\d+) passed/);
    const failedMatch = output.match(/(\d+) failed/);

    const passed = passedMatch ? parseInt(passedMatch[1]) : 0;
    const failed = failedMatch ? parseInt(failedMatch[1]) : 0;

    return {
      total: passed + failed,
      passed,
      failed,
      skipped: 0,
      duration: 0,
      failures: [],
    };
  }

  private async getTestSummary(args: any) {
    const cacheFile = args?.cacheFile || "./test-results.json";

    try {
      const filePath = path.resolve(this.workingDir, cacheFile);
      const content = await fs.readFile(filePath, "utf-8");
      const data = JSON.parse(content);

      const summary: TestSummary = {
        totalTests: data.total || 0,
        passRate: data.total > 0 ? (data.passed / data.total) * 100 : 0,
        failuresByCategory: this.categorizeFailures(data.failures || []),
        slowestTests: data.slowestTests || [],
      };

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(summary, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `No cached results found. Run tests first with run_tests tool.`,
          },
        ],
      };
    }
  }

  private categorizeFailures(failures: Array<{ test: string; file: string; error: string }>) {
    const categories: Record<string, number> = {};

    failures.forEach((failure) => {
      const category = this.getErrorCategory(failure.error);
      categories[category] = (categories[category] || 0) + 1;
    });

    return categories;
  }

  private getErrorCategory(error: string): string {
    if (error.includes("timeout")) return "Timeout";
    if (error.includes("toBeVisible")) return "Visibility";
    if (error.includes("toHaveURL")) return "Navigation";
    if (error.includes("accessibility")) return "Accessibility";
    if (error.includes("401") || error.includes("403")) return "Authentication";
    if (error.includes("500")) return "Server Error";
    return "Other";
  }

  private async analyzeFailures(args: any) {
    const resultsFile = args?.resultsFile || "./test-results.json";

    try {
      const filePath = path.resolve(this.workingDir, resultsFile);
      const content = await fs.readFile(filePath, "utf-8");
      const data = JSON.parse(content);

      const analysis = {
        totalFailures: data.failed || 0,
        byCategory: this.categorizeFailures(data.failures || []),
        topErrors: this.getTopErrors(data.failures || []),
      };

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(analysis, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Could not analyze failures. Ensure test results file exists.`,
          },
        ],
      };
    }
  }

  private getTopErrors(failures: Array<{ test: string; file: string; error: string }>) {
    const errorCounts: Record<string, number> = {};

    failures.forEach((failure) => {
      // Extract first line of error as key
      const errorKey = failure.error.split("\n")[0].substring(0, 100);
      errorCounts[errorKey] = (errorCounts[errorKey] || 0) + 1;
    });

    return Object.entries(errorCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([error, count]) => ({ error, count }));
  }

  private async getSlowTests(args: any) {
    const limit = args?.limit || 10;

    // This would ideally read from Playwright JSON report
    // For now, return placeholder
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              message: "Slow test analysis requires JSON reporter output",
              limit,
            },
            null,
            2
          ),
        },
      ],
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Fabrk Testing MCP Server running on stdio");
  }
}

const server = new TestingServer();
server.run().catch(console.error);
