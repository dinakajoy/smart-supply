import * as express from 'express';
import { productValidation, validate } from './product.validation';
import {
  createProductController,
  getProductsController,
  getProductController,
  updateProductController,
  deleteProductController,
} from './product.controller';
import acountLimiter from '../../../shared/middlewares/rateLimiterForRoutes';

const router = express.Router();

router.post(
  '/',
  acountLimiter,
  productValidation(),
  validate,
  createProductController
);
router.get('/', getProductsController);
router.get('/:id', getProductController);
router.put(
  '/:id',
  productValidation(),
  validate,
  updateProductController
);
router.delete('/:id', deleteProductController);

export default router;
