import { ZodSchema } from 'zod';
import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '@repo/domain';

export const inputValidationMiddleware = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const detail = result.error.errors.map((err) => `${err.path.join('.')}: ${err.message}`).join(', ');
      next(new BadRequestError(detail));
    }

    next();
  };
};
