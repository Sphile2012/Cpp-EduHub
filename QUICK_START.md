# Quick Start Guide 🚀

Get the C++ learning platform running on your machine in minutes!

## Prerequisites

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **pnpm** (package manager) - [Install here](https://pnpm.io/installation)
- **Git** (optional) - [Download here](https://git-scm.com/)

## Installation Steps

### 1. Install pnpm (if not already installed)

**Windows (PowerShell):**
```powershell
iwr https://get.pnpm.io/install.ps1 -useb | iex
```

**macOS/Linux:**
```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

**Or via npm:**
```bash
npm install -g pnpm
```

### 2. Install Dependencies

Open a terminal in the project root directory:

```bash
cd Cpp-EduHub
pnpm install
```

**Note:** You may see a warning about the preinstall script failing on Windows. This is expected and won't affect the installation.

### 3. Start Development Servers

You need to run **two terminals** - one for the backend API and one for the frontend:

**Terminal 1 - Backend API:**
```bash
cd artifacts/api-server
pnpm run dev
```

The API will start on `http://localhost:3000`

**Terminal 2 - Frontend:**
```bash
cd artifacts/cpp-learn
pnpm run dev
```

The frontend will start on `http://localhost:5173`

### 4. Open in Browser

Navigate to: `http://localhost:5173`

You should see the dashboard!

---

## Project Structure

```
Cpp-EduHub/
├── artifacts/
│   ├── api-server/           # Backend Express API
│   │   ├── src/
│   │   │   ├── routes/       # API endpoints
│   │   │   ├── data/         # Lessons, quizzes, glossary
│   │   │   └── index.ts      # Server entry point
│   │   └── package.json
│   │
│   └── cpp-learn/            # Frontend React App
│       ├── src/
│       │   ├── components/   # Reusable components
│       │   │   ├── ai-tutor/
│       │   │   ├── flashcards/
│       │   │   ├── gamification/
│       │   │   ├── quiz/
│       │   │   ├── visualizer/
│       │   │   └── ui/       # Shadcn components
│       │   ├── pages/        # Route pages
│       │   └── App.tsx       # Main app component
│       └── package.json
│
├── lib/                      # Shared libraries
├── scripts/                  # Build scripts
├── IMPLEMENTATION_PLAN.md    # Development roadmap
├── FEATURES_COMPLETED.md     # What's been built
├── GETTING_STARTED.md        # Detailed setup guide
└── README.md                 # Project overview
```

---

## Available Features

### ✅ Working Features

1. **Interactive Lessons**
   - Navigate: `http://localhost:5173/lessons`
   - Click any lesson to start learning
   - Clickable C++ keywords throughout
   - AI Tutor sidebar (toggle with button)
   - Code playground on the right

2. **Code Playground**
   - Navigate: `http://localhost:5173/playground`
   - Full Monaco editor (VS Code experience)
   - Run C++ code instantly
   - Save/load from browser storage
   - Download as .cpp file

3. **AI Tutor**
   - Navigate: `http://localhost:5173/ai-tutor`
   - Chat with AI about C++ concepts
   - Code review tab
   - Currently uses mock responses (ready for OpenAI integration)

4. **Flashcards**
   - Navigate: `http://localhost:5173/flashcards`
   - 4 decks available (Basics, Pointers, OOP, STL)
   - 17 total flashcards
   - Flip animations
   - Track mastered cards

5. **Achievements**
   - Navigate: `http://localhost:5173/achievements`
   - 12+ achievements across 5 categories
   - XP and level system
   - Visual progress tracking

6. **Visualizers**
   - Automatically appear in relevant lessons
   - Loop visualizer (step-by-step execution)
   - Memory visualizer (pointers and addresses)

7. **Roadmap**
   - Navigate: `http://localhost:5173/roadmap`
   - See all lessons in order
   - Track progress visually

---

## Common Issues & Solutions

### Issue: "pnpm: command not found"
**Solution:** Install pnpm first:
```bash
npm install -g pnpm
```

### Issue: "Port 3000 already in use"
**Solution:** Kill the process using port 3000:

**Windows:**
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**macOS/Linux:**
```bash
lsof -ti:3000 | xargs kill -9
```

### Issue: "Module not found" errors
**Solution:** Clean install:
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Issue: Compilation errors in TypeScript
**Solution:** Ensure you're using Node.js v18+:
```bash
node --version
```

If lower, update Node.js.

---

## Development Commands

### Frontend (artifacts/cpp-learn)

```bash
pnpm run dev          # Start dev server
pnpm run build        # Build for production
pnpm run typecheck    # Check TypeScript types
pnpm run serve        # Preview production build
```

### Backend (artifacts/api-server)

```bash
pnpm run dev          # Start API server with hot reload
pnpm run build        # Build TypeScript
pnpm run start        # Run production build
```

### Root Level

```bash
pnpm run build        # Build all packages
pnpm run typecheck    # Check all TypeScript
```

---

## Environment Variables

### Frontend (.env file in artifacts/cpp-learn)

```env
# For real AI integration (future)
VITE_OPENAI_API_KEY=your-key-here

# For code execution (future)
VITE_JUDGE0_API_KEY=your-key-here
```

### Backend (.env file in artifacts/api-server)

```env
PORT=3000
NODE_ENV=development
```

---

## Next Steps

### Add Real AI Integration

1. Get OpenAI API key from: https://platform.openai.com/
2. Add to frontend `.env`:
   ```env
   VITE_OPENAI_API_KEY=sk-...
   ```
3. Replace mock responses in `src/components/ai-tutor/ai-chat.tsx`
4. Use the example code in `IMPLEMENTATION_PLAN.md`

### Add More Lessons

1. Edit `artifacts/api-server/src/data/lessons.ts`
2. Add new lesson objects
3. Follow the existing structure
4. Restart API server

### Add More Flashcards

1. Edit `artifacts/cpp-learn/src/pages/flashcards.tsx`
2. Add cards to `flashcardDecks` object
3. No restart needed (hot reload)

### Add More Achievements

1. Edit `artifacts/cpp-learn/src/components/gamification/achievement-system.tsx`
2. Add to `sampleAchievements` array
3. Update progress logic

---

## VS Code Setup (Recommended)

### Extensions to Install

1. **ESLint** - Code linting
2. **Prettier** - Code formatting
3. **TypeScript Vue Plugin (Volar)** - TS support
4. **Tailwind CSS IntelliSense** - CSS autocomplete
5. **Error Lens** - Inline error messages

### Workspace Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

---

## Deployment

### Deploy Frontend (Vercel)

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import repository
4. Set build settings:
   - **Root Directory:** `artifacts/cpp-learn`
   - **Build Command:** `pnpm run build`
   - **Output Directory:** `dist`
5. Add environment variables
6. Deploy!

### Deploy Backend (Railway/Render)

1. Push code to GitHub
2. Go to [Railway](https://railway.app) or [Render](https://render.com)
3. Create new service
4. Connect repository
5. Set:
   - **Root Directory:** `artifacts/api-server`
   - **Build Command:** `pnpm run build`
   - **Start Command:** `pnpm run start`
6. Add environment variables
7. Deploy!

---

## Testing

### Run Tests (when added)

```bash
pnpm run test
```

### Manual Testing Checklist

- [ ] Homepage loads
- [ ] Navigate to lessons
- [ ] Click on a lesson
- [ ] Toggle AI Tutor sidebar
- [ ] Click clickable keywords
- [ ] Write code in playground
- [ ] Run code
- [ ] Save code
- [ ] Download code
- [ ] Try flashcards
- [ ] View achievements
- [ ] Check roadmap

---

## Getting Help

- **Issues:** Check `IMPLEMENTATION_PLAN.md` for known issues
- **Features:** See `FEATURES_COMPLETED.md` for what's implemented
- **Setup:** This file for quick start
- **Detailed Guide:** See `GETTING_STARTED.md` for comprehensive setup

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## License

MIT License - See LICENSE file

---

## Author

**Phumeh Mjoli**  
Portfolio: https://uphumeh.netlify.app/Portfolio

---

**Happy Learning! 🎓💻**
