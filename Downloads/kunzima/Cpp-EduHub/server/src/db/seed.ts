/**
 * Infinity Code - Database Seed Script
 * Seeds the database with initial data including categories, courses, and badges
 */

import { db } from './index.js';
import {
  categories,
  badges,
  forumCategories,
} from './schema/index.js';

async function seed() {
  console.log('🌱 Starting database seeding...');

  try {
    // ============================================
    // CATEGORIES
    // ============================================
    console.log('📂 Seeding categories...');

    const categoryData = [
      { name: 'C++', slug: 'cpp', description: 'C++ programming courses', icon: 'C++', color: '#00599C', order: 1 },
      { name: 'Python', slug: 'python', description: 'Python programming courses', icon: 'Py', color: '#3776AB', order: 2 },
      { name: 'Java', slug: 'java', description: 'Java programming courses', icon: 'Java', color: '#ED8B00', order: 3 },
      { name: 'JavaScript', slug: 'javascript', description: 'JavaScript programming courses', icon: 'JS', color: '#F7DF1E', order: 4 },
      { name: 'TypeScript', slug: 'typescript', description: 'TypeScript programming courses', icon: 'TS', color: '#3178C6', order: 5 },
    ];

    for (const cat of categoryData) {
      await db.insert(categories).values(cat).onConflictDoNothing();
    }

    // ============================================
    // FORUM CATEGORIES
    // ============================================
    console.log('💬 Seeding forum categories...');

    const forumCategoryData = [
      { name: 'General Discussion', slug: 'general', description: 'General programming discussions', icon: 'MessageCircle', color: '#3B82F6', order: 1 },
      { name: 'Help & Support', slug: 'help', description: 'Get help with your code', icon: 'HelpCircle', color: '#EF4444', order: 2 },
      { name: 'Project Showcase', slug: 'showcase', description: 'Show off your projects', icon: 'Trophy', color: '#F59E0B', order: 3 },
      { name: 'Career Advice', slug: 'career', description: 'Career guidance and job discussions', icon: 'Briefcase', color: '#10B981', order: 4 },
    ];

    for (const fc of forumCategoryData) {
      await db.insert(forumCategories).values(fc).onConflictDoNothing();
    }

    // ============================================
    // BADGES
    // ============================================
    console.log('🏆 Seeding badges...');

    const badgeData = [
      { name: 'First Steps', slug: 'first-steps', description: 'Complete your first lesson', icon: 'Footprints', type: 'achievement' as const, category: 'learning', points: 10, requirement: { type: 'lesson_complete', count: 1 } },
      { name: 'Quick Learner', slug: 'quick-learner', description: 'Complete 10 lessons', icon: 'Zap', type: 'achievement' as const, category: 'learning', points: 50, requirement: { type: 'lesson_complete', count: 10 } },
      { name: 'Dedicated Student', slug: 'dedicated-student', description: 'Complete 50 lessons', icon: 'BookOpen', type: 'achievement' as const, category: 'learning', points: 100, requirement: { type: 'lesson_complete', count: 50 } },
      { name: 'Course Master', slug: 'course-master', description: 'Complete 5 courses', icon: 'GraduationCap', type: 'completion' as const, category: 'learning', points: 200, requirement: { type: 'course_complete', count: 5 } },
      { name: 'Quiz Champion', slug: 'quiz-champion', description: 'Pass 20 quizzes', icon: 'Award', type: 'achievement' as const, category: 'assessment', points: 150, requirement: { type: 'quiz_pass', count: 20 } },
      { name: 'Perfect Score', slug: 'perfect-score', description: 'Get 100% on a quiz', icon: 'Star', type: 'achievement' as const, category: 'assessment', points: 75, requirement: { type: 'quiz_perfect' } },
      { name: '7-Day Streak', slug: '7-day-streak', description: 'Study for 7 consecutive days', icon: 'Flame', type: 'streak' as const, category: 'streak', points: 50, requirement: { type: 'streak', count: 7 } },
      { name: '30-Day Streak', slug: '30-day-streak', description: 'Study for 30 consecutive days', icon: 'Flame', type: 'streak' as const, category: 'streak', points: 200, requirement: { type: 'streak', count: 30 } },
      { name: 'Helpful Member', slug: 'helpful-member', description: 'Answer 10 community questions', icon: 'Heart', type: 'community' as const, category: 'community', points: 100, requirement: { type: 'helpful_answers', count: 10 } },
      { name: 'Code Reviewer', slug: 'code-reviewer', description: 'Review 5 peer submissions', icon: 'Eye', type: 'community' as const, category: 'community', points: 75, requirement: { type: 'code_reviews', count: 5 } },
      { name: 'Project Builder', slug: 'project-builder', description: 'Complete 3 projects', icon: 'Code', type: 'completion' as const, category: 'projects', points: 150, requirement: { type: 'project_complete', count: 3 } },
      { name: 'Premium Member', slug: 'premium-member', description: 'Subscribe to Premium', icon: 'Crown', type: 'special' as const, category: 'special', points: 100, requirement: { type: 'subscription', plan: 'premium' } },
    ];

    for (const badge of badgeData) {
      await db.insert(badges).values(badge).onConflictDoNothing();
    }

    console.log('✅ Database seeding completed successfully!');
    console.log(`   - ${categoryData.length} categories`);
    console.log(`   - ${forumCategoryData.length} forum categories`);
    console.log(`   - ${badgeData.length} badges`);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

// Run seeding
seed();