import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const userRoleValidation = () => [
  body('slug')
    .trim()
    .notEmpty()
    .withMessage('Slug is required')
    .isString()
    .withMessage('Slug must be a string'),

  body('role')
    .trim()
    .notEmpty()
    .withMessage('Role is required')
    .isString()
    .withMessage('Role must be a string'),

  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isString()
    .withMessage('Description must be a string'),

  body('permissions')
    .isArray()
    .withMessage('Permissions must be an array of strings')
    .custom(permissions => {
      if (!permissions.every(perm => typeof perm === 'string')) {
        throw new Error('All permissions must be strings');
      }
      return true;
    }),
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors: any = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  res.status(422).json({
    status: 'error',
    error: `Invalid value for ${errors.array()[0].path}`,
  });
};
