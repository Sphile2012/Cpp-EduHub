/**
 * Infinity Code - Quiz Routes
 */

import { Router, Response, NextFunction } from 'express';
import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { quizzes, questions, quizAttempts, quizAnswers } from '../db/schema/index.js';
import { AppError } from '../middleware/errorHandler.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

// GET /api/quizzes/:id - Get quiz details
router.get('/:id', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const quiz = await db.query.quizzes.findFirst({
      where: eq(quizzes.id, id),
      with: {
        questions: {
          orderBy: [questions.order],
        },
      },
    });
    if (!quiz) throw new AppError('Quiz not found', 404);
    res.json(quiz);
  } catch (error) { next(error); }
});

// POST /api/quizzes/:id/attempt - Start quiz attempt
router.post('/:id/attempt', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    if (!userId) throw new AppError('Not authenticated', 401);

    const [attempt] = await db.insert(quizAttempts).values({
      quizId: id,
      userId,
      maxScore: 0,
    }).returning();

    res.status(201).json(attempt);
  } catch (error) { next(error); }
});

// POST /api/quizzes/:id/submit - Submit quiz answers
router.post('/:id/submit', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new AppError('Not authenticated', 401);

    const { attemptId, answers } = req.body;

    // Calculate score
    let score = 0;
    let maxScore = 0;

    for (const answer of answers) {
      const question = await db.query.questions.findFirst({
        where: eq(questions.id, answer.questionId),
      });
      if (!question) continue;

      maxScore += question.points;
      const isCorrect = answer.answer === question.correctAnswer;
      if (isCorrect) score += question.points;

      await db.insert(quizAnswers).values({
        attemptId,
        questionId: answer.questionId,
        answer: answer.answer,
        isCorrect,
        points: isCorrect ? question.points : 0,
      });
    }

    const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
    const passed = percentage >= 70;

    await db.update(quizAttempts)
      .set({ score, maxScore, percentage: percentage.toString(), passed, completedAt: new Date() })
      .where(eq(quizAttempts.id, attemptId));

    res.json({ score, maxScore, percentage, passed });
  } catch (error) { next(error); }
});

export default router;