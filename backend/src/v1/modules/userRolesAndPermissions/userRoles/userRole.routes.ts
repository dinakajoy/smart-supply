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

const router = express.Router();

router.post(
  '/',
  acountLimiter,
  userRoleValidation(),
  validate,
  createUserRoleController
);
router.get('/', getUserRolesController);
router.get('/:id', getUserRoleController);
router.put('/:id', userRoleValidation(), validate, updateUserRoleController);
router.delete('/:id', deleteUserRoleController);

export default router;
