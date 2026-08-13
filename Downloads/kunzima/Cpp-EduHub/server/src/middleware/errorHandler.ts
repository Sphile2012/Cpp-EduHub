/**
 * Infinity Code - Error Handler Middleware
 */

import { Request, Response, NextFunction } from 'express';

export interface ApiError extends Error {
  statusCode?: number;
  isOperational?: boolean;
  code?: string;
}

export class AppError extends Error implements ApiError {
  statusCode: number;
  isOperational: boolean;
  code?: string;

  constructor(message: string, statusCode: number = 500, code?: string) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

export function errorHandler(
  err: ApiError,
  req: Request,
  res: Response,
  _next: NextFunction
): Response | void {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Log error for debugging
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', {
      message,
      statusCode,
      stack: err.stack,
      path: req.path,
      method: req.method,
    });
  }

  // Handle specific error types
  if (err.code === '23505') {
    return res.status(409).json({
      error: 'Conflict',
      message: 'Resource already exists',
    });
  }

  if (err.code === '23503') {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Referenced resource not found',
    });
  }

  if (err.code === '23502') {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Required field is missing',
    });
  }

  res.status(statusCode).json({
    error: err.isOperational ? message : 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}

export default errorHandler;