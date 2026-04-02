import { NextFunction, Request, Response } from 'express';
import { ForbiddenError, UnauthorizedError } from '../errors';
import { AuthRole } from '../../modules/auth/auth.types';

export const authorizeRoles =
  (...allowedRoles: AuthRole[]) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new UnauthorizedError('Authentication required'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new ForbiddenError('You are not authorized to access this resource')
      );
    }

    next();
  };