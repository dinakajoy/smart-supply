import * as express from 'express';
import { categoryValidation, validate } from './category.validation';
import {
  createCategoryController,
  getCategoriesController,
  getCategoryController,
  updateCategoryController,
  deleteCategoryController,
} from './category.controller';
import acountLimiter from '../../../shared/middlewares/rateLimiterForRoutes';
import isAuthorized from '../../../shared/middlewares/isAuthorized';
import isAuthenticated from '../../../shared/middlewares/isAuthenticated';

const router = express.Router();

router.post(
  '/',
  acountLimiter,
  isAuthorized(['admin', 'inventory-manager']),
  categoryValidation(),
  validate,
  createCategoryController
);

router.get('/', isAuthenticated, getCategoriesController);

router.get(
  '/:id',
  isAuthorized(['admin', 'inventory-manager']),
  getCategoryController
);

router.put(
  '/:id',
  isAuthorized(['admin', 'inventory-manager']),
  categoryValidation(),
  validate,
  updateCategoryController
);

router.delete(
  '/:id',
  isAuthorized(['admin', 'inventory-manager']),
  deleteCategoryController
);

export default router;
