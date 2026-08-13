/**
 * Infinity Code - Community Routes
 */

import { Router, Request, Response, NextFunction } from 'express';
import { eq, desc } from 'drizzle-orm';
import { db } from '../db/index.js';
import { forumCategories, forumTopics, forumPosts, comments } from '../db/schema/index.js';
import { AppError } from '../middleware/errorHandler.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';

const router = Router();

// GET /api/community/forums - List forum categories
router.get('/forums', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await db.query.forumCategories.findMany({
      where: eq(forumCategories.isActive, true),
      orderBy: [forumCategories.order],
    });
    res.json(categories);
  } catch (error) { next(error); }
});

// GET /api/community/forums/:categoryId/topics - List topics in category
router.get('/forums/:categoryId/topics', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { categoryId } = req.params;
    const topics = await db.query.forumTopics.findMany({
      where: eq(forumTopics.categoryId, categoryId),
      orderBy: [desc(forumTopics.isPinned), desc(forumTopics.createdAt)],
    });
    res.json(topics);
  } catch (error) { next(error); }
});

// POST /api/community/topics - Create new topic
router.post('/topics', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new AppError('Not authenticated', 401);

    const { title, content, categoryId, courseId } = req.body;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const [topic] = await db.insert(forumTopics).values({
      title, slug, content, categoryId, courseId, userId,
    }).returning();

    res.status(201).json(topic);
  } catch (error) { next(error); }
});

// POST /api/community/posts - Create post reply
router.post('/posts', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new AppError('Not authenticated', 401);

    const { content, topicId, parentId } = req.body;

    const [post] = await db.insert(forumPosts).values({
      content, topicId, parentId, userId,
    }).returning();

    res.status(201).json(post);
  } catch (error) { next(error); }
});

// GET /api/community/comments - Get lesson comments
router.get('/comments', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { lessonId } = req.query;
    const commentsList = await db.query.comments.findMany({
      where: lessonId ? eq(comments.lessonId, lessonId as string) : undefined,
      orderBy: [desc(comments.createdAt)],
    });
    res.json(commentsList);
  } catch (error) { next(error); }
});

// POST /api/community/comments - Add comment
router.post('/comments', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new AppError('Not authenticated', 401);

    const { content, lessonId, timestamp } = req.body;

    const [comment] = await db.insert(comments).values({
      content, lessonId, timestamp, userId,
    }).returning();

    res.status(201).json(comment);
  } catch (error) { next(error); }
});

export default router;