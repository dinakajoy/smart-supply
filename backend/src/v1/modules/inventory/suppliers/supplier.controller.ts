import { Request, Response, NextFunction } from 'express';
import { Supplier } from './supplier.model';
import logger from '../../../shared/utils/logger';
import { CustomException } from '../../../shared/utils/errors';
import { isSupplier } from './supplier.service';

export const createSupplierController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const existingSupplier = await isSupplier(email, next);
  if (existingSupplier) {
    return next(new (CustomException as any)(400, 'Supplier already exist'));
  }

  try {
    const newSupplier = new Supplier({
      ...req.body,
      createdBy: req.body.user.id,
      updatedBy: req.body.user.id,
    });
    await newSupplier.save();

    res.status(201).json({
      status: 'success',
      payload: newSupplier,
      message: 'Supplier created successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(`Error creating supplier, data: ${req.body}`, error.message);
    return next(new (CustomException as any)(500, 'Error creating supplier'));
  }
};

export const getSuppliersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allSuppliers = await Supplier.find().lean();
    res.status(200).json({
      status: 'success',
      payload: allSuppliers,
    });
    return;
  } catch (error: any) {
    logger.error('Error fetching suppliers', error.message);
    return next(
      new (CustomException as any)(500, 'Error fetching suppliers')
    );
  }
};

export const getSupplierController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.find({ id }).lean();
    res.status(200).json({
      status: 'success',
      payload: supplier,
    });
    return;
  } catch (error: any) {
    logger.error('Error fetching suppplier', error.message);
    return next(
      new (CustomException as any)(500, 'Error fetching suppplier')
    );
  }
};

export const updateSupplierController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      id,
      {
        ...req.body,
        updatedBy: req.body.user.id,
      },
      { new: true }
    );
    if (!updatedSupplier) {
      res
        .status(404)
        .json({ status: 'error', message: 'Supplier not found' });
      return;
    }
    res.status(200).json({
      status: 'success',
      payload: updatedSupplier,
      message: 'Supplier updated successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(
      `Error updating supplier, ID: ${id}, ${req.body}`,
      error.message
    );
    return next(new (CustomException as any)(500, 'Error updating supplier'));
  }
};

export const removeSupplierController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const { id } = req.params;
  try {
    const deactivatedSupplier = await Supplier.findByIdAndUpdate(
      id,
      {
        isActive: false,
        updatedBy: req.body.user.id,
      },
      { new: true }
    );
    if (!deactivatedSupplier) {
      res
        .status(404)
        .json({ status: 'error', message: 'Supplier not found' });
      return;
    }
    res.status(200).json({
      status: 'success',
      payload: deactivatedSupplier,
      message: 'Supplier deactivated successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(
      `Error deactivated supplier, ID: ${id}, ${req.body}`,
      error.message
    );
    return next(new (CustomException as any)(500, 'Error deactivated supplier'));
  }
};

export const deleteSupplierController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      message: 'Supplier deleted successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(
      `Error deleting supplier, ID: ${req.params.id}, ${req.body}`,
      error.message
    );
    return next(new (CustomException as any)(500, 'Error deleting supplier'));
  }
};
