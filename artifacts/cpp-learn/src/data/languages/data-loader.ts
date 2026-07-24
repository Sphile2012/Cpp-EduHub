/**
 * uPhumeh - Data Loader for Multi-Language Content
 * 
 * This file provides functions to load language-specific content.
 * Currently, C++ content is loaded from existing data files.
 * Other languages will have their content added progressively.
 */

import type { LanguageId } from '@/config/languages';
import type { LanguageContent, LessonData, GlossaryTermData, QuizData, LessonSection } from './types';
import { glossaryTerms as cppGlossaryTerms, lessons as cppLessons, quizzes as cppQuizzes } from '@/lib/static-data';
import { pythonLessons, pythonGlossary, pythonQuizzes } from './python-content';
import { javaLessons, javaGlossary, javaQuizzes } from './java-content';

// Language content cache
const contentCache = new Map<LanguageId, LanguageContent>();

/**
 * Get content for a specific language
 */
export function getLanguageContent(language: LanguageId): LanguageContent {
  // Check cache first
  if (contentCache.has(language)) {
    return contentCache.get(language)!;
  }

  let content: LanguageContent;

  switch (language) {
    case 'cpp':
      content = getCppContent();
      break;
    case 'python':
      content = getPythonContent();
      break;
    case 'java':
      content = getJavaContent();
      break;
    case 'javascript':
      content = getJavaScriptContent();
      break;
    case 'typescript':
      content = getTypeScriptContent();
      break;
    default:
      content = getCppContent(); // Default to C++
  }

  contentCache.set(language, content);
  return content;
}

/**
 * Get lessons for a specific language
 */
export function getLessonsForLanguage(language: LanguageId): LessonData[] {
  return getLanguageContent(language).lessons;
}

/**
 * Get glossary for a specific language
 */
export function getGlossaryForLanguage(language: LanguageId): GlossaryTermData[] {
  return getLanguageContent(language).glossary;
}

/**
 * Get quizzes for a specific language
 */
export function getQuizzesForLanguage(language: LanguageId): QuizData[] {
  return getLanguageContent(language).quizzes;
}

function normalizeLessonData(lesson: Partial<LessonData> & Pick<LessonData, 'id' | 'title' | 'description' | 'order' | 'difficulty' | 'estimatedMinutes'>, index: number, total: number): LessonData {
  const content = Array.isArray(lesson.content)
    ? lesson.content
    : normalizeLessonContent(String(lesson.content ?? ''));

  const topics = lesson.topics ?? lesson.learningObjectives?.slice(0, 3) ?? ['basics'];
  const keyPoints = lesson.keyPoints ?? (lesson.learningObjectives?.length ? lesson.learningObjectives.slice(0, 4) : [lesson.description]);

  return {
    id: lesson.id,
    title: lesson.title,
    description: lesson.description,
    order: lesson.order,
    difficulty: lesson.difficulty,
    estimatedMinutes: lesson.estimatedMinutes,
    content,
    codeExamples: (lesson.codeExamples ?? []).map((example) => ({
      ...example,
      runnable: example.runnable ?? true,
    })),
    quizQuestions: lesson.quizQuestions ?? [],
    prerequisites: lesson.prerequisites ?? [],
    learningObjectives: lesson.learningObjectives ?? [],
    topics,
    keyPoints,
    nextLessonId: lesson.nextLessonId ?? (index < total - 1 ? undefined : null),
    prevLessonId: lesson.prevLessonId ?? (index > 0 ? undefined : null),
  };
}

function normalizeLessonContent(content: string): LessonSection[] {
  const trimmed = content.replace(/\r\n/g, '\n').trim();
  if (!trimmed) {
    return [{ type: 'text', body: 'No content available yet.' }];
  }

  const sections: LessonSection[] = [];
  const lines = trimmed.split('\n');
  let currentHeading: string | null = null;
  let currentBody: string[] = [];

  const flush = () => {
    const body = currentBody.join('\n').trim();
    if (body) {
      sections.push({
        type: 'text',
        heading: currentHeading ?? undefined,
        body,
      });
    }
  };

  lines.forEach((line) => {
    if (/^##\s+/.test(line)) {
      flush();
      currentHeading = line.replace(/^##\s+/, '').trim();
      currentBody = [];
      return;
    }

    if (/^#\s+/.test(line)) {
      flush();
      currentHeading = line.replace(/^#\s+/, '').trim();
      currentBody = [];
      return;
    }

    currentBody.push(line);
  });

  flush();

  return sections.length > 0 ? sections : [{ type: 'text', body: trimmed }];
}

/**
 * Get C++ content (using existing data)
 */
function getCppContent(): LanguageContent {
  // Convert existing C++ data to new format
  const lessons: LessonData[] = (cppLessons || []).map((lesson: any, index: number) => normalizeLessonData({
    ...lesson,
    content: lesson.content || '',
    codeExamples: lesson.codeExamples || [],
    quizQuestions: lesson.quizQuestions || [],
    prerequisites: lesson.prerequisites || [],
    learningObjectives: lesson.learningObjectives || [],
    topics: lesson.topics || [],
    keyPoints: lesson.keyPoints || [],
    nextLessonId: lesson.nextLessonId,
    prevLessonId: lesson.prevLessonId,
  }, index, cppLessons.length));

  const glossary: GlossaryTermData[] = cppGlossaryTerms || [];

  // cppQuizzes is a Record<string, QuizQuestion[]>, convert to QuizData[]
  const quizzes: QuizData[] = Object.entries(cppQuizzes || {}).map(([lessonId, questions]) => ({
    id: `quiz-${lessonId}`,
    title: `${lessonId} Quiz`,
    description: `Test your knowledge of ${lessonId}`,
    questions: questions.map((q: any, index: number) => ({
      id: `q-${lessonId}-${index}`,
      lessonId: lessonId,
      type: q.type || 'multiple_choice',
      question: q.question || '',
      options: q.options || [],
      correctAnswer: String(q.correctAnswer || ''),
      explanation: q.explanation || '',
      difficulty: q.difficulty || 'beginner',
    })),
    passingScore: 70,
    difficulty: 'beginner',
  }));

  return { lessons, glossary, quizzes };
}

/**
 * Get Python content
 */
function getPythonContent(): LanguageContent {
  const lessons: LessonData[] = pythonLessons.map((lesson, index) => normalizeLessonData(lesson, index, pythonLessons.length));
  const glossary: GlossaryTermData[] = pythonGlossary;
  
  // Convert pythonQuizzes Record to QuizData[]
  const quizzes: QuizData[] = Object.entries(pythonQuizzes).map(([lessonId, questions]) => ({
    id: `quiz-${lessonId}`,
    title: `${lessonId} Quiz`,
    description: `Test your knowledge of ${lessonId}`,
    questions: questions,
    passingScore: 70,
    difficulty: 'beginner',
  }));
  
  return { lessons, glossary, quizzes };
}

/**
 * Get Java content
 */
function getJavaContent(): LanguageContent {
  const lessons: LessonData[] = javaLessons.map((lesson, index) => normalizeLessonData(lesson, index, javaLessons.length));
  const glossary: GlossaryTermData[] = javaGlossary;
  
  // Convert javaQuizzes Record to QuizData[]
  const quizzes: QuizData[] = Object.entries(javaQuizzes).map(([lessonId, questions]) => ({
    id: `quiz-${lessonId}`,
    title: `${lessonId} Quiz`,
    description: `Test your knowledge of ${lessonId}`,
    questions: questions,
    passingScore: 70,
    difficulty: 'beginner',
  }));
  
  return { lessons, glossary, quizzes };
}

/**
 * Get JavaScript content (placeholder - to be expanded)
 */
function getJavaScriptContent(): LanguageContent {
  return {
    lessons: getPlaceholderLessons('javascript', 'JavaScript'),
    glossary: getPlaceholderGlossary('javascript', 'JavaScript'),
    quizzes: getPlaceholderQuizzes('javascript', 'JavaScript'),
  };
}

/**
 * Get TypeScript content (placeholder - to be expanded)
 */
function getTypeScriptContent(): LanguageContent {
  return {
    lessons: getPlaceholderLessons('typescript', 'TypeScript'),
    glossary: getPlaceholderGlossary('typescript', 'TypeScript'),
    quizzes: getPlaceholderQuizzes('typescript', 'TypeScript'),
  };
}

/**
 * Generate placeholder lessons for a language
 */
function getPlaceholderLessons(language: string, displayName: string): LessonData[] {
  return [
    {
      id: `${language}-intro`,
      title: `Introduction to ${displayName}`,
      description: `Learn the basics of ${displayName} and write your first program.`,
      order: 1,
      difficulty: 'beginner',
      estimatedMinutes: 15,
      content: `Welcome to ${displayName}! In this lesson, you'll learn...`,
      codeExamples: [],
      quizQuestions: [],
      prerequisites: [],
      learningObjectives: [
        `Understand what ${displayName} is used for`,
        'Write your first Hello World program',
        'Understand basic syntax',
      ],
      topics: ['intro', 'basics'],
      keyPoints: [`Understand what ${displayName} is used for`, 'Write your first program'],
    },
    {
      id: `${language}-variables`,
      title: `Variables and Data Types`,
      description: `Learn how to store and work with data in ${displayName}.`,
      order: 2,
      difficulty: 'beginner',
      estimatedMinutes: 20,
      content: `Variables are containers for storing data values...`,
      codeExamples: [],
      quizQuestions: [],
      prerequisites: [`${language}-intro`],
      learningObjectives: [
        'Declare and initialize variables',
        'Understand different data types',
        'Use type conversion',
      ],
      topics: ['variables', 'data'],
      keyPoints: ['Declare variables', 'Store and read data'],
    },
    {
      id: `${language}-operators`,
      title: `Operators and Expressions`,
      description: `Learn how to perform operations on data.`,
      order: 3,
      difficulty: 'beginner',
      estimatedMinutes: 20,
      content: `Operators are used to perform operations on variables and values...`,
      codeExamples: [],
      quizQuestions: [],
      prerequisites: [`${language}-variables`],
      learningObjectives: [
        'Use arithmetic operators',
        'Use comparison operators',
        'Use logical operators',
      ],
      topics: ['operators', 'expressions'],
      keyPoints: ['Use arithmetic operators', 'Compare values'],
    },
    {
      id: `${language}-conditionals`,
      title: `Conditional Statements`,
      description: `Learn how to make decisions in your code.`,
      order: 4,
      difficulty: 'beginner',
      estimatedMinutes: 25,
      content: `Conditional statements allow you to execute different code based on conditions...`,
      codeExamples: [],
      quizQuestions: [],
      prerequisites: [`${language}-operators`],
      learningObjectives: [
        'Use if statements',
        'Use else and else-if',
        'Use switch statements',
      ],
      topics: ['conditions', 'logic'],
      keyPoints: ['Branch your code', 'Handle multiple conditions'],
    },
    {
      id: `${language}-loops`,
      title: `Loops and Iteration`,
      description: `Learn how to repeat code efficiently.`,
      order: 5,
      difficulty: 'beginner',
      estimatedMinutes: 25,
      content: `Loops allow you to execute a block of code multiple times...`,
      codeExamples: [],
      quizQuestions: [],
      prerequisites: [`${language}-conditionals`],
      learningObjectives: [
        'Use for loops',
        'Use while loops',
        'Use loop control statements',
      ],
      topics: ['loops', 'iteration'],
      keyPoints: ['Repeat work with loops', 'Control loop execution'],
    },
  ];
}

/**
 * Generate placeholder glossary for a language
 */
function getPlaceholderGlossary(language: string, displayName: string): GlossaryTermData[] {
  return [
    {
      term: 'variable',
      slug: 'variable',
      shortDefinition: `A named storage location in memory that holds a value.`,
      category: 'Basics',
      definition: `A variable is a named container that stores a value in your program.`,
      whyItExists: `Variables allow you to store, retrieve, and manipulate data throughout your program.`,
      syntax: `let myVar = 42;`,
      analogy: `A variable is like a labeled box where you can store something and find it later.`,
      codeExample: `let age = 25;\nlet name = "Alice";`,
      commonMistakes: [
        'Using a variable before declaring it',
        'Using invalid characters in variable names',
      ],
      bestPractices: [
        'Use descriptive variable names',
        'Initialize variables when declaring them',
      ],
      relatedTerms: ['constant', 'data type', 'scope'],
    },
    {
      term: 'function',
      slug: 'function',
      shortDefinition: `A reusable block of code that performs a specific task.`,
      category: 'Basics',
      definition: `A function is a named section of code that performs a specific task and can be called multiple times.`,
      whyItExists: `Functions promote code reuse, organization, and make programs easier to understand and maintain.`,
      syntax: `function myFunc(param) { return param * 2; }`,
      analogy: `A function is like a recipe - you define it once and can use it whenever you need to make that dish.`,
      codeExample: `function greet(name) {\n  return "Hello, " + name;\n}`,
      commonMistakes: [
        'Forgetting to return a value when needed',
        'Using global variables inside functions',
      ],
      bestPractices: [
        'Keep functions small and focused',
        'Use descriptive function names',
        'Document parameters and return values',
      ],
      relatedTerms: ['parameter', 'return', 'scope', 'closure'],
    },
  ];
}

/**
 * Generate placeholder quizzes for a language
 */
function getPlaceholderQuizzes(language: string, displayName: string): QuizData[] {
  return [
    {
      id: `${language}-quiz-1`,
      title: `${displayName} Basics Quiz`,
      description: `Test your understanding of ${displayName} fundamentals.`,
      questions: [
        {
          id: 'q1',
          lessonId: `${language}-intro`,
          type: 'multiple_choice',
          question: `What is a variable?`,
          options: [
            'A named storage location in memory',
            'A type of loop',
            'A function parameter',
            'A comment in code',
          ],
          correctAnswer: 'A named storage location in memory',
          explanation: `A variable is a named container that stores a value in your program.`,
          difficulty: 'beginner',
        },
      ],
      passingScore: 70,
      difficulty: 'beginner',
    },
  ];
}

// Clear cache function (useful for development)
export function clearContentCache(): void {
  contentCache.clear();
}