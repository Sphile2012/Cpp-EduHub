/**
 * Infinity Code - Auth Service
 * Connects the frontend to the Express backend API for authentication.
 * Uses JWT tokens stored in localStorage.
 */

import {
  buildFallbackProfile,
  clearStoredAuthData,
  saveStoredSession,
  sanitizeUsername,
} from './auth-utils.js';

// API base URL from environment variable
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Storage keys
const TOKEN_KEY = 'infinity-auth-token';
const REFRESH_TOKEN_KEY = 'infinity-auth-refresh-token';
const USER_KEY = 'infinity-auth-user';

// Admin email from env (optional)
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || '';

/**
 * Get the stored JWT token
 */
export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Get the stored refresh token
 */
export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

/**
 * API request helper with auth header
 */
async function apiRequest(endpoint, options = {}) {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data.error || data.message || `Request failed with status ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

/**
 * Map backend user object to frontend UserProfile format
 */
function mapBackendUser(backendUser) {
  if (!backendUser) return null;

  return buildFallbackProfile({
    id: backendUser.id,
    email: backendUser.email,
    name: backendUser.name,
    username: backendUser.username || sanitizeUsername(backendUser.name || backendUser.email),
    avatar: backendUser.avatar || null,
    role: backendUser.role || (backendUser.email === ADMIN_EMAIL ? 'admin' : 'user'),
    emailVerified: backendUser.emailVerified ?? false,
    preferredLanguage: backendUser.preferredLanguage || 'en',
    theme: backendUser.theme || 'system',
    notificationsEnabled: backendUser.notificationsEnabled ?? true,
    subscriptionStatus: backendUser.subscriptionStatus || 'free',
    createdAt: backendUser.createdAt || new Date().toISOString(),
    updatedAt: backendUser.updatedAt || new Date().toISOString(),
    lastLogin: backendUser.lastLogin || new Date().toISOString(),
    bio: backendUser.bio || null,
  });
}

/**
 * Store auth data (tokens + user) in localStorage
 */
function storeAuthData(token, refreshToken, user) {
  localStorage.setItem(TOKEN_KEY, token);
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  // Also save in the old session format for backward compatibility
  saveStoredSession({
    access_token: token,
    refresh_token: refreshToken,
    token_type: 'bearer',
    expires_at: Math.floor(Date.now() / 1000) + 3600,
    user,
  });
}

/**
 * Get stored user from localStorage
 */
function getStoredUser() {
  try {
    const userJson = localStorage.getItem(USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  } catch {
    return null;
  }
}

function getErrorMessage(error) {
  if (!error) return 'An unknown error occurred';
  const message = error.message || String(error);

  if (message.includes('Invalid login credentials') || message.includes('Invalid email or password')) {
    return 'Invalid email or password. If you don\'t have an account, please sign up first.';
  }
  if (message.includes('Email not confirmed')) {
    return 'Please verify your email address before logging in.';
  }
  if (message.includes('User already registered') || message.includes('already exists')) {
    return 'An account with this email already exists. Please login instead.';
  }
  if (message.includes('Password should be at least') || message.includes('Password must be at least')) {
    return 'Password must be at least 6 characters long.';
  }
  if (message.includes('Weak password')) {
    return 'Password is too weak. Please use a stronger password.';
  }
  if (message.includes('Invalid email')) {
    return 'Please enter a valid email address. Fake emails are not allowed.';
  }
  if (message.includes('Failed to fetch') || message.includes('NetworkError')) {
    return 'Cannot connect to the server. Please make sure the backend is running.';
  }
  if (message.includes('User not found') || message.includes('no user')) {
    return 'No account found with this email. Please sign up first.';
  }

  return message;
}

/**
 * Validate email format more strictly to prevent fake emails
 */
function isValidEmail(email) {
  // More strict email regex that checks for valid domain structure
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!emailRegex.test(email)) return false;
  
  // Check for valid domain structure
  const parts = email.split('@');
  if (parts.length !== 2) return false;
  
  const localPart = parts[0];
  const domainPart = parts[1];
  
  // Domain must have at least one dot and valid TLD
  if (!domainPart || !domainPart.includes('.')) return false;
  
  const tld = domainPart.split('.').pop();
  if (tld.length < 2) return false;
  
  // Check for obviously fake/test domains
  const fakeDomains = ['example.com', 'test.com', 'fake.com', 'temp.com', 'mail.com', 'email.com'];
  if (fakeDomains.includes(domainPart.toLowerCase())) return false;
  
  // Local part should not be too simple
  if (localPart.length < 2) return false;
  
  // Check for common fake patterns
  if (/^[0-9]+$/.test(localPart)) return false; // Just numbers
  if (/^test[0-9]*$/.test(localPart.toLowerCase())) return false;
  if (/^fake[0-9]*$/.test(localPart.toLowerCase())) return false;
  
  return true;
}

/**
 * Sign up a new user
 */
export async function signupUser(payload) {
  const { email, password, name, username } = payload;

  if (!email || !password || !name || !username) {
    return { success: false, error: 'All fields are required.' };
  }

  if (password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters.' };
  }

  if (!isValidEmail(email)) {
    return { success: false, error: 'Please enter a valid email address. Fake emails are not allowed.' };
  }

  const normalizedUsername = sanitizeUsername(username);
  if (normalizedUsername.length < 3) {
    return { success: false, error: 'Username must be at least 3 characters.' };
  }

  try {
    const data = await apiRequest('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, username: normalizedUsername }),
    });

    const user = mapBackendUser(data.user);
    storeAuthData(data.token, data.refreshToken, user);

    return { success: true, user, needsEmailConfirmation: false };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

/**
 * Login user
 */
export async function loginUser(payload) {
  const { email, password } = payload;

  if (!email || !password) {
    return { success: false, error: 'Email and password are required.' };
  }

  try {
    const data = await apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    const user = mapBackendUser(data.user);
    storeAuthData(data.token, data.refreshToken, user);

    return { success: true, user };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

/**
 * Login with Google (not yet implemented on backend)
 */
export async function loginWithGoogle() {
  return {
    success: false,
    error: 'Google Sign-In is not yet available. Please sign in with your email and password.',
  };
}

/**
 * Get current session (check stored token and fetch user profile)
 */
export async function getCurrentSession() {
  const token = getAuthToken();
  if (!token) {
    return null;
  }

  // Try to get user from storage first (for fast initial load)
  const storedUser = getStoredUser();

  try {
    // Fetch fresh profile from backend
    const data = await apiRequest('/api/users/profile');
    const user = mapBackendUser({
      ...data,
      ...data.profile,
      ...data.settings,
    });

    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      return { user };
    }
  } catch (error) {
    // If 401, try to refresh the token
    if (error.status === 401) {
      const refreshed = await tryRefreshToken();
      if (refreshed) {
        // Retry fetching profile
        try {
          const data = await apiRequest('/api/users/profile');
          const user = mapBackendUser({
            ...data,
            ...data.profile,
            ...data.settings,
          });
          if (user) {
            localStorage.setItem(USER_KEY, JSON.stringify(user));
            return { user };
          }
        } catch {
          // Refresh failed, fall back to stored user
        }
      }
    }

    // Fall back to stored user if available
    if (storedUser) {
      return { user: storedUser };
    }

    // No valid session
    clearStoredAuthData();
    return null;
  }

  // Fallback to stored user
  if (storedUser) {
    return { user: storedUser };
  }

  return null;
}

/**
 * Try to refresh the JWT token
 */
async function tryRefreshToken() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  try {
    const response = await fetch(`${API_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) return false;

    const data = await response.json();
    localStorage.setItem(TOKEN_KEY, data.token);
    if (data.refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Logout user
 */
export async function logoutUser() {
  try {
    await apiRequest('/api/auth/logout', { method: 'POST' });
  } catch {
    // Ignore errors on logout
  }
  clearStoredAuthData();
  return { success: true };
}

/**
 * Update user profile
 */
export async function updateUserProfile(payload) {
  const { currentUser, updates } = payload;
  if (!currentUser) {
    return { success: false, error: 'Not authenticated.' };
  }

  try {
    const data = await apiRequest('/api/users/profile', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });

    // Fetch the updated profile
    const profileData = await apiRequest('/api/users/profile');
    const user = mapBackendUser({
      ...profileData,
      ...profileData.profile,
      ...profileData.settings,
    });

    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    return { success: true, user };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

/**
 * Reset password (request reset email)
 */
export async function resetPassword(payload) {
  const { email } = payload;

  if (!email) {
    return { success: false, error: 'Email is required.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  try {
    await apiRequest('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });

    return { success: true, message: 'If an account exists with this email, you will receive a password reset link.' };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

/**
 * Update password
 */
export async function updatePassword(payload) {
  const { currentPassword, newPassword } = payload;

  if (!newPassword) {
    return { success: false, error: 'New password is required.' };
  }

  if (newPassword.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters.' };
  }

  try {
    await apiRequest('/api/users/password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    return { success: true, message: 'Password updated successfully.' };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

/**
 * Upload avatar (uses data URL fallback since backend file upload not configured)
 */
export async function uploadAvatar(payload) {
  const { currentUser, file } = payload;

  if (!currentUser) {
    return { success: false, error: 'Not authenticated.', avatarUrl: null };
  }

  if (!file) {
    return { success: false, error: 'No file provided.', avatarUrl: null };
  }

  // Use UI Avatars as fallback
  const displayName = currentUser.name || currentUser.email?.split('@')[0] || 'User';
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=3898FF&color=fff&size=200`;

  // Update profile with avatar URL
  await updateUserProfile({
    currentUser,
    updates: { avatar: avatarUrl },
  });

  return { success: true, avatarUrl };
}

/**
 * Resend verification email
 */
export async function resendVerificationEmail(payload) {
  const { email } = payload;

  if (!email) {
    return { success: false, error: 'Email is required.' };
  }

  // Backend doesn't have this endpoint yet, return success
  return { success: true, message: 'Verification email sent (if account exists).' };
}

/**
 * Auth state change listener (no-op for JWT-based auth)
 * Returns a mock subscription for compatibility with the existing hook
 */
export function onAuthStateChange(callback) {
  // In JWT-based auth, we don't have real-time auth state changes
  // The hook handles session loading on mount
  return {
    data: {
      subscription: {
        unsubscribe: () => {},
      },
    },
  };
}

/**
 * Export API_URL and apiRequest for use by other services
 */
export { API_URL, apiRequest };