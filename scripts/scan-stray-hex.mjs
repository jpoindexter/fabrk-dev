#!/usr/bin/env node

import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";

const allowPatterns = [
  /^emails\//,
  /^src\/emails\//,
  /^public\//,
  /^sample_landing\//,
  /^logs\//,
  /tech-stack-section\.tsx$/,
];

const hexPattern = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})(?![0-9a-fA-F])(?=[$\s'"),.;:}\]>/]|$)/g;

const files = execSync("git ls-files", { encoding: "utf8" })
  .trim()
  .split("\n")
  .filter(Boolean);

const offenders = [];

files.forEach((file) => {
  if (allowPatterns.some((regex) => regex.test(file))) return;
  if (!file.startsWith("src")) return;

  const absolute = path.resolve(file);
  const lines = readFileSync(absolute, "utf8").split(/\r?\n/);

  lines.forEach((line, index) => {
    const matches = line.match(hexPattern);
    if (!matches) return;
    matches.forEach((match) => {
      offenders.push({ file, line: index + 1, match });
    });
  });
});

if (offenders.length > 0) {
  console.error("\n❌ Found disallowed hex color values:\n");
  offenders.forEach(({ file, line, match }) => {
    console.error(`  ${file}:${line} -> ${match}`);
  });
  console.error("\nAdd a design token or Tailwind utility instead of raw hex values.");
  process.exit(1);
}

console.log("✅ No stray hex colors detected.");
