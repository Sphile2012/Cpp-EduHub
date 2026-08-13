/**
 * Infinity Code - Assignment Routes
 */

import { Router, Response, NextFunction } from 'express';
import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { assignments, submissions } from '../db/schema/index.js';
import { AppError } from '../middleware/errorHandler.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

// GET /api/assignments/:id - Get assignment details
router.get('/:id', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const assignment = await db.query.assignments.findFirst({
      where: eq(assignments.id, id),
    });
    if (!assignment) throw new AppError('Assignment not found', 404);
    res.json(assignment);
  } catch (error) { next(error); }
});

// POST /api/assignments/:id/submit - Submit assignment
router.post('/:id/submit', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    if (!userId) throw new AppError('Not authenticated', 401);

    const { code, language } = req.body;
    if (!code || !language) throw new AppError('Code and language required', 400);

    const [submission] = await db.insert(submissions).values({
      assignmentId: id,
      userId,
      code,
      language,
      status: 'pending',
    }).returning();

    res.status(201).json(submission);
  } catch (error) { next(error); }
});

// GET /api/submissions/:id - Get submission details
router.get('/submissions/:id', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const submission = await db.query.submissions.findFirst({
      where: eq(submissions.id, id),
    });
    if (!submission) throw new AppError('Submission not found', 404);
    res.json(submission);
  } catch (error) { next(error); }
});

export default router;