import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodSchema } from 'zod';
import { BadRequestError } from '../errors';

type ValidationTarget = 'body' | 'query' | 'params';

export const validate =
  <T>(schema: ZodSchema<T>, target: ValidationTarget = 'body') =>
  (req: Request, _res: Response, next: NextFunction): void => {
    try {
      const parsedData = schema.parse(req[target]);

      if (target === 'body') {
        Object.assign(req.body, parsedData);
      }

      if (target === 'params') {
        Object.assign(req.params, parsedData);
      }

      if (target === 'query') {
        Object.assign(req.query, parsedData);
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.issues
          .map((issue) => {
            const path = issue.path.length ? issue.path.join('.') : 'field';
            return `${path}: ${issue.message}`;
          })
          .join(', ');

        next(new BadRequestError(message || 'Validation failed'));
        return;
      }

      next(error);
    }
  };