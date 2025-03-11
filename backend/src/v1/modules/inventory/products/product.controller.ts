import { Request, Response, NextFunction } from 'express';
import { Product } from './product.model';
import logger from '../../../shared/utils/logger';
import { isProduct } from './product.service';
import { CustomException } from '../../../shared/utils/errors';

export const createProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { sku } = req.body;
  const existingProduct = await isProduct(sku, next);
  if (existingProduct) {
    return next(new (CustomException as any)(400, 'Product already exist'));
  }

  try {
    const newProduct = new Product(req.body);
    await newProduct.save();

    res.status(201).json({
      status: 'success',
      payload: newProduct,
      message: 'Product created successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(`Error creating product, data: ${req.body}`, error.message);
    return next(new (CustomException as any)(500, 'Error creating product'));
  }
};

export const getProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allProducts = await Product.find().lean();
    res.status(200).json({
      status: 'success',
      payload: allProducts,
    });
    return;
  } catch (error: any) {
    logger.error('Error fetching products', error.message);
    return next(
      new (CustomException as any)(500, 'Error fetching products')
    );
  }
};

export const getProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const product = await Product.find({ id }).lean();
    res.status(200).json({
      status: 'success',
      payload: product,
    });
    return;
  } catch (error: any) {
    logger.error('Error fetching product', error.message);
    return next(
      new (CustomException as any)(500, 'Error fetching product')
    );
  }
};

export const updateProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      ...req.body,
      { new: true }
    );
    if (!updatedProduct) {
      res
        .status(404)
        .json({ status: 'error', message: 'Product not found' });
      return;
    }
    res.status(200).json({
      status: 'success',
      payload: updatedProduct,
      message: 'Product updated successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(
      `Error updating product, ID: ${id}, ${req.body}`,
      error.message
    );
    return next(new (CustomException as any)(500, 'Error updating product'));
  }
};

export const deleteProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      message: 'Product deleted successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(
      `Error deleting product, ID: ${req.params.id}, ${req.body}`,
      error.message
    );
    return next(new (CustomException as any)(500, 'Error deleting product'));
  }
};
