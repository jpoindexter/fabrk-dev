import fs from 'fs';

const readmePath = process.argv[2];

if (!readmePath) {
  console.error('Please provide the path to the README.md file');
  process.exit(1);
}

console.log(`Cleaning README at: ${readmePath}`);
let content = fs.readFileSync(readmePath, 'utf8');

// Define sections to remove
const sectionsToRemove = [
  '🎨 **NEW: Interactive Showcases**', // Specific match
  'Why Fabrk',
  'Pricing',
  'Success Stories',
  'Roadmap',
  'Star this repo',
  'What\'s Included',
  'License',
  'Contributing',
  'Acknowledgments'
];

console.log(`Original length: ${content.length}`);

// Split content by "## " (Level 2 headers)
const parts = content.split(/^## /gm);
console.log(`Found ${parts.length} parts (sections).`);

const keptParts = [];
// Preamble
keptParts.push(parts[0]);

for (let i = 1; i < parts.length; i++) {
  const part = parts[i];
  const firstLine = part.split('\n')[0].trim();
  
  let shouldRemove = false;
  for (const sectionTitle of sectionsToRemove) {
    if (firstLine.includes(sectionTitle)) {
      console.log(`Removing section: ${firstLine}`);
      shouldRemove = true;
      break;
    }
  }

  if (!shouldRemove) {
    keptParts.push('## ' + part);
  }
}

let newContent = keptParts.join('');
console.log(`Length after section removal: ${newContent.length}`);

// 2. Remove specific sales lines
const linesToRemove = [
  /234 production-ready components. 28 copy-paste templates.*\$299./g,
  /\*\*Professional-grade code. Launch-ready. \$299.\*\*/g,
  /\*\*Ready to ship\?\*\* Get Fabrk for \*\*.*\$299\*\*/g,
  /.*preview everything interactively before purchasing.*/gi,
  /.*One-time payment:.*\$299.*/gi,
  /.*Why \$299?.*/gi
];

linesToRemove.forEach(regex => {
  const match = newContent.match(regex);
  if (match) {
    console.log(`Removing line match: ${match[0].substring(0, 50)}...`);
    newContent = newContent.replace(regex, '');
  }
});

// 3. Clean up formatting
newContent = newContent.replace(/\n{3,}/g, '\n\n');
newContent = newContent.replace(/---\s*---/g, '---');

fs.writeFileSync(readmePath, newContent, 'utf8');
console.log('README cleaned successfully.');
