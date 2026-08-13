# Infinity Code - Backend API Server

A comprehensive RESTful API server for the Infinity Code learning platform, built with Node.js, Express.js, TypeScript, PostgreSQL, and Drizzle ORM.

## Features

- 🔐 **Authentication & Authorization**
  - JWT-based authentication with refresh tokens
  - Email/password registration and login
  - Google OAuth integration (via Supabase)
  - Two-factor authentication (2FA)
  - Password reset via email
  - Role-based access control (user, instructor, admin, mentor)

- 📚 **Course Management**
  - Create and manage courses with modules and lessons
  - Support for video, text, quiz, and coding exercise lessons
  - Course enrollment and progress tracking
  - Prerequisites and learning outcomes

- 🎯 **Learning Features**
  - Quizzes with multiple question types
  - Assignments with code submission
  - Progress tracking per lesson/module
  - Certificate generation upon completion

- 🎮 **Gamification**
  - XP points system
  - Badges and achievements
  - Coding streaks
  - Leaderboards
  - Daily challenges

- 💬 **Community**
  - Discussion forums
  - Comments on lessons
  - Direct messaging
  - Study groups

- 💳 **Payments**
  - Stripe integration
  - Subscription management
  - Coupon codes
  - Payment history

- 🤖 **AI Features**
  - AI coding tutor
  - Personalized learning recommendations
  - Code review assistance

## Tech Stack

- **Runtime**: Node.js 18+
- **Language**: TypeScript 5
- **Framework**: Express.js 4
- **Database**: PostgreSQL 14+
- **ORM**: Drizzle ORM
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: Zod
- **Real-time**: Socket.IO
- **Payments**: Stripe
- **File Upload**: Multer

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm
- PostgreSQL 14+ database
- (Optional) Redis for caching
- (Optional) Stripe account for payments

### Installation

1. **Clone the repository**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure your environment:
   ```env
   # Required
   DATABASE_URL=postgresql://username:password@localhost:5432/infinity_code
   JWT_SECRET=your-super-secret-jwt-key
   
   # Optional
   STRIPE_SECRET_KEY=sk_test_...
   OPENAI_API_KEY=sk-...
   REDIS_URL=redis://localhost:6379
   ```

4. **Set up the database**
   ```bash
   # Generate database schema
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # (Optional) Seed initial data
   npm run seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The server will start at `http://localhost:5000`

### Database Setup

The database schema is defined in `src/db/schema/index.ts` using Drizzle ORM. It includes tables for:

- Users, profiles, and settings
- Courses, modules, and lessons
- Enrollments and progress tracking
- Quizzes, questions, and attempts
- Assignments and submissions
- Certificates
- Badges, achievements, and XP
- Forum categories, topics, and posts
- Comments and messages
- Subscriptions and payments
- AI conversations
- Audit logs and support tickets

### API Endpoints

#### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `POST /api/auth/verify-email` - Verify email address
- `POST /api/auth/2fa/setup` - Setup 2FA
- `POST /api/auth/2fa/verify` - Verify 2FA code

#### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/password` - Change password
- `POST /api/users/avatar` - Upload avatar

#### Courses
- `GET /api/courses` - List all courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses` - Create course (instructor/admin)
- `PUT /api/courses/:id` - Update course (instructor/admin)
- `DELETE /api/courses/:id` - Delete course (admin)

#### Enrollments
- `GET /api/enrollments` - Get user enrollments
- `POST /api/enrollments` - Enroll in course
- `GET /api/enrollments/:id/progress` - Get course progress

#### Quizzes
- `GET /api/quizzes/:id` - Get quiz details
- `POST /api/quizzes/:id/attempt` - Start quiz attempt
- `POST /api/quizzes/:id/submit` - Submit quiz answers

#### Assignments
- `GET /api/assignments/:id` - Get assignment details
- `POST /api/assignments/:id/submit` - Submit assignment
- `GET /api/submissions/:id` - Get submission details

#### Community
- `GET /api/community/forums` - List forum categories
- `GET /api/community/forums/:id/topics` - List topics
- `POST /api/community/topics` - Create topic
- `POST /api/community/posts` - Create post

#### Payments
- `GET /api/payments/subscription` - Get subscription status
- `POST /api/payments/subscription` - Create subscription
- `DELETE /api/payments/subscription` - Cancel subscription

#### Admin
- `GET /api/admin/users` - List all users
- `GET /api/admin/courses` - List all courses
- `GET /api/admin/analytics` - Get platform analytics

## Project Structure

```
server/
├── src/
│   ├── config/          # Configuration files
│   │   └── env.ts       # Environment variables
│   ├── db/              # Database setup
│   │   ├── schema/      # Database schema definitions
│   │   └── index.ts     # Database connection
│   ├── middleware/      # Express middleware
│   │   ├── auth.ts      # Authentication middleware
│   │   ├── errorHandler.ts
│   │   └── requestLogger.ts
│   ├── routes/          # API route handlers
│   │   ├── auth.routes.ts
│   │   ├── user.routes.ts
│   │   ├── course.routes.ts
│   │   ├── enrollment.routes.ts
│   │   ├── quiz.routes.ts
│   │   ├── assignment.routes.ts
│   │   ├── community.routes.ts
│   │   ├── payment.routes.ts
│   │   ├── admin.routes.ts
│   │   └── ai.routes.ts
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
│   └── server.ts        # Main server entry point
├── uploads/             # File uploads directory
├── .env.example         # Environment template
├── package.json
├── tsconfig.json
└── README.md
```

## Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload

# Production
npm run build        # Build TypeScript
npm run start        # Start production server

# Database
npm run db:generate  # Generate migrations
npm run db:push      # Push schema to database
npm run db:studio    # Open Drizzle Studio
npm run seed         # Seed database with sample data
```

### Testing

```bash
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

## Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://...
JWT_SECRET=<strong-random-secret>
CORS_ORIGIN=https://yourdomain.com
```

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details.

## Support

For support, email support@infinitycode.com or open an issue in the repository.