#!/usr/bin/env tsx

/**
 * Hex Color Scanner
 * Scans codebase for hard-coded hex/rgb/hsl colors outside approved locations.
 * Fails CI if unapproved color values are found.
 */

import { readdir, readFile } from "fs/promises";
import { join, relative } from "path";

const HEX_PATTERN = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/g;
const RGB_PATTERN = /rgba?\([^)]+\)/g;
const HSL_PATTERN = /hsla?\([^)]+\)/g;

const ALLOWED_PATHS = [
  "src/emails/",
  "src/lib/design-system/tokens.ts",
  "src/styles/",
  "public/",
  ".storybook/",
  "tests/",
  "scripts/",
  "node_modules/",
  ".next/",
  "dist/",
  "build/",
  "coverage/",
];

const ALLOWED_EXTENSIONS = [".ts", ".tsx", ".js", ".jsx", ".css", ".scss"];

interface ColorMatch {
  file: string;
  line: number;
  column: number;
  color: string;
  context: string;
}

async function* walkDir(dir: string): AsyncGenerator<string> {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!ALLOWED_PATHS.some(p => fullPath.includes(p))) {
        yield* walkDir(fullPath);
      }
    } else if (entry.isFile()) {
      const ext = entry.name.substring(entry.name.lastIndexOf("."));
      if (ALLOWED_EXTENSIONS.includes(ext)) {
        yield fullPath;
      }
    }
  }
}

function isAllowedFile(filePath: string): boolean {
  return ALLOWED_PATHS.some(allowed => filePath.includes(allowed));
}

async function scanFile(filePath: string): Promise<ColorMatch[]> {
  if (isAllowedFile(filePath)) {
    return [];
  }

  const content = await readFile(filePath, "utf-8");
  const lines = content.split("\n");
  const matches: ColorMatch[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNumber = i + 1;

    // Skip comments
    if (line.trim().startsWith("//") || line.trim().startsWith("*")) {
      continue;
    }

    // Find hex colors
    let match: RegExpExecArray | null;
    while ((match = HEX_PATTERN.exec(line)) !== null) {
      matches.push({
        file: filePath,
        line: lineNumber,
        column: match.index + 1,
        color: match[0],
        context: line.trim(),
      });
    }

    // Find rgb/rgba colors
    while ((match = RGB_PATTERN.exec(line)) !== null) {
      matches.push({
        file: filePath,
        line: lineNumber,
        column: match.index + 1,
        color: match[0],
        context: line.trim(),
      });
    }

    // Find hsl/hsla colors
    while ((match = HSL_PATTERN.exec(line)) !== null) {
      matches.push({
        file: filePath,
        line: lineNumber,
        column: match.index + 1,
        color: match[0],
        context: line.trim(),
      });
    }
  }

  return matches;
}

async function main() {
  console.log("🔍 Scanning for hard-coded colors...\n");

  const rootDir = process.cwd();
  const srcDir = join(rootDir, "src");

  const allMatches: ColorMatch[] = [];

  for await (const filePath of walkDir(srcDir)) {
    const matches = await scanFile(filePath);
    allMatches.push(...matches);
  }

  if (allMatches.length === 0) {
    console.log("✅ No hard-coded colors found!");
    process.exit(0);
  }

  console.error(`❌ Found ${allMatches.length} hard-coded color value(s):\n`);

  const groupedByFile = allMatches.reduce((acc, match) => {
    const relPath = relative(rootDir, match.file);
    if (!acc[relPath]) {
      acc[relPath] = [];
    }
    acc[relPath].push(match);
    return acc;
  }, {} as Record<string, ColorMatch[]>);

  for (const [file, matches] of Object.entries(groupedByFile)) {
    console.error(`\n📄 ${file}`);
    for (const match of matches) {
      console.error(`  Line ${match.line}:${match.column} - ${match.color}`);
      console.error(`    ${match.context}`);
    }
  }

  console.error(
    "\n💡 Tip: Use design tokens from src/lib/design-system/tokens.ts instead."
  );
  console.error(
    "   For legitimate cases (SVG brand colors, animations), add the path to ALLOWED_PATHS.\n"
  );

  process.exit(1);
}

main().catch((error) => {
  console.error("❌ Scanner failed:", error);
  process.exit(1);
});
