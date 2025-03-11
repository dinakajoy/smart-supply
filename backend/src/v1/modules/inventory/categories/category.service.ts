import { NextFunction } from 'express';
import { Category } from './category.model';
import logger from '../../../shared/utils/logger';
import { CustomException } from '../../../shared/utils/errors';

export const isCategory = async (name: string, next: NextFunction) => {
  try {
    const category = await Category.findOne({ name });
    return category !== null;
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};

export const getCategory = async (name: string, next: NextFunction) => {
  try {
    const category = await Category.findOne({ name });
    return category;
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};
