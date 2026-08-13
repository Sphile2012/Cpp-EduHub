/**
 * Infinity Code - Admin Dashboard Routes
 * Manages users, courses, lessons, quizzes, certificates, subscriptions, etc.
 */

import { Router, Response, NextFunction } from 'express';
import { eq, desc, count } from 'drizzle-orm';
import { db } from '../db/index.js';
import {
  users,
  courses,
  enrollments,
  certificates,
  payments,
  reports,
  supportTickets,
  notifications,
} from '../db/schema/index.js';
import { AppError } from '../middleware/errorHandler.js';
import { authenticate, authorize, AuthRequest } from '../middleware/auth.js';

const router = Router();

// All admin routes require authentication + admin role
router.use(authenticate, authorize('admin'));

/**
 * Helper: Count rows in a table
 */
async function getTableCount(table: any, whereClause?: any): Promise<number> {
  const result = await db
    .select({ count: count() })
    .from(table)
    .where(whereClause);
  return Number(result[0]?.count || 0);
}

/**
 * GET /api/admin/dashboard
 * Get dashboard statistics
 */
router.get('/dashboard', async (_req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const totalUsers = await getTableCount(users);
    const totalCourses = await getTableCount(courses);
    const totalEnrollments = await getTableCount(enrollments);
    const totalCertificates = await getTableCount(certificates);
    const totalRevenue = await getTableCount(payments, eq(payments.status, 'completed'));
    const openTickets = await getTableCount(supportTickets, eq(supportTickets.status, 'open'));
    const pendingReports = await getTableCount(reports, eq(reports.status, 'pending'));

    res.json({
      stats: {
        totalUsers,
        totalCourses,
        totalEnrollments,
        totalCertificates,
        totalRevenue,
        openTickets,
        pendingReports,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/admin/users
 * List all users with pagination
 */
router.get('/users', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const page = parseInt((req.query.page as string) || '1');
    const limit = parseInt((req.query.limit as string) || '20');
    const offset = (page - 1) * limit;

    const userList = await db.query.users.findMany({
      limit,
      offset,
      orderBy: [desc(users.createdAt)],
      columns: {
        id: true,
        email: true,
        name: true,
        username: true,
        avatar: true,
        role: true,
        subscriptionStatus: true,
        emailVerified: true,
        lastLogin: true,
        createdAt: true,
      },
    });

    const total = await getTableCount(users);

    res.json({
      users: userList,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/admin/users/:id
 * Update user (role, status)
 */
router.put('/users/:id', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { role, subscriptionStatus } = req.body;

    await db.update(users)
      .set({
        ...(role && { role }),
        ...(subscriptionStatus && { subscriptionStatus }),
        updatedAt: new Date(),
      })
      .where(eq(users.id, id));

    res.json({ message: 'User updated successfully' });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/admin/courses
 * List all courses (including drafts)
 */
router.get('/courses', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const page = parseInt((req.query.page as string) || '1');
    const limit = parseInt((req.query.limit as string) || '20');
    const offset = (page - 1) * limit;

    const courseList = await db.query.courses.findMany({
      limit,
      offset,
      orderBy: [desc(courses.createdAt)],
      with: {
        instructor: {
          columns: { id: true, name: true, avatar: true },
        },
      },
    });

    const total = await getTableCount(courses);

    res.json({
      courses: courseList,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/admin/courses/:id
 * Delete a course
 */
router.delete('/courses/:id', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    await db.delete(courses).where(eq(courses.id, id));

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/admin/reports
 * List reported content
 */
router.get('/reports', async (_req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const reportList = await db.query.reports.findMany({
      orderBy: [desc(reports.createdAt)],
    });

    res.json(reportList);
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/admin/reports/:id
 * Update report status
 */
router.put('/reports/:id', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await db.update(reports)
      .set({
        status,
        reviewedAt: new Date(),
        reviewedBy: req.user?.id,
      })
      .where(eq(reports.id, id));

    res.json({ message: 'Report updated successfully' });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/admin/notifications
 * Send notification to all users
 */
router.post('/notifications', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { title, message, type = 'system' } = req.body;

    if (!title || !message) {
      throw new AppError('Title and message are required', 400);
    }

    // Get all users
    const allUsers = await db.query.users.findMany({
      columns: { id: true },
    });

    // Create notifications for all users
    if (allUsers.length > 0) {
      await db.insert(notifications).values(
        allUsers.map((u) => ({
          userId: u.id,
          title,
          message,
          type: type as any,
        }))
      );
    }

    res.json({ message: `Notification sent to ${allUsers.length} users` });
  } catch (error) {
    next(error);
  }
});

export default router;