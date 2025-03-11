import * as express from 'express';
import acountLimiter from '../../../shared/middlewares/rateLimiterForRoutes';
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
  purchaseOrderValidation(),
  validate,
  createPurchaseOrderController
);
router.get('/', getPurchaseOrdersController);
router.get('/:id', getPurchaseOrderController);
router.put(
  '/:id',
  purchaseOrderValidation(),
  validate,
  updatePurchaseOrderController
);
router.delete('/:id', deletePurchaseOrderController);

export default router;
