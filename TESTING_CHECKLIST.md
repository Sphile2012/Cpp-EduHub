# Testing Checklist ✅

Use this checklist to verify all features are working correctly before sharing or deploying.

## 🚀 Initial Setup

- [ ] Node.js v18+ installed (`node --version`)
- [ ] pnpm installed (`pnpm --version`)
- [ ] Dependencies installed (`pnpm install` in root)
- [ ] No critical errors in installation

## 🔧 Development Servers

### Backend (Terminal 1)
- [ ] Navigate to `cd artifacts/api-server`
- [ ] Run `pnpm run dev`
- [ ] Server starts on port 3000
- [ ] No compilation errors
- [ ] See "Server running on port 3000" message

### Frontend (Terminal 2)
- [ ] Navigate to `cd artifacts/cpp-learn`
- [ ] Run `pnpm run dev`
- [ ] Server starts on port 5173
- [ ] Vite starts successfully
- [ ] No TypeScript errors
- [ ] Browser opens automatically (or open manually)

## 🏠 Homepage / Dashboard

- [ ] Page loads without errors
- [ ] "Master C++ For Free With Phumeh" visible
- [ ] Statistics cards display
- [ ] "Start Learning" button visible
- [ ] Navigation sidebar visible
- [ ] Progress widget in sidebar shows

## 📚 Lessons Page

- [ ] Navigate to `/lessons`
- [ ] Lesson list loads
- [ ] Each lesson shows:
  - [ ] Title
  - [ ] Description
  - [ ] Difficulty badge
  - [ ] Duration
  - [ ] Topics
- [ ] Click on any lesson
- [ ] Lesson detail page loads

## 📖 Lesson Detail Page (Three-Panel Layout)

### Left Panel - Content
- [ ] Lesson title displays
- [ ] Lesson navigation (back to lessons)
- [ ] Lesson content visible
- [ ] **Check clickable keywords:**
  - [ ] Words like "pointer", "class", "loop" are highlighted
  - [ ] Hover shows underline
  - [ ] Click opens glossary (or link to glossary)
- [ ] Code examples display with syntax highlighting
- [ ] "Load in Editor" button appears on hover
- [ ] Click loads code into right panel
- [ ] Key takeaways section at bottom
- [ ] "Mark Complete" button visible

### Middle Panel - AI Tutor (Collapsible)
- [ ] "Ask AI Tutor" button in header
- [ ] Click button to show/hide AI panel
- [ ] AI chat interface appears
- [ ] Welcome message displays
- [ ] Quick prompt buttons visible
- [ ] Can type message in input
- [ ] Click Send or press Enter
- [ ] **Mock response appears** (smart contextual answer)
- [ ] Response includes formatting
- [ ] Can have multiple back-and-forth exchanges

### Right Panel - Code Playground
- [ ] Monaco editor loads
- [ ] Syntax highlighting works
- [ ] Can type code
- [ ] Line numbers visible
- [ ] Minimap visible (small code overview)
- [ ] Tab key inserts 4 spaces
- [ ] Auto-completion suggests (type `std::` and see suggestions)
- [ ] **Run button works:**
  - [ ] Click Run (or Ctrl/Cmd+Enter)
  - [ ] Shows "Compiling & Executing..." spinner
  - [ ] Output appears in terminal section
  - [ ] Exit code shown
- [ ] **Save button works:**
  - [ ] Click save icon
  - [ ] Console shows "Code saved!"
  - [ ] Refresh page, code persists
- [ ] **Download button works:**
  - [ ] Click download icon
  - [ ] `.cpp` file downloads
  - [ ] Open file, code is correct
- [ ] **Clear button works:**
  - [ ] Click trash icon
  - [ ] Confirmation dialog appears
  - [ ] Confirm, editor resets

## 🔍 Visualizers (In Lessons)

### Loop Visualizer (Look for lessons about loops)
- [ ] Scroll to "Loop Visualizer" section
- [ ] Visualizer component displays
- [ ] Initial state shown
- [ ] **Play button:**
  - [ ] Click Play ▶
  - [ ] Animation starts
  - [ ] Iteration counter increases
  - [ ] Variable values update
  - [ ] Condition shows true/false
  - [ ] Dots animate
- [ ] **Pause button:**
  - [ ] Click Pause ⏸
  - [ ] Animation stops mid-execution
- [ ] **Reset button:**
  - [ ] Click Reset 🔄
  - [ ] Returns to initial state
- [ ] **Step button:**
  - [ ] Click Step ⏭
  - [ ] Advances one step at a time

### Memory Visualizer (Look for lessons about pointers)
- [ ] Scroll to "Memory Visualizer" section
- [ ] Visualizer component displays
- [ ] Memory cells shown with addresses
- [ ] Variable names visible
- [ ] Values displayed
- [ ] **Pointer arrows:**
  - [ ] Arrows connect pointers to values
  - [ ] Different colors for stack/heap
  - [ ] Animation smooth
- [ ] Multiple examples visible
- [ ] Each example demonstrates different concept

## 💻 Code Playground (Full Page)

- [ ] Navigate to `/playground`
- [ ] Full-screen Monaco editor loads
- [ ] Default "Hello World" code visible
- [ ] Can write code
- [ ] Run button works
- [ ] Save button works
- [ ] Download button works
- [ ] Clear button works
- [ ] Maximize/minimize buttons work
- [ ] Terminal shows output correctly
- [ ] **Test with custom code:**
  - [ ] Delete all code
  - [ ] Write: `#include <iostream>\nint main() { std::cout << "Test"; }`
  - [ ] Click Run
  - [ ] Output shows "Test"

## 🤖 AI Tutor Page

- [ ] Navigate to `/ai-tutor`
- [ ] Page loads
- [ ] Feature cards visible (Ask Questions, Code Review, etc.)
- [ ] **Chat tab:**
  - [ ] Chat interface visible
  - [ ] Can type and send messages
  - [ ] AI responds with mock answers
  - [ ] Multiple exchanges work
- [ ] **Code Review tab:**
  - [ ] Click "Code Review" tab
  - [ ] Code textarea appears
  - [ ] Can paste code
  - [ ] Review button works
  - [ ] AI gives feedback (mock)

## 🧠 Flashcards Page

- [ ] Navigate to `/flashcards`
- [ ] Page loads
- [ ] Statistics cards show (17 total cards, 4 decks)
- [ ] **Four deck cards visible:**
  - [ ] C++ Basics (blue gradient)
  - [ ] Pointers & References (purple gradient)
  - [ ] OOP (green gradient)
  - [ ] STL (orange gradient)
- [ ] Click on "C++ Basics" deck
- [ ] **Flashcard interface loads:**
  - [ ] First card shows (front side)
  - [ ] Category badge visible
  - [ ] Click card to flip
  - [ ] **Card flips with animation** (smooth 3D flip)
  - [ ] Back side shows with answer
  - [ ] Code example displayed (if applicable)
- [ ] **Mark as Mastered:**
  - [ ] Flip to back
  - [ ] Click "Mastered ✓" button
  - [ ] Card advances to next
  - [ ] Mastered count increases
- [ ] **Mark as Review:**
  - [ ] Click "Need Review ✗" button
  - [ ] Card advances
  - [ ] Review count increases
- [ ] **Navigation:**
  - [ ] Click Next button
  - [ ] Next card appears
  - [ ] Click Previous button
  - [ ] Previous card appears
- [ ] **Progress dots:**
  - [ ] Dots at bottom show all cards
  - [ ] Green = mastered
  - [ ] Amber = review
  - [ ] Gray = unseen
  - [ ] Click dot, jumps to that card
- [ ] **Shuffle button:**
  - [ ] Click Shuffle
  - [ ] Cards appear in random order
- [ ] **Reset button:**
  - [ ] Click Reset
  - [ ] Returns to start
  - [ ] Progress cleared
- [ ] Click "Back to Decks"
- [ ] Returns to deck selection

## 🏆 Achievements Page

- [ ] Navigate to `/achievements`
- [ ] Page loads
- [ ] Profile card shows:
  - [ ] Current level
  - [ ] Total XP
  - [ ] Achievement count
  - [ ] Progress bar
- [ ] **Quick stats cards:**
  - [ ] Total XP card
  - [ ] Current Level card
  - [ ] Day Streak card
  - [ ] Unlocked count card
- [ ] **Achievement categories:**
  - [ ] Learning section visible
  - [ ] Practice section visible
  - [ ] Streak section visible
  - [ ] Mastery section visible
  - [ ] Special section visible
- [ ] **Achievement cards:**
  - [ ] Unlocked achievements show icon and date
  - [ ] Locked achievements show lock icon
  - [ ] Progress bars on locked achievements
  - [ ] Tier badges (Bronze/Silver/Gold/Platinum)
  - [ ] XP rewards visible
- [ ] **At least one unlocked:**
  - [ ] "First Steps" should be unlocked
  - [ ] Green checkmark visible
  - [ ] Unlock date shown

## 🗺️ Roadmap Page

- [ ] Navigate to `/roadmap`
- [ ] Page loads
- [ ] Title "C++ Learning Roadmap" visible
- [ ] Progress overview card shows
- [ ] Completion percentage shown
- [ ] Lessons grouped by category
- [ ] **Lesson status indicators:**
  - [ ] Completed lessons (green checkmark)
  - [ ] Next lesson (highlighted)
  - [ ] Locked lessons (grayed out)
- [ ] Timeline visualization
- [ ] Can click on completed lessons
- [ ] Redirects to lesson detail

## 📖 Glossary

- [ ] Navigate to `/glossary`
- [ ] List of C++ terms loads
- [ ] Search box works
- [ ] Can filter by category
- [ ] Click any term
- [ ] **Term detail page:**
  - [ ] Definition shows
  - [ ] Category badge
  - [ ] Code examples
  - [ ] Related terms linked

## 🧭 Navigation & Sidebar

### Sidebar
- [ ] Always visible (on desktop)
- [ ] Logo/brand clickable (goes to dashboard)
- [ ] **All nav items visible:**
  - [ ] Dashboard
  - [ ] Lessons
  - [ ] Playground
  - [ ] AI Tutor
  - [ ] Glossary
  - [ ] Flashcards
  - [ ] Achievements
- [ ] Active route highlighted
- [ ] **Progress widget at bottom:**
  - [ ] Shows current level
  - [ ] Shows XP
  - [ ] Shows completion %
  - [ ] Progress bar animates

### Navigation
- [ ] Can navigate between all pages
- [ ] Back button works in browser
- [ ] URLs update correctly
- [ ] No broken links

## 🎨 Visual & UI

### Styling
- [ ] Consistent color scheme throughout
- [ ] Primary color (blue/cyan) used appropriately
- [ ] Backgrounds have subtle gradients
- [ ] Cards have shadows on hover
- [ ] Buttons have hover effects
- [ ] No layout shifts or jumps

### Animations
- [ ] Smooth page transitions
- [ ] Flashcard flip smooth
- [ ] Visualizer animations fluid
- [ ] Progress bars animate
- [ ] Buttons have click feedback

### Responsive Design
- [ ] **Desktop (1920x1080):**
  - [ ] All panels visible
  - [ ] No overflow
  - [ ] Layout looks good
- [ ] **Tablet (768px):**
  - [ ] Layout adapts
  - [ ] Sidebar may collapse
  - [ ] Content still readable
- [ ] **Mobile (375px):**
  - [ ] Stacked layout
  - [ ] All content accessible
  - [ ] No horizontal scroll
  - [ ] Touch targets large enough

## ⌨️ Keyboard Shortcuts

- [ ] **In Monaco Editor:**
  - [ ] Tab = indent (4 spaces)
  - [ ] Ctrl/Cmd + Enter = Run code
  - [ ] Ctrl/Cmd + S = Save (browser default)
- [ ] **In Flashcards:** (planned)
  - [ ] Space = flip
  - [ ] Arrow keys = navigate

## 🔄 State Persistence

### localStorage
- [ ] Write code in playground
- [ ] Refresh page
- [ ] Code persists
- [ ] Mark lesson complete
- [ ] Refresh page
- [ ] Lesson still marked complete
- [ ] Master flashcards
- [ ] Progress tracked across page loads

## 🐛 Error Handling

### Network Errors
- [ ] Stop backend API server
- [ ] Try to load lessons
- [ ] Error message appears (not crash)
- [ ] Graceful fallback

### Invalid Routes
- [ ] Go to `/invalid-page`
- [ ] 404 page or redirect works
- [ ] Not broken

### Console
- [ ] Open browser DevTools
- [ ] Check Console tab
- [ ] No critical errors (red)
- [ ] Warnings are acceptable (yellow)

## 🚀 Performance

### Load Times
- [ ] Homepage loads < 2 seconds
- [ ] Lesson page loads < 1 second
- [ ] Monaco editor loads < 2 seconds
- [ ] Code execution < 3 seconds

### Smooth Performance
- [ ] No lag when typing in editor
- [ ] Animations are smooth (60fps)
- [ ] No freezing or blocking
- [ ] Responsive to clicks

## 📱 Browser Testing

### Chrome/Edge (Chromium)
- [ ] All features work
- [ ] No console errors
- [ ] Visual as expected

### Firefox
- [ ] All features work
- [ ] Monaco editor loads
- [ ] Animations smooth

### Safari (if on Mac)
- [ ] Page loads
- [ ] Monaco editor works
- [ ] No major issues

## ✅ Final Checks

### Content
- [ ] All lesson text readable
- [ ] Code examples correct
- [ ] No placeholder text ("Lorem ipsum")
- [ ] No "TODO" comments visible to users

### Polish
- [ ] Spelling correct
- [ ] Grammar correct
- [ ] Consistent terminology
- [ ] Professional appearance

### Documentation
- [ ] README.md accurate
- [ ] QUICK_START.md complete
- [ ] All docs up to date

## 🎉 Ready for Demo!

If all items above are checked, your platform is **ready to showcase**! 🚀

---

## 🐛 If Something Doesn't Work

### Checklist:
1. ✅ Both servers running?
   - Backend on :3000
   - Frontend on :5173
2. ✅ Dependencies installed?
   - Run `pnpm install` in root
3. ✅ No port conflicts?
   - Kill processes on 3000 and 5173
4. ✅ Browser cache cleared?
   - Hard refresh (Ctrl+Shift+R)
5. ✅ Check console for errors
   - Red errors need fixing

### Common Fixes:
- **Monaco not loading:** Refresh page
- **Code not running:** Check backend is running
- **AI not responding:** Check network tab (should see API calls)
- **Visualizers not animating:** Check browser console

---

## 📊 Testing Summary Template

Use this to document your testing:

```
Date Tested: ___________
Browser: ___________
OS: ___________

Features Tested:
- [ ] Lessons
- [ ] Playground
- [ ] AI Tutor
- [ ] Flashcards
- [ ] Achievements
- [ ] Visualizers

Issues Found:
1. ___________
2. ___________

Overall Status: [ ] Pass  [ ] Fail

Notes:
___________
```

---

**Happy Testing! 🧪**

Remember: This is a comprehensive checklist. Not everything needs to be perfect on first try. Focus on core features first!
