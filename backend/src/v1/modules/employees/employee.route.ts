import * as express from 'express';
import { validation, validate } from './employee.validation';
import {
  createEmployeeController,
  getEmployeesController,
  getEmployeeController,
  updateEmployeeController,
  removeEmployeeController,
  deleteAccountController,
} from './employee.controller';
import acountLimiter from '../../shared/middlewares/rateLimiterForRoutes';

const router = express.Router();

router.post(
  '/',
  acountLimiter,
  validation(),
  validate,
  createEmployeeController
);
router.get('/', getEmployeesController);
router.get('/:id', getEmployeeController);
router.put('/:id', validation(), validate, updateEmployeeController);
router.put('/:id', removeEmployeeController);
router.delete('/:id', deleteAccountController);

export default router;
