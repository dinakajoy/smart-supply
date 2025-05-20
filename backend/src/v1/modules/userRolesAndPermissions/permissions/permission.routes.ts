import * as express from 'express';
import { permissionValidation, validate } from './permission.validation';
import {
  createPermissionController,
  getPermissionsController,
  getPermissionController,
  updatePermissionController,
  deletePermissionController,
} from './permission.controller';
import acountLimiter from '../../../shared/middlewares/rateLimiterForRoutes';
import isAuthorized from '../../../shared/middlewares/isAuthorized';

const router = express.Router();

router.post(
  '/',
  acountLimiter,
  isAuthorized(['admin']),
  permissionValidation(),
  validate,
  createPermissionController
);

router.get('/', isAuthorized(['admin']), getPermissionsController);

router.get('/:id', isAuthorized(['admin']), getPermissionController);

router.put(
  '/:id',
  isAuthorized(['admin']),
  permissionValidation(),
  validate,
  updatePermissionController
);

router.delete('/:id', isAuthorized(['admin']), deletePermissionController);

export default router;
