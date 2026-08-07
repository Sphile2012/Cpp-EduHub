import {
  buildFallbackProfile,
  clearStoredAuthData,
  getStoredSession,
  getStoredUsers,
  saveStoredSession,
  saveStoredUsers,
  sanitizeUsername,
} from './auth-utils.js';

function makeSession(profile) {
  return {
    access_token: `local-${profile.id}`,
    refresh_token: `local-${profile.id}`,
    token_type: 'bearer',
    expires_at: Math.floor(Date.now() / 1000) + 3600,
    user: profile,
  };
}

function normalizePayload(payload = {}) {
  const { email = '', password = '', name = '', username = '' } = payload;
  return { email, password, name, username };
}

export function signupUser(payload) {
  const { email, password, name, username } = normalizePayload(payload);

  if (!email || !password || !name || !username) {
    return { success: false, error: 'All fields are required.' };
  }

  if (password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters.' };
  }

  const normalizedUsername = sanitizeUsername(username);
  if (normalizedUsername.length < 3) {
    return { success: false, error: 'Username must be at least 3 characters.' };
  }

  const existingUsers = getStoredUsers();
  const emailTaken = existingUsers.some((user) => user.email === email);
  const usernameTaken = existingUsers.some((user) => user.username === normalizedUsername);

  if (emailTaken || usernameTaken) {
    return { success: false, error: 'That email or username is already in use.' };
  }

  const profile = buildFallbackProfile({
    id: `local-${Date.now()}`,
    email,
    name,
    username: normalizedUsername,
    emailVerified: true,
  });

  const userRecord = { ...profile, password };
  const nextUsers = [...existingUsers, userRecord];
  saveStoredUsers(nextUsers);
  saveStoredSession(makeSession(profile));

  return { success: true, user: profile };
}

export function loginUser(payload) {
  const { email, password } = normalizePayload(payload);
  if (!email || !password) {
    return { success: false, error: 'Email and password are required.' };
  }

  const storedUsers = getStoredUsers();
  const storedUser = storedUsers.find((user) => user.email === email && user.password === password);
  if (!storedUser) {
    return { success: false, error: 'Invalid email or password.' };
  }

  const profile = buildFallbackProfile({
    id: storedUser.id,
    email: storedUser.email,
    name: storedUser.name,
    username: storedUser.username,
    avatar: storedUser.avatar,
    role: storedUser.role,
    preferredLanguage: storedUser.preferred_language,
    emailVerified: storedUser.email_verified,
    createdAt: storedUser.created_at,
    updatedAt: storedUser.updated_at,
    lastLogin: new Date().toISOString(),
    bio: storedUser.bio || null,
    theme: storedUser.theme,
    notificationsEnabled: storedUser.notifications_enabled,
    subscriptionStatus: storedUser.subscription_status,
  });

  saveStoredSession(makeSession(profile));
  return { success: true, user: profile };
}

export function loginWithGoogle(payload = {}) {
  const { email = '', name = '' } = payload;
  const resolvedEmail = email || window?.prompt?.('Enter your email to continue with Google sign-in:') || '';

  if (!resolvedEmail) {
    return { success: false, error: 'Email is required for Google sign-in.' };
  }

  const existingUsers = getStoredUsers();
  const existingUser = existingUsers.find((user) => user.email === resolvedEmail);
  const profile = existingUser
    ? buildFallbackProfile({
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name || name || resolvedEmail.split('@')[0],
        username: existingUser.username,
        avatar: existingUser.avatar,
        role: existingUser.role,
        preferredLanguage: existingUser.preferred_language,
        emailVerified: true,
        createdAt: existingUser.created_at,
        updatedAt: existingUser.updated_at,
        lastLogin: new Date().toISOString(),
        bio: existingUser.bio || null,
        theme: existingUser.theme,
        notificationsEnabled: existingUser.notifications_enabled,
        subscriptionStatus: existingUser.subscription_status,
      })
    : buildFallbackProfile({
        id: `google-${Date.now()}`,
        email: resolvedEmail,
        name: name || resolvedEmail.split('@')[0],
        username: sanitizeUsername((name || resolvedEmail.split('@')[0]).replace(/\s+/g, '')),
        emailVerified: true,
      });

  if (!existingUser) {
    saveStoredUsers([...existingUsers, { ...profile, password: '' }]);
  }

  saveStoredSession(makeSession(profile));
  return { success: true, user: profile };
}

export function updateUserProfile(payload) {
  const { currentUser, updates } = payload;
  if (!currentUser) {
    return { success: false, error: 'Not authenticated.' };
  }

  const existingUsers = getStoredUsers();
  const nextUsers = existingUsers.map((user) => {
    if (user.id === currentUser.id || user.email === currentUser.email) {
      return { ...user, ...updates, updated_at: new Date().toISOString() };
    }
    return user;
  });

  saveStoredUsers(nextUsers);
  const updatedProfile = nextUsers.find((user) => user.id === currentUser.id || user.email === currentUser.email);
  if (!updatedProfile) {
    return { success: false, error: 'Profile could not be updated.' };
  }

  const profile = buildFallbackProfile({
    id: updatedProfile.id,
    email: updatedProfile.email,
    name: updatedProfile.name,
    username: updatedProfile.username,
    avatar: updatedProfile.avatar,
    role: updatedProfile.role,
    preferredLanguage: updatedProfile.preferred_language,
    emailVerified: updatedProfile.email_verified,
    createdAt: updatedProfile.created_at,
    updatedAt: updatedProfile.updated_at,
    lastLogin: updatedProfile.last_login,
    bio: updatedProfile.bio || null,
    theme: updatedProfile.theme,
    notificationsEnabled: updatedProfile.notifications_enabled,
    subscriptionStatus: updatedProfile.subscription_status,
  });

  saveStoredSession(makeSession(profile));
  return { success: true, user: profile };
}

export function getCurrentSession() {
  return getStoredSession();
}

export function logoutUser() {
  clearStoredAuthData();
  return { success: true };
}
