import * as express from 'express';
import { validation, validate } from './user.validation';
import {
  createUserController,
  getUsersController,
  getUserController,
  updateUserController,
  deactivateUserController,
  deleteAccountController,
} from './user.controller';
import acountLimiter from '../../shared/middlewares/rateLimiterForRoutes';
import isAuthorized from '../../shared/middlewares/isAuthorized';
import isAuthenticated from '../../shared/middlewares/isAuthenticated';

const router = express.Router();

router.post(
  '/',
  acountLimiter,
  isAuthorized(['admin', 'human-resources']),
  validation(),
  validate,
  createUserController
);

router.get('/', isAuthenticated, getUsersController);

router.get('/:id', isAuthenticated, getUserController);

router.put(
  '/:id',
  isAuthorized(['admin', 'human-resources']),
  validation(),
  validate,
  updateUserController
);

// Soft delete - sets user status to inactive
router.put(
  '/:id',
  isAuthorized(['admin', 'human-resources']),
  deactivateUserController
);

router.delete('/:id', isAuthorized(['admin']), deleteAccountController);

export default router;
