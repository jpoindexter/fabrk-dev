#!/usr/bin/env node

/**
 * Convert hex colors to OKLCH format for code syntax highlighting
 * This script converts all --code-* hex values to OKLCH in globals.css
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Convert hex to OKLCH
 * Returns OKLCH values as "L% C H" format
 */
function hexToOKLCH(hex) {
  // Remove # if present
  hex = hex.replace('#', '');

  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  // Linear RGB (gamma correction)
  const toLinear = (c) => c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  const rLin = toLinear(r);
  const gLin = toLinear(g);
  const bLin = toLinear(b);

  // Convert to XYZ (D65 illuminant)
  const x = rLin * 0.4124564 + gLin * 0.3575761 + bLin * 0.1804375;
  const y = rLin * 0.2126729 + gLin * 0.7151522 + bLin * 0.0721750;
  const z = rLin * 0.0193339 + gLin * 0.1191920 + bLin * 0.9503041;

  // Convert to OKLAB
  const l_ = Math.cbrt(0.4122214708 * x + 0.5363325363 * y + 0.0514459929 * z);
  const m_ = Math.cbrt(0.2119034982 * x + 0.6806995451 * y + 0.1073969566 * z);
  const s_ = Math.cbrt(0.0883024619 * x + 0.2817188376 * y + 0.6299787005 * z);

  const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
  const b_ = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;

  // Convert to LCH (OKLCH)
  const C = Math.sqrt(a * a + b_ * b_);
  let H = Math.atan2(b_, a) * 180 / Math.PI;
  if (H < 0) H += 360;

  // Format: L (0-1 → 0-100%), C (0-0.4), H (0-360)
  // Round to 2 decimal places for readability
  const lightness = Math.round(L * 100);
  const chroma = Math.round(C * 100) / 100;
  const hue = Math.round(H);

  return `${lightness}% ${chroma} ${hue}`;
}

// Read globals.css
const globalsPath = join(__dirname, '../src/app/globals.css');
let content = readFileSync(globalsPath, 'utf-8');

// Define all code color properties to convert
const codeProps = [
  'code-fg',
  'code-bg',
  'code-comment',
  'code-string',
  'code-punctuation',
  'code-number',
  'code-keyword',
  'code-function',
  'code-selector',
];

let conversionCount = 0;

// Convert each property
for (const prop of codeProps) {
  // Match pattern: --code-prop: #hexvalue;
  const regex = new RegExp(`--${prop}:\\s*(#[0-9a-fA-F]{6});`, 'g');

  content = content.replace(regex, (match, hexValue) => {
    const oklch = hexToOKLCH(hexValue);
    conversionCount++;
    console.log(`✓ Converted --${prop}: ${hexValue} → oklch(${oklch})`);
    return `--${prop}: oklch(${oklch});`;
  });
}

// Write back to globals.css
writeFileSync(globalsPath, content, 'utf-8');

console.log(`\n✅ Conversion complete! ${conversionCount} hex colors converted to OKLCH.`);
console.log(`📝 Updated: ${globalsPath}`);
