# Adaptive Assessment System - Requirements Specification

## 1. Overview

### 1.1 Purpose
Transform the C++ learning platform from a basic quiz system into an intelligent, adaptive assessment ecosystem that personalizes the learning journey for each student through:
- Dynamic question generation
- Auto-grading with immediate feedback
- Interactive term definitions
- Enhanced code execution with visible output
- Improved navigation and user experience

### 1.2 Current State Analysis

**What Works:**
- ✅ Basic quiz structure with multiple question types (multiple choice, true/false, predict output)
- ✅ Progress tracking and scoring
- ✅ Hamburger menu navigation (mobile and desktop)
- ✅ AI Tutor integration
- ✅ Code playground with Monaco editor
- ✅ Dark mode by default
- ✅ PWA support

**What Needs Improvement:**
- ❌ Quiz questions are limited (need 100+ questions per topic)
- ❌ No auto-grading feedback showing correct answers immediately
- ❌ Terminal output not visible when running code
- ❌ Interactive term definitions not working (loading state)
- ❌ Blank page issues after deployment
- ❌ No adaptive difficulty
- ❌ No spaced repetition system

### 1.3 Goals
- **Immediate Priority:** Fix critical UX issues (output visibility, term definitions, auto-grading)
- **Short-term:** Expand question bank and improve quiz feedback
- **Medium-term:** Implement adaptive difficulty and personalized learning paths
- **Long-term:** Add spaced repetition and advanced gamification

---

## 2. Critical Fixes (Phase 0 - Immediate)

### FR-CF-001: Fix Code Execution Output Display
**Priority:** CRITICAL  
**Current Issue:** When users run code in playground, output terminal is empty or not visible  
**Acceptance Criteria:**
- Code execution results must display clearly in output panel
- Compilation errors must show in red with line numbers
- Successful output must show stdout in monospace font
- Execution time and memory usage should be displayed
- "Process finished with exit code X" message should be visible
- Loading state while code executes
- Clear distinction between stdout, stderr, and compilation errors

**Technical Implementation:**
```typescript
// Output Panel Component
<div className="output-panel">
  {isExecuting && <Spinner />}
  {error && <ErrorDisplay error={error} />}
  {result && (
    <>
      <OutputSection title="Output" content={result.stdout} />
      {result.stderr && <ErrorSection content={result.stderr} />}
      <MetaInfo 
        exitCode={result.exitCode}
        executionTime={result.time}
        memory={result.memory}
      />
    </>
  )}
</div>
```

### FR-CF-002: Fix Interactive Term Definitions
**Priority:** CRITICAL  
**Current Issue:** Clicking on terms shows "loading" indefinitely  
**Acceptance Criteria:**
- Clicking on C++ keywords (vector, pointer, class, etc.) shows immediate popover
- Popover displays:
  - Term name
  - Short definition (1-2 sentences)
  - Code example (syntax-highlighted)
  - "Learn More" link to glossary
  - Related terms as clickable links
- No loading state - data should be embedded/cached
- Works across all lesson content, quiz questions, and AI responses
- Mobile-friendly (modal on small screens, popover on desktop)
- Smooth fade-in animation (200ms)

**Technical Implementation:**
```typescript
// Pre-load term definitions in app initialization
const termDefinitions = {
  vector: {
    name: "vector",
    shortDef: "A dynamic array from STL that grows automatically",
    example: "vector<int> nums = {1, 2, 3};",
    glossarySlug: "vector",
    related: ["array", "stl", "dynamic-memory"]
  },
  // ... 50+ more terms
};

// Component
<Popover>
  <PopoverTrigger>
    <span className="term-link">{term}</span>
  </PopoverTrigger>
  <PopoverContent>
    <TermDefinitionCard term={termDefinitions[term]} />
  </PopoverContent>
</Popover>
```

### FR-CF-003: Fix Blank Page After Deployment
**Priority:** CRITICAL  
**Current Issue:** App shows blank page after Netlify deployment  
**Root Causes:**
- BASE_URL configuration mismatch
- Router base path not set correctly
- Missing redirects configuration for SPA
- Build artifacts not in correct directory

**Acceptance Criteria:**
- App loads correctly on deployment URL
- All routes work (no 404 on refresh)
- Assets load from correct paths
- Console has no errors
- Service worker registers successfully

**Technical Fixes:**
```toml
# netlify.toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build]
  publish = "dist"
  command = "npm run build"
```

```typescript
// vite.config.ts
export default defineConfig({
  base: './', // Relative paths
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'wouter']
        }
      }
    }
  }
});
```

### FR-CF-004: Enhanced Quiz Auto-Grading Feedback
**Priority:** HIGH  
**Current Issue:** Quiz shows "Incorrect" but doesn't immediately show correct answer  
**Acceptance Criteria:**
- When user selects wrong answer, correct answer highlights in green
- Wrong answer highlights in red with X icon
- Correct answer shows checkmark icon
- Explanation card appears immediately (not after clicking "Next")
- Explanation includes:
  - "Correct!" or "Incorrect" header
  - Why the answer is correct/wrong
  - Code example if applicable
  - "Try Again" button (resets current question only)
- Score updates in real-time
- Visual feedback animation (shake for wrong, bounce for correct)

**UI Mock:**
```
┌─────────────────────────────────────┐
│ Question: What does vector do?     │
├─────────────────────────────────────┤
│ ○ Fixed-size array                 │
│ ✓ Dynamic array (selected: WRONG) │ ← Red background
│ ✓ Dynamic array that grows      │ ← Green background, checkmark
│ ○ Linked list                      │
├─────────────────────────────────────┤
│ ❌ Incorrect                        │
│ A vector is a dynamic array that  │
│ automatically resizes when you add│
│ elements. See example:            │
│                                     │
│ vector<int> nums;                  │
│ nums.push_back(1); // grows auto  │
│                                     │
│ [Try Again] [Next Question]       │
└─────────────────────────────────────┘
```

---

## 3. Question Bank Expansion (Phase 1)

### FR-QB-001: Comprehensive Question Database
**Priority:** HIGH  
**Target:** 100+ questions per major topic  

**Topics & Question Counts:**
- Variables & Data Types: 100 questions
- Operators & Expressions: 100 questions
- Control Flow (if/else, switch): 100 questions
- Loops (for, while, do-while): 100 questions
- Functions & Scope: 100 questions
- Arrays & Strings: 100 questions
- Pointers & References: 150 questions
- Memory Management: 100 questions
- Classes & Objects: 150 questions
- Inheritance & Polymorphism: 100 questions
- STL Containers: 120 questions
- Templates: 80 questions
- Exception Handling: 60 questions

**Question Types Distribution (per topic):**
- 40% Multiple Choice
- 20% True/False
- 20% Predict Output (code snippets)
- 10% Fill in the Blank
- 10% Debugging/Error Identification

**Question Structure:**
```typescript
interface QuizQuestion {
  id: string;
  lessonId: string;
  topic: string;
  subtopic?: string;
  type: "multiple_choice" | "true_false" | "predict_output" | "fill_blank" | "identify_error";
  difficulty: "beginner" | "intermediate" | "advanced" | "expert";
  question: string;
  codeSnippet?: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  commonMistake?: string; // Why students get this wrong
  relatedConcepts: string[]; // Tags for adaptive selection
  estimatedTime: number; // Seconds
}
```

**Example Questions:**

```typescript
// Beginner - Loops
{
  id: "loop-001",
  lessonId: "loops",
  topic: "Loops",
  subtopic: "for-loop-basics",
  type: "predict_output",
  difficulty: "beginner",
  question: "What is the output of this code?",
  codeSnippet: `for (int i = 0; i < 3; i++) {
    cout << i << " ";
}`,
  options: ["0 1 2", "0 1 2 3", "1 2 3", "0 1"],
  correctAnswer: "0 1 2",
  explanation: "The loop starts at i=0, runs while i<3, so outputs 0, 1, 2 (three iterations). i<3 fails when i=3.",
  commonMistake: "Students often think '<' includes the upper bound",
  relatedConcepts: ["for-loop", "loop-condition", "iteration"],
  estimatedTime: 30
}

// Intermediate - Pointers
{
  id: "ptr-045",
  lessonId: "pointers-memory",
  topic: "Pointers",
  subtopic: "pointer-arithmetic",
  type: "predict_output",
  difficulty: "intermediate",
  question: "What does this code print?",
  codeSnippet: `int arr[] = {10, 20, 30};
int* p = arr;
cout << *(p + 1);`,
  options: ["10", "20", "30", "Address of arr[1]"],
  correctAnswer: "20",
  explanation: "p points to arr[0]. p+1 advances to arr[1]. *(p+1) dereferences, giving 20.",
  commonMistake: "Confusing pointer arithmetic with regular addition",
  relatedConcepts: ["pointer-arithmetic", "array-decay", "dereferencing"],
  estimatedTime: 45
}

// Advanced - Memory Management
{
  id: "mem-078",
  lessonId: "pointers-memory",
  topic: "Memory Management",
  subtopic: "memory-leaks",
  type: "identify_error",
  difficulty: "advanced",
  question: "Identify the memory leak in this code:",
  codeSnippet: `void process() {
    int* data = new int[100];
    // ... use data ...
    if (errorOccurs) return;
    delete[] data;
}`,
  correctAnswer: "If errorOccurs is true, function returns without calling delete[]",
  explanation: "The early return skips the delete[] statement. Fix: use smart pointers (unique_ptr) or ensure delete[] in all code paths.",
  commonMistake: "Forgetting that exceptions or early returns skip cleanup",
  relatedConcepts: ["memory-leak", "raii", "smart-pointers"],
  estimatedTime: 60
}
```

### FR-QB-002: Question Variants & Randomization
**Priority:** MEDIUM  
**Description:** Generate question variants to prevent memorization  
**Acceptance Criteria:**
- Variable names randomized (x, num, value, count, data)
- Numeric values randomized within constraints
- Scenario contexts varied (banking, shopping, games, student records)
- Code structure altered while preserving concept
- Same question never shown twice to same user in single session
- Variants tracked in database to ensure quality

**Implementation:**
```typescript
// Question Template System
const template = {
  question: "What is the output of this code?",
  codeTemplate: `int {var1} = {num1};
int {var2} = {num2};
cout << {var1} + {var2};`,
  variants: {
    var1: ["x", "a", "num", "first"],
    var2: ["y", "b", "count", "second"],
    num1: [5, 10, 15, 20],
    num2: [3, 7, 12, 8]
  },
  generateCorrectAnswer: (values) => values.num1 + values.num2
};

// Generate unique variant
function generateVariant(template, usedVariants) {
  let variant;
  do {
    variant = {
      var1: randomFrom(template.variants.var1),
      var2: randomFrom(template.variants.var2),
      num1: randomFrom(template.variants.num1),
      num2: randomFrom(template.variants.num2)
    };
  } while (isUsed(variant, usedVariants));
  
  return {
    code: fillTemplate(template.codeTemplate, variant),
    correctAnswer: template.generateCorrectAnswer(variant)
  };
}
```

---

## 4. Adaptive Assessment Engine (Phase 2)

### FR-AA-001: Performance Tracking
**Priority:** MEDIUM  
**Acceptance Criteria:**
- Track every answer: questionId, correct/incorrect, time taken, timestamp
- Calculate mastery scores per concept (0-100%)
- Identify strengths (>85% accuracy) and weaknesses (<70%)
- Store locally (localStorage) and sync to server if logged in
- Dashboard visualization: concept mastery bars, recent quiz history

### FR-AA-002: Adaptive Difficulty Scaling
**Priority:** MEDIUM  
**Acceptance Criteria:**
- Start each new topic at Beginner level
- After 3 consecutive correct answers: move up one level
- After 2 consecutive incorrect answers: move down one level
- Levels: Beginner → Intermediate → Advanced → Expert
- User can manually override difficulty
- Show current difficulty badge on quiz page

### FR-AA-003: Next Question Selection Algorithm
**Priority:** MEDIUM  
**Algorithm:**
```typescript
function selectNextQuestion(user: UserProgress, topic: string) {
  // 1. Filter available questions
  const pool = questions.filter(q => 
    q.topic === topic &&
    !user.answeredToday.includes(q.id) &&
    q.difficulty === user.currentDifficulty[topic]
  );

  // 2. Prioritize weak concepts
  const weakConcepts = user.conceptScores
    .filter(c => c.score < 70)
    .map(c => c.name);
  
  const prioritized = pool.filter(q =>
    q.relatedConcepts.some(c => weakConcepts.includes(c))
  );

  // 3. Select random from prioritized or full pool
  const candidates = prioritized.length > 0 ? prioritized : pool;
  return randomFrom(candidates);
}
```

---

## 5. Spaced Repetition System (Phase 3)

### FR-SR-001: Review Scheduling
**Priority:** LOW  
**Algorithm:** SM-2 (SuperMemo 2)  
**Intervals:**
- First review: 1 day after learning
- Second review: 3 days after 1st
- Third review: 7 days after 2nd
- Fourth review: 14 days after 3rd
- Fifth review: 30 days after 4th

**Acceptance Criteria:**
- "Review Due" badge on dashboard
- Review session: 5-10 questions on due concepts
- Mix of question types
- Reset interval if answered incorrectly
- Notification when reviews are due

---

## 6. Enhanced Interactive Term Definitions (Phase 1)

### FR-IT-001: Clickable Terms Throughout App
**Priority:** HIGH  
**Acceptance Criteria:**
- 50+ C++ terms automatically linked in all content
- Popover/modal with:
  - Term name and pronunciation (if non-obvious)
  - Short definition (1-2 sentences)
  - Syntax example (syntax-highlighted)
  - "Learn More" → Glossary detail page
  - Related terms (clickable)
  - "Quiz Me" button (3 quick questions)
- Works in: lessons, quizzes, AI responses, playground comments
- Mobile: modal with backdrop blur
- Desktop: popover near clicked term
- Keyboard accessible (Tab to term, Enter to open)

**Term List (Priority):**
```typescript
const cppTerms = [
  // Basics
  "variable", "const", "int", "double", "char", "bool", "string",
  "operator", "expression", "statement", "function", "return",
  
  // Control Flow
  "if", "else", "switch", "case", "for", "while", "do-while",
  "break", "continue",
  
  // Functions & Memory
  "pointer", "reference", "address", "dereference", "new", "delete",
  "stack", "heap", "memory-leak", "nullptr",
  
  // OOP
  "class", "object", "constructor", "destructor", "inheritance",
  "polymorphism", "encapsulation", "virtual", "override", "public",
  "private", "protected",
  
  // STL
  "vector", "array", "map", "set", "list", "queue", "stack",
  "iterator", "algorithm", "template",
  
  // Advanced
  "namespace", "typedef", "auto", "lambda", "rvalue", "move",
  "smart-pointer", "unique_ptr", "shared_ptr", "exception"
];
```

### FR-IT-002: Term Definition Data Structure
```typescript
interface TermDefinition {
  id: string;
  name: string;
  category: "keyword" | "concept" | "stl" | "operator";
  shortDefinition: string; // < 150 chars
  example: string; // Syntax-highlighted code
  pronunciation?: string; // "iter-ate-or"
  commonMistakes?: string[];
  glossarySlug: string;
  relatedTerms: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
}

// Example
const termData: Record<string, TermDefinition> = {
  "vector": {
    id: "vector",
    name: "vector",
    category: "stl",
    shortDefinition: "A dynamic array from the STL that automatically resizes as elements are added or removed.",
    example: `vector<int> nums = {1, 2, 3};
nums.push_back(4); // Now {1,2,3,4}`,
    commonMistakes: [
      "Forgetting to #include <vector>",
      "Using nums[i] without checking size"
    ],
    glossarySlug: "vector",
    relatedTerms: ["array", "stl", "push_back", "iterator"],
    difficulty: "beginner"
  }
};
```

---

## 7. Code Playground Enhancements (Phase 1)

### FR-CP-001: Visible Output Terminal
**Priority:** CRITICAL (already in Phase 0)  

### FR-CP-002: Built-in Compiler Fallback
**Priority:** HIGH  
**Current Issue:** "Connection Error: Failed to fetch" when Judge0 API unavailable  
**Acceptance Criteria:**
- If API fails, show clear error with fallback options:
  1. Copy code → Use Compiler Explorer link
  2. Copy code → Use OnlineGDB link
  3. Instructions to install g++ locally
- "Retry" button to attempt API again
- Automatic retry with exponential backoff (3 attempts)
- Status indicator: "Connected" / "Offline" / "Retrying"

**Future Enhancement:** WASM-based local C++ compiler (cppp.wasm)

### FR-CP-003: Code Templates & Examples
**Priority:** MEDIUM  
**Acceptance Criteria:**
- "Templates" dropdown in playground
- Pre-built templates:
  - Hello World
  - User Input
  - Loops Practice
  - Array Operations
  - Class Definition
  - File I/O
  - Exception Handling
- One-click load template
- Templates include explanatory comments

---

## 8. Gamification Enhancements (Phase 3)

### FR-GM-001: Expanded Achievement Badges
**Current:** Basic badges  
**Target:** 50+ badges across categories  

**Badge Categories:**
- **Concept Mastery:** "Pointer Pro", "Loop Master", "Class Architect"
- **Streaks:** "7-Day Warrior", "30-Day Champion", "100-Day Legend"
- **Speed:** "Lightning Coder" (answer in < 10s), "Quick Draw"
- **Perfection:** "Perfect Score", "Flawless Run" (10 correct in a row)
- **Milestones:** "First Lesson", "Quiz Master" (100 questions), "Code Warrior" (50 playground runs)
- **Special:** "Night Owl" (complete lesson after 11pm), "Early Bird" (before 6am)

### FR-GM-002: Leaderboards
**Priority:** LOW  
**Types:**
- Global leaderboard (all users)
- Weekly leaderboard (resets Monday)
- Friends leaderboard (if social features added)
**Ranked by:** XP, quiz accuracy, streak length  
**Privacy:** Opt-in only

---

## 9. Technical Architecture

### 9.1 Technology Stack
**Frontend:**
- React 18 + TypeScript
- Vite (build tool)
- Wouter (routing)
- TanStack Query (data fetching)
- Tailwind CSS + shadcn/ui
- Monaco Editor (code editing)
- Framer Motion (animations)

**Backend:**
- Express.js + TypeScript
- In-memory data store (for now)
- Future: PostgreSQL + Prisma ORM

**Code Execution:**
- Primary: Judge0 API
- Fallback: Compiler Explorer, OnlineGDB
- Future: WASM compiler (cppp.wasm)

### 9.2 Data Storage Strategy
**Phase 1:** LocalStorage (current)
```typescript
{
  completedLessons: string[];
  quizScores: Record<string, number>;
  answeredQuestions: string[]; // today only
  conceptScores: Record<string, number>;
  streak: number;
  lastLogin: string;
  xp: number;
  level: number;
}
```

**Phase 2:** Sync to backend (optional account)
- JWT authentication
- Periodic sync (every 5 minutes)
- Offline-first: queue changes, sync when online

### 9.3 Performance Targets
- Page load: < 2s (on 3G)
- Quiz question load: < 500ms
- Code execution: < 3s (95th percentile)
- Term definition popover: < 100ms (instant feel)
- Lighthouse score: > 90 (all categories)

---

## 10. Implementation Roadmap

### Phase 0: Critical Fixes (Week 1)
- [ ] Fix code execution output display (FR-CF-001)
- [ ] Fix interactive term definitions (FR-CF-002)
- [ ] Fix blank page deployment issue (FR-CF-003)
- [ ] Enhanced quiz auto-grading feedback (FR-CF-004)

### Phase 1: Core Enhancements (Weeks 2-4)
- [ ] Expand question bank to 500+ questions (FR-QB-001)
- [ ] Implement question variants (FR-QB-002)
- [ ] Add 50+ interactive term definitions (FR-IT-001)
- [ ] Code playground improvements (FR-CP-002, FR-CP-003)
- [ ] Performance tracking (FR-AA-001)

### Phase 2: Adaptive Learning (Weeks 5-7)
- [ ] Adaptive difficulty scaling (FR-AA-002)
- [ ] Smart question selection (FR-AA-003)
- [ ] Personalized learning paths
- [ ] Strengths/weaknesses dashboard

### Phase 3: Advanced Features (Weeks 8-12)
- [ ] Spaced repetition system (FR-SR-001)
- [ ] Advanced gamification (FR-GM-001, FR-GM-002)
- [ ] WASM compiler integration
- [ ] User accounts & cloud sync
- [ ] Mobile app (React Native)

---

## 11. Success Metrics

### User Engagement
- **Target:** 15+ minutes average session duration
- **Target:** 70%+ 7-day retention rate
- **Target:** 3+ quizzes completed per user per week

### Learning Effectiveness
- **Target:** 75%+ quiz pass rate (>70% score)
- **Target:** 20%+ improvement in concept mastery over 30 days
- **Target:** 85%+ user satisfaction (post-quiz survey)

### Technical Performance
- **Target:** < 2s page load time (desktop)
- **Target:** < 3s code execution time (p95)
- **Target:** < 1% error rate (API calls)
- **Target:** 99.5% uptime

---

## 12. Open Questions & Decisions

1. **AI Model for Answer Evaluation:** Use GPT-4 for short-answer grading? (Cost: ~$0.03 per evaluation)
2. **Question Bank Creation:** Manual creation vs. AI-generated + manual review?
3. **Premium Features:** All free, or freemium model (free core + paid advanced challenges)?
4. **Mobile App:** PWA sufficient, or native iOS/Android?
5. **Social Features:** Add friends, code sharing, peer review?
6. **Compiler:** Wait for WASM maturity, or build custom backend compiler service?

---

## 13. Dependencies & Blockers

**Dependencies:**
- Judge0 API (or alternative like Piston API)
- OpenAI API (for AI tutor, optional for quiz grading)
- Netlify/Vercel (deployment platform)

**Potential Blockers:**
- API rate limits (Judge0: 50 requests/day on free tier)
- Browser compatibility (WASM, Service Workers)
- Mobile performance (Monaco Editor heavy on mobile)

**Mitigation:**
- Self-host compiler backend (Piston API open-source)
- Lightweight editor fallback for mobile (CodeMirror)
- Aggressive caching (Service Worker + IndexedDB)

---

## 14. Testing Strategy

### Unit Tests
- Question selection algorithm
- Difficulty scaling logic
- Score calculation
- Term linkification parser

### Integration Tests
- Quiz flow: question → answer → feedback → next
- Code execution: submit → compile → run → output
- Progress tracking: complete quiz → save → retrieve

### E2E Tests (Playwright)
- User completes full quiz
- User clicks term → sees definition
- User runs code → sees output
- Mobile navigation works

### Performance Tests
- Lighthouse CI (every deployment)
- Bundle size monitoring (< 500KB initial JS)
- Code execution latency tracking

---

## 15. Security & Privacy

### Data Privacy
- **Local-first:** All progress stored locally by default
- **Optional account:** Cloud sync only if user creates account
- **No tracking:** No Google Analytics, Mixpanel, etc. (use privacy-friendly Plausible)
- **Export data:** Users can export all their data as JSON
- **Delete data:** One-click account deletion with data purge

### Code Execution Security
- **Sandboxed:** All user code runs in isolated environment
- **Resource limits:** 5s timeout, 256MB memory, no network access
- **Input sanitization:** Validate all code before sending to API
- **Rate limiting:** Max 50 executions per user per hour

---

## 16. Accessibility (WCAG 2.1 AA)

### Requirements
- [ ] Keyboard navigation (Tab, Enter, Escape work everywhere)
- [ ] Screen reader support (ARIA labels on all interactive elements)
- [ ] High contrast mode (optional theme)
- [ ] Text resizing (no layout breaks at 200% zoom)
- [ ] Focus indicators (visible keyboard focus)
- [ ] Alt text on all images/icons
- [ ] Captions on video content (if added)
- [ ] Color not sole indicator (use icons + color)

---

**Document Version:** 1.0  
**Last Updated:** {{ current_date }}  
**Author:** Phumeh Mjoli  
**Status:** Draft → Ready for Implementation

---

## Next Steps

1. **Review this spec** with stakeholders
2. **Prioritize Phase 0 tasks** (critical fixes)
3. **Create GitHub issues** for each FR- item
4. **Set up project board** (Kanban)
5. **Begin implementation** starting with FR-CF-001 (output display)

---

**Questions or feedback?**  
Open an issue on GitHub or email: support@cpplearn.dev
