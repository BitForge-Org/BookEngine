import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodSchema } from 'zod';
import { BadRequestError } from '../errors';

type ValidationTarget = 'body' | 'query' | 'params';

export const validate =
  <T>(schema: ZodSchema<T>, target: ValidationTarget = 'body') =>
  (req: Request, _res: Response, next: NextFunction): void => {
    try {
      const parsedData = schema.parse(req[target]);

      req[target] = parsedData as Request[ValidationTarget];

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.issues
          .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
          .join(', ');

        next(new BadRequestError(message || 'Validation failed'));
        return;
      }

      next(error);
    }
  };