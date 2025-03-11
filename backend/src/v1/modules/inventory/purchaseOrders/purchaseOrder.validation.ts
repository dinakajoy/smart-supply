import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const purchaseOrderValidation = () => [
  body('orderNumber').notEmpty().withMessage('Order number is required'),
  body('supplierId').isMongoId().withMessage('Invalid supplier ID'),
  body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
  body('items.*.productId').isMongoId().withMessage('Invalid product ID'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('items.*.unitPrice').isFloat({ gt: 0 }).withMessage('Unit price must be positive'),
  body('totalAmount').isFloat({ gt: 0 }).withMessage('Total amount must be positive'),
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
  return;
};
