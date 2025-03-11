import * as express from 'express';
import acountLimiter from '../../../shared/middlewares/rateLimiterForRoutes';
import { supplierValidation, validate } from './supplier.validation';
import {
  createSupplierController,
  getSuppliersController,
  getSupplierController,
  updateSupplierController,
  removeSupplierController,
  deleteSupplierController,
} from './supplier.controller';

const router = express.Router();

router.post(
  '/',
  acountLimiter,
  supplierValidation(),
  validate,
  createSupplierController
);
router.get('/', getSuppliersController);
router.get('/:id', getSupplierController);
router.put(
  '/:id',
  supplierValidation(),
  validate,
  updateSupplierController
);
router.put('/:id', removeSupplierController);
router.delete('/:id', deleteSupplierController);

export default router;
