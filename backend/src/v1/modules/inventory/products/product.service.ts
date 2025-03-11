import { NextFunction } from 'express';
import { Product } from './product.model';
import logger from '../../../shared/utils/logger';
import { CustomException } from '../../../shared/utils/errors';

export const isProduct = async (sku: string, next: NextFunction) => {
  try {
    const existingProduct = await Product.find({ sku });
    return existingProduct !== null;
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};

export const getProduct = async (sku: string, next: NextFunction) => {
  try {
    const product = await Product.find({ sku });
    return product;
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};
