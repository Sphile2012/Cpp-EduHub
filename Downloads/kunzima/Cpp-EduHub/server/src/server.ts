/**
 * Infinity Code - Main Server Entry Point
 * Express.js server with comprehensive middleware and routing
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

import { env } from './config/env.js';
import { testConnection, closeConnection } from './db/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/requestLogger.js';

// Import routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import courseRoutes from './routes/course.routes.js';
import enrollmentRoutes from './routes/enrollment.routes.js';
import quizRoutes from './routes/quiz.routes.js';
import assignmentRoutes from './routes/assignment.routes.js';
import communityRoutes from './routes/community.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import adminRoutes from './routes/admin.routes.js';
import aiRoutes from './routes/ai.routes.js';

// ES Module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const app = express();
const httpServer = createServer(app);

// Create Socket.IO server
const io = new Server(httpServer, {
  cors: {
    origin: env.CORS_ORIGIN.split(','),
    credentials: true,
  },
});

// ============================================
// MIDDLEWARE
// ============================================

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: env.CORS_ORIGIN.split(','),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(env.RATE_LIMIT_WINDOW_MS),
  max: parseInt(env.RATE_LIMIT_MAX_REQUESTS),
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie parsing
app.use(cookieParser());

// Request logging
app.use(requestLogger);

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ============================================
// API ROUTES
// ============================================

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ai', aiRoutes);

// API documentation route
app.get('/api', (_req, res) => {
  res.json({
    name: 'Infinity Code API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      courses: '/api/courses',
      enrollments: '/api/enrollments',
      quizzes: '/api/quizzes',
      assignments: '/api/assignments',
      community: '/api/community',
      payments: '/api/payments',
      admin: '/api/admin',
      ai: '/api/ai',
    },
    documentation: '/api/docs',
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
  });
});

// Error handler middleware
app.use(errorHandler);

// ============================================
// SOCKET.IO EVENTS
// ============================================

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Join course room
  socket.on('join-course', (courseId: string) => {
    socket.join(`course:${courseId}`);
    console.log(`User ${socket.id} joined course ${courseId}`);
  });

  // Leave course room
  socket.on('leave-course', (courseId: string) => {
    socket.leave(`course:${courseId}`);
    console.log(`User ${socket.id} left course ${courseId}`);
  });

  // Real-time messaging
  socket.on('send-message', (data: { receiverId: string; content: string }) => {
    socket.to(`user:${data.receiverId}`).emit('receive-message', {
      senderId: socket.id,
      content: data.content,
      timestamp: new Date().toISOString(),
    });
  });

  // Code collaboration
  socket.on('code-update', (data: { roomId: string; code: string }) => {
    socket.to(`code:${data.roomId}`).emit('code-updated', data);
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Export io for use in routes
export { io };

// ============================================
// SERVER STARTUP
// ============================================

const PORT = parseInt(env.PORT);

async function startServer() {
  try {
    // Test database connection
    const dbConnected = await testConnection();
    if (!dbConnected) {
      console.warn('⚠️  Database connection failed. Some features may not work.');
    }

    // Start server
    httpServer.listen(PORT, () => {
      console.log(`
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║   🚀 Infinity Code API Server                           ║
║                                                          ║
║   📡 Server running on port ${PORT}                      ║
║   🌍 Environment: ${env.NODE_ENV.padEnd(30)} ║
║   🕐 Started at: ${new Date().toISOString().padEnd(25)} ║
║                                                          ║
║   API Endpoints:                                         ║
║   • Health:  http://localhost:${PORT}/api/health         ║
║   • Auth:    http://localhost:${PORT}/api/auth           ║
║   • Courses: http://localhost:${PORT}/api/courses        ║
║   • Users:   http://localhost:${PORT}/api/users          ║
║                                                          ║
║   WebSocket: ws://localhost:${PORT}                      ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('\n🛑 SIGTERM received. Shutting down gracefully...');
  await closeConnection();
  httpServer.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  console.log('\n🛑 SIGINT received. Shutting down gracefully...');
  await closeConnection();
  httpServer.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

// Start the server
startServer();

export default app;