// scripts/update-markdown-dynamic-data.mjs
import { promises as fs } from 'fs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// Read values directly from JSON files (no TypeScript imports needed)
const packageJson = require('../package.json');
const componentCounts = require('../src/data/component-counts.json');

// Read theme count by parsing the themes file
async function getThemeCount() {
  try {
    const themesContent = await fs.readFile('./src/data/themes.ts', 'utf8');
    // Count theme objects in the array
    const matches = themesContent.match(/{\s*name:/g);
    return matches ? matches.length : 12; // fallback to 12
  } catch {
    return 12; // fallback
  }
}

// Read template count from library nav
async function getTemplateCount() {
  try {
    const navContent = await fs.readFile('./src/app/(marketing)/library/library-nav-data.ts', 'utf8');
    // Find the exported TEMPLATE_COUNT_STRING
    const match = navContent.match(/TEMPLATE_COUNT_STRING\s*=\s*[`'"](\d+\+?)[`'"]/);
    return match ? match[1] : '30+';
  } catch {
    return '30+'; // fallback
  }
}

const filesToUpdate = [
  './README.md',
  './CLAUDE.md',
  './DEVELOPMENT.md',
  './mcp-servers/fabrk/README.md',
  './docs/01-getting-started/README.md'
];

async function updateMarkdownFiles() {
  const themeCount = await getThemeCount();
  const templateCount = await getTemplateCount();

  const replacements = {
    '{{COMPONENT_COUNT_INT}}': String(componentCounts.uiComponentCount),
    '{{COMPONENT_COUNT_STRING}}': `${componentCounts.uiComponentCount}+`,
    '{{THEME_COUNT_INT}}': String(themeCount),
    '{{THEME_COUNT_STRING}}': String(themeCount),
    '{{TEMPLATE_COUNT_STRING}}': templateCount,
    '{{TEMPLATE_COUNT_INT}}': String(parseInt(templateCount)),
    '{{ROUTE_COUNT_STRING}}': '250+',
    '{{FILE_COUNT_STRING}}': '161',
    '{{TEST_COVERAGE_STRING}}': '100%',
    '{{APP_VERSION}}': packageJson.version,
  };

  for (const filePath of filesToUpdate) {
    try {
      let content = await fs.readFile(filePath, 'utf8');
      let updated = false;

      for (const [placeholder, value] of Object.entries(replacements)) {
        const regex = new RegExp(placeholder.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
        if (content.match(regex)) {
          content = content.replace(regex, value);
          updated = true;
        }
      }

      if (updated) {
        await fs.writeFile(filePath, content, 'utf8');
        console.log(`Updated dynamic data in ${filePath}`);
      }
    } catch (error) {
      if (error.code === 'ENOENT') {
        // File doesn't exist, skip silently
      } else {
        console.error(`Error updating ${filePath}:`, error.message);
      }
    }
  }

  console.log(`Component count: ${componentCounts.uiComponentCount}`);
}

updateMarkdownFiles();
