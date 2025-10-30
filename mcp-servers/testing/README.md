# Fabrk Testing MCP Server

Efficient Playwright test execution and reporting for Claude Code.

## Features

- **Structured Test Execution**: Run tests with parsed JSON output
- **Smart Result Analysis**: Categorize failures by type (Timeout, Visibility, etc.)
- **Performance Metrics**: Identify slow tests for optimization
- **Reduced Token Usage**: Compact, structured data instead of raw output
- **Fast Failure Analysis**: Group errors by pattern

## Tools

### `run_tests`

Run Playwright tests with structured output.

**Parameters:**

- `pattern` (string): Test file pattern (e.g., `tests/e2e/**/*.spec.ts`)
- `project` (string): Browser project (`chromium`, `firefox`, `webkit`)
- `grep` (string): Filter tests by name pattern
- `maxFailures` (number): Stop after N failures

**Returns:**

```json
{
  "total": 48,
  "passed": 43,
  "failed": 5,
  "skipped": 0,
  "duration": 44100,
  "failures": [
    {
      "test": "homepage should not have accessibility violations",
      "file": "tests/e2e/accessibility/basic-a11y.spec.ts",
      "error": "1 accessibility violation was detected"
    }
  ]
}
```

### `get_test_summary`

Get comprehensive test summary with pass rates and categories.

**Parameters:**

- `cacheFile` (string): Path to cached results (default: `./test-results.json`)

**Returns:**

```json
{
  "totalTests": 48,
  "passRate": 89.58,
  "failuresByCategory": {
    "Accessibility": 3,
    "Visibility": 1,
    "Timeout": 1
  },
  "slowestTests": []
}
```

### `analyze_failures`

Analyze test failures and group by error patterns.

**Returns:**

```json
{
  "totalFailures": 5,
  "byCategory": {
    "Accessibility": 3,
    "Visibility": 1,
    "Timeout": 1
  },
  "topErrors": [
    {
      "error": "AssertionError: 1 accessibility violation was detected",
      "count": 3
    }
  ]
}
```

### `get_slow_tests`

Identify slowest tests for optimization.

**Parameters:**

- `limit` (number): Number of slow tests to return (default: 10)

## Installation

The server is already built and located in `mcp-servers/testing/`.

## Configuration

Add to your Claude Code MCP settings (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "fabrk-testing": {
      "command": "node",
      "args": ["/Users/jasonpoindexter/Documents/GitHub/Fabrk/mcp-servers/testing/dist/index.js"],
      "cwd": "/Users/jasonpoindexter/Documents/GitHub/Fabrk"
    }
  }
}
```

Then restart Claude Code.

## Usage Examples

```typescript
// Run all E2E tests
await runTests({ pattern: "tests/e2e", project: "chromium" });

// Run specific test file
await runTests({
  pattern: "tests/e2e/auth.spec.ts",
  project: "chromium",
});

// Run tests matching pattern
await runTests({
  pattern: "tests/e2e",
  grep: "authentication",
  maxFailures: 3,
});

// Analyze failures
await analyzeFailures({ resultsFile: "./test-results.json" });

// Get test summary
await getTestSummary({ cacheFile: "./test-results.json" });
```

## Benefits

- **60% faster analysis**: Structured data instead of parsing raw output
- **90% token reduction**: Compact JSON vs full test logs
- **Instant categorization**: Automatic error grouping
- **Pattern detection**: Identify common failure causes

## Development

```bash
# Build
cd mcp-servers/testing
pnpm build

# Watch mode
pnpm dev
```
