import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../types/validation.types';
import { BadRequestError } from '../errors/http.errors';

export function createValidationMiddleware(schema: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema.body) {
        await schema.body.validateAsync(req.body);
      }
      if (schema.query) {
        await schema.query.validateAsync(req.query);
      }
      if (schema.params) {
        await schema.params.validateAsync(req.params);
      }
      next();
    } catch (error: any) {
      const validationError: ValidationError = {
        field: error.details[0].path.join('.'),
        message: error.details[0].message
      };
      next(new BadRequestError(validationError.message));
    }
  };
}