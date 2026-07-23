# Getting Started - Master C++ For Free With Phumeh

## 📥 Prerequisites Installation

### Step 1: Install Node.js

1. Visit https://nodejs.org/
2. Download **LTS version** (20.x or higher)
3. Run the installer
4. Verify installation:
```bash
node --version
npm --version
```

### Step 2: Install VS Code

#### Windows:
1. Visit https://code.visualstudio.com/
2. Click **Download for Windows**
3. Run the installer (`VSCodeUserSetup-x64-*.exe`)
4. During installation:
   - ✅ Check "Add to PATH"
   - ✅ Check "Create a desktop icon"
   - ✅ Check "Register Code as an editor for supported file types"

#### macOS:
1. Visit https://code.visualstudio.com/
2. Download for macOS
3. Open the `.zip` file
4. Drag `Visual Studio Code.app` to Applications folder

#### Linux:
```bash
# Debian/Ubuntu
sudo apt update
sudo apt install code

# Or download .deb from https://code.visualstudio.com/
```

Verify installation:
```bash
code --version
```

---

## 🔧 VS Code Extensions Setup

### Required Extensions

Open VS Code and install these extensions:

1. **Press `Ctrl+Shift+X`** (or `Cmd+Shift+X` on Mac) to open Extensions panel

2. Search and install each:

#### For Development:
- **ES7+ React/Redux/React-Native snippets** by dsznajder
- **TypeScript Importer** by pmneo
- **Tailwind CSS IntelliSense** by Tailwind Labs
- **Prettier - Code formatter** by Prettier
- **ESLint** by Microsoft

#### For C++ Learning Features:
- **C/C++** by Microsoft
- **C++ TestMate** by Mate Pek (for testing)
- **Code Runner** by Jun Han (to run code snippets)

#### Optional but Recommended:
- **GitHub Copilot** (AI assistance while coding)
- **GitLens** (Git supercharged)
- **Error Lens** (better error visibility)
- **Material Icon Theme** (better file icons)
- **One Dark Pro** (nice dark theme)

### Quick Install via Command Palette

1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P`)
2. Type: `Extensions: Install Extensions`
3. Paste each extension name

---

## 📦 Project Installation

### Step 1: Download the Project

```bash
# Navigate to where you want the project
cd ~/Downloads

# If you have git
git clone <your-repo-url>

# Or download and extract the ZIP file
```

### Step 2: Open in VS Code

```bash
cd Cpp-EduHub
code .
```

Or:
1. Open VS Code
2. File → Open Folder
3. Select `Cpp-EduHub` folder

### Step 3: Install Dependencies

Open VS Code terminal (`Ctrl+` ` or Terminal → New Terminal`):

```bash
# Install pnpm globally (faster than npm)
npm install -g pnpm

# Install project dependencies
pnpm install

# This will install everything needed - takes 2-5 minutes
```

---

## 🚀 Running the Application

### Development Mode (Recommended)

```bash
# Start the development server
pnpm dev
```

You'll see:
```
  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

Open your browser to: **http://localhost:5173**

### What You'll See:
- ✅ Hot reload (changes appear instantly)
- ✅ AI Tutor interface
- ✅ Interactive lessons
- ✅ Code playground
- ✅ Visual animations

---

## 🎯 VS Code Configuration

### Create Workspace Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

### Create Launch Configuration

Create `.vscode/launch.json` for debugging:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/artifacts/cpp-learn/src"
    }
  ]
}
```

---

## 🔥 Building for Production

### Create Production Build

```bash
# Build the app
pnpm build

# The output will be in artifacts/cpp-learn/dist/
```

### Test Production Build Locally

```bash
# Preview the production build
pnpm preview
```

---

## 📥 Export/Download for Offline Use

### Method 1: Static Export (Recommended)

Create `scripts/export.js`:

```javascript
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Copy build to exportable folder
const buildDir = path.join(__dirname, '../artifacts/cpp-learn/dist/public');
const exportDir = path.join(__dirname, '../cpp-learn-offline');

if (fs.existsSync(exportDir)) {
  fs.rmSync(exportDir, { recursive: true });
}

fs.cpSync(buildDir, exportDir, { recursive: true });

console.log('✅ Offline version exported to: cpp-learn-offline/');
console.log('📦 You can now zip this folder and share it!');
```

Run:
```bash
node scripts/export.js
```

### Method 2: Electron Desktop App

Install Electron:
```bash
npm install --save-dev electron electron-builder
```

Create `electron/main.js`:

```javascript
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      nodeIntegration: true
    },
    icon: path.join(__dirname, '../public/favicon.svg')
  });

  // Load the app
  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, '../dist/public/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
```

Add to `package.json`:
```json
{
  "scripts": {
    "electron": "electron electron/main.js",
    "electron:build": "electron-builder"
  },
  "build": {
    "appId": "com.phumeh.cpp-learn",
    "productName": "Master C++ With Phumeh",
    "directories": {
      "output": "release"
    },
    "files": [
      "dist/**/*",
      "electron/**/*"
    ],
    "win": {
      "target": ["nsis"],
      "icon": "public/icon.ico"
    },
    "mac": {
      "target": ["dmg"],
      "icon": "public/icon.icns"
    },
    "linux": {
      "target": ["AppImage"],
      "icon": "public/icon.png"
    }
  }
}
```

Build desktop app:
```bash
npm run electron:build
```

### Method 3: PWA (Progressive Web App)

Add to `vite.config.ts`:

```typescript
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    // ... other plugins
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt'],
      manifest: {
        name: 'Master C++ For Free With Phumeh',
        short_name: 'C++ Learn',
        description: 'Interactive C++ learning platform',
        theme_color: '#000000',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\./,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 300
              }
            }
          }
        ]
      }
    })
  ]
});
```

Install:
```bash
npm install -D vite-plugin-pwa
```

Users can now "Install" your app from the browser!

---

## 🎨 Customization Guide

### Change Theme Colors

Edit `artifacts/cpp-learn/src/index.css`:

```css
:root {
  --primary: 220 90% 56%;  /* Blue */
  --secondary: 280 60% 60%;  /* Purple */
  /* Change these to customize */
}
```

### Add Your Logo

Replace `artifacts/cpp-learn/public/favicon.svg` with your logo.

### Customize Homepage

Edit `artifacts/cpp-learn/src/pages/dashboard.tsx`

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5173 (Windows)
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5173 | xargs kill -9
```

### Dependencies Not Installing

```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### TypeScript Errors

```bash
# Restart TypeScript server in VS Code
Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

### Hot Reload Not Working

1. Check if you're editing the right file
2. Make sure dev server is running
3. Refresh browser (`Ctrl+R`)

---

## 📚 File Structure Guide

```
Cpp-EduHub/
├── artifacts/
│   ├── cpp-learn/              # Main React app
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── ai-tutor/   # AI Chat
│   │   │   │   ├── visualizer/ # Animations
│   │   │   │   └── ui/         # UI Components
│   │   │   ├── pages/
│   │   │   │   ├── dashboard.tsx
│   │   │   │   ├── ai-tutor.tsx
│   │   │   │   ├── lessons.tsx
│   │   │   │   └── playground.tsx
│   │   │   └── lib/            # Utilities
│   │   └── public/             # Static assets
│   └── api-server/             # Backend API
│       └── src/
│           └── data/           # Lesson content
├── GETTING_STARTED.md         # This file
├── SETUP.md                   # Quick setup
└── IMPLEMENTATION_PLAN.md     # Technical details
```

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] VS Code opens without errors
- [ ] `pnpm install` completes successfully
- [ ] `pnpm dev` starts the server
- [ ] Browser opens to http://localhost:5173
- [ ] You see the homepage with "Master C++ For Free With Phumeh"
- [ ] Can navigate to different pages (Lessons, AI Tutor, Playground)
- [ ] No console errors in browser DevTools (F12)

---

## 🚀 Next Steps

1. **Enable AI Features** - Add OpenAI API key (see SETUP.md)
2. **Add Code Execution** - Integrate Judge0 or Piston API
3. **Customize Content** - Edit lessons in `api-server/src/data/`
4. **Deploy Online** - See deployment section in SETUP.md

---

## 💡 Tips for Development

### VS Code Shortcuts

- `Ctrl+P` - Quick file open
- `Ctrl+Shift+F` - Search across all files
- `Ctrl+` ` - Toggle terminal
- `Ctrl+B` - Toggle sidebar
- `F5` - Start debugging
- `Ctrl+Shift+P` - Command palette

### React DevTools

Install browser extension:
- Chrome: https://chrome.google.com/webstore → Search "React Developer Tools"
- Firefox: https://addons.mozilla.org → Search "React DevTools"

### Hot Keys in App

- `Ctrl+K` - Quick search
- `Ctrl+/` - Toggle AI chat
- `Ctrl+Enter` - Run code (in playground)

---

## 📞 Getting Help

If something doesn't work:

1. Check this guide again
2. Look at error messages in:
   - VS Code terminal
   - Browser console (F12)
3. Check `IMPLEMENTATION_PLAN.md` for technical details
4. Review component code for examples

---

## 🎓 Learning Resources

### TypeScript
- https://www.typescriptlang.org/docs/

### React
- https://react.dev/

### Tailwind CSS
- https://tailwindcss.com/docs

### Vite
- https://vitejs.dev/guide/

---

**You're all set! Start coding and building an amazing C++ learning platform! 🚀**

**Author:** Phumeh Mjoli  
**Portfolio:** https://uphumeh.netlify.app/Portfolio
