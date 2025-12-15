// scripts/update-markdown-dynamic-data.mjs
import { promises as fs } from 'fs';
import path from 'path';

// Import dynamic constants from stats.ts
import {
  COMPONENT_COUNT_INT,
  THEME_COUNT_INT,
  TEMPLATE_COUNT_STRING, // Template count string has the '+' already
  ROUTE_COUNT_STRING,
  FILE_COUNT_STRING,
  TEST_COVERAGE_STRING,
} from '../src/data/landing/stats.ts';

// Get version from package.json
import { default as packageJson } from '../package.json';
const APP_VERSION = packageJson.version;

const filesToUpdate = [
  './README.md',
  './CLAUDE.md',
  './DEVELOPMENT.md',
  './mcp-servers/fabrk/README.md',
  './docs/01-getting-started/README.md' // Example: other docs files
];

async function updateMarkdownFiles() {
  const replacements = {
    '{{COMPONENT_COUNT_INT}}': String(COMPONENT_COUNT_INT),
    '{{COMPONENT_COUNT_STRING}}': COMPONENT_COUNT_STRING,
    '{{THEME_COUNT_INT}}': String(THEME_COUNT_INT),
    '{{THEME_COUNT_STRING}}': THEME_COUNT_INT > 0 ? `${THEME_COUNT_INT}` : '1+', // Use INT for exact, STRING for marketing "X+"
    '{{TEMPLATE_COUNT_STRING}}': TEMPLATE_COUNT_STRING,
    '{{TEMPLATE_COUNT_INT}}': String(parseInt(TEMPLATE_COUNT_STRING)), // Assuming TEMPLATE_COUNT_STRING is like "28+"
    '{{ROUTE_COUNT_STRING}}': ROUTE_COUNT_STRING,
    '{{FILE_COUNT_STRING}}': FILE_COUNT_STRING,
    '{{TEST_COVERAGE_STRING}}': TEST_COVERAGE_STRING,
    '{{APP_VERSION}}': APP_VERSION,
  };

  for (const filePath of filesToUpdate) {
    try {
      let content = await fs.readFile(filePath, 'utf8');
      let updated = false;

      for (const [placeholder, value] of Object.entries(replacements)) {
        // Create a regex to find the placeholder. Escape special characters in placeholder for regex.
        const regex = new RegExp(placeholder.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
        if (content.match(regex)) {
          content = content.replace(regex, value);
          updated = true;
        }
      }

      if (updated) {
        await fs.writeFile(filePath, content, 'utf8');
        console.log(`Updated dynamic data in ${filePath}`);
      } else {
        console.log(`No dynamic data placeholders found in ${filePath}`);
      }
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.warn(`Warning: File not found - ${filePath}`);
      } else {
        console.error(`Error updating ${filePath}:`, error);
      }
    }
  }
}

updateMarkdownFiles();
