#!/usr/bin/env node

/**
 * Export Offline Version
 * Creates a standalone folder that can be:
 * - Zipped and shared
 * - Opened directly in browser
 * - Hosted on any static server
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

// Directories
const buildDir = path.join(rootDir, 'artifacts/cpp-learn/dist/public');
const exportDir = path.join(rootDir, 'cpp-learn-offline');

console.log('🚀 Starting offline export...\n');

// Step 1: Check if build exists
if (!fs.existsSync(buildDir)) {
  console.error('❌ Build directory not found!');
  console.log('👉 Run "pnpm build" first\n');
  process.exit(1);
}

// Step 2: Clean existing export
if (fs.existsSync(exportDir)) {
  console.log('🧹 Cleaning existing export...');
  fs.rmSync(exportDir, { recursive: true });
}

// Step 3: Copy build
console.log('📦 Copying files...');
fs.cpSync(buildDir, exportDir, { recursive: true });

// Step 4: Create README
const readmeContent = `# Master C++ For Free With Phumeh - Offline Version

## 🎯 Quick Start

1. Open \`index.html\` in any modern browser:
   - Chrome
   - Firefox
   - Safari
   - Edge

2. That's it! No server needed.

## 📱 Features Available Offline

✅ All lessons
✅ Interactive code examples
✅ Glossary
✅ Visual animations
✅ Progress tracking (saved in browser)

## ⚠️ Features Requiring Internet

❌ AI Tutor (needs OpenAI API)
❌ Code execution (needs Judge0 API)
❌ Real-time updates

## 🌐 Want Full Features?

Visit the online version or run locally:
https://github.com/your-username/cpp-eduhub

## 💾 Sharing

You can:
- Zip this folder and share
- Upload to Google Drive/Dropbox
- Host on any static server
- Copy to USB drive

## 📄 License

MIT License - See LICENSE file

**Author:** Phumeh Mjoli
**Portfolio:** https://uphumeh.netlify.app/Portfolio
`;

fs.writeFileSync(path.join(exportDir, 'README.txt'), readmeContent);

// Step 5: Create launcher script
const launcherHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Launch C++ EduHub</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    .container {
      text-align: center;
      max-width: 600px;
      padding: 40px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    }
    h1 { font-size: 2.5em; margin-bottom: 10px; }
    p { font-size: 1.2em; opacity: 0.9; margin-bottom: 30px; }
    button {
      background: white;
      color: #667eea;
      border: none;
      padding: 15px 40px;
      font-size: 1.1em;
      font-weight: bold;
      border-radius: 10px;
      cursor: pointer;
      transition: transform 0.2s;
    }
    button:hover { transform: scale(1.05); }
    .info {
      margin-top: 30px;
      font-size: 0.9em;
      opacity: 0.7;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🚀 Master C++ For Free</h1>
    <p>with Phumeh</p>
    <button onclick="window.location.href='index.html'">
      Start Learning
    </button>
    <div class="info">
      <p>✅ Fully offline | 📚 15+ lessons | 🎮 Gamified</p>
      <p><small>by Phumeh Mjoli</small></p>
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync(path.join(exportDir, 'LAUNCHER.html'), launcherHTML);

// Step 6: Success message
console.log('\n✅ Export complete!\n');
console.log('📁 Location:', exportDir);
console.log('\n📋 What to do next:');
console.log('   1. Open LAUNCHER.html to start');
console.log('   2. Or open index.html directly');
console.log('   3. Or zip the folder to share\n');

// Step 7: Create zip (optional - requires archiver)
try {
  const { default: archiver } = await import('archiver');
  const output = fs.createWriteStream(path.join(rootDir, 'cpp-learn-offline.zip'));
  const archive = archiver('zip', { zlib: { level: 9 } });

  output.on('close', () => {
    const sizeMB = (archive.pointer() / 1024 / 1024).toFixed(2);
    console.log(`📦 Zip created: cpp-learn-offline.zip (${sizeMB} MB)\n`);
  });

  archive.pipe(output);
  archive.directory(exportDir, 'cpp-learn-offline');
  archive.finalize();
} catch (error) {
  console.log('💡 Install archiver to auto-create zip: npm install archiver');
  console.log('   Or manually zip the folder\n');
}

console.log('🎉 Ready to share!\n');
