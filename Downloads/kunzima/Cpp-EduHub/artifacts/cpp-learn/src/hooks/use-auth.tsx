import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { DEFAULT_LANGUAGE, normalizeLanguageId, type LanguageId } from '@/config/languages';
import { useLanguage } from '@/hooks/use-language';
import { getCurrentSession, loginUser, loginWithGoogle, logoutUser, signupUser, updateUserProfile } from '@/lib/auth-service';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  username: string;
  avatar?: string | null;
  bio?: string | null;
  phone_number?: string | null;
  country?: string | null;
  learning_goals?: string | null;
  created_at: string;
  updated_at: string;
  last_login?: string | null;
  preferred_language: string;
  role: 'user' | 'admin';
  email_verified: boolean;
  theme: 'light' | 'dark' | 'system';
  notifications_enabled: boolean;
  subscription_status: 'free' | 'premium';
  subscription_expires_at?: string | null;
  courses_enrolled: number;
  courses_completed: number;
  lessons_completed: number;
  certificates_earned: number;
  streak: number;
  achievements_unlocked: number;
  projects_completed: number;
  total_xp: number;
  quizzes_passed: number;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signup: (email: string, password: string, name: string, username: string) => Promise<{ success: boolean; error?: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuthProvider() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { setLanguage } = useLanguage();

  useEffect(() => {
    const session = getCurrentSession();
    if (session?.user) {
      setUser(session.user as UserProfile);
      const lang = normalizeLanguageId(session.user.preferred_language as LanguageId);
      if (lang) setLanguage(lang);
    }
    setIsLoading(false);
  }, [setLanguage]);

  const signup = useCallback(async (email: string, password: string, name: string, username: string) => {
    const result = signupUser({ email, password, name, username });
    if (result.success && result.user) {
      setUser(result.user);
      const lang = normalizeLanguageId(result.user.preferred_language as LanguageId);
      if (lang) setLanguage(lang);
      toast({ title: 'Account created', description: 'You are signed in and ready to explore.' });
      return { success: true };
    }
    return { success: false, error: result.error };
  }, [setLanguage, toast]);

  const login = useCallback(async (email: string, password: string) => {
    const result = loginUser({ email, password });
    if (result.success && result.user) {
      setUser(result.user);
      const lang = normalizeLanguageId(result.user.preferred_language as LanguageId);
      if (lang) setLanguage(lang);
      toast({ title: 'Welcome back', description: 'You have successfully signed in.' });
      return { success: true };
    }
    return { success: false, error: result.error };
  }, [setLanguage, toast]);

  const loginWithGoogleHandler = useCallback(async () => {
    const result = loginWithGoogle();
    if (result.success && result.user) {
      setUser(result.user);
      const lang = normalizeLanguageId(result.user.preferred_language as LanguageId);
      if (lang) setLanguage(lang);
      toast({ title: 'Signed in with Google', description: 'You are ready to continue.' });
      return { success: true };
    }
    return { success: false, error: result.error };
  }, [setLanguage, toast]);

  const logout = useCallback(async () => {
    logoutUser();
    setUser(null);
    toast({ title: 'Signed out', description: 'You have been logged out.' });
  }, [toast]);

  const updateProfile = useCallback(async (updates: Partial<UserProfile>) => {
    if (!user) return { success: false, error: 'Not authenticated.' };
    const result = updateUserProfile({ currentUser: user, updates });
    if (result.success && result.user) {
      setUser(result.user);
      const lang = normalizeLanguageId(result.user.preferred_language as LanguageId);
      if (lang) setLanguage(lang);
      toast({ title: 'Profile updated', description: 'Your profile changes have been saved.' });
      return { success: true };
    }
    return { success: false, error: result.error };
  }, [setLanguage, toast, user]);

  const refreshProfile = useCallback(async () => {
    const session = getCurrentSession();
    if (session?.user) setUser(session.user as UserProfile);
  }, []);

  const value = useMemo(() => ({
    user,
    isLoading,
    isAuthenticated: !!user,
    signup,
    login,
    loginWithGoogle: loginWithGoogleHandler,
    logout,
    updateProfile,
    refreshProfile,
  }), [isLoading, login, loginWithGoogleHandler, logout, signup, updateProfile, user, refreshProfile]);

  return value;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuthProvider();

  if (auth.isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-300">Loading...</div>;
  }

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
