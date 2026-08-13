declare module '@/lib/auth-service' {
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

  export interface AuthResult {
    success: boolean;
    error?: string;
    user?: UserProfile | null;
    needsEmailConfirmation?: boolean;
    redirecting?: boolean;
    message?: string;
    avatarUrl?: string | null;
  }

  export interface SignupParams {
    email: string;
    password: string;
    name: string;
    username: string;
  }

  export interface LoginParams {
    email: string;
    password: string;
  }

  export interface UpdateProfileParams {
    currentUser: UserProfile;
    updates: Partial<UserProfile>;
  }

  export interface ResetPasswordParams {
    email: string;
  }

  export interface UpdatePasswordParams {
    currentPassword: string;
    newPassword: string;
  }

  export interface UploadAvatarParams {
    currentUser: UserProfile;
    file: File;
  }

  export interface AuthStateChangeResult {
    data: { subscription: { unsubscribe: () => void } };
  }

  export function getCurrentSession(): Promise<{ user: UserProfile | null } | null>;
  export function signupUser(params: SignupParams): Promise<AuthResult>;
  export function loginUser(params: LoginParams): Promise<AuthResult>;
  export function loginWithGoogle(): Promise<AuthResult>;
  export function logoutUser(): Promise<void>;
  export function updateUserProfile(params: UpdateProfileParams): Promise<AuthResult>;
  export function resetPassword(params: ResetPasswordParams): Promise<AuthResult>;
  export function updatePassword(params: UpdatePasswordParams): Promise<AuthResult>;
  export function uploadAvatar(params: UploadAvatarParams): Promise<AuthResult>;
  export function resendVerificationEmail(params: ResetPasswordParams): Promise<AuthResult>;
  export function onAuthStateChange(
    callback: (event: string, session: { user?: UserProfile | null } | null) => void
  ): AuthStateChangeResult;

  export function getAuthToken(): string | null;
  export function getRefreshToken(): string | null;
  export const API_URL: string;
  export function apiRequest(endpoint: string, options?: RequestInit): Promise<any>;
}
