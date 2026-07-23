/**
 * uPhumeh - Data Types for Multi-Language Content
 */

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface LessonData {
  id: string;
  title: string;
  description: string;
  order: number;
  difficulty: Difficulty;
  estimatedMinutes: number;
  content: string;
  codeExamples: CodeExample[];
  quizQuestions: QuizQuestion[];
  prerequisites: string[];
  learningObjectives: string[];
}

export interface CodeExample {
  id: string;
  title: string;
  code: string;
  explanation: string;
  language?: string;
  output?: string;
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