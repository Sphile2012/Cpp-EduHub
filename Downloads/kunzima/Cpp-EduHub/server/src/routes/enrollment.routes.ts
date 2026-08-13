/**
 * Infinity Code - Enrollment Routes
 */

import { Router, Response, NextFunction } from 'express';
import { eq, and, count } from 'drizzle-orm';
import { db } from '../db/index.js';
import { enrollments, lessonProgress, courses } from '../db/schema/index.js';
import { AppError } from '../middleware/errorHandler.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

// GET /api/enrollments - Get user's enrollments
router.get('/', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new AppError('Not authenticated', 401);

    const userEnrollments = await db.query.enrollments.findMany({
      where: eq(enrollments.userId, userId),
      with: {
        course: {
          columns: { id: true, title: true, thumbnail: true, level: true },
        },
      },
    });

    res.json(userEnrollments);
  } catch (error) {
    next(error);
  }
});

// GET /api/enrollments/:id - Get enrollment details
router.get('/:id', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    if (!userId) throw new AppError('Not authenticated', 401);

    const enrollment = await db.query.enrollments.findFirst({
      where: and(eq(enrollments.id, id), eq(enrollments.userId, userId)),
      with: {
        course: true,
        lessonProgress: {
          with: { lesson: true },
        },
      },
    });

    if (!enrollment) throw new AppError('Enrollment not found', 404);
    res.json(enrollment);
  } catch (error) {
    next(error);
  }
});

// GET /api/enrollments/:id/progress - Get course progress
router.get('/:id/progress', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    if (!userId) throw new AppError('Not authenticated', 401);

    const enrollment = await db.query.enrollments.findFirst({
      where: and(eq(enrollments.id, id), eq(enrollments.userId, userId)),
    });

    if (!enrollment) throw new AppError('Enrollment not found', 404);

    // Get all lessons in the course
    const course = await db.query.courses.findFirst({
      where: eq(courses.id, enrollment.courseId),
      with: {
        modules: {
          with: { lessons: true },
        },
      },
    });

    const totalLessons = course?.modules.reduce((acc, m) => acc + m.lessons.length, 0) || 0;
    const completedResult = await db.select({ count: count() })
      .from(lessonProgress)
      .where(and(eq(lessonProgress.enrollmentId, id), eq(lessonProgress.status, 'completed')));
    const completedLessons = Number(completedResult[0]?.count || 0);

    res.json({
      totalLessons,
      completedLessons,
      progress: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/enrollments/:id/lesson/:lessonId/progress - Update lesson progress
router.post('/:enrollmentId/lesson/:lessonId/progress', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { enrollmentId, lessonId } = req.params;
    const userId = req.user?.id;
    if (!userId) throw new AppError('Not authenticated', 401);

    const { status, videoWatchedSeconds, notes } = req.body;

    // Check enrollment exists
    const enrollment = await db.query.enrollments.findFirst({
      where: and(eq(enrollments.id, enrollmentId), eq(enrollments.userId, userId)),
    });

    if (!enrollment) throw new AppError('Enrollment not found', 404);

    // Upsert lesson progress
    const existing = await db.query.lessonProgress.findFirst({
      where: and(eq(lessonProgress.enrollmentId, enrollmentId), eq(lessonProgress.lessonId, lessonId)),
    });

    if (existing) {
      await db.update(lessonProgress)
        .set({
          status: status || existing.status,
          videoWatchedSeconds: videoWatchedSeconds ?? existing.videoWatchedSeconds,
          notes: notes ?? existing.notes,
          lastAccessedAt: new Date(),
          completedAt: status === 'completed' ? new Date() : existing.completedAt,
          updatedAt: new Date(),
        })
        .where(eq(lessonProgress.id, existing.id));
    } else {
      await db.insert(lessonProgress).values({
        enrollmentId,
        lessonId,
        status: status || 'in_progress',
        videoWatchedSeconds: videoWatchedSeconds || 0,
        notes,
        startedAt: new Date(),
        completedAt: status === 'completed' ? new Date() : null,
      });
    }

    res.json({ message: 'Progress updated' });
  } catch (error) {
    next(error);
  }
});

export default router;