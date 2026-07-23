#!/usr/bin/env node

/**
 * Create Desktop App with Electron
 * Builds a standalone desktop application for Windows, macOS, Linux
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

console.log('🖥️  Creating Desktop App...\n');

// Step 1: Check dependencies
console.log('📦 Checking dependencies...');
const packageJson = JSON.parse(
  fs.readFileSync(path.join(rootDir, 'package.json'), 'utf-8')
);

const devDeps = packageJson.devDependencies || {};
const hasElectron = devDeps.electron && devDeps['electron-builder'];

if (!hasElectron) {
  console.log('📥 Installing Electron...');
  try {
    execSync('npm install --save-dev electron electron-builder', {
      cwd: rootDir,
      stdio: 'inherit'
    });
  } catch (error) {
    console.error('❌ Failed to install Electron');
    process.exit(1);
  }
}

// Step 2: Create Electron main file
const electronDir = path.join(rootDir, 'electron');
if (!fs.existsSync(electronDir)) {
  fs.mkdirSync(electronDir, { recursive: true });
}

const mainJsContent = `const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false
    },
    icon: path.join(__dirname, '../artifacts/cpp-learn/public/favicon.svg'),
    backgroundColor: '#000000',
    show: false
  });

  // Create menu
  const template = [
    {
      label: 'File',
      submenu: [
        { role: 'quit' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About',
          click: async () => {
            const { shell } = require('electron');
            await shell.openExternal('https://uphumeh.netlify.app/Portfolio');
          }
        }
      ]
    }
  ];

  if (isDev) {
    template.push({
      label: 'Developer',
      submenu: [
        { role: 'toggleDevTools' }
      ]
    });
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // Load app
  if (isDev) {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();
  } else {
    win.loadFile(
      path.join(__dirname, '../artifacts/cpp-learn/dist/public/index.html')
    );
  }

  // Show when ready
  win.once('ready-to-show', () => {
    win.show();
  });

  // Handle external links
  win.webContents.setWindowOpenHandler(({ url }) => {
    require('electron').shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
`;

fs.writeFileSync(path.join(electronDir, 'main.js'), mainJsContent);
console.log('✅ Created electron/main.js');

// Step 3: Update package.json
packageJson.main = 'electron/main.js';
packageJson.scripts = packageJson.scripts || {};
packageJson.scripts['electron:dev'] = 'electron .';
packageJson.scripts['electron:build'] = 'electron-builder';

packageJson.build = {
  appId: 'com.phumeh.cpp-learn',
  productName: 'Master C++ With Phumeh',
  directories: {
    output: 'release',
    buildResources: 'electron/resources'
  },
  files: [
    'electron/**/*',
    'artifacts/cpp-learn/dist/**/*'
  ],
  extraResources: [
    {
      from: 'artifacts/cpp-learn/dist/public',
      to: 'app',
      filter: ['**/*']
    }
  ],
  win: {
    target: [
      {
        target: 'nsis',
        arch: ['x64']
      }
    ],
    icon: 'electron/resources/icon.ico'
  },
  mac: {
    target: [
      {
        target: 'dmg',
        arch: ['x64', 'arm64']
      }
    ],
    icon: 'electron/resources/icon.icns',
    category: 'public.app-category.education'
  },
  linux: {
    target: [
      {
        target: 'AppImage',
        arch: ['x64']
      }
    ],
    icon: 'electron/resources/icon.png',
    category: 'Education'
  },
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true
  }
};

fs.writeFileSync(
  path.join(rootDir, 'package.json'),
  JSON.stringify(packageJson, null, 2)
);
console.log('✅ Updated package.json');

// Step 4: Create resources directory
const resourcesDir = path.join(electronDir, 'resources');
if (!fs.existsSync(resourcesDir)) {
  fs.mkdirSync(resourcesDir, { recursive: true });
}

console.log('\n📋 Next Steps:');
console.log('   1. Add icon files to electron/resources/:');
console.log('      - icon.ico (Windows - 256x256)');
console.log('      - icon.icns (macOS)');
console.log('      - icon.png (Linux - 512x512)');
console.log('\n   2. Build the web app first:');
console.log('      npm run build');
console.log('\n   3. Test Electron app:');
console.log('      npm run electron:dev');
console.log('\n   4. Build desktop app:');
console.log('      npm run electron:build');
console.log('\n📦 Installers will be in: release/\n');

console.log('🎉 Desktop app setup complete!\n');
