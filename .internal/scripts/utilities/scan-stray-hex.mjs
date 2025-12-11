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
  /^src\/stories\//,
  /\.stories\.(t|j)sx?$/,
  /__tests__\//,
  /\.test\.(t|j)sx?$/,
  /\.mdx?$/,
  /CHAT-INPUT-PREVIEW\.md$/,
  /email-templates\/page\.tsx$/,
  /src\/lib\/email\.ts$/,
  /src\/components\/ui\/color-picker\.tsx$/,
  // Intentional hex colors: Google OAuth brand colors (must match Google's brand guidelines)
  /src\/app\/\(marketing\)\/docs\/features\/google-oauth\/page\.tsx$/,
  /src\/app\/\(auth\)\/login\/page\.tsx$/,
  /src\/app\/\(auth\)\/register\/page\.tsx$/,
  /src\/app\/\(marketing\)\/library\/authentication\//,
  /src\/components\/ui\/sign-in-form\.tsx$/,
  // Intentional hex colors: Theme system files require hardcoded colors for theme definitions
  /src\/app\/globals\.css$/,
  /src\/design-system\/themes\//,
  /src\/design-system\/tokens\//,
  // Intentional hex colors: Chart components use hardcoded colors for data visualization
  /src\/components\/ui\/.*-chart\.tsx$/,
  // Intentional hex colors: Theme preview swatches showing actual theme colors
  /src\/components\/theme\/color-theme-switcher\.tsx$/,
  /src\/components\/theme\/theme-dropdown\.tsx$/,
  // Intentional hex colors: Email docs showing example email styling
  /src\/app\/\(marketing\)\/docs\/features\/emails\/page\.tsx$/,
  // Intentional hex colors: Theming docs showing theme previews
  /src\/app\/\(marketing\)\/docs\/extras\/theming\/page\.tsx$/,
  // Intentional hex colors: Mermaid.js requires hex colors for diagram theming
  /src\/components\/ui\/mermaid\.tsx$/,
  // Intentional hex colors: Contact form API route uses inline styles for emails
  /src\/app\/api\/contact\/route\.ts$/,
  // Intentional hex colors: Color picker docs demonstrate hex color selection
  /src\/app\/\(marketing\)\/docs\/components\/color-picker\/page\.tsx$/,
  // Intentional hex colors: Form docs show validation example with hex pattern (#123 is example ID)
  /src\/app\/\(marketing\)\/docs\/components\/form\/page\.tsx$/,
  // Intentional hex colors: Email templates require inline styles for email client compatibility
  /src\/app\/templates\/email-templates\//,
  // Intentional hex colors: All email files need inline styles for email client compatibility
  /src\/lib\/email\//,
  /email-.*\.ts$/,
  // Intentional hex colors: Profile template with placeholder demo ID
  /src\/app\/templates\/profile\/page\.tsx$/,
  /src\/app\/\(marketing\)\/library\/profile\/page\.tsx$/,
  // Intentional hex colors: Component showcase uses ColorPicker which requires hex values
  /src\/app\/component-showcase\/page\.tsx$/,
  // Intentional hex colors: Design system audit files contain color analysis
  /src\/design-system\/audit\//,
  /src\/design-system\/violations\//,
  // Intentional hex colors: Code block component uses hardcoded colors for syntax highlighting themes
  /src\/components\/ui\/code-block\.tsx$/,
];

const hexPattern = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})(?![0-9a-fA-F])(?=[$\s'"),.;}\]>/]|$)/g;

const files = execSync("git ls-files", { encoding: "utf8" })
  .trim()
  .split("\n")
  .filter(Boolean);

const offenders = [];

files.forEach((file) => {
  if (allowPatterns.some((regex) => regex.test(file))) return;
  if (!file.startsWith("src")) return;

  const absolute = path.resolve(file);
  let lines;

  try {
    lines = readFileSync(absolute, "utf8").split(/\r?\n/);
  } catch (error) {
    // File is tracked by git but missing on disk (e.g. after refactors).
    // Skip it for hex scanning but surface a warning so it can be cleaned up.
    console.warn(`⚠️  Skipping missing file in scan-stray-hex: ${file}`);
    return;
  }

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
