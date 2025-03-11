import { NextFunction } from 'express';
import { Supplier } from './supplier.model';
import logger from '../../../shared/utils/logger';
import { CustomException } from '../../../shared/utils/errors';

export const isSupplier = async (email: string, next: NextFunction) => {
  try {
    const supplier = await Supplier.find({ email });
    return supplier !== null;
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};

export const getSupplier = async (email: string, next: NextFunction) => {
  try {
    const supplier = await Supplier.find({ email });
    return supplier;
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};
