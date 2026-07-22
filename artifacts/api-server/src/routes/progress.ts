import { Router, type IRouter } from "express";
import { lessons } from "../data/lessons";
import { achievements } from "../data/achievements";

const router: IRouter = Router();

// Progress is tracked client-side via localStorage.
// These endpoints return static reference data the client uses
// to compute its progress state.

router.get("/progress", async (_req, res): Promise<void> => {
  // Return defaults — client computes real values from localStorage
  res.json({
    totalLessons: lessons.length,
    completedLessons: 0,
    totalQuizzes: lessons.length,
    passedQuizzes: 0,
    averageScore: 0,
    streak: 0,
    xp: 0,
    level: 1,
    completedLessonIds: [],
  });
});

router.get("/achievements", async (_req, res): Promise<void> => {
  res.json(achievements);
});

export default router;
