import { Request, Response, NextFunction } from 'express';
import logger from '../../../shared/utils/logger';
import { Category } from './category.model';
import { isCategory } from './category.service';
import { CustomException } from '../../../shared/utils/errors';

export const createCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  const existingCategory = await isCategory(name, next);
  if (existingCategory) {
    return next(new (CustomException as any)(400, 'Category already exist'));
  }

  try {
    const newCategory = new Category({
      name,
    },
    );
    await newCategory.save();
    res.status(201).json({
      status: 'success',
      payload: newCategory,
      message: 'Category created successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(`Error creating category, data: ${req.body}`, error.message);
    return next(new (CustomException as any)(500, 'Error creating category'));
  }
};

export const getCategoriesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allCategories = await Category.find().lean();
    res.status(200).json({
      status: 'success',
      payload: allCategories,
    });
    return;
  } catch (error: any) {
    logger.error('Error fetching categories', error.message);
    return next(
      new (CustomException as any)(500, 'Error fetching categories')
    );
  }
};

export const getCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const category = await Category.find({ id }).lean();
    res.status(200).json({
      status: 'success',
      payload: category,
    });
    return;
  } catch (error: any) {
    logger.error('Error fetching category', error.message);
    return next(
      new (CustomException as any)(500, 'Error fetching category')
    );
  }
};

export const updateCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      ...req.body,
      { new: true }
    );
    if (!updatedCategory) {
      res
        .status(404)
        .json({ status: 'error', message: 'Category not found' });
      return;
    }
    res.status(200).json({
      status: 'success',
      payload: updatedCategory,
      message: 'Category updated successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(
      `Error updating category, ID: ${id}, ${req.body}`,
      error.message
    );
    return next(new (CustomException as any)(500, 'Error updating category'));
  }
};

export const deleteCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      message: 'Category deleted successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(
      `Error deleting category, ID: ${req.params.id}, ${req.body}`,
      error.message
    );
    return next(new (CustomException as any)(500, 'Error deleting category'));
  }
};
