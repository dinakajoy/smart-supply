import { Request, Response, NextFunction } from 'express';
import { PurchaseOrder } from './purchaseOrder.model';
import logger from '../../../shared/utils/logger';
import { CustomException } from '../../../shared/utils/errors';

export const createPurchaseOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { orderNumber, supplierId, items, totalAmount } = req.body;
    const newPurchaseOrder = new PurchaseOrder({ orderNumber, supplierId, items, totalAmount });
    await newPurchaseOrder.save();
    res.status(201).json({
      status: 'success',
      payload: newPurchaseOrder,
      message: '"Purchase Order created successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(`Error creating purchase Order, data: ${req.body}`, error.message);
    return next(new (CustomException as any)(500, 'Error creating purchase Order'));
  }
};

export const getPurchaseOrdersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const purchaseOrders = await PurchaseOrder.find().populate('supplierId').populate('items.productId');
    res.status(200).json({
      status: 'success',
      payload: purchaseOrders,
    });
    return;
  } catch (error: any) {
    logger.error('Error fetching purchase orders', error.message);
    return next(
      new (CustomException as any)(500, 'Error fetching purchase orders')
    );
  }
};

export const getPurchaseOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const purchaseOrder = await PurchaseOrder.findById(id).populate('supplierId').populate('items.productId');
    if (!purchaseOrder) {
      res.status(404).json({ message: 'Purchase order not found' });
      return;
    }

    if (!purchaseOrder) {
      res
        .status(404)
        .json({ status: 'error', message: 'Purchase Order not found' });
      return;
    }
    res.status(200).json({
      status: 'success',
      payload: purchaseOrder,
    });
    return;
  } catch (error: any) {
    logger.error('Error fetching purchase order', error.message);
    return next(
      new (CustomException as any)(500, 'Error fetching purchase order')
    );
  }
};

export const updatePurchaseOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const updatedOrder = await PurchaseOrder.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedOrder) {
      res.status(404).json({ message: 'Purchase order not found' });
      return;
    }
    res.status(200).json({
      status: 'success',
      payload: updatedOrder,
      message: 'Purchase Order updated successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(
      `Error updating Purchase Order, ID: ${id}, ${req.body}`,
      error.message
    );
    return next(new (CustomException as any)(500, 'Error updating Purchase Order'));
  }
};

export const deletePurchaseOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedPO = await PurchaseOrder.findByIdAndDelete(req.params.id);
    if (!deletedPO) {
      res.status(404).json({ message: 'Purchase order not found' });
      return;
    }
    res.status(200).json({
      status: 'success',
      message: 'Purchase Order deleted successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(
      `Error deleting Purchase Order, ID: ${req.params.id}, ${req.body}`,
      error.message
    );
    return next(new (CustomException as any)(500, 'Error deleting Purchase Order'));
  }
};
