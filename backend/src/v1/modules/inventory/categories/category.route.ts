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

const router = express.Router();

router.post(
  '/',
  acountLimiter,
  categoryValidation(),
  validate,
  createCategoryController
);
router.get('/', getCategoriesController);
router.get('/:id', getCategoryController);
router.put('/:id', categoryValidation(), validate, updateCategoryController);
router.delete('/:id', deleteCategoryController);

export default router;
