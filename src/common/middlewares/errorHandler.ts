import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import logger from '../../config/logger';
import env from '../../config/env';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else {
    logger.error(
      `[Unhandled Error] ${req.method} ${req.originalUrl} - ${err.message}`,
      {
        stack: err.stack,
      }
    );
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export const notFoundHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
};