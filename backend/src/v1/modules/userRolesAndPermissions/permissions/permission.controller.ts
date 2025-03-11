import { Request, Response, NextFunction } from 'express';
import { Permission } from './permission.model';
import logger from '../../../shared/utils/logger';
import { CustomException } from '../../../shared/utils/errors';

export const createPermissionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { key, name, description, group } = req.body;
  const existingPermission = await Permission.find({ key });
  if (existingPermission.length > 0) {
    return next(new (CustomException as any)(400, 'Permission already exist'));
  }

  try {
    const newPermission = new Permission({
      key,
      name,
      description,
      group,
    });
    await newPermission.save();

    res.status(201).json({
      status: 'success',
      payload: newPermission,
      message: 'Permission created successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(`Error creating permission, data: ${req.body}`, error.message);
    return next(new (CustomException as any)(500, 'Error creating permission'));
  }
};

export const getPermissionsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const permissions = await Permission.find();
    res.status(200).json({
      status: 'success',
      payload: permissions,
    });
    return;
  } catch (error: any) {
    logger.error('Error fetching permissions', error.message);
    return next(
      new (CustomException as any)(500, 'Error fetching permissions')
    );
  }
};

export const getPermissionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const permission = await Permission.find({ id });
    res.status(200).json({
      status: 'success',
      payload: permission,
    });
    return;
  } catch (error: any) {
    logger.error(`Error fetching permission by ID: ${id}`, error.message);
    return next(new (CustomException as any)(500, 'Error fetching permission'));
  }
};

export const updatePermissionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { key, name, description, group } = req.body;
  try {
    const updatedPermission = await Permission.findByIdAndUpdate(
      id,
      { key, name, description, group },
      { new: true }
    );
    if (!updatedPermission) {
      res
        .status(404)
        .json({ status: 'error', message: 'Permission not found' });
      return;
    }

    res.status(200).json({
      status: 'success',
      payload: updatedPermission,
      message: 'Permission updated successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(
      `Error updating permission, ID: ${id}, ${req.body}`,
      error.message
    );
    return next(new (CustomException as any)(500, 'Error updating permission'));
  }
};

export const deletePermissionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const deletedPermission = await Permission.findByIdAndDelete(id);
    if (!deletedPermission) {
      res
        .status(404)
        .json({ status: 'error', message: 'Permission not found' });
      return;
    }
    res.status(200).json({
      status: 'success',
      message: 'Permission deleted successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(`Error deleting permission, ID: ${id}`, error.message);
    return next(new (CustomException as any)(500, 'Error deleting permission'));
  }
};
