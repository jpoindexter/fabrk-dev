// scripts/count-ui-components.mjs
import { promises as fs } from 'fs';
import path from 'path';

const componentsDir = './src/components/ui';
const outputFile = './src/data/component-counts.json';

async function countUiComponents() {
  try {
    const files = await fs.readdir(componentsDir, { recursive: true });
    const tsxFiles = files.filter(file => file.endsWith('.tsx'));
    const uiComponentCount = tsxFiles.length;

    const content = JSON.stringify({ uiComponentCount }, null, 2);
    await fs.writeFile(outputFile, content, 'utf8');

    console.log(`Updated ${outputFile} with UI component count: ${uiComponentCount}`);
  } catch (error) {
    console.error('Error counting UI components:', error);
    // Exit with an error code to fail the build/dev process if the script fails
    process.exit(1);
  }
}

countUiComponents();
