import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validation = () => [
  body('name').isLength({ min: 3 }).trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('phone')
    .isMobilePhone(['en-NG'])
    .isLength({ min: 11, max: 11 })
    .trim()
    .escape(),
  body('gender').isIn(['Male', 'Female']).trim().escape(),
  body('department').isLength({ min: 2 }).trim().escape(),
  body('role').isLength({ min: 2 }).trim().escape(),
  body('organizationId').isMongoId().withMessage('Invalid organization ID'),
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
