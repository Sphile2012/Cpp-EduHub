/**
 * uPhumeh - Multi-Language Data Index
 * 
 * This file exports all language-specific content data.
 * Each language has its own lessons, glossary, and quizzes.
 */

export type { LessonData, GlossaryTermData, QuizData } from './types';
export { getLessonsForLanguage, getGlossaryForLanguage, getQuizzesForLanguage } from './data-loader';