import * as express from 'express';
import acountLimiter from '../../../shared/middlewares/rateLimiterForRoutes';
import isAuthorized from '../../../shared/middlewares/isAuthorized';
import isAuthenticated from '../../../shared/middlewares/isAuthenticated';
import { supplierValidation, validate } from './supplier.validation';
import {
  createSupplierController,
  getSuppliersController,
  getSupplierController,
  updateSupplierController,
  deactivateSupplierController,
  deleteSupplierController,
} from './supplier.controller';

const router = express.Router();

router.post(
  '/',
  acountLimiter,
  isAuthorized(['admin', 'inventory-manager', 'procurement-manager']),
  supplierValidation(),
  validate,
  createSupplierController
);

router.get('/', isAuthenticated, getSuppliersController);

router.get(
  '/:id',
  isAuthorized(['admin', 'inventory-manager', 'procurement-manager']),
  getSupplierController
);

router.put(
  '/:id',
  isAuthorized(['admin', 'inventory-manager', 'procurement-manager']),
  supplierValidation(),
  validate,
  updateSupplierController
);

// Soft delete - sets supplier status to inactive
router.put(
  '/:id',
  isAuthorized(['admin', 'inventory-manager', 'procurement-manager']),
  deactivateSupplierController
);

router.delete('/:id', isAuthorized(['admin']), deleteSupplierController);

export default router;
