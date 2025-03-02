import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validation = () => [
  body('name').isLength({ min: 3 }).trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('phone')
    .isMobilePhone(['en-NG'])
    .isLength({ min: 11, max: 11 })
    .trim()
    .escape(),
  body('gender').isIn(['male', 'female']).trim().escape(),
  body('department').isLength({ min: 2 }).trim().escape(),
  body('role').isLength({ min: 2 }).trim().escape(),
  body('streetNo').trim().escape(),
  body('street').isLength({ min: 2 }).trim().escape(),
  body('town').isLength({ min: 2 }).trim().escape(),
  body('state').isLength({ min: 2 }).trim().escape(),
  body('country').isLength({ min: 2 }).trim().escape(),
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  res.status(422).json({
    status: 'error',
    errors: errors.array(),
  });
  return; 
};
