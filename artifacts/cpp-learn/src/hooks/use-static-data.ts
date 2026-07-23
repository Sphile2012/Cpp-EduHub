// Hooks that use static data instead of API calls
// This provides the same interface as the API hooks but with instant loading

import { useMemo } from 'react';
import * as staticData from '@/lib/static-data';

export function useGetLessons() {
  const data = useMemo(() => staticData.getLessons(), []);
  
  return {
    data,
    isLoading: false,
    error: null
  };
}

export function useGetLesson(id: string) {
  const data = useMemo(() => staticData.getLesson(id), [id]);
  
  return {
    data,
    isLoading: false,
    error: data ? null : new Error('Lesson not found')
  };
}

export function useGetGlossary() {
  const data = useMemo(() => staticData.getGlossary(), []);
  
  return {
    data,
    isLoading: false,
    error: null
  };
}

export function useGetGlossaryTerm(slug: string) {
  const data = useMemo(() => staticData.getGlossaryTerm(slug), [slug]);
  
  return {
    data,
    isLoading: false,
    error: data ? null : new Error('Term not found')
  };
}

export function useGetLessonQuiz(lessonId: string) {
  const data = useMemo(() => staticData.getQuizForLesson(lessonId), [lessonId]);
  
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
