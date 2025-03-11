import { NextFunction } from 'express';
import { Employee } from './employee.model';
import logger from '../../shared/utils/logger';
import { CustomException } from '../../shared/utils/errors';

export const isUser = async (email: string, next: NextFunction) => {
  try {
    const user = await Employee.findOne({ email });
    return user !== null;
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};

export const getUser = async (email: string, next: NextFunction) => {
  try {
    const user = await Employee.findOne({
      email,
    });
    return user;
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};
