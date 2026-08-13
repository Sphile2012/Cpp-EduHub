/**
 * Infinity Code - Request Logger Middleware
 */

import { Request, Response, NextFunction } from 'express';

interface LogData {
  method: string;
  url: string;
  ip: string;
  userAgent: string;
  timestamp: string;
  responseTime: number;
  statusCode: number;
}

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  // Log when response finishes
  res.on('finish', () => {
    const responseTime = Date.now() - start;
    const logData: LogData = {
      method: req.method,
      url: req.originalUrl,
      ip: req.ip || req.socket.remoteAddress || 'unknown',
      userAgent: req.get('User-Agent') || 'unknown',
      timestamp: new Date().toISOString(),
      responseTime,
      statusCode: res.statusCode,
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      const color = res.statusCode >= 400 ? '\x1b[31m' : '\x1b[32m';
      const reset = '\x1b[0m';
      console.log(`${color}${req.method} ${req.originalUrl} ${res.statusCode}${reset} - ${responseTime}ms`);
    }

    // In production, you might want to log to a file or external service
    // For now, we'll just log errors
    if (res.statusCode >= 400) {
      console.error('Request Error:', logData);
    }
  });

  next();
}

export default requestLogger;