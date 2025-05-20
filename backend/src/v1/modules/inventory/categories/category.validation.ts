import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const categoryValidation = () => [
  body('name').isLength({ min: 3 }).trim().escape(),
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors: any = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  res.status(422).json({
    status: 'error',
    errors: errors.array().map((err: any) => ({
      field: err.path,
      message: err.msg,
    })),
  });
  return;
};
