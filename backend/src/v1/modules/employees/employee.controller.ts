import { Request, Response, NextFunction } from 'express';
import { omit } from 'lodash';
import config from 'config';
import { Employee } from './employee.model';
import logger from '../../shared/utils/logger';
import { signAccessToken } from '../../shared/utils/helpers';
import { CustomException } from '../../shared/utils/errors';
import transporter from '../../shared/utils/emailSender';
import { ICreateToken } from '../../shared/interfaces';

export const createEmployeeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const existingUser = await Employee.find({ email });

  if (existingUser) {
    return next(new (CustomException as any)(400, 'Employee already exist'));
  }

  try {
    const newEmployee = new Employee({
        ...req.body,
        password: '',
        mustResetPassword: true,
        isActive: true,
        createdBy: req.body.currentUserId,
        updatedBy: req.body.currentUserId,
      },
    );
    await newEmployee.save();
    const result = omit(newEmployee, ['password']);

    const createToken: ICreateToken = {
      employeeInfo: {
        email: result.email,
        role: result.role.role,
      },
      isRefreshToken: false,
    };
    const accessToken = await signAccessToken(createToken, next);

    const clientUrl = config.get('environment.clientUrl') as string;
    const resetLink = `${clientUrl}/reset-password?token=${accessToken}`;
    const mailSent = await transporter.sendMail({
      to: email,
      subject: 'Imprtant Message From AgriCore Company',
      html: `<b>Hi ${result.name},</b><br/><br/><p>An account was just created for you. Please change your password through this <a href="${resetLink}">link</a> OR copy and paste in your browser ${resetLink}<br /> This link is valid for 1 hour.</p> Or copy link: ${resetLink}`,
    });

    if (!mailSent.messageId) {
      logger.error(
        `Could not send link to reset password for user - ${result.email}`
      );
    }

    res.status(201).json({
      status: 'success',
      payload: result,
      message: 'Employee created successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(`Error creating employee, data: ${req.body}`, error.message);
    return next(new (CustomException as any)(500, 'Error creating employee'));
  }
};

export const getEmployeesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUsers = await Employee.find().select('-password').lean();
    res.status(200).json({
      status: 'success',
      payload: allUsers,
    });
    return;
  } catch (error: any) {
    logger.error('Error fetching employees', error.message);
    return next(
      new (CustomException as any)(500, 'Error fetching employees')
    );
  }
};

export const getEmployeeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await Employee.find({ id }).lean();
    const result = omit(user, ['password']);
    res.status(200).json({
      status: 'success',
      payload: result,
      message: 'Operation successful',
    });
    return;
  } catch (error: any) {
    logger.error('Error fetching employee', error.message);
    return next(
      new (CustomException as any)(500, 'Error fetching employee')
    );
  }
};

export const updateEmployeeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const user = await Employee.findByIdAndUpdate(id, {
      ...req.body,
      updatedBy: req.body.currentUserId,
    });
    if (!user) {
      res
        .status(404)
        .json({ status: 'error', message: 'Employee not found' });
      return;
    }
    const result = omit(user, ['password']);
    res.status(200).json({
      status: 'success',
      payload: result,
      message: 'Employee updated successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(
      `Error updating employee, ID: ${id}, ${req.body}`,
      error.message
    );
    return next(new (CustomException as any)(500, 'Error updating employee'));
  }
};

export const removeEmployeeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await Employee.findByIdAndUpdate(req.params.id, {
      isActive: false,
      mustResetPassword: true,
      resetToken: null,
      resetTokenExpiry: null,
      updatedBy: req.body.currentUserId,
    });
    if (!user) {
      res
        .status(404)
        .json({ status: 'error', message: 'Employee not found' });
      return;
    }
    res.status(200).json({
      status: 'success',
      message: 'Employee deleted successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(
      `Error deleting employee, ID: ${req.params.id}, ${req.body}`,
      error.message
    );
    return next(new (CustomException as any)(500, 'Error deleting employee'));
  }
};

export const deleteAccountController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      message: 'Employee deleted successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(
      `Error deleting employee, ID: ${req.params.id}, ${req.body}`,
      error.message
    );
    return next(new (CustomException as any)(500, 'Error deleting employee'));
  }
};
