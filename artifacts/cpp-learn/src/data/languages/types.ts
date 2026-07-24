/**
 * uPhumeh - Data Types for Multi-Language Content
 */

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface LessonSection {
  heading?: string | null;
  body: string;
  type: 'text' | 'note' | 'warning' | 'tip' | 'code';
  code?: string | null;
  language?: string | null;
}

export interface LessonData {
  id: string;
  title: string;
  description: string;
  order: number;
  difficulty: Difficulty;
  estimatedMinutes: number;
  content: LessonSection[] | string;
  codeExamples: CodeExample[];
  quizQuestions: QuizQuestion[];
  prerequisites: string[];
  learningObjectives: string[];
  topics: string[];
  keyPoints: string[];
  nextLessonId?: string | null;
  prevLessonId?: string | null;
}

export interface CodeExample {
  id: string;
  title: string;
  code: string;
  explanation: string;
  language?: string;
  output?: string;
  runnable?: boolean;
}

export interface QuizQuestion {
  id: string;
  lessonId: string;
  type: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: Difficulty;
  codeSnippet?: string;
}

export interface GlossaryTermData {
  term: string;
  slug: string;
  shortDefinition: string;
  category: string;
  definition: string;
  whyItExists: string;
  syntax: string;
  analogy: string;
  codeExample: string;
  commonMistakes: string[];
  bestPractices: string[];
  relatedTerms: string[];
}

export interface QuizData {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  passingScore: number;
  timeLimit?: number;
  difficulty: Difficulty;
}

export interface LanguageContent {
  lessons: LessonData[];
  glossary: GlossaryTermData[];
  quizzes: QuizData[];
}