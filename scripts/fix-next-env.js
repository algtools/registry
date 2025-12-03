#!/usr/bin/env node

/**
 * Fix duplicate exports in .open-next/cloudflare/next-env.mjs
 * This script removes duplicate export declarations from the generated file
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', '.open-next', 'cloudflare', 'next-env.mjs');

if (!fs.existsSync(filePath)) {
  console.log('next-env.mjs not found, skipping fix');
  process.exit(0);
}

let content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

// Track seen exports
const seenExports = new Set();
const fixedLines = [];

for (const line of lines) {
  // Match export const declarations
  const exportMatch = line.match(/^\s*export\s+const\s+(\w+)\s*=/);
  
  if (exportMatch) {
    const exportName = exportMatch[1];
    if (seenExports.has(exportName)) {
      // Skip duplicate export
      console.log(`Removing duplicate export: ${exportName}`);
      continue;
    }
    seenExports.add(exportName);
  }
  
  fixedLines.push(line);
}

const fixedContent = fixedLines.join('\n');

// Only write if content changed
if (fixedContent !== content) {
  fs.writeFileSync(filePath, fixedContent, 'utf8');
  console.log('Fixed duplicate exports in next-env.mjs');
} else {
  console.log('No duplicates found in next-env.mjs');
}
