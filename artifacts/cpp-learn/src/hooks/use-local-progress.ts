import { useEffect, useState } from "react";
import { ProgressSummary } from "@workspace/api-client-react";

const COMPLETED_LESSONS_KEY = "cpp_learn_completed_lessons";
const QUIZ_SCORES_KEY = "cpp_learn_quiz_scores";
const XP_KEY = "cpp_learn_xp";
const STREAK_KEY = "cpp_learn_streak";

export function useLocalProgress() {
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [quizScores, setQuizScores] = useState<Record<string, number>>({});
  const [xp, setXp] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);

  useEffect(() => {
    const loadedCompleted = JSON.parse(localStorage.getItem(COMPLETED_LESSONS_KEY) || "[]");
    const loadedScores = JSON.parse(localStorage.getItem(QUIZ_SCORES_KEY) || "{}");
    const loadedXp = parseInt(localStorage.getItem(XP_KEY) || "0", 10);
    const loadedStreak = parseInt(localStorage.getItem(STREAK_KEY) || "0", 10);

    setCompletedLessonIds(loadedCompleted);
    setQuizScores(loadedScores);
    setXp(loadedXp);
    setStreak(loadedStreak);
  }, []);

  const markLessonComplete = (lessonId: string) => {
    setCompletedLessonIds((prev) => {
      if (prev.includes(lessonId)) return prev;
      const next = [...prev, lessonId];
      localStorage.setItem(COMPLETED_LESSONS_KEY, JSON.stringify(next));
      addXp(50); // Reward for completing a lesson
      return next;
    });
  };

  const saveQuizScore = (lessonId: string, score: number) => {
    setQuizScores((prev) => {
      const isImprovement = !prev[lessonId] || score > prev[lessonId];
      const next = { ...prev, [lessonId]: score };
      localStorage.setItem(QUIZ_SCORES_KEY, JSON.stringify(next));
      
      if (isImprovement) {
        addXp(score); // Reward XP based on score
      }
      return next;
    });
  };

  const addXp = (amount: number) => {
    setXp((prev) => {
      const next = prev + amount;
      localStorage.setItem(XP_KEY, next.toString());
      return next;
    });
  };

  const incrementStreak = () => {
    setStreak((prev) => {
      const next = prev + 1;
      localStorage.setItem(STREAK_KEY, next.toString());
      return next;
    });
  };

  const getMergedProgress = (apiSummary?: ProgressSummary): ProgressSummary => {
    const totalLessons = apiSummary?.totalLessons || 16;
    const passedQuizzesCount = Object.values(quizScores).filter((s) => s >= 70).length;
    const totalScores = Object.values(quizScores);
    const avgScore = totalScores.length > 0 
      ? Math.round(totalScores.reduce((a, b) => a + b, 0) / totalScores.length) 
      : 0;

    return {
      totalLessons,
      completedLessons: completedLessonIds.length,
      totalQuizzes: apiSummary?.totalQuizzes || 16,
      passedQuizzes: passedQuizzesCount,
      averageScore: avgScore,
      streak: streak,
      xp: xp,
      level: Math.floor(xp / 500) + 1,
      completedLessonIds,
    };
  };

  return {
    completedLessonIds,
    quizScores,
    xp,
    streak,
    markLessonComplete,
    saveQuizScore,
    addXp,
    incrementStreak,
    getMergedProgress,
  };
}
