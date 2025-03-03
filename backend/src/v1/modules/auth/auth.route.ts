import * as express from 'express';
import acountLimiter from '../../shared/middlewares/rateLimiterForRoutes';
import {
  loginValidation,
  forgetPasswordValidation,
  resetPasswordValidation,
  validate,
} from './auth.validation';
import {
  loginController,
  forgotPasswordController,
  resetPasswordController,
  refreshTokenController,
  logoutController,
  getSessionController,
} from './auth.controller';

const router = express.Router();

router.post(
  '/login',
  // acountLimiter,?
  loginValidation(),
  validate,
  loginController
);

router.post(
  '/forgot-password',
  acountLimiter,
  forgetPasswordValidation(),
  validate,
  forgotPasswordController
);

router.put(
  '/reset-password',
  resetPasswordValidation(),
  validate,
  resetPasswordController
);

router.get('/logout', logoutController);

router.get('/refresh', acountLimiter, refreshTokenController);

router.get('/session', getSessionController);

export default router;
