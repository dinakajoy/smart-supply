import * as express from 'express';
import acountLimiter from '../../../shared/middlewares/rateLimiterForRoutes';
import isAuthorized from '../../../shared/middlewares/isAuthorized';
import isAuthenticated from '../../../shared/middlewares/isAuthenticated';
import { purchaseOrderValidation, validate } from './purchaseOrder.validation';
import {
  createPurchaseOrderController,
  getPurchaseOrdersController,
  getPurchaseOrderController,
  updatePurchaseOrderController,
  deletePurchaseOrderController,
} from './purchaseOrder.controller';

const router = express.Router();

router.post(
  '/',
  acountLimiter,
  isAuthorized(['admin', 'inventory-manager', 'procurement-manager']),
  purchaseOrderValidation(),
  validate,
  createPurchaseOrderController
);

router.get('/', isAuthenticated, getPurchaseOrdersController);

router.get(
  '/:id',
  isAuthorized(['admin', 'inventory-manager', 'procurement-manager']),
  getPurchaseOrderController
);

router.put(
  '/:id',
  isAuthorized(['admin', 'inventory-manager', 'procurement-manager']),
  purchaseOrderValidation(),
  validate,
  updatePurchaseOrderController
);

router.delete('/:id', isAuthorized(['admin']), deletePurchaseOrderController);

export default router;
