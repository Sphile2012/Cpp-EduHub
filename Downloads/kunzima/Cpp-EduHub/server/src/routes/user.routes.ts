/**
 * Infinity Code - User Routes
 */

import { Router, Response, NextFunction } from 'express';
import { eq, count } from 'drizzle-orm';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { db } from '../db/index.js';
import { users, userProfiles, enrollments, certificates, userBadges } from '../db/schema/index.js';
import { AppError } from '../middleware/errorHandler.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

/**
 * GET /api/users/profile
 * Get current user profile
 */
router.get('/profile', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new AppError('Not authenticated', 401);

    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
      with: {
        profile: true,
        settings: true,
      },
    });

    if (!user) throw new AppError('User not found', 404);

    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      username: user.username,
      avatar: user.avatar,
      bio: user.bio,
      role: user.role,
      profile: user.profile,
      settings: user.settings,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/users/profile
 * Update user profile
 */
router.put('/profile', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new AppError('Not authenticated', 401);

    const schema = z.object({
      name: z.string().min(1).optional(),
      username: z.string().min(3).optional(),
      bio: z.string().optional(),
      preferredLanguage: z.string().optional(),
      theme: z.enum(['light', 'dark', 'system']).optional(),
    });

    const updates = schema.parse(req.body);

    await db.update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, userId));

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new AppError(error.errors[0].message, 400));
    }
    next(error);
  }
});

/**
 * PUT /api/users/password
 * Change password
 */
router.put('/password', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new AppError('Not authenticated', 401);

    const { currentPassword, newPassword } = z.object({
      currentPassword: z.string().min(1),
      newPassword: z.string().min(6),
    }).parse(req.body);

    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!user?.passwordHash) throw new AppError('Invalid current password', 400);

    const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isValid) throw new AppError('Invalid current password', 400);

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await db.update(users)
      .set({ passwordHash: hashedPassword, updatedAt: new Date() })
      .where(eq(users.id, userId));

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new AppError(error.errors[0].message, 400));
    }
    next(error);
  }
});

/**
 * GET /api/users/stats
 * Get user statistics
 */
router.get('/stats', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new AppError('Not authenticated', 401);

    const profile = await db.query.userProfiles.findFirst({
      where: eq(userProfiles.id, userId),
    });

    const enrollmentResult = await db.select({ count: count() }).from(enrollments).where(eq(enrollments.userId, userId));
    const enrollmentCount = Number(enrollmentResult[0]?.count || 0);
    const certificateResult = await db.select({ count: count() }).from(certificates).where(eq(certificates.userId, userId));
    const certificateCount = Number(certificateResult[0]?.count || 0);
    const badgeResult = await db.select({ count: count() }).from(userBadges).where(eq(userBadges.userId, userId));
    const badgeCount = Number(badgeResult[0]?.count || 0);

    res.json({
      totalXp: profile?.totalXp || 0,
      level: profile?.level || 1,
      currentStreak: profile?.currentStreak || 0,
      longestStreak: profile?.longestStreak || 0,
      coursesEnrolled: enrollmentCount,
      coursesCompleted: profile?.coursesCompleted || 0,
      certificatesEarned: certificateCount,
      badgesEarned: badgeCount,
    });
  } catch (error) {
    next(error);
  }
});

export default router;