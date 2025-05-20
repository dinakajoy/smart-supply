import * as express from 'express';
import { userRoleValidation, validate } from './userRole.validation';
import {
  createUserRoleController,
  getUserRolesController,
  getUserRoleController,
  updateUserRoleController,
  deleteUserRoleController,
} from './userRole.controller';
import acountLimiter from '../../../shared/middlewares/rateLimiterForRoutes';
import isAuthorized from '../../../shared/middlewares/isAuthorized';

const router = express.Router();

router.post(
  '/',
  acountLimiter,
  isAuthorized(['admin']),
  userRoleValidation(),
  validate,
  createUserRoleController
);

router.get('/', isAuthorized(['admin']), getUserRolesController);

router.get('/:id', isAuthorized(['admin']), getUserRoleController);

router.put(
  '/:id',
  isAuthorized(['admin']),
  userRoleValidation(),
  validate,
  updateUserRoleController
);

router.delete('/:id', isAuthorized(['admin']), deleteUserRoleController);

export default router;
