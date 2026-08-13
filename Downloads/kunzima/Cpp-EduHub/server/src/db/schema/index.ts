/**
 * Infinity Code - Database Schema
 * Comprehensive schema for the learning platform
 */

import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  boolean,
  decimal,
  jsonb,
  varchar,
  pgEnum,
  index,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const userRoleEnum = pgEnum('user_role', ['user', 'instructor', 'admin', 'mentor']);
export const subscriptionStatusEnum = pgEnum('subscription_status', ['free', 'premium', 'trial']);
export const courseLevelEnum = pgEnum('course_level', ['beginner', 'intermediate', 'advanced']);
export const courseStatusEnum = pgEnum('course_status', ['draft', 'published', 'archived']);
export const enrollmentStatusEnum = pgEnum('enrollment_status', ['active', 'completed', 'dropped', 'expired']);
export const progressStatusEnum = pgEnum('progress_status', ['not_started', 'in_progress', 'completed']);
export const questionTypeEnum = pgEnum('question_type', ['multiple_choice', 'true_false', 'fill_blank', 'code', 'essay']);
export const badgeTypeEnum = pgEnum('badge_type', ['achievement', 'streak', 'completion', 'community', 'special']);
export const paymentStatusEnum = pgEnum('payment_status', ['pending', 'completed', 'failed', 'refunded']);
export const ticketStatusEnum = pgEnum('ticket_status', ['open', 'in_progress', 'resolved', 'closed']);
export const notificationTypeEnum = pgEnum('notification_type', ['lesson', 'assignment', 'quiz', 'comment', 'message', 'achievement', 'system']);

// ============================================
// USERS & PROFILES
// ============================================

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash'),
  name: varchar('name', { length: 255 }).notNull(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  avatar: text('avatar'),
  bio: text('bio'),
  role: userRoleEnum('role').notNull().default('user'),
  emailVerified: boolean('email_verified').notNull().default(false),
  twoFactorEnabled: boolean('two_factor_enabled').notNull().default(false),
  twoFactorSecret: text('two_factor_secret'),
  preferredLanguage: varchar('preferred_language', { length: 10 }).notNull().default('en'),
  theme: varchar('theme', { length: 20 }).notNull().default('system'),
  notificationsEnabled: boolean('notifications_enabled').notNull().default(true),
  subscriptionStatus: subscriptionStatusEnum('subscription_status').notNull().default('free'),
  subscriptionExpiresAt: timestamp('subscription_expires_at'),
  stripeCustomerId: text('stripe_customer_id'),
  githubId: text('github_id'),
  googleId: text('google_id'),
  lastLogin: timestamp('last_login'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  emailIdx: index('users_email_idx').on(table.email),
  usernameIdx: index('users_username_idx').on(table.username),
}));

export const userProfiles = pgTable('user_profiles', {
  id: uuid('id').primaryKey().references(() => users.id, { onDelete: 'cascade' }),
  phone: varchar('phone', { length: 20 }),
  country: varchar('country', { length: 100 }),
  city: varchar('city', { length: 100 }),
  timezone: varchar('timezone', { length: 50 }).default('UTC'),
  dateOfBirth: timestamp('date_of_birth'),
  learningGoals: text('learning_goals'),
  careerInterests: jsonb('career_interests'),
  // Stats
  totalXp: integer('total_xp').notNull().default(0),
  currentStreak: integer('current_streak').notNull().default(0),
  longestStreak: integer('longest_streak').notNull().default(0),
  coursesEnrolled: integer('courses_enrolled').notNull().default(0),
  coursesCompleted: integer('courses_completed').notNull().default(0),
  lessonsCompleted: integer('lessons_completed').notNull().default(0),
  certificatesEarned: integer('certificates_earned').notNull().default(0),
  achievementsUnlocked: integer('achievements_unlocked').notNull().default(0),
  projectsCompleted: integer('projects_completed').notNull().default(0),
  quizzesPassed: integer('quizzes_passed').notNull().default(0),
  codeExercisesCompleted: integer('code_exercises_completed').notNull().default(0),
  // Level
  level: integer('level').notNull().default(1),
  xpToNextLevel: integer('xp_to_next_level').notNull().default(100),
});

export const userSettings = pgTable('user_settings', {
  id: uuid('id').primaryKey().references(() => users.id, { onDelete: 'cascade' }),
  emailNotifications: jsonb('email_notifications').default({
    newLessons: true,
    assignments: true,
    comments: true,
    messages: true,
    achievements: true,
    marketing: false,
  }),
  privacySettings: jsonb('privacy_settings').default({
    showProfile: true,
    showProgress: true,
    showAchievements: true,
    showOnLeaderboard: true,
  }),
  accessibilitySettings: jsonb('accessibility_settings').default({
    reduceMotion: false,
    highContrast: false,
    fontSize: 'medium',
    screenReader: false,
  }),
});

// ============================================
// COURSES
// ============================================

export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  description: text('description'),
  icon: varchar('icon', { length: 50 }),
  color: varchar('color', { length: 7 }).default('#3B82F6'),
  order: integer('order').notNull().default(0),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const courses = pgTable('courses', {
  id: uuid('id').primaryKey().defaultRandom(),
  categoryId: uuid('category_id').references(() => categories.id, { onDelete: 'set null' }),
  instructorId: uuid('instructor_id').references(() => users.id, { onDelete: 'set null' }),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description').notNull(),
  shortDescription: varchar('short_description', { length: 500 }),
  thumbnail: text('thumbnail'),
  trailer: text('trailer'),
  level: courseLevelEnum('level').notNull(),
  status: courseStatusEnum('status').notNull().default('draft'),
  language: varchar('language', { length: 10 }).notNull().default('en'),
  // Pricing
  price: decimal('price', { precision: 10, scale: 2 }).default('0'),
  discountedPrice: decimal('discounted_price', { precision: 10, scale: 2 }),
  // Duration
  estimatedHours: integer('estimated_hours').default(0),
  // Stats
  rating: decimal('rating', { precision: 3, scale: 2 }).default('0'),
  ratingCount: integer('rating_count').notNull().default(0),
  enrollmentCount: integer('enrollment_count').notNull().default(0),
  completionCount: integer('completion_count').notNull().default(0),
  // Metadata
  prerequisites: jsonb('prerequisites'),
  learningOutcomes: jsonb('learning_outcomes'),
  tags: jsonb('tags'),
  featured: boolean('featured').notNull().default(false),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  slugIdx: index('courses_slug_idx').on(table.slug),
  categoryIdx: index('courses_category_idx').on(table.categoryId),
  instructorIdx: index('courses_instructor_idx').on(table.instructorId),
  levelIdx: index('courses_level_idx').on(table.level),
  statusIdx: index('courses_status_idx').on(table.status),
}));

export const modules = pgTable('modules', {
  id: uuid('id').primaryKey().defaultRandom(),
  courseId: uuid('course_id').notNull().references(() => courses.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  order: integer('order').notNull(),
  isPublished: boolean('is_published').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  courseIdIdx: index('modules_course_idx').on(table.courseId),
}));

export const lessons = pgTable('lessons', {
  id: uuid('id').primaryKey().defaultRandom(),
  moduleId: uuid('module_id').notNull().references(() => modules.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull(),
  description: text('description'),
  content: text('content'),
  type: varchar('type', { length: 20 }).notNull().default('text'), // video, text, quiz, exercise, project
  order: integer('order').notNull(),
  // Video
  videoUrl: text('video_url'),
  videoDuration: integer('video_duration'), // in seconds
  // Content
  videoTranscript: text('video_transcript'),
  resources: jsonb('resources'), // downloadable files
  // Settings
  isFree: boolean('is_free').notNull().default(false),
  isPublished: boolean('is_published').notNull().default(true),
  // Stats
  viewCount: integer('view_count').notNull().default(0),
  completionCount: integer('completion_count').notNull().default(0),
  averageRating: decimal('average_rating', { precision: 3, scale: 2 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  moduleIdIdx: index('lessons_module_idx').on(table.moduleId),
  slugIdx: index('lessons_slug_idx').on(table.slug),
}));

// ============================================
// ENROLLMENTS & PROGRESS
// ============================================

export const enrollments = pgTable('enrollments', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  courseId: uuid('course_id').notNull().references(() => courses.id, { onDelete: 'cascade' }),
  status: enrollmentStatusEnum('status').notNull().default('active'),
  progress: integer('progress').notNull().default(0), // percentage
  startedAt: timestamp('started_at').notNull().defaultNow(),
  completedAt: timestamp('completed_at'),
  lastAccessedAt: timestamp('last_accessed_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  userIdIdx: index('enrollments_user_idx').on(table.userId),
  courseIdIdx: index('enrollments_course_idx').on(table.courseId),
  userCourseIdx: uniqueIndex('enrollments_user_course_idx').on(table.userId, table.courseId),
}));

export const lessonProgress = pgTable('lesson_progress', {
  id: uuid('id').primaryKey().defaultRandom(),
  enrollmentId: uuid('enrollment_id').notNull().references(() => enrollments.id, { onDelete: 'cascade' }),
  lessonId: uuid('lesson_id').notNull().references(() => lessons.id, { onDelete: 'cascade' }),
  status: progressStatusEnum('status').notNull().default('not_started'),
  startedAt: timestamp('started_at'),
  completedAt: timestamp('completed_at'),
  lastAccessedAt: timestamp('last_accessed_at'),
  // For video lessons
  videoWatchedSeconds: integer('video_watched_seconds').default(0),
  // Notes
  notes: text('notes'),
  // Bookmarks
  bookmarks: jsonb('bookmarks'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  enrollmentIdIdx: index('lesson_progress_enrollment_idx').on(table.enrollmentId),
  lessonIdIdx: index('lesson_progress_lesson_idx').on(table.lessonId),
  enrollmentLessonIdx: uniqueIndex('lesson_progress_enrollment_lesson_idx').on(table.enrollmentId, table.lessonId),
}));

// ============================================
// QUIZZES & QUESTIONS
// ============================================

export const quizzes = pgTable('quizzes', {
  id: uuid('id').primaryKey().defaultRandom(),
  lessonId: uuid('lesson_id').references(() => lessons.id, { onDelete: 'cascade' }),
  courseId: uuid('course_id').references(() => courses.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  passingScore: integer('passing_score').notNull().default(70), // percentage
  timeLimit: integer('time_limit'), // in minutes, null = no limit
  attempts: integer('attempts'), // null = unlimited
  shuffleQuestions: boolean('shuffle_questions').notNull().default(true),
  showCorrectAnswers: boolean('show_correct_answers').notNull().default(true),
  isPublished: boolean('is_published').notNull().default(true),
  order: integer('order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const questions = pgTable('questions', {
  id: uuid('id').primaryKey().defaultRandom(),
  quizId: uuid('quiz_id').notNull().references(() => quizzes.id, { onDelete: 'cascade' }),
  type: questionTypeEnum('type').notNull(),
  question: text('question').notNull(),
  explanation: text('explanation'), // explanation of the correct answer
  points: integer('points').notNull().default(1),
  order: integer('order').notNull(),
  options: jsonb('options'), // for multiple choice
  correctAnswer: text('correct_answer'), // for fill blank, code
  codeSnippet: text('code_snippet'), // code context for the question
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const quizAttempts = pgTable('quiz_attempts', {
  id: uuid('id').primaryKey().defaultRandom(),
  quizId: uuid('quiz_id').notNull().references(() => quizzes.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  score: integer('score').notNull().default(0),
  maxScore: integer('max_score').notNull(),
  percentage: decimal('percentage', { precision: 5, scale: 2 }).notNull().default('0'),
  passed: boolean('passed').notNull().default(false),
  startedAt: timestamp('started_at').notNull().defaultNow(),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  quizIdIdx: index('quiz_attempts_quiz_idx').on(table.quizId),
  userIdIdx: index('quiz_attempts_user_idx').on(table.userId),
}));

export const quizAnswers = pgTable('quiz_answers', {
  id: uuid('id').primaryKey().defaultRandom(),
  attemptId: uuid('attempt_id').notNull().references(() => quizAttempts.id, { onDelete: 'cascade' }),
  questionId: uuid('question_id').notNull().references(() => questions.id, { onDelete: 'cascade' }),
  answer: text('answer').notNull(), // user's answer
  isCorrect: boolean('is_correct').notNull().default(false),
  points: integer('points').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ============================================
// ASSIGNMENTS & SUBMISSIONS
// ============================================

export const assignments = pgTable('assignments', {
  id: uuid('id').primaryKey().defaultRandom(),
  courseId: uuid('course_id').notNull().references(() => courses.id, { onDelete: 'cascade' }),
  moduleId: uuid('module_id').references(() => modules.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  instructions: text('instructions'),
  starterCode: text('starter_code'),
  expectedOutput: text('expected_output'),
  testCases: jsonb('test_cases'),
  maxPoints: integer('max_points').notNull().default(100),
  dueDate: timestamp('due_date'),
  isPublished: boolean('is_published').notNull().default(true),
  allowLateSubmission: boolean('allow_late_submission').notNull().default(true),
  latePenalty: decimal('late_penalty', { precision: 4, scale: 2 }).default('0.1'), // 10% penalty
  order: integer('order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const submissions = pgTable('submissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  assignmentId: uuid('assignment_id').notNull().references(() => assignments.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  code: text('code').notNull(),
  language: varchar('language', { length: 20 }).notNull(),
  status: varchar('status', { length: 20 }).notNull().default('pending'), // pending, passed, failed, reviewing
  score: integer('score'),
  feedback: text('feedback'),
  testResults: jsonb('test_results'),
  isLate: boolean('is_late').notNull().default(false),
  submittedAt: timestamp('submitted_at').notNull().defaultNow(),
  reviewedAt: timestamp('reviewed_at'),
  reviewedBy: uuid('reviewed_by').references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  assignmentIdIdx: index('submissions_assignment_idx').on(table.assignmentId),
  userIdIdx: index('submissions_user_idx').on(table.userId),
}));

// ============================================
// CERTIFICATES
// ============================================

export const certificates = pgTable('certificates', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  courseId: uuid('course_id').notNull().references(() => courses.id, { onDelete: 'cascade' }),
  certificateNumber: varchar('certificate_number', { length: 50 }).notNull().unique(),
  grade: varchar('grade', { length: 10 }), // A, B, C, etc.
  score: integer('score'),
  issuedAt: timestamp('issued_at').notNull().defaultNow(),
  expiresAt: timestamp('expires_at'), // null = never expires
  credentialUrl: text('credential_url'), // public verification URL
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  userIdIdx: index('certificates_user_idx').on(table.userId),
  courseIdIdx: index('certificates_course_idx').on(table.courseId),
  numberIdx: index('certificates_number_idx').on(table.certificateNumber),
}));

// ============================================
// GAMIFICATION
// ============================================

export const badges = pgTable('badges', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  description: text('description').notNull(),
  icon: varchar('icon', { length: 50 }).notNull(),
  type: badgeTypeEnum('type').notNull(),
  category: varchar('category', { length: 50 }),
  points: integer('points').notNull().default(0),
  requirement: jsonb('requirement'), // { type: 'complete_course', count: 5 }
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const userBadges = pgTable('user_badges', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  badgeId: uuid('badge_id').notNull().references(() => badges.id, { onDelete: 'cascade' }),
  earnedAt: timestamp('earned_at').notNull().defaultNow(),
  context: jsonb('context'), // additional context about how badge was earned
}, (table) => ({
  userIdIdx: index('user_badges_user_idx').on(table.userId),
  badgeIdIdx: index('user_badges_badge_idx').on(table.badgeId),
  userBadgeIdx: uniqueIndex('user_badges_user_badge_idx').on(table.userId, table.badgeId),
}));

export const achievements = pgTable('achievements', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: varchar('type', { length: 50 }).notNull(), // streak, completion, xp, etc.
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  points: integer('points').notNull().default(0),
  metadata: jsonb('metadata'),
  earnedAt: timestamp('earned_at').notNull().defaultNow(),
}, (table) => ({
  userIdIdx: index('achievements_user_idx').on(table.userId),
}));

export const xpTransactions = pgTable('xp_transactions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  amount: integer('amount').notNull(),
  type: varchar('type', { length: 50 }).notNull(), // lesson_complete, quiz_pass, badge_earn, etc.
  description: text('description'),
  referenceId: uuid('reference_id'), // id of the related entity
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  userIdIdx: index('xp_transactions_user_idx').on(table.userId),
}));

export const dailyChallenges = pgTable('daily_challenges', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  problem: text('problem').notNull(),
  starterCode: text('starter_code'),
  testCases: jsonb('test_cases'),
  difficulty: courseLevelEnum('difficulty').notNull(),
  points: integer('points').notNull().default(50),
  tags: jsonb('tags'),
  date: timestamp('date').notNull().unique(),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const challengeSubmissions = pgTable('challenge_submissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  challengeId: uuid('challenge_id').notNull().references(() => dailyChallenges.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  code: text('code').notNull(),
  language: varchar('language', { length: 20 }).notNull(),
  passed: boolean('passed').notNull().default(false),
  executionTime: integer('execution_time'), // in ms
  memoryUsage: integer('memory_usage'), // in KB
  submittedAt: timestamp('submitted_at').notNull().defaultNow(),
}, (table) => ({
  challengeIdIdx: index('challenge_submissions_challenge_idx').on(table.challengeId),
  userIdIdx: index('challenge_submissions_user_idx').on(table.userId),
}));

// ============================================
// COMMUNITY
// ============================================

export const forumCategories = pgTable('forum_categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  description: text('description'),
  icon: varchar('icon', { length: 50 }),
  color: varchar('color', { length: 7 }),
  order: integer('order').notNull().default(0),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const forumTopics = pgTable('forum_topics', {
  id: uuid('id').primaryKey().defaultRandom(),
  categoryId: uuid('category_id').notNull().references(() => forumCategories.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  courseId: uuid('course_id').references(() => courses.id, { onDelete: 'set null' }),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  content: text('content').notNull(),
  isPinned: boolean('is_pinned').notNull().default(false),
  isLocked: boolean('is_locked').notNull().default(false),
  isResolved: boolean('is_resolved').notNull().default(false),
  viewCount: integer('view_count').notNull().default(0),
  replyCount: integer('reply_count').notNull().default(0),
  lastReplyAt: timestamp('last_reply_at'),
  lastReplyBy: uuid('last_reply_by').references(() => users.id),
  tags: jsonb('tags'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  categoryIdIdx: index('forum_topics_category_idx').on(table.categoryId),
  userIdIdx: index('forum_topics_user_idx').on(table.userId),
  courseIdIdx: index('forum_topics_course_idx').on(table.courseId),
}));

export const forumPosts = pgTable('forum_posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  topicId: uuid('topic_id').notNull().references(() => forumTopics.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  parentId: uuid('parent_id'),
  content: text('content').notNull(),
  isSolution: boolean('is_solution').notNull().default(false),
  editedAt: timestamp('edited_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  topicIdIdx: index('forum_posts_topic_idx').on(table.topicId),
  userIdIdx: index('forum_posts_user_idx').on(table.userId),
  parentIdIdx: index('forum_posts_parent_idx').on(table.parentId),
}));

export const comments = pgTable('comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  lessonId: uuid('lesson_id').references(() => lessons.id, { onDelete: 'cascade' }),
  parentId: uuid('parent_id'),
  content: text('content').notNull(),
  timestamp: integer('timestamp'), // video timestamp for lesson comments
  likes: integer('likes').notNull().default(0),
  isEdited: boolean('is_edited').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  userIdIdx: index('comments_user_idx').on(table.userId),
  lessonIdIdx: index('comments_lesson_idx').on(table.lessonId),
  parentIdIdx: index('comments_parent_idx').on(table.parentId),
}));

export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  senderId: uuid('sender_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  receiverId: uuid('receiver_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  isRead: boolean('is_read').notNull().default(false),
  readAt: timestamp('read_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  senderIdIdx: index('messages_sender_idx').on(table.senderId),
  receiverIdIdx: index('messages_receiver_idx').on(table.receiverId),
}));

export const studyGroups = pgTable('study_groups', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  creatorId: uuid('creator_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  courseId: uuid('course_id').references(() => courses.id, { onDelete: 'set null' }),
  isPublic: boolean('is_public').notNull().default(true),
  maxMembers: integer('max_members'),
  memberCount: integer('member_count').notNull().default(1),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const studyGroupMembers = pgTable('study_group_members', {
  id: uuid('id').primaryKey().defaultRandom(),
  groupId: uuid('group_id').notNull().references(() => studyGroups.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  role: varchar('role', { length: 20 }).notNull().default('member'), // admin, member
  joinedAt: timestamp('joined_at').notNull().defaultNow(),
}, (table) => ({
  groupIdIdx: index('study_group_members_group_idx').on(table.groupId),
  userIdIdx: index('study_group_members_user_idx').on(table.userId),
  groupUserIdx: uniqueIndex('study_group_members_group_user_idx').on(table.groupId, table.userId),
}));

// ============================================
// PAYMENTS & SUBSCRIPTIONS
// ============================================

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  stripeSubscriptionId: text('stripe_subscription_id').unique(),
  plan: varchar('plan', { length: 20 }).notNull(), // monthly, yearly
  status: varchar('status', { length: 20 }).notNull().default('active'),
  currentPeriodStart: timestamp('current_period_start').notNull(),
  currentPeriodEnd: timestamp('current_period_end').notNull(),
  canceledAt: timestamp('canceled_at'),
  cancelReason: text('cancel_reason'),
  trialStart: timestamp('trial_start'),
  trialEnd: timestamp('trial_end'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  userIdIdx: index('subscriptions_user_idx').on(table.userId),
  stripeIdIdx: index('subscriptions_stripe_idx').on(table.stripeSubscriptionId),
}));

export const payments = pgTable('payments', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  stripePaymentIntentId: text('stripe_payment_intent_id').unique(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 3 }).notNull().default('USD'),
  status: paymentStatusEnum('status').notNull().default('pending'),
  type: varchar('type', { length: 20 }).notNull(), // subscription, course, one_time
  description: text('description'),
  metadata: jsonb('metadata'),
  receiptUrl: text('receipt_url'),
  paidAt: timestamp('paid_at'),
  refundedAt: timestamp('refunded_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  userIdIdx: index('payments_user_idx').on(table.userId),
  stripeIdIdx: index('payments_stripe_idx').on(table.stripePaymentIntentId),
}));

export const coupons = pgTable('coupons', {
  id: uuid('id').primaryKey().defaultRandom(),
  code: varchar('code', { length: 50 }).notNull().unique(),
  type: varchar('type', { length: 20 }).notNull().default('percentage'), // percentage, fixed
  value: decimal('value', { precision: 10, scale: 2 }).notNull(),
  maxUses: integer('max_uses'),
  usedCount: integer('used_count').notNull().default(0),
  expiresAt: timestamp('expires_at'),
  isActive: boolean('is_active').notNull().default(true),
  courseId: uuid('course_id').references(() => courses.id, { onDelete: 'cascade' }), // course-specific coupon
  createdBy: uuid('created_by').notNull().references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const referrals = pgTable('referrals', {
  id: uuid('id').primaryKey().defaultRandom(),
  referrerId: uuid('referrer_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  referredEmail: varchar('referred_email', { length: 255 }).notNull(),
  referredUserId: uuid('referred_user_id').references(() => users.id, { onDelete: 'set null' }),
  status: varchar('status', { length: 20 }).notNull().default('pending'), // pending, completed
  reward: decimal('reward', { precision: 10, scale: 2 }),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ============================================
// NOTIFICATIONS
// ============================================

export const notifications = pgTable('notifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: notificationTypeEnum('type').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  message: text('message').notNull(),
  data: jsonb('data'),
  isRead: boolean('is_read').notNull().default(false),
  readAt: timestamp('read_at'),
  actionUrl: text('action_url'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  userIdIdx: index('notifications_user_idx').on(table.userId),
}));

// ============================================
// AI INTERACTIONS
// ============================================

export const aiConversations = pgTable('ai_conversations', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }),
  context: jsonb('context'), // course/lesson context
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  userIdIdx: index('ai_conversations_user_idx').on(table.userId),
}));

export const aiMessages = pgTable('ai_messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  conversationId: uuid('conversation_id').notNull().references(() => aiConversations.id, { onDelete: 'cascade' }),
  role: varchar('role', { length: 10 }).notNull(), // user, assistant, system
  content: text('content').notNull(),
  tokens: integer('tokens'),
  model: varchar('model', { length: 50 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  conversationIdIdx: index('ai_messages_conversation_idx').on(table.conversationId),
}));

// ============================================
// SYSTEM
// ============================================

export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  action: varchar('action', { length: 100 }).notNull(),
  resource: varchar('resource', { length: 100 }),
  resourceId: uuid('resource_id'),
  oldValue: jsonb('old_value'),
  newValue: jsonb('new_value'),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  userIdIdx: index('audit_logs_user_idx').on(table.userId),
  actionIdx: index('audit_logs_action_idx').on(table.action),
}));

export const supportTickets = pgTable('support_tickets', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  assignedTo: uuid('assigned_to').references(() => users.id),
  subject: varchar('subject', { length: 255 }).notNull(),
  description: text('description').notNull(),
  status: ticketStatusEnum('status').notNull().default('open'),
  priority: varchar('priority', { length: 10 }).notNull().default('medium'), // low, medium, high, urgent
  category: varchar('category', { length: 50 }),
  attachments: jsonb('attachments'),
  lastMessageAt: timestamp('last_message_at'),
  resolvedAt: timestamp('resolved_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const ticketMessages = pgTable('ticket_messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  ticketId: uuid('ticket_id').notNull().references(() => supportTickets.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  attachments: jsonb('attachments'),
  isInternal: boolean('is_internal').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const reports = pgTable('reports', {
  id: uuid('id').primaryKey().defaultRandom(),
  reporterId: uuid('reporter_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  reportedUserId: uuid('reported_user_id').references(() => users.id, { onDelete: 'set null' }),
  reportedContentId: uuid('reported_content_id'), // comment/post id
  contentType: varchar('content_type', { length: 20 }).notNull(), // user, comment, post
  reason: varchar('reason', { length: 50 }).notNull(), // spam, harassment, inappropriate, other
  description: text('description'),
  status: varchar('status', { length: 20 }).notNull().default('pending'), // pending, reviewed, resolved, rejected
  reviewedBy: uuid('reviewed_by').references(() => users.id),
  reviewedAt: timestamp('reviewed_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ============================================
// RELATIONS
// ============================================

export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(userProfiles, {
    fields: [users.id],
    references: [userProfiles.id],
  }),
  settings: one(userSettings, {
    fields: [users.id],
    references: [userSettings.id],
  }),
  enrollments: many(enrollments),
  submissions: many(submissions),
  certificates: many(certificates),
  badges: many(userBadges),
  achievements: many(achievements),
  notifications: many(notifications),
  aiConversations: many(aiConversations),
}));

export const userProfilesRelations = relations(userProfiles, ({ one }) => ({
  user: one(users, {
    fields: [userProfiles.id],
    references: [users.id],
  }),
}));

export const userSettingsRelations = relations(userSettings, ({ one }) => ({
  user: one(users, {
    fields: [userSettings.id],
    references: [users.id],
  }),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  courses: many(courses),
}));

export const coursesRelations = relations(courses, ({ one, many }) => ({
  category: one(categories, {
    fields: [courses.categoryId],
    references: [categories.id],
  }),
  instructor: one(users, {
    fields: [courses.instructorId],
    references: [users.id],
  }),
  modules: many(modules),
  enrollments: many(enrollments),
  certificates: many(certificates),
}));

export const modulesRelations = relations(modules, ({ one, many }) => ({
  course: one(courses, {
    fields: [modules.courseId],
    references: [courses.id],
  }),
  lessons: many(lessons),
}));

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  module: one(modules, {
    fields: [lessons.moduleId],
    references: [modules.id],
  }),
  progress: many(lessonProgress),
  comments: many(comments),
}));

export const enrollmentsRelations = relations(enrollments, ({ one, many }) => ({
  user: one(users, {
    fields: [enrollments.userId],
    references: [users.id],
  }),
  course: one(courses, {
    fields: [enrollments.courseId],
    references: [courses.id],
  }),
  lessonProgress: many(lessonProgress),
}));

export const lessonProgressRelations = relations(lessonProgress, ({ one }) => ({
  enrollment: one(enrollments, {
    fields: [lessonProgress.enrollmentId],
    references: [enrollments.id],
  }),
  lesson: one(lessons, {
    fields: [lessonProgress.lessonId],
    references: [lessons.id],
  }),
}));