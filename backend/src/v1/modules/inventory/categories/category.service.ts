import { NextFunction } from 'express';
import { Category } from './category.model';
import logger from '../../../shared/utils/logger';
import { CustomException } from '../../../shared/utils/errors';

export const isCategory = async (name: string) => {
  try {
    const category = await Category.findOne({ name });
    return category !== null;
  } catch (error: any) {
    logger.error(error.message);
    throw new (CustomException as any)(
      500,
      'Unable to check if category exist'
    );
  }
};

export const getCategory = async (name: string) => {
  try {
    const category = await Category.findOne({ name }).lean();
    return category;
  } catch (error: any) {
    logger.error(error.message);
    throw new (CustomException as any)(500, 'Unable to fetch category by name');
  }
};
