const STORAGE_KEYS = {
  users: 'infinity-auth-users',
  session: 'infinity-auth-session',
};

const MEMORY_STORAGE = {};

function getStorage() {
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage;
  }

  if (typeof globalThis !== 'undefined' && globalThis.localStorage) {
    return globalThis.localStorage;
  }

  return {
    getItem(key) {
      return Object.prototype.hasOwnProperty.call(MEMORY_STORAGE, key) ? MEMORY_STORAGE[key] : null;
    },
    setItem(key, value) {
      MEMORY_STORAGE[key] = String(value);
    },
    removeItem(key) {
      delete MEMORY_STORAGE[key];
    },
    clear() {
      Object.keys(MEMORY_STORAGE).forEach((key) => delete MEMORY_STORAGE[key]);
    },
  };
}

function readStoredJson(key) {
  try {
    const value = getStorage().getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

function writeStoredJson(key, value) {
  getStorage().setItem(key, JSON.stringify(value));
}

export function sanitizeUsername(value = '') {
  const normalized = String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9_]/g, '')
    .slice(0, 20);

  return normalized.length >= 3 ? normalized : normalized || 'user';
}

export function buildFallbackProfile({
  id,
  email,
  name,
  username,
  avatar,
  role = 'user',
  preferredLanguage = 'en',
  emailVerified = false,
  createdAt = new Date().toISOString(),
  updatedAt = new Date().toISOString(),
  lastLogin = new Date().toISOString(),
  bio = null,
  theme = 'system',
  notificationsEnabled = true,
  subscriptionStatus = 'free',
}) {
  const displayName = name?.trim() || email?.split('@')[0] || 'Learner';

  return {
    id,
    email,
    name: displayName,
    username: sanitizeUsername(username || displayName),
    avatar: avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=3898FF&color=fff&size=200`,
    bio,
    phone_number: null,
    country: null,
    learning_goals: null,
    created_at: createdAt,
    updated_at: updatedAt,
    last_login: lastLogin,
    preferred_language: preferredLanguage,
    role,
    email_verified: emailVerified,
    theme,
    notifications_enabled: notificationsEnabled,
    subscription_status: subscriptionStatus,
    subscription_expires_at: null,
    courses_enrolled: 0,
    courses_completed: 0,
    lessons_completed: 0,
    certificates_earned: 0,
    streak: 0,
    achievements_unlocked: 0,
    projects_completed: 0,
    total_xp: 0,
    quizzes_passed: 0,
  };
}

export function getStoredUsers() {
  return readStoredJson(STORAGE_KEYS.users) || [];
}

export function saveStoredUsers(users) {
  writeStoredJson(STORAGE_KEYS.users, users);
}

export function getStoredSession() {
  return readStoredJson(STORAGE_KEYS.session);
}

export function saveStoredSession(session) {
  writeStoredJson(STORAGE_KEYS.session, session);
}

export function clearStoredAuthData() {
  const storage = getStorage();
  storage.removeItem(STORAGE_KEYS.session);
  storage.removeItem(STORAGE_KEYS.users);
}
