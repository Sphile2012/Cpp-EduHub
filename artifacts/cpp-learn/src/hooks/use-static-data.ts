// Hooks that use static data instead of API calls
// This provides the same interface as the API hooks but with instant loading

import { useMemo } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { getLessonsForLanguage, getGlossaryForLanguage, getQuizzesForLanguage } from '@/data/languages';
import { DEFAULT_LANGUAGE } from '@/config/languages';

export function useGetLessons() {
  const { currentLanguage } = useLanguage();
  const data = useMemo(() => getLessonsForLanguage(currentLanguage ?? DEFAULT_LANGUAGE), [currentLanguage]);

  return {
    data,
    isLoading: false,
    error: null
  };
}

export function useGetLesson(id: string) {
  const { currentLanguage } = useLanguage();
  const lessons = useMemo(() => getLessonsForLanguage(currentLanguage ?? DEFAULT_LANGUAGE), [currentLanguage]);
  const data = useMemo(() => lessons.find((lesson) => lesson.id === id), [id, lessons]);

  return {
    data,
    isLoading: false,
    error: data ? null : new Error('Lesson not found')
  };
}

export function useGetGlossary() {
  const { currentLanguage } = useLanguage();
  const data = useMemo(() => getGlossaryForLanguage(currentLanguage ?? DEFAULT_LANGUAGE), [currentLanguage]);

  return {
    data,
    isLoading: false,
    error: null
  };
}

export function useGetGlossaryTerm(slug: string) {
  const { currentLanguage } = useLanguage();
  const glossary = useMemo(() => getGlossaryForLanguage(currentLanguage ?? DEFAULT_LANGUAGE), [currentLanguage]);
  const data = useMemo(() => glossary.find((term) => term.slug === slug), [glossary, slug]);

  return {
    data,
    isLoading: false,
    error: data ? null : new Error('Term not found')
  };
}

export function useGetLessonQuiz(lessonId: string) {
  const { currentLanguage } = useLanguage();
  const quizzes = useMemo(() => getQuizzesForLanguage(currentLanguage ?? DEFAULT_LANGUAGE), [currentLanguage]);
  const data = useMemo(() => quizzes.find((quiz) => quiz.id === `quiz-${lessonId}`)?.questions ?? [], [lessonId, quizzes]);

  return {
    data,
    isLoading: false,
    error: null
  };
}

export function useGetProgress() {
  // Return empty progress since we're using local storage
  return {
    data: null,
    isLoading: false,
    error: null
  };
}
