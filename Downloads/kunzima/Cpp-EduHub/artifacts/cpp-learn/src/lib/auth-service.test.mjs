import test from 'node:test';
import assert from 'node:assert/strict';
import { getCurrentSession, loginUser, logoutUser, signupUser, updateUserProfile } from './auth-service.js';

test('signup, login, profile update, and logout work without browser storage', () => {
  logoutUser();

  const signup = signupUser({
    email: 'demo@example.com',
    password: 'password123',
    name: 'Demo User',
    username: 'demo_user',
  });

  assert.equal(signup.success, true);

  const login = loginUser({ email: 'demo@example.com', password: 'password123' });
  assert.equal(login.success, true);
  assert.equal(login.user?.username, 'demo_user');

  const updated = updateUserProfile({
    currentUser: login.user,
    updates: { bio: 'Learning C++' },
  });

  assert.equal(updated.success, true);
  assert.equal(updated.user?.bio, 'Learning C++');

  const session = getCurrentSession();
  assert.equal(session?.user?.email, 'demo@example.com');

  const loggedOut = logoutUser();
  assert.equal(loggedOut.success, true);
  assert.equal(getCurrentSession(), null);
});
