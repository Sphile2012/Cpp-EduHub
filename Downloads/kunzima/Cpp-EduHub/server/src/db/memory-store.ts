/**
 * Infinity Code - In-Memory User Store
 * Fallback storage when PostgreSQL is not available.
 * Allows signup, login, and profile management without a database.
 */

import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

export interface MemoryUser {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  username: string;
  role: string;
  avatar: string | null;
  bio: string | null;
  emailVerified: boolean;
  preferredLanguage: string;
  theme: string;
  notificationsEnabled: boolean;
  subscriptionStatus: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date | null;
  profile: {
    totalXp: number;
    level: number;
    currentStreak: number;
    longestStreak: number;
    coursesCompleted: number;
  };
  settings: {
    preferredLanguage: string;
    theme: string;
    notificationsEnabled: boolean;
  };
}

// In-memory user storage
const memoryUsers: MemoryUser[] = [];

/**
 * Find a user by email
 */
export function findByEmail(email: string): MemoryUser | undefined {
  return memoryUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

/**
 * Find a user by username
 */
export function findByUsername(username: string): MemoryUser | undefined {
  return memoryUsers.find((u) => u.username.toLowerCase() === username.toLowerCase());
}

/**
 * Find a user by ID
 */
export function findById(id: string): MemoryUser | undefined {
  return memoryUsers.find((u) => u.id === id);
}

/**
 * Create a new user in memory
 */
export async function createUser(data: {
  email: string;
  password: string;
  name: string;
  username: string;
  role?: string;
}): Promise<MemoryUser> {
  const passwordHash = await bcrypt.hash(data.password, 12);
  const now = new Date();

  const user: MemoryUser = {
    id: randomUUID(),
    email: data.email,
    passwordHash,
    name: data.name,
    username: data.username,
    role: data.role || 'user',
    avatar: null,
    bio: null,
    emailVerified: false,
    preferredLanguage: 'en',
    theme: 'system',
    notificationsEnabled: true,
    subscriptionStatus: 'free',
    createdAt: now,
    updatedAt: now,
    lastLogin: null,
    profile: {
      totalXp: 0,
      level: 1,
      currentStreak: 0,
      longestStreak: 0,
      coursesCompleted: 0,
    },
    settings: {
      preferredLanguage: 'en',
      theme: 'system',
      notificationsEnabled: true,
    },
  };

  memoryUsers.push(user);
  return user;
}

/**
 * Update a user in memory
 */
export function updateUser(id: string, updates: Partial<MemoryUser>): MemoryUser | undefined {
  const user = findById(id);
  if (!user) return undefined;

  Object.assign(user, updates, { updatedAt: new Date() });
  return user;
}

/**
 * Update user password
 */
export async function updatePassword(id: string, newPassword: string): Promise<boolean> {
  const user = findById(id);
  if (!user) return false;

  user.passwordHash = await bcrypt.hash(newPassword, 12);
  user.updatedAt = new Date();
  return true;
}

/**
 * Update last login
 */
export function updateLastLogin(id: string): void {
  const user = findById(id);
  if (user) {
    user.lastLogin = new Date();
  }
}

/**
 * Get user count
 */
export function getUserCount(): number {
  return memoryUsers.length;
}

/**
 * Get user stats
 */
export function getUserStats(id: string) {
  const user = findById(id);
  if (!user) {
    return {
      totalXp: 0,
      level: 1,
      currentStreak: 0,
      longestStreak: 0,
      coursesEnrolled: 0,
      coursesCompleted: 0,
      certificatesEarned: 0,
      badgesEarned: 0,
    };
  }

  return {
    totalXp: user.profile.totalXp,
    level: user.profile.level,
    currentStreak: user.profile.currentStreak,
    longestStreak: user.profile.longestStreak,
    coursesEnrolled: 0,
    coursesCompleted: user.profile.coursesCompleted,
    certificatesEarned: 0,
    badgesEarned: 0,
  };
}