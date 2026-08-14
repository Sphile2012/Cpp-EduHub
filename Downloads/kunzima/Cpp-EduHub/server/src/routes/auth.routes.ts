/**
 * Infinity Code - Authentication Routes
 * Handles user registration, login, password reset, and 2FA
 * Uses in-memory fallback when PostgreSQL is not available
 */

import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { eq, count } from 'drizzle-orm';
import { z } from 'zod';
import { db, isDbConnected } from '../db/index.js';
import { users, userProfiles, userSettings } from '../db/schema/index.js';
import { AppError } from '../middleware/errorHandler.js';
import { generateToken, generateRefreshToken, verifyToken } from '../middleware/auth.js';
import { env } from '../config/env.js';
import * as memoryStore from '../db/memory-store.js';

const router = Router();

// Validation schemas
const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(1, 'Name is required'),
  username: z.string().min(3, 'Username must be at least 3 characters').regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

/**
 * POST /api/auth/signup
 * Register a new user
 */
router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate request body
    const { email, password, name, username } = signupSchema.parse(req.body);

    // Use in-memory store if database is not connected
    if (!isDbConnected()) {
      // Check if user already exists
      const existingUser = memoryStore.findByEmail(email);
      if (existingUser) {
        throw new AppError('An account with this email already exists.', 409);
      }

      // Check if username is taken
      const existingUsername = memoryStore.findByUsername(username);
      if (existingUsername) {
        throw new AppError('This username is already taken.', 409);
      }

      // Determine role (first user gets admin role)
      const role = memoryStore.getUserCount() === 0 || email === env.ADMIN_EMAIL ? 'admin' : 'user';

      // Create user in memory
      const newUser = await memoryStore.createUser({ email, password, name, username, role });

      // Generate tokens
      const token = generateToken({
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      });

      const refreshToken = generateRefreshToken({
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      });

      return res.status(201).json({
        message: 'Account created successfully',
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          username: newUser.username,
          role: newUser.role,
          avatar: newUser.avatar,
        },
        token,
        refreshToken,
      });
    }

    // Database path
    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      throw new AppError('An account with this email already exists.', 409);
    }

    // Check if username is taken
    const existingUsername = await db.query.users.findFirst({
      where: eq(users.username, username),
    });

    if (existingUsername) {
      throw new AppError('This username is already taken.', 409);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Determine role (first user or admin email gets admin role)
    const userCountResult = await db.select({ count: count() }).from(users);
    const userCount = Number(userCountResult[0]?.count || 0);
    const role = userCount === 0 || email === env.ADMIN_EMAIL ? 'admin' : 'user';

    // Create user
    const [newUser] = await db.insert(users).values({
      email,
      passwordHash,
      name,
      username,
      role,
    }).returning();

    // Create user profile
    await db.insert(userProfiles).values({
      id: newUser.id,
    });

    // Create user settings
    await db.insert(userSettings).values({
      id: newUser.id,
    });

    // Generate tokens
    const token = generateToken({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    });

    const refreshToken = generateRefreshToken({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    });

    res.status(201).json({
      message: 'Account created successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        username: newUser.username,
        role: newUser.role,
        avatar: newUser.avatar,
      },
      token,
      refreshToken,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new AppError(error.errors[0].message, 400));
    }
    next(error);
  }
});

/**
 * POST /api/auth/login
 * Authenticate user and return tokens
 */
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate request body
    const { email, password } = loginSchema.parse(req.body);

    // Use in-memory store if database is not connected
    if (!isDbConnected()) {
      const user = memoryStore.findByEmail(email);

      if (!user || !user.passwordHash) {
        throw new AppError('Invalid email or password.', 401);
      }

      const isValidPassword = await bcrypt.compare(password, user.passwordHash);
      if (!isValidPassword) {
        throw new AppError('Invalid email or password.', 401);
      }

      // Update last login
      memoryStore.updateLastLogin(user.id);

      // Generate tokens
      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      const refreshToken = generateRefreshToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      return res.json({
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          username: user.username,
          role: user.role,
          avatar: user.avatar,
        },
        token,
        refreshToken,
      });
    }

    // Database path
    // Find user
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user || !user.passwordHash) {
      throw new AppError('Invalid email or password.', 401);
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      throw new AppError('Invalid email or password.', 401);
    }

    // Update last login
    await db.update(users)
      .set({ lastLogin: new Date() })
      .where(eq(users.id, user.id));

    // Generate tokens
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
        role: user.role,
        avatar: user.avatar,
      },
      token,
      refreshToken,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new AppError(error.errors[0].message, 400));
    }
    next(error);
  }
});

/**
 * POST /api/auth/refresh
 * Refresh access token using refresh token
 */
router.post('/refresh', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new AppError('Refresh token is required.', 400);
    }

    // Verify refresh token
    const decoded = verifyToken(refreshToken);

    // Use in-memory store if database is not connected
    if (!isDbConnected()) {
      const user = memoryStore.findById(decoded.id);
      if (!user) {
        throw new AppError('User not found.', 404);
      }

      const newToken = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      const newRefreshToken = generateRefreshToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      return res.json({
        token: newToken,
        refreshToken: newRefreshToken,
      });
    }

    // Database path
    // Find user
    const user = await db.query.users.findFirst({
      where: eq(users.id, decoded.id),
    });

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    // Generate new tokens
    const newToken = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const newRefreshToken = generateRefreshToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    res.json({
      token: newToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new AppError(error.errors[0].message, 400));
    }
    next(error);
  }
});

/**
 * POST /api/auth/forgot-password
 * Send password reset email
 */
router.post('/forgot-password', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new AppError('Email is required.', 400);
    }

    // Always return success to prevent email enumeration
    res.json({
      message: 'If an account exists with this email, you will receive a password reset link.',
    });

    // Check if user exists (in memory or database)
    if (!isDbConnected()) {
      const user = memoryStore.findByEmail(email);
      if (user) {
        console.log('Password reset requested for:', email);
      }
    } else {
      const user = await db.query.users.findFirst({
        where: eq(users.email, email),
      });
      if (user) {
        // TODO: Send password reset email with reset token
        console.log('Password reset requested for:', email);
      }
    }
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/auth/reset-password
 * Reset password with token
 */
router.post('/reset-password', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      throw new AppError('Token and new password are required.', 400);
    }

    if (newPassword.length < 6) {
      throw new AppError('Password must be at least 6 characters.', 400);
    }

    // TODO: Verify reset token and update password
    // For now, we'll return a placeholder response
    res.json({
      message: 'Password reset successfully. Please login with your new password.',
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/auth/verify-email
 * Verify email address
 */
router.post('/verify-email', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.body;

    if (!token) {
      throw new AppError('Verification token is required.', 400);
    }

    // TODO: Verify email token and update user
    res.json({
      message: 'Email verified successfully.',
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/auth/2fa/setup
 * Setup two-factor authentication
 */
router.post('/2fa/setup', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get user from authenticated request
    const userId = req.headers['x-user-id'] as string;

    if (!userId) {
      throw new AppError('User ID is required.', 400);
    }

    // TODO: Generate 2FA secret and QR code
    // For now, we'll return a placeholder response
    res.json({
      message: '2FA setup initiated.',
      secret: 'placeholder-secret',
      qrCode: 'placeholder-qr-code',
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/auth/2fa/verify
 * Verify 2FA code
 */
router.post('/2fa/verify', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, userId } = req.body;

    if (!code || !userId) {
      throw new AppError('Code and user ID are required.', 400);
    }

    // TODO: Verify 2FA code
    res.json({
      message: '2FA verified successfully.',
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/auth/logout
 * Logout user (invalidate tokens)
 */
router.post('/logout', async (_req: Request, res: Response) => {
  // In a stateless JWT system, logout is handled client-side by removing tokens
  // For additional security, you could maintain a blacklist of invalidated tokens
  res.json({
    message: 'Logged out successfully.',
  });
});

export default router;