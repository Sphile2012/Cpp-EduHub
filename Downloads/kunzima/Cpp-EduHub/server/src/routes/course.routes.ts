/**
 * Infinity Code - Course Routes
 */

import { Router, Request, Response, NextFunction } from 'express';
import { eq, and, desc, like, or, count } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../db/index.js';
import { courses, modules, lessons, categories, enrollments } from '../db/schema/index.js';
import { AppError } from '../middleware/errorHandler.js';
import { authenticate, authorize, optionalAuth, AuthRequest } from '../middleware/auth.js';

const router = Router();

/**
 * GET /api/courses
 * List all courses with filtering, searching, and pagination
 */
router.get('/', optionalAuth, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const {
      search,
      category,
      level,
      language,
      page = '1',
      limit = '12',
      sortBy = 'createdAt',
      order = 'desc',
    } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const offset = (pageNum - 1) * limitNum;

    // Build where conditions
    const conditions = [eq(courses.status, 'published')];

    if (search) {
      const searchTerm = `%${search as string}%`;
      conditions.push(
        or(
          like(courses.title, searchTerm),
          like(courses.description, searchTerm)
        )!
      );
    }

    if (category) {
      conditions.push(eq(courses.categoryId, category as string));
    }

    if (level) {
      conditions.push(eq(courses.level, level as 'beginner' | 'intermediate' | 'advanced'));
    }

    if (language) {
      conditions.push(eq(courses.language, language as string));
    }

    // Get courses
    const coursesList = await db.query.courses.findMany({
      where: and(...conditions),
      with: {
        category: true,
        instructor: {
          columns: { id: true, name: true, avatar: true },
        },
      },
      limit: limitNum,
      offset,
      orderBy: [order === 'desc' ? desc((courses as any)[sortBy as string]) : (courses as any)[sortBy as string]],
    });

    // Get total count
    const totalResult = await db.select({ count: count() }).from(courses).where(and(...conditions));
    const total = Number(totalResult[0]?.count || 0);

    res.json({
      courses: coursesList,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/courses/:id
 * Get course details
 */
router.get('/:id', optionalAuth, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const course = await db.query.courses.findFirst({
      where: and(eq(courses.id, id), eq(courses.status, 'published')),
      with: {
        category: true,
        instructor: {
          columns: { id: true, name: true, avatar: true, bio: true },
        },
        modules: {
          orderBy: [modules.order],
          with: {
            lessons: {
              where: eq(lessons.isPublished, true),
              orderBy: [lessons.order],
            },
          },
        },
      },
    });

    if (!course) throw new AppError('Course not found', 404);

    res.json(course);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/courses/:id/enroll
 * Enroll in a course
 */
router.post('/:id/enroll', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    if (!userId) throw new AppError('Not authenticated', 401);

    // Check if course exists
    const course = await db.query.courses.findFirst({
      where: eq(courses.id, id),
    });

    if (!course) throw new AppError('Course not found', 404);

    // Check if already enrolled
    const existing = await db.query.enrollments.findFirst({
      where: and(eq(enrollments.userId, userId), eq(enrollments.courseId, id)),
    });

    if (existing) throw new AppError('Already enrolled in this course', 409);

    // Create enrollment
    const [enrollment] = await db.insert(enrollments).values({
      userId,
      courseId: id,
      status: 'active',
    }).returning();

    res.status(201).json({ message: 'Enrolled successfully', enrollment });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/courses
 * Create a new course (instructor/admin only)
 */
router.post('/', authenticate, authorize('instructor', 'admin'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const schema = z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      categoryId: z.string().uuid(),
      level: z.enum(['beginner', 'intermediate', 'advanced']),
      language: z.string().default('en'),
      price: z.number().optional(),
      estimatedHours: z.number().optional(),
    });

    const data = schema.parse(req.body);
    const instructorId = req.user?.id;

    // Generate slug from title
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const [course] = await db.insert(courses).values({
      title: data.title,
      description: data.description,
      categoryId: data.categoryId,
      level: data.level,
      language: data.language,
      price: data.price?.toString() || '0',
      estimatedHours: data.estimatedHours,
      slug,
      instructorId,
      status: 'draft',
    }).returning();

    res.status(201).json(course);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new AppError(error.errors[0].message, 400));
    }
    next(error);
  }
});

/**
 * PUT /api/courses/:id
 * Update a course (instructor/admin only)
 */
router.put('/:id', authenticate, authorize('instructor', 'admin'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const instructorId = req.user?.id;

    // Check ownership
    const course = await db.query.courses.findFirst({
      where: eq(courses.id, id),
    });

    if (!course) throw new AppError('Course not found', 404);
    if (course.instructorId !== instructorId && req.user?.role !== 'admin') {
      throw new AppError('Not authorized', 403);
    }

    const updates = req.body;
    await db.update(courses)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(courses.id, id));

    res.json({ message: 'Course updated successfully' });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/categories
 * List all categories
 */
router.get('/categories', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const categoriesList = await db.query.categories.findMany({
      where: eq(categories.isActive, true),
      orderBy: [categories.order],
    });

    res.json(categoriesList);
  } catch (error) {
    next(error);
  }
});

export default router;