# Infinity Code - Supabase Setup Instructions

## ✅ Completed
- ✅ Replaced localStorage authentication with Supabase
- ✅ Removed Google OAuth (not configured)
- ✅ Clean email/password authentication only
- ✅ Updated `.env.example` with proper structure
- ✅ Removed old localStorage auth files
- ✅ Cleaned up login/signup pages (no Google buttons)
- ✅ Pushed changes to GitHub: https://github.com/Sphile2012/Cpp-EduHub

---

## 🚀 What You Need To Do

### Step 1: Configure Supabase

1. **Go to Supabase Dashboard**: https://app.supabase.com

2. **Create a New Project** (or use existing)
   - Project Name: `infinity-code` (or your choice)
   - Database Password: Choose a strong password
   - Region: Choose closest to your users

3. **Get Your Credentials**
   - Go to Project Settings > API
   - Copy `Project URL` → This is your `VITE_SUPABASE_URL`
   - Copy `anon` `public` key → This is your `VITE_SUPABASE_ANON_KEY`

4. **Update Your Local `.env` File**
   ```bash
   # In: artifacts/cpp-learn/.env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   VITE_ADMIN_EMAIL=poomeigh503@gmail.com
   ```

---

### Step 2: Run Database Setup

1. **Open Supabase SQL Editor**
   - In your Supabase Dashboard
   - Go to: SQL Editor

2. **Run the Database Setup Script**
   - Open the file: `DATABASE_SETUP.sql` in this repository
   - Copy ALL the contents
   - Paste into Supabase SQL Editor
   - Click "RUN"
   - Wait for completion (creates all tables, enums, indexes)

3. **Verify Tables Created**
   - Go to: Table Editor
   - You should see:
     - users
     - user_profiles
     - user_settings
     - courses
     - lessons
     - enrollments
     - (and many more...)

---

### Step 3: Configure Supabase Auth Settings

1. **Disable Email Confirmation** (For Development)
   - Go to: Authentication > Providers > Email
   - **Uncheck** "Confirm email"
   - Click Save

2. **Configure Auth Settings**
   - Go to: Authentication > URL Configuration
   - Site URL: `http://localhost:3000` (for local development)
   - Redirect URLs:
     ```
     http://localhost:3000/**
     https://your-app.netlify.app/**
     ```

3. **Disable Double Opt-in** (Development Only)
   - Go to: Authentication > Settings
   - Under "Email Auth Configuration"
   - Set "Enable email confirmations" to OFF
   - Save changes

---

### Step 4: Configure Supabase Storage (For Avatar Uploads)

1. **Create Storage Bucket**
   - Go to: Storage
   - Click "New bucket"
   - Name: `user-uploads`
   - **Make it PUBLIC**
   - Click Create

2. **Set Storage Policies**
   ```sql
   -- Run in SQL Editor
   
   -- Allow authenticated users to upload their own avatars
   CREATE POLICY "Users can upload their own avatars"
   ON storage.objects FOR INSERT
   TO authenticated
   WITH CHECK (
     bucket_id = 'user-uploads' 
     AND (storage.foldername(name))[1] = 'avatars'
     AND auth.uid()::text = (storage.foldername(name))[2]
   );
   
   -- Allow public read access to avatars
   CREATE POLICY "Anyone can view avatars"
   ON storage.objects FOR SELECT
   TO public
   USING (bucket_id = 'user-uploads');
   
   -- Allow users to update their own avatars
   CREATE POLICY "Users can update their own avatars"
   ON storage.objects FOR UPDATE
   TO authenticated
   USING (
     bucket_id = 'user-uploads' 
     AND (storage.foldername(name))[1] = 'avatars'
     AND auth.uid()::text = (storage.foldername(name))[2]
   );
   ```

---

### Step 5: Deploy to Netlify

1. **Add Environment Variables to Netlify**
   - Go to: Netlify Dashboard > Your Site > Site settings > Environment variables
   - Add these variables:
     ```
     VITE_SUPABASE_URL=https://your-project.supabase.co
     VITE_SUPABASE_ANON_KEY=your_anon_key_here
     VITE_ADMIN_EMAIL=poomeigh503@gmail.com
     ```

2. **Trigger Redeploy**
   - Go to: Deploys > Trigger deploy > Deploy site
   - Wait for build to complete

---

### Step 6: Test Locally

1. **Install Dependencies**
   ```bash
   cd artifacts/cpp-learn
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Test Signup**
   - Go to: http://localhost:3000/signup
   - Create a new account with your email
   - Should sign you in immediately (no email confirmation needed in dev mode)

4. **Verify Admin Account**
   - Signup with: `poomeigh503@gmail.com`
   - Your account should automatically have `admin` role

---

## 🔍 Troubleshooting

### Error: "Supabase is not configured"
- ✅ Make sure `.env` file exists in `artifacts/cpp-learn/`
- ✅ Check that `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
- ✅ Restart dev server after updating `.env`

### Error: "relation 'users' does not exist"
- ✅ Run `DATABASE_SETUP.sql` in Supabase SQL Editor
- ✅ Check Table Editor to verify tables were created

### Error: "new row violates row-level security policy"
- ✅ Make sure RLS policies are created correctly
- ✅ Re-run the RLS policy sections in `DATABASE_SETUP.sql`

### Error: "Email not confirmed"
- ✅ Disable email confirmation in Supabase Auth settings
- ✅ Go to: Authentication > Providers > Email > Uncheck "Confirm email"

### Can't Upload Avatar
- ✅ Make sure `user-uploads` storage bucket exists and is PUBLIC
- ✅ Run the storage policy SQL commands in Step 4

---

## 📝 Important Notes

1. **DO NOT commit `.env` file** - It's already in `.gitignore`
2. **Admin email** `poomeigh503@gmail.com` automatically gets admin role
3. **Email verification** is disabled for development (enable in production)
4. **Google OAuth** is removed - email/password only
5. **Phone authentication** is removed - email/password only

---

## 🎯 Next Steps After Setup

1. Create your first account on localhost
2. Test login/logout functionality
3. Test profile updates
4. Test avatar upload
5. Deploy to Netlify and test live site
6. Create your admin account on production

---

## 📚 Database Schema

All tables are created by `DATABASE_SETUP.sql`:
- **Authentication**: users, user_profiles, user_settings
- **Courses**: courses, modules, lessons, categories
- **Progress**: enrollments, lesson_progress
- **Assessments**: quizzes, questions, quiz_attempts, assignments, submissions
- **Gamification**: badges, achievements, xp_transactions, daily_challenges
- **Community**: forum_topics, forum_posts, comments, messages, study_groups
- **Payments**: subscriptions, payments, coupons
- **Support**: notifications, support_tickets, audit_logs

---

## ✅ Verification Checklist

- [ ] Supabase project created
- [ ] `.env` file updated with Supabase credentials
- [ ] `DATABASE_SETUP.sql` executed successfully
- [ ] Email confirmation disabled in Supabase Auth
- [ ] Storage bucket `user-uploads` created
- [ ] Storage policies configured
- [ ] Netlify environment variables added
- [ ] Local testing successful (signup/login works)
- [ ] Netlify deployment successful
- [ ] Production testing successful

---

**Need help?** Check the error messages in browser console and refer to the Troubleshooting section above.
