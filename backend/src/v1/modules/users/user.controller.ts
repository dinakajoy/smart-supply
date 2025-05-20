import { Request, Response, NextFunction } from 'express';
import { omit } from 'lodash';
import config from 'config';
import { User } from './user.model';
import logger from '../../shared/utils/logger';
import { signAccessToken } from '../../shared/utils/helpers';
import { CustomException } from '../../shared/utils/errors';
import transporter from '../../shared/utils/emailSender';
import { ICreateToken } from '../../shared/interfaces';

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const existingUser = await User.find({ email });

  if (existingUser) {
    return next(new (CustomException as any)(400, 'User already exist'));
  }

  try {
    const newUser = new User({
      ...req.body,
      password: '',
      mustResetPassword: true,
      isActive: true,
      createdBy: req.body.currentUserId,
      updatedBy: req.body.currentUserId,
    });
    await newUser.save();
    const result = omit(newUser, ['password']);

    const createToken: ICreateToken = {
      userInfo: {
        email: result.email,
        role: result.role.role,
      },
      isRefreshToken: false,
    };
    const accessToken = await signAccessToken(createToken);

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
      message: 'User created successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(`Error creating user, data: ${req.body}`, error.message);
    return next(new (CustomException as any)(500, 'Error creating user'));
  }
};

export const getUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUsers = await User.find().select('-password').lean();
    res.status(200).json({
      status: 'success',
      payload: allUsers,
    });
    return;
  } catch (error: any) {
    logger.error('Error fetching users', error.message);
    return next(new (CustomException as any)(500, 'Error fetching users'));
  }
};

export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await User.find({ id }).lean();
    const result = omit(user, ['password']);
    res.status(200).json({
      status: 'success',
      payload: result,
      message: 'Operation successful',
    });
    return;
  } catch (error: any) {
    logger.error('Error fetching user', error.message);
    return next(new (CustomException as any)(500, 'Error fetching user'));
  }
};

export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, {
      ...req.body,
      updatedBy: req.body.currentUserId,
    });
    if (!user) {
      res.status(404).json({ status: 'error', message: 'User not found' });
      return;
    }
    const result = omit(user, ['password']);
    res.status(200).json({
      status: 'success',
      payload: result,
      message: 'User updated successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(
      `Error updating user, ID: ${id}, ${req.body}`,
      error.message
    );
    return next(new (CustomException as any)(500, 'Error updating user'));
  }
};

export const deactivateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      isActive: false,
      mustResetPassword: true,
      resetToken: null,
      resetTokenExpiry: null,
      updatedBy: req.body.currentUserId,
    });
    if (!user) {
      res.status(404).json({ status: 'error', message: 'User not found' });
      return;
    }
    res.status(200).json({
      status: 'success',
      message: 'User deleted successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(
      `Error deleting user, ID: ${req.params.id}, ${req.body}`,
      error.message
    );
    return next(new (CustomException as any)(500, 'Error deleting user'));
  }
};

export const deleteAccountController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      message: 'User deleted successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(
      `Error deleting user, ID: ${req.params.id}, ${req.body}`,
      error.message
    );
    return next(new (CustomException as any)(500, 'Error deleting user'));
  }
};
