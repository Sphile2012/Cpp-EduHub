# Cpp-EduHub (Infinity Code)

A full-stack coding education platform where learners can study programming, practise with coding challenges, build real-world projects, and engage with a developer community.

## Architecture

```
Cpp-EduHub/
├── artifacts/cpp-learn/    # Frontend - React + TypeScript + Vite
├── server/                 # Backend  - Express.js + TypeScript + PostgreSQL
├── lib/api-client-react/   # Shared API client library
├── DATABASE_SETUP.sql      # Database setup script
└── package.json            # Root scripts for running both apps
```

## Quick Start

### Prerequisites

- Node.js 18+
- npm
- (Optional) PostgreSQL 14+ for production database

### Install & Run

```bash
# Install all dependencies (server + client)
npm run install:all

# Start both frontend and backend concurrently
npm run dev
```

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

> **Note**: The backend works without PostgreSQL by using an in-memory store. To use a real database, install PostgreSQL, create a database named `infinity_code`, and run `npm run db:push` in the `server/` directory.

## Features

### Frontend (React + Vite)
- Modern dark-themed UI with Tailwind CSS
- 28+ pages including home, dashboard, lessons, challenges, projects, community, leaderboard, resources, and more
- JWT-based authentication with refresh tokens
- Interactive code playground
- AI tutor and study planner
- Real-time updates via Socket.IO

### Backend (Express.js)
- RESTful API with 10 route modules
- JWT authentication with bcrypt password hashing
- Drizzle ORM for PostgreSQL with in-memory fallback
- Socket.IO for real-time features (code collaboration, messaging)
- Rate limiting, Helmet security, CORS
- Zod schema validation
- PayFast payment integration (sandbox mode)

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run install:all` | Install server and client dependencies |
| `npm run dev` | Start both server and client concurrently |
| `npm run build` | Build both server and client for production |
| `npm run dev:server` | Start only the backend server |
| `npm run dev:client` | Start only the frontend dev server |
| `npm run start:server` | Start the production server |
| `npm run start:client` | Preview the production frontend build |
| `npm run seed` | Seed the database with sample data |

## Tech Stack

### Frontend
- React 18, TypeScript 5, Vite 5
- Tailwind CSS 3, Framer Motion
- Wouter (routing), TanStack React Query
- Lucide React (icons)

### Backend
- Node.js, Express.js 4, TypeScript 5
- PostgreSQL 14+, Drizzle ORM
- JWT, bcryptjs, Zod
- Socket.IO, Helmet, express-rate-limit
- PayFast (payments), Multer (file uploads)

## Project Structure

### Frontend (`artifacts/cpp-learn/`)
- `src/pages/` - 28 page components
- `src/components/` - Reusable UI components and layout
- `src/hooks/` - Auth, toast, and language hooks
- `src/lib/` - Auth service, utilities, Supabase client
- `src/config/` - Course and language configuration

### Backend (`server/`)
- `src/routes/` - 10 API route modules (auth, users, courses, etc.)
- `src/middleware/` - Auth, error handling, request logging
- `src/db/` - Database connection, schema, memory store, seed
- `src/config/` - Environment configuration with Zod validation

## Environment Variables

### Frontend (`artifacts/cpp-learn/.env`)
```env
VITE_API_URL=http://localhost:5000
VITE_SUPABASE_URL=          # Optional, for file storage
VITE_SUPABASE_ANON_KEY=    # Optional
VITE_ADMIN_EMAIL=           # Optional
```

### Backend (`server/.env`)
```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/infinity_code
JWT_SECRET=dev-secret-key-change-in-production
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
PAYFAST_SANDBOX=true
```

## API Endpoints

| Module | Base Path | Key Endpoints |
|--------|-----------|---------------|
| Auth | `/api/auth` | signup, login, logout, refresh, forgot-password |
| Users | `/api/users` | profile, password, avatar |
| Courses | `/api/courses` | list, detail, create, update |
| Enrollments | `/api/enrollments` | enroll, progress |
| Quizzes | `/api/quizzes` | detail, attempt, submit |
| Assignments | `/api/assignments` | detail, submit |
| Community | `/api/community` | forums, topics, posts |
| Payments | `/api/payments` | subscription, history |
| Admin | `/api/admin` | users, courses, analytics |
| AI | `/api/ai` | tutor, recommendations |

## Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

### Quick Deploy

```bash
# Build both frontend and backend
npm run build

# Frontend: Deploy to Netlify
netlify deploy --prod

# Backend: Deploy to your preferred platform
# (Railway, Render, Heroku, DigitalOcean, etc.)
```

### Production Checklist

- [ ] Update `VITE_API_URL` in frontend to production API URL
- [ ] Set strong `JWT_SECRET` in backend
- [ ] Configure production PostgreSQL database
- [ ] Update `CORS_ORIGIN` to production frontend URL
- [ ] Configure PayFast credentials for production

## License

MIT License
