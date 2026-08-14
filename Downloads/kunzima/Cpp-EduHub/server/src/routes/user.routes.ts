/**
 * Infinity Code - User Routes
 * Uses in-memory fallback when PostgreSQL is not available
 */

import { Router, Response, NextFunction } from 'express';
import { eq, count } from 'drizzle-orm';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { db, isDbConnected } from '../db/index.js';
import { users, userProfiles, enrollments, certificates, userBadges } from '../db/schema/index.js';
import { AppError } from '../middleware/errorHandler.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import * as memoryStore from '../db/memory-store.js';

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

    // Use in-memory store if database is not connected
    if (!isDbConnected()) {
      const user = memoryStore.findById(userId);
      if (!user) throw new AppError('User not found', 404);

      return res.json({
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
        avatar: user.avatar,
        bio: user.bio,
        role: user.role,
        emailVerified: user.emailVerified,
        preferredLanguage: user.preferredLanguage,
        theme: user.theme,
        notificationsEnabled: user.notificationsEnabled,
        subscriptionStatus: user.subscriptionStatus,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        lastLogin: user.lastLogin,
        profile: user.profile,
        settings: user.settings,
      });
    }

    // Database path
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
      with: {
        profile: true,
        settings: true,
      },
    });

    if (!user) throw new AppError('User not found', 404);

    return res.json({
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
    return next(error);
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
      avatar: z.string().optional(),
    });

    const updates = schema.parse(req.body);

    // Use in-memory store if database is not connected
    if (!isDbConnected()) {
      const updatedUser = memoryStore.updateUser(userId, updates as any);
      if (!updatedUser) throw new AppError('User not found', 404);

      return res.json({
        message: 'Profile updated successfully',
        user: {
          id: updatedUser.id,
          email: updatedUser.email,
          name: updatedUser.name,
          username: updatedUser.username,
          avatar: updatedUser.avatar,
          bio: updatedUser.bio,
          role: updatedUser.role,
        },
      });
    }

    // Database path
    await db.update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, userId));

    return res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new AppError(error.errors[0].message, 400));
    }
    return next(error);
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

    // Use in-memory store if database is not connected
    if (!isDbConnected()) {
      const user = memoryStore.findById(userId);
      if (!user?.passwordHash) throw new AppError('Invalid current password', 400);

      const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
      if (!isValid) throw new AppError('Invalid current password', 400);

      await memoryStore.updatePassword(userId, newPassword);

      return res.json({ message: 'Password updated successfully' });
    }

    // Database path
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

    return res.json({ message: 'Password updated successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new AppError(error.errors[0].message, 400));
    }
    return next(error);
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

    // Use in-memory store if database is not connected
    if (!isDbConnected()) {
      const stats = memoryStore.getUserStats(userId);
      return res.json(stats);
    }

    // Database path
    const profile = await db.query.userProfiles.findFirst({
      where: eq(userProfiles.id, userId),
    });

    const enrollmentResult = await db.select({ count: count() }).from(enrollments).where(eq(enrollments.userId, userId));
    const enrollmentCount = Number(enrollmentResult[0]?.count || 0);
    const certificateResult = await db.select({ count: count() }).from(certificates).where(eq(certificates.userId, userId));
    const certificateCount = Number(certificateResult[0]?.count || 0);
    const badgeResult = await db.select({ count: count() }).from(userBadges).where(eq(userBadges.userId, userId));
    const badgeCount = Number(badgeResult[0]?.count || 0);

    return res.json({
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
    return next(error);
  }
});

export default router;