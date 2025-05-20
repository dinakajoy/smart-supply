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
import isAuthorized from '../../../shared/middlewares/isAuthorized';
import isAuthenticated from '../../../shared/middlewares/isAuthenticated';

const router = express.Router();

router.post(
  '/',
  acountLimiter,
  isAuthorized(['admin', 'inventory-manager']),
  productValidation(),
  validate,
  createProductController
);

router.get('/', isAuthenticated, getProductsController);

router.get(
  '/:id',
  isAuthorized(['admin', 'inventory-manager']),
  getProductController
);

router.put(
  '/:id',
  isAuthorized(['admin', 'inventory-manager']),
  productValidation(),
  validate,
  updateProductController
);

router.delete(
  '/:id',
  isAuthorized(['admin', 'inventory-manager']),
  deleteProductController
);

export default router;
