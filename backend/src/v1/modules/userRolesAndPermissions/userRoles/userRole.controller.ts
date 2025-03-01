import { Request, Response, NextFunction } from 'express';
import logger from '../../../shared/utils/logger';
import { CustomException } from '../../../shared/utils/errors';
import { Role } from './userRole.model';

export const createUserRoleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { slug, role, description, permissions } = req.body;
  const existingRole = await Role.find({ slug });
  if (existingRole.length > 0) {
    return next(new (CustomException as any)(400, 'Role already exist'));
  }

  try {
    const newRole = new Role({
      slug,
      role,
      description,
      permissions,
    });
    await newRole.save();

    res.status(201).json({
      status: 'success',
      payload: newRole,
      message: 'Role created successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(`Error creating role, data: ${req.body}`, error.message);
    return next(new (CustomException as any)(500, 'Error creating role'));
  }
};

export const getUserRolesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roles = await Role.find();
    res.status(200).json({
      status: 'success',
      payload: roles,
    });
    return;
  } catch (error: any) {
    logger.error('Error fetching roles', error.message);
    return next(new (CustomException as any)(500, 'Error fetching roles'));
  }
};

export const getUserRoleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const role = await Role.find({ id }).populate('permissions');
    res.status(200).json({
      status: 'success',
      payload: role,
    });
    return;
  } catch (error: any) {
    logger.error(`Error fetching role by ID: ${id}`, error.message);
    return next(new (CustomException as any)(500, 'Error fetching role'));
  }
};

export const updateUserRoleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { slug, role, description, permissions } = req.body;
  try {
    const updatedRole = await Role.findByIdAndUpdate(
      id,
      { slug, role, description, permissions },
      { new: true }
    );
    if (!updatedRole) {
      res.status(404).json({ status: 'error', message: 'Role not found' });
      return;
    }

    res.status(200).json({
      status: 'success',
      payload: updatedRole,
      message: 'Role updated successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(`Error updating role, ID: ${id}, ${req.body}`, error.message);
    return next(new (CustomException as any)(500, 'Error updating role'));
  }
};

export const deleteUserRoleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const deletedRole = await Role.findByIdAndDelete(id);
    if (!deletedRole) {
      res.status(404).json({ status: 'error', message: 'Role not found' });
      return;
    }
    res.status(200).json({
      status: 'success',
      message: 'Role deleted successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(`Error deleting role, ID: ${id}`, error.message);
    return next(new (CustomException as any)(500, 'Error deleting role'));
  }
};
