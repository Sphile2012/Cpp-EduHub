# How to Run on Windows 🪟

## The Issue
The project has Linux/Mac scripts that don't work directly on Windows. I've created Windows-compatible batch files for you!

## ✅ Quick Start (Use These!)

### Method 1: Double-Click Batch Files (Easiest!)

1. **Navigate to the project folder:**
   ```
   C:\Users\Phumeh\Downloads\kunzima\Cpp-EduHub
   ```

2. **Double-click these files:**
   - `START_BACKEND.bat` (opens backend server in one window)
   - `START_FRONTEND.bat` (opens frontend server in another window)

3. **Wait for both to start** (you'll see output in the windows)

4. **Open browser:**
   ```
   http://localhost:5173
   ```

### Method 2: Manual Commands

**Terminal 1 - Backend:**
```cmd
cd C:\Users\Phumeh\Downloads\kunzima\Cpp-EduHub\artifacts\api-server
set PORT=3000
set NODE_ENV=development
npx ts-node src/index.ts
```

**Terminal 2 - Frontend:**
```cmd
cd C:\Users\Phumeh\Downloads\kunzima\Cpp-EduHub\artifacts\cpp-learn
npm run dev
```

---

## 🐛 If You Get Errors

### "tsx not found" or "esbuild error"

The project uses `pnpm` which has some compatibility issues on Windows. Let's use `npm` instead:

1. **Delete `node_modules` folders:**
   ```cmd
   cd C:\Users\Phumeh\Downloads\kunzima\Cpp-EduHub
   rmdir /s /q node_modules
   cd artifacts\api-server
   rmdir /s /q node_modules
   cd ..\cpp-learn
   rmdir /s /q node_modules
   ```

2. **Install with npm:**
   ```cmd
   cd C:\Users\Phumeh\Downloads\kunzima\Cpp-EduHub\artifacts\api-server
   npm install
   
   cd ..\cpp-learn
   npm install
   ```

3. **Run the servers:**
   - Double-click `START_BACKEND.bat`
   - Double-click `START_FRONTEND.bat`

### "Port 3000 already in use"

Kill the process using the port:
```cmd
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

Replace `<PID_NUMBER>` with the number you see.

### "Module not found"

Install dependencies:
```cmd
cd C:\Users\Phumeh\Downloads\kunzima\Cpp-EduHub\artifacts\api-server
npm install

cd ..\cpp-learn
npm install
```

---

## 📝 What The Servers Do

### Backend (Port 3000)
- Serves lesson data
- Provides API endpoints
- Handles code execution

### Frontend (Port 5173)
- React development server
- Hot reload enabled
- Serves the web app

---

## ✅ You're Ready When You See:

**Backend Terminal:**
```
Server listening on port 3000
```

**Frontend Terminal:**
```
VITE v7.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

---

## 🎉 Then Open Browser

Visit: **http://localhost:5173**

You should see the dashboard!

---

## 💡 Tips

1. **Keep both terminal windows open** while using the app
2. **Press Ctrl+C** in either terminal to stop that server
3. **Refresh browser** (Ctrl+R) if something doesn't load
4. **Clear cache** (Ctrl+Shift+R) if you see old content

---

## 🔧 Alternative: Use VS Code

1. Open the project in VS Code
2. Open two terminals (Terminal menu → New Terminal)
3. In Terminal 1:
   ```bash
   cd artifacts/api-server
   $env:PORT="3000"
   $env:NODE_ENV="development"
   npx ts-node src/index.ts
   ```
4. In Terminal 2:
   ```bash
   cd artifacts/cpp-learn
   npm run dev
   ```

---

## 📱 Access Points

Once running, you can access:

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000
- **API Health:** http://localhost:3000/health

---

## ⚠️ Common Windows Issues

### Issue: "sh: command not found"
**Cause:** Project has Linux scripts  
**Solution:** Use the `.bat` files I created instead

### Issue: "pnpm: command not recognized"
**Solution:** Use `npm` instead:
```cmd
npm install
npm run dev
```

### Issue: Scripts fail with "export not recognized"
**Cause:** Windows uses `set` not `export`  
**Solution:** Use the batch files or manual commands above

---

## 🎯 What to Try First

1. ✅ Use the batch files (`START_BACKEND.bat` and `START_FRONTEND.bat`)
2. ✅ If that doesn't work, install with npm and try again
3. ✅ If still issues, use the manual commands

---

## 🆘 Need More Help?

Check these files in the project:
- **START_HERE.md** - General overview
- **QUICK_START.md** - Setup guide (Linux/Mac focused)
- **TESTING_CHECKLIST.md** - What to test

---

**Once both servers are running, explore your amazing C++ learning platform! 🚀**
