import { Router, type IRouter } from "express";
import {
  GetLessonParams,
  GetLessonQuizParams,
  GetFlashcardsQueryParams,
} from "@workspace/api-zod";
import { getLessonById, getLessonSummaries } from "../data/lessons";
import { getQuizForLesson } from "../data/quizzes";
import { getFlashcards } from "../data/flashcards";

const router: IRouter = Router();

router.get("/lessons", async (_req, res): Promise<void> => {
  res.json(getLessonSummaries());
});

router.get("/lessons/:lessonId", async (req, res): Promise<void> => {
  const params = GetLessonParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const lesson = getLessonById(params.data.lessonId);
  if (!lesson) {
    res.status(404).json({ error: "Lesson not found" });
    return;
  }

  res.json(lesson);
});

router.get("/lessons/:lessonId/quiz", async (req, res): Promise<void> => {
  const params = GetLessonQuizParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const lesson = getLessonById(params.data.lessonId);
  if (!lesson) {
    res.status(404).json({ error: "Lesson not found" });
    return;
  }

  const quiz = getQuizForLesson(params.data.lessonId);
  res.json(quiz);
});

router.get("/flashcards", async (req, res): Promise<void> => {
  const query = GetFlashcardsQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }

  const cards = getFlashcards(query.data.lessonId ?? null);
  res.json(cards);
});

export default router;
