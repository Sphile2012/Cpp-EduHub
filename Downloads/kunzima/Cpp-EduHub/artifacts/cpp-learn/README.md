# Infinity Code - Frontend Application

A modern, full-featured coding education platform built with React, TypeScript, Vite, and Tailwind CSS. Connects to a custom Express.js backend API for authentication, courses, quizzes, community, and more.

## Features

### Authentication & User Management
- Email/password registration and login via Express backend
- JWT-based authentication with refresh tokens
- Password reset flow (forgot password → reset password)
- Protected routes for authenticated users
- User profile management with avatar upload
- Settings page with account, security, appearance, notifications, and privacy tabs

### Learning & Courses
- Learning Hub with structured learning paths
- Lesson browser and detailed lesson views
- Interactive quizzes with multiple question types
- Flashcards for revision
- Glossary of programming terms
- Progress tracking dashboard

### Coding & Practice
- Interactive code playground
- Coding challenges with difficulty levels and categories
- Projects hub for building and showcasing real-world projects
- AI tutor for personalised learning assistance
- AI study planner

### Community & Gamification
- Community forum with discussions, questions, showcases, and tutorials
- Leaderboard with weekly, monthly, and all-time rankings
- Achievements and badges system
- Resources library (documentation, cheat sheets, tutorials)

### Admin
- Admin dashboard for platform management
- Subscription and payment management
- Payment history tracking

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **Routing**: Wouter
- **State Management**: React Context + TanStack React Query
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP**: Fetch API with JWT auth

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend API server running (see `server/` directory)

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

Configure `.env`:

```env
# API Configuration
VITE_API_URL=http://localhost:5000

# Supabase Configuration (optional - only needed for file storage)
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

# Admin email (optional - designates the primary admin account)
VITE_ADMIN_EMAIL=
```

### 3. Start the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
npm run preview
```

## Running Both Frontend and Backend

From the project root directory:

```bash
# Install all dependencies
npm run install:all

# Start both server and client concurrently
npm run dev

# Build both for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   └── app-layout.tsx     # Main layout with navigation
│   ├── ui/                    # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── badge.tsx
│   │   ├── progress.tsx
│   │   ├── select.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   ├── toaster.tsx
│   │   └── tooltip.tsx
│   └── ProtectedRoute.tsx     # Route guard for authenticated pages
├── config/
│   ├── courses.ts             # Course configuration
│   └── languages.ts           # Language preferences
├── hooks/
│   ├── use-auth.tsx           # Authentication context & provider
│   ├── use-toast.tsx          # Toast notifications
│   └── use-language.tsx       # Language preferences
├── lib/
│   ├── auth-service.js        # Backend API auth service
│   ├── auth-utils.js          # Auth utility functions
│   ├── supabase.ts            # Supabase client (optional)
│   └── utils.ts               # General utilities
├── pages/
│   ├── home.tsx               # Landing page + About page
│   ├── dashboard.tsx          # User dashboard
│   ├── login.tsx              # Login page
│   ├── signup.tsx             # Registration page
│   ├── forgot-password.tsx    # Password reset request
│   ├── reset-password.tsx     # Password reset form
│   ├── profile.tsx            # User profile
│   ├── settings.tsx           # Account settings
│   ├── lessons.tsx            # Lesson browser
│   ├── lesson-detail.tsx     # Single lesson view
│   ├── quiz.tsx               # Quiz page
│   ├── challenges.tsx         # Coding challenges
│   ├── projects.tsx           # Projects hub
│   ├── community.tsx          # Community forum
│   ├── leaderboard.tsx       # Leaderboard rankings
│   ├── resources.tsx          # Resources library
│   ├── achievements.tsx      # Achievements & badges
│   ├── flashcards.tsx         # Flashcards
│   ├── playground.tsx        # Code playground
│   ├── ai-tutor.tsx          # AI tutor
│   ├── ai-study-planner.tsx  # AI study planner
│   ├── learning-hub.tsx      # Learning hub
│   ├── glossary.tsx          # Glossary list
│   ├── glossary-term.tsx    # Glossary term detail
│   ├── subscription.tsx     # Subscription plans
│   ├── payment-history.tsx  # Payment history
│   ├── admin-dashboard.tsx  # Admin dashboard
│   └── not-found.tsx        # 404 page
├── App.tsx                   # Main app with routing
├── main.tsx                  # Entry point with providers
├── index.css                 # Global styles
└── vite-env.d.ts            # Vite type declarations
```

## Pages Overview

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page with features, learning paths, and CTA |
| `/about` | About | About the platform |
| `/dashboard` | Dashboard | User stats, progress, and recent activity |
| `/lessons` | Courses | Browse and search courses |
| `/lessons/:id` | Lesson Detail | View a specific lesson |
| `/quiz/:lessonId` | Quiz | Take a quiz for a lesson |
| `/challenges` | Challenges | Browse and solve coding challenges |
| `/playground` | Playground | Interactive code editor |
| `/projects` | Projects | Browse and create projects |
| `/community` | Community | Forum discussions and posts |
| `/leaderboard` | Leaderboard | User rankings by XP |
| `/resources` | Resources | Documentation, cheat sheets, tutorials |
| `/achievements` | Achievements | Badges and achievements |
| `/flashcards` | Flashcards | Study flashcards |
| `/ai-tutor` | AI Tutor | AI-powered coding tutor |
| `/ai-study-planner` | AI Study Planner | Personalised study plans |
| `/learning-hub` | Learning Hub | Structured learning paths |
| `/glossary` | Glossary | Programming terms glossary |
| `/glossary/:slug` | Glossary Term | Single term definition |
| `/login` | Login | User login (no layout) |
| `/signup` | Signup | User registration (no layout) |
| `/forgot-password` | Forgot Password | Request password reset (no layout) |
| `/reset-password` | Reset Password | Set new password (no layout) |
| `/profile` | Profile | User profile (protected) |
| `/settings` | Settings | Account settings (protected) |
| `/subscription` | Subscription | Premium plans (protected) |
| `/payment-history` | Payment History | Payment records (protected) |
| `/admin` | Admin Dashboard | Platform admin (protected, admin only) |

## Backend Integration

The frontend connects to the Express.js backend at `http://localhost:5000` (configurable via `VITE_API_URL`).

### Key API Endpoints Used

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/forgot-password` - Request password reset
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/password` - Change password

### Authentication Flow

1. User signs up/logs in via the frontend forms
2. Backend returns JWT access token and refresh token
3. Tokens are stored in localStorage
4. Auth service attaches `Authorization: Bearer <token>` header to API requests
5. On 401 response, the auth service attempts to refresh the token
6. On logout, tokens are cleared from localStorage

## Testing

```bash
npm test           # Run tests
```

## Troubleshooting

### Cannot Connect to Backend

1. Ensure the backend server is running on port 5000
2. Check `VITE_API_URL` in `.env`
3. Verify CORS is configured on the backend

### Authentication Not Persisting

1. Check browser localStorage for `infinity-auth-token`
2. Ensure the backend is running and responding
3. Verify JWT secret is consistent

## License

MIT License - see LICENSE file for details.

---

Built with React, TypeScript, Vite, and Tailwind CSS