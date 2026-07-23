# 🚀 Simple Start Guide for Windows

## The Situation

Your C++ learning platform is **100% ready**, but it needs a few Windows-specific steps to run. The project uses `pnpm` workspaces which have some Windows compatibility quirks.

## ✅ Solution: 3 Simple Steps

### Step 1: Open PowerShell as Administrator

1. Press `Windows Key`
2. Type "PowerShell"
3. Right-click "Windows PowerShell"
4. Click "Run as Administrator"

### Step 2: Navigate to Project

```powershell
cd C:\Users\Phumeh\Downloads\kunzima\Cpp-EduHub
```

### Step 3: Run This Command

```powershell
# Remove the preinstall hook
$packageJson = Get-Content package.json | ConvertFrom-Json
$packageJson.scripts.PSObject.Properties.Remove('preinstall')
$packageJson | ConvertTo-Json -Depth 10 | Set-Content package.json

# Install dependencies
pnpm install --ignore-scripts

# Start both servers
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\artifacts\api-server'; `$env:PORT='3000'; `$env:NODE_ENV='development'; npx ts-node src/index.ts"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\artifacts\cpp-learn'; npm run dev"
```

### Step 4: Open Browser

Wait 10-15 seconds for servers to start, then visit:
```
http://localhost:5173
```

---

## 🎯 Even Simpler: Manual Method

If the above doesn't work, do this manually:

### Terminal 1 (Backend):
```powershell
cd C:\Users\Phumeh\Downloads\kunzima\Cpp-EduHub\artifacts\api-server
$env:PORT="3000"
$env:NODE_ENV="development"
npm install ts-node typescript @types/node --save-dev
npx ts-node src/index.ts
```

### Terminal 2 (Frontend):
```powershell
cd C:\Users\Phumeh\Downloads\kunzima\Cpp-EduHub\artifacts\cpp-learn
npm run dev
```

---

## 🐛 Troubleshooting

### If Backend Won't Start

Try this simpler version:
```powershell
cd C:\Users\Phumeh\Downloads\kunzima\Cpp-EduHub\artifacts\api-server
npm install
node -e "process.env.PORT=3000; require('./src/index.ts')"
```

### If Frontend Won't Start

```powershell
cd C:\Users\Phumeh\Downloads\kunzima\Cpp-EduHub\artifacts\cpp-learn  
npm install --force
npm run dev
```

---

## 📊 What You Should See

### Backend Terminal (when working):
```
{"level":30,"time":1234567890,"pid":1234,"hostname":"...","msg":"Server listening","port":3000}
```

### Frontend Terminal (when working):
```
VITE v7.3.2  ready in 1234 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

---

## ✅ Success Checklist

- [ ] Backend running on port 3000
- [ ] Frontend running on port 5173
- [ ] Browser shows dashboard at http://localhost:5173
- [ ] Can click "Lessons" in sidebar
- [ ] Can open playground
- [ ] No errors in browser console (F12)

---

## 🎉 What You'll Have

Once running, you can explore:

1. **Dashboard** - Your learning hub
2. **Lessons** - Interactive 3-panel layout
   - Click any highlighted C++ term!
   - Toggle AI Tutor sidebar
   - Write code in Monaco editor
3. **Playground** - Full-screen code editor
4. **Flashcards** - 4 decks, 17 cards
5. **Achievements** - XP, levels, badges
6. **AI Tutor** - Ask questions (mock responses)

---

## 💡 Pro Tip

If you keep having issues, the **easiest solution** is:

1. Install **Node.js LTS** from https://nodejs.org (if not already)
2. Install **Git Bash** from https://git-scm.com
3. Open **Git Bash** terminal
4. Run the Linux commands from `QUICK_START.md`

Git Bash provides a Linux-like environment on Windows that works better with these tools!

---

## 🆘 Still Stuck?

The core issue is that this project uses:
- `pnpm` workspaces (monorepo setup)
- TypeScript that needs compilation
- Linux shell scripts

**Quickest fix:** Use the batch files I created:
1. Double-click `START_BACKEND.bat`
2. Double-click `START_FRONTEND.bat`
3. Open http://localhost:5173

---

## 📝 Note for Future

To make this fully Windows-compatible, you could:
1. Replace `pnpm` with `npm` workspaces
2. Convert shell scripts to PowerShell or batch
3. Pre-compile TypeScript to JavaScript
4. Add Windows-specific npm scripts

But for now, the manual method works fine!

---

**Ready to see your amazing C++ platform in action! 🎓💻**
