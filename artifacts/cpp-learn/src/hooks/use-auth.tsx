/**
 * uPhumeh - Authentication Hook
 * 
 * Provides user authentication functionality including signup, login, logout, and profile management.
 */

import { useState, useEffect, useCallback, createContext, useContext, type ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { DEFAULT_LANGUAGE, normalizeLanguageId, type LanguageId } from '@/config/languages';
import { useLanguage } from '@/hooks/use-language';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  joinDate: string;
  preferredLanguage: LanguageId;
  preferences: {
    theme: 'light' | 'dark' | 'system';
    notifications: boolean;
  };
  stats: {
    totalXp: number;
    level: number;
    streak: number;
    completedLessons: number;
    passedQuizzes: number;
  };
}

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => Promise<boolean>;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => false,
  signup: async () => false,
  loginWithGoogle: async () => false,
  logout: () => {},
  updateProfile: async () => false,
  error: null,
  clearError: () => {},
});

const STORAGE_KEYS = {
  USER: 'uphumeh_user',
  TOKEN: 'uphumeh_token',
};

export function useAuthProvider() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { currentLanguage, setLanguage } = useLanguage();

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser) as UserProfile;
          const normalizedLanguage = normalizeLanguageId(parsedUser.preferredLanguage);
          if (normalizedLanguage) {
            setLanguage(normalizedLanguage);
          }
          setUser(parsedUser);
        }
      } catch (e) {
        console.error('Failed to load user:', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, [setLanguage]);

  const loginWithGoogle = useCallback(async (): Promise<boolean> => {
    try {
      setError(null);
      
      // Simulate Google OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const preferredLanguage = normalizeLanguageId(currentLanguage) ?? DEFAULT_LANGUAGE;
      setLanguage(preferredLanguage);

      // In production, this would trigger the Google OAuth popup
      // For demo purposes, create a mock Google user
      const mockUser: UserProfile = {
        id: `google-user-${Date.now()}`,
        email: `user@gmail.com`,
        name: 'Google User',
        avatar: 'https://ui-avatars.com/api/?name=Google+User&background=4285F4&color=fff',
        joinDate: new Date().toISOString(),
        preferredLanguage,
        preferences: {
          theme: 'system',
          notifications: true,
        },
        stats: {
          totalXp: 100,
          level: 1,
          streak: 0,
          completedLessons: 0,
          passedQuizzes: 0,
        },
      };

      setUser(mockUser);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(mockUser));
      localStorage.setItem(STORAGE_KEYS.TOKEN, `google-token-${Date.now()}`);
      
      toast({
        title: 'Welcome to uPhumeh!',
        description: `Signed in with Google as ${mockUser.name}`,
      });
      
      return true;
    } catch (e) {
      const errorMessage = 'Google sign-in failed. Please try again.';
      setError(errorMessage);
      toast({
        title: 'Google sign-in failed',
        description: errorMessage,
        variant: 'destructive',
      });
      return false;
    }
  }, [currentLanguage, setLanguage, toast]);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      setError(null);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const preferredLanguage = normalizeLanguageId(currentLanguage) ?? DEFAULT_LANGUAGE;
      setLanguage(preferredLanguage);

      // For demo purposes, accept any email/password combination
      // In production, this would call your backend API
      const mockUser: UserProfile = {
        id: `user-${Date.now()}`,
        email: email,
        name: email.split('@')[0],
        joinDate: new Date().toISOString(),
        preferredLanguage,
        preferences: {
          theme: 'system',
          notifications: true,
        },
        stats: {
          totalXp: 0,
          level: 1,
          streak: 0,
          completedLessons: 0,
          passedQuizzes: 0,
        },
      };

      setUser(mockUser);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(mockUser));
      localStorage.setItem(STORAGE_KEYS.TOKEN, `token-${Date.now()}`);
      
      toast({
        title: 'Welcome back!',
        description: `Logged in as ${mockUser.name}`,
      });
      
      return true;
    } catch (e) {
      const errorMessage = 'Login failed. Please check your credentials.';
      setError(errorMessage);
      toast({
        title: 'Login failed',
        description: errorMessage,
        variant: 'destructive',
      });
      return false;
    }
  }, [currentLanguage, setLanguage, toast]);

  const signup = useCallback(async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      setError(null);
      
      // Validate input
      if (!email || !password || !name) {
        const errorMessage = 'All fields are required.';
        setError(errorMessage);
        toast({
          title: 'Validation error',
          description: errorMessage,
          variant: 'destructive',
        });
        return false;
      }
      
      if (password.length < 6) {
        const errorMessage = 'Password must be at least 6 characters.';
        setError(errorMessage);
        toast({
          title: 'Validation error',
          description: errorMessage,
          variant: 'destructive',
        });
        return false;
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const preferredLanguage = normalizeLanguageId(currentLanguage) ?? DEFAULT_LANGUAGE;
      setLanguage(preferredLanguage);

      // For demo purposes, create user immediately
      // In production, this would call your backend API
      const mockUser: UserProfile = {
        id: `user-${Date.now()}`,
        email: email,
        name: name,
        joinDate: new Date().toISOString(),
        preferredLanguage,
        preferences: {
          theme: 'system',
          notifications: true,
        },
        stats: {
          totalXp: 0,
          level: 1,
          streak: 0,
          completedLessons: 0,
          passedQuizzes: 0,
        },
      };

      setUser(mockUser);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(mockUser));
      localStorage.setItem(STORAGE_KEYS.TOKEN, `token-${Date.now()}`);
      
      toast({
        title: 'Welcome to uPhumeh!',
        description: `Account created for ${name}`,
      });
      
      return true;
    } catch (e) {
      const errorMessage = 'Signup failed. Please try again.';
      setError(errorMessage);
      toast({
        title: 'Signup failed',
        description: errorMessage,
        variant: 'destructive',
      });
      return false;
    }
  }, [currentLanguage, setLanguage, toast]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully.',
    });
  }, [toast]);

  const updateProfile = useCallback(async (updates: Partial<UserProfile>): Promise<boolean> => {
    try {
      setError(null);
      
      if (!user) {
        setError('Not authenticated.');
        return false;
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const normalizedLanguage = normalizeLanguageId(updates.preferredLanguage ?? user.preferredLanguage);
      const updatedUser: UserProfile = {
        ...user,
        ...updates,
        preferredLanguage: normalizedLanguage ?? user.preferredLanguage ?? DEFAULT_LANGUAGE,
        preferences: {
          ...user.preferences,
          ...(updates.preferences ?? {}),
        },
      };

      if (normalizedLanguage) {
        setLanguage(normalizedLanguage);
      }

      setUser(updatedUser);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
      
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      });
      
      return true;
    } catch (e) {
      const errorMessage = 'Failed to update profile.';
      setError(errorMessage);
      toast({
        title: 'Update failed',
        description: errorMessage,
        variant: 'destructive',
      });
      return false;
    }
  }, [setLanguage, user, toast]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

    return {
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      loginWithGoogle,
      signup,
      logout,
      updateProfile,
      error,
      clearError,
    };
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const {
      user,
      isLoading,
      isAuthenticated,
      login,
      loginWithGoogle,
      signup,
      logout,
      updateProfile,
      error,
      clearError,
    } = useAuthProvider();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-lg text-muted-foreground">Loading uPhumeh...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        loginWithGoogle,
        signup,
        logout,
        updateProfile,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}