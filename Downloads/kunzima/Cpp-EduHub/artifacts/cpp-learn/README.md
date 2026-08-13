# Cpp-EduHub Authentication System

A complete authentication system for the Cpp-EduHub learning platform, built with React, TypeScript, and Supabase (with localStorage fallback).

## Features

### ✅ Implemented Features

1. **User Registration (Sign Up)**
   - Full form validation
   - Email verification support
   - Password strength indicator
   - Google Sign-Up option

2. **User Login (Sign In)**
   - Email/password authentication
   - Google Sign-In integration
   - Session persistence
   - "Remember me" functionality

3. **Google Authentication**
   - OAuth 2.0 integration via Supabase
   - Automatic user creation
   - Profile picture from Google

4. **Forgot Password**
   - Email-based password reset
   - Secure reset links
   - Token validation

5. **Password Reset**
   - Secure password update
   - Password strength validation
   - Confirmation matching

6. **Email Verification**
   - Verification email on signup
   - Resend verification option
   - Email verification status display

7. **User Profile Management**
   - Update personal information
   - Upload/change profile picture
   - Change password functionality
   - View email verification status

8. **Session Management**
   - Persistent sessions
   - Auto-renewal
   - Secure logout

9. **Route Protection**
   - Protected routes for authenticated users
   - Public routes redirect authenticated users
   - Loading states during auth checks

10. **Form Validation & Error Handling**
    - Client-side validation
    - User-friendly error messages
    - Success notifications
    - Loading states

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm/pnpm
- A Supabase account (for production) OR use localStorage fallback mode

### 1. Install Dependencies

```bash
cd artifacts/cpp-learn
npm install
```

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

#### Option A: Using Supabase (Recommended for Production)

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API
3. Copy your project URL and anon key to `.env`:

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

4. Enable Google OAuth in Supabase:
   - Go to Authentication > Providers
   - Enable Google
   - Add your Google OAuth credentials
   - Add your site URL to authorized domains

#### Option B: LocalStorage Fallback (Development/Demo)

Leave the environment variables empty:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

The app will use localStorage for authentication, perfect for development and testing.

### 3. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
npm run preview
```

## Supabase Database Setup

If using Supabase, you'll need to set up the database schema:

### 1. Create the profiles table

```sql
-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  name text,
  username text unique,
  avatar text,
  bio text,
  phone_number text,
  country text,
  learning_goals text,
  created_at timestamp with time zone default timezone('utc') not null,
  updated_at timestamp with time zone default timezone('utc') not null,
  last_login timestamp with time zone,
  preferred_language text default 'en',
  role text default 'user',
  email_verified boolean default false,
  theme text default 'system',
  notifications_enabled boolean default true,
  subscription_status text default 'free',
  subscription_expires_at timestamp with time zone,
  courses_enrolled integer default 0,
  courses_completed integer default 0,
  lessons_completed integer default 0,
  certificates_earned integer default 0,
  streak integer default 0,
  achievements_unlocked integer default 0,
  projects_completed integer default 0,
  total_xp integer default 0,
  quizzes_passed integer default 0
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone" on public.profiles
  for select using (true);

create policy "Users can insert their own profile" on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update their own profile" on public.profiles
  for update using (auth.uid() = id);
```

### 2. Create a function to handle new user creation

```sql
-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name, username, role, email_verified)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'name',
    new.raw_user_meta_data->>'username',
    case when new.email = 'poomeigh503@gmail.com' then 'admin' else 'user' end,
    false
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for user creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

### 3. Set up storage for avatars (optional)

1. Go to Storage in Supabase dashboard
2. Create a new bucket called `avatars`
3. Set it to public
4. Add storage policies:

```sql
-- Allow users to upload their own avatar
create policy "Users can upload their own avatar" on storage.objects
  for insert with check (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);

-- Allow public read access
create policy "Avatar images are publicly accessible" on storage.objects
  for select using (bucket_id = 'avatars');
```

## Google OAuth Configuration

### For Supabase:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `https://your-project-id.supabase.co/auth/v1/callback`
6. Copy Client ID and Client Secret to Supabase Authentication > Providers > Google

### For Development (localStorage mode):

Google Sign-In will create a simulated Google user in localStorage. No configuration needed.

## Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   └── textarea.tsx
│   └── ProtectedRoute.tsx
├── hooks/
│   ├── use-auth.tsx     # Authentication context & provider
│   ├── use-toast.tsx    # Toast notifications
│   └── use-language.tsx # Language preferences
├── lib/
│   ├── auth-service.js  # Authentication service functions
│   ├── auth-utils.js    # Utility functions for auth
│   ├── supabase.ts      # Supabase client configuration
│   └── utils.ts         # General utilities
├── pages/
│   ├── login.tsx        # Login page
│   ├── signup.tsx       # Registration page
│   ├── profile.tsx      # User profile page
│   ├── forgot-password.tsx
│   └── reset-password.tsx
├── config/
│   └── languages.ts     # Language configuration
├── App.tsx              # Main app with routing
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## Testing the Authentication System

### Test Scenarios

1. **Sign Up Flow**
   - Register with email/password
   - Verify email (if using Supabase)
   - Check profile creation

2. **Login Flow**
   - Login with registered credentials
   - Check session persistence
   - Test logout

3. **Google Sign-In**
   - Click "Sign in with Google"
   - Complete OAuth flow
   - Verify profile creation

4. **Password Reset**
   - Request password reset
   - Click reset link in email
   - Set new password
   - Login with new password

5. **Profile Management**
   - Update name and bio
   - Upload profile picture
   - Change password
   - Verify changes persist

### Testing Without Supabase

The app works fully in localStorage mode for testing:

1. Leave `.env` variables empty
2. Run `npm run dev`
3. Test all features - they work without a backend!

## Troubleshooting

### Google Sign-In Not Working

1. Ensure Supabase credentials are correct in `.env`
2. Verify Google OAuth is enabled in Supabase dashboard
3. Check that redirect URIs are correctly configured
4. Ensure your domain is added to authorized domains

### Email Verification Not Sending

1. Configure email templates in Supabase (Email Templates)
2. Ensure your site URL is correct in Supabase settings
3. Check spam folder for verification emails

### Session Not Persisting

1. Ensure you're not clearing localStorage
2. Check browser settings (cookies/storage)
3. Verify Supabase configuration

## Security Considerations

- All passwords are hashed by Supabase (or stored securely in localStorage for dev)
- JWT tokens are handled by Supabase client
- Row Level Security (RLS) protects database access
- CORS is configured for your domain
- Rate limiting is enabled on auth endpoints

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- GitHub Issues: [Create an issue](https://github.com/Sphile2012/Cpp-EduHub/issues)
- Documentation: Check the `/docs` folder

---

Built with ❤️ using React, TypeScript, and Supabase