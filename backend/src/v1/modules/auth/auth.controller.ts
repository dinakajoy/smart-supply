import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import config from 'config';
import { omit } from 'lodash';
import { Employee } from '../employees/employees.model';
import { IDecodedToken } from '../../shared/interfaces';
import logger from '../../shared/utils/logger';
import {
  verifyAccessToken,
  hashPassword,
  comparePassword,
  isStrongPassword,
  generateTokens,
} from '../../shared/utils/helpers';
import {
  InvalidCredentialsException,
  CustomException,
} from '../../shared/utils/errors';
import transporter from '../../shared/utils/emailSender';
import { getUser } from 'modules/employees/employee.service';

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const user = await Employee.findOne({ email });
    if (!user) {
      logger.warn('Invalid login attempt', { email });
      return next(new (InvalidCredentialsException as any)());
    }

    // Check if user must reset password
    if (user.mustResetPassword) {
      res.status(400).json({
        status: 'error',
        message: 'Please reset your password before logging in.',
      });
      return;
    }

    const isCorrectPassword = await comparePassword(
      password,
      user.password,
      next
    );
    if (!isCorrectPassword) {
      logger.warn('Invalid password attempt', { email });
      return next(new (InvalidCredentialsException as any)());
    }

    // Generate tokens
    const employeeInfo: { email: string; role: string } = {
      email: user.email,
      role: user.role.role,
    };
    const { accessToken, refreshToken } = await generateTokens(
      employeeInfo,
      true,
      true,
      next
    );

    res.cookie('accessToken', accessToken, {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
    req.session.isAuthenticated = refreshToken;

    const result = omit(user, ['password']);
    res.status(200).json({
      status: 'success',
      payload: result,
    });
  } catch (error) {
    logger.error('Error in loginController', error);
    return next(
      new (CustomException as any)(500, 'Login failed. Please try again later.')
    );
  }
};

export const forgotPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  try {
    const user = await Employee.findOne({
      email,
    });
    if (!user) {
      // This is returned like this to prevent hackers from confirming unregistered emails
      res.status(200).json({
        status: 'success',
        message:
          'If the email exists in our system, you will receive a reset link shortly.',
      });
      return;
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    await Employee.findByIdAndUpdate(
      user._id,
      {
        resetToken: hashedToken,
        resetTokenExpiry: new Date(Date.now() + 15 * 60 * 1000), // 15 mins expiry
      },
      { new: true }
    );

    const clientUrl = config.get('environment.clientUrl') as string;
    const resetLink = `${clientUrl}/reset-password?token=${hashedToken}`;
    const html = `<b>Hi ${user.name},</b><br/><br/><p>You requested a password reset. Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 15 minutes.</p> Or copy and paste link in your browser: ${resetLink}`;

    const mailSent = await transporter.sendMail({
      to: email,
      subject: 'Reset Your Password',
      html,
    });
    logger.info(`ForgotPassword Email: ${html}`);

    if (mailSent.messageId) {
      res.status(200).json({
        status: 'success',
        message:
          'If the email exists in our system, you will receive a reset link shortly.',
      });
    } else {
      logger.error('Failed to send reset email', {
        email,
        reason: 'SMTP error or other issue',
      });
      return next(
        new (CustomException as any)(
          500,
          'Unable to send reset email. Please try again later.'
        )
      );
    }
  } catch (error) {
    logger.error('Error in forgotPasswordController', error);
    return next(
      new (CustomException as any)(
        500,
        'Something went wrong. Please try again later.'
      )
    );
  }
};

export const resetPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password, token } = req.body;
  try {
    // Hash the received token to match the stored hashed token
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await Employee.findOne({
      resetToken: hashedToken,
      resetTokenExpiry: {
        gte: new Date(), // Ensure the token hasn't expired
      },
    });
    if (!user) {
      return next(
        new (CustomException as any)(
          400,
          'The reset password link is invalid or has expired.'
        )
      );
    }

    if (!isStrongPassword(password)) {
      return next(
        new (CustomException as any)(
          400,
          'Password must include uppercase, lowercase, a number, and a special character.'
        )
      );
    }

    // Hash the new password
    const hashedPassword = await hashPassword(password, next);

    // Update the user's password and remove the reset token and expiry
    await Employee.findByIdAndUpdate(
      user._id,
      {
        password: hashedPassword,
        mustResetPassword: false,
        resetToken: null,
        resetTokenExpiry: null,
      },
      { new: true }
    );

    res.status(200).json({
      status: 'success',
      message: 'Password updated successfully.',
    });
  } catch (error: any) {
    logger.error('Error in resetPasswordController', error.message);
    return next(
      new (CustomException as any)(
        500,
        'An unexpected error occurred. Please try again later.'
      )
    );
  }
};

export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.session.destroy(err => {
    if (err) {
      logger.error(err.message);
      return next(new (CustomException as any)(500, 'Operation unsuccessful'));
    }
    // Clear session cookie with proper options
    res.clearCookie('accessToken');
    res.clearCookie('connect.sid', {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
    });
    return res.status(200).json({
      status: 'success',
      message: 'Operation successful',
    });
  });
};

export const refreshTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { isAuthenticated } = req.session;
  try {
    if (!req.session || !isAuthenticated) {
      return next(new (InvalidCredentialsException as any)());
    }

    const decodedToken = (await verifyAccessToken(
      { token: isAuthenticated, isRefreshToken: true },
      next
    )) as IDecodedToken;
    if (!decodedToken) {
      logger.warn('Invalid or expired refresh token');
      return next(new (InvalidCredentialsException as any)());
    }

    const user = await Employee.findOne({ email: decodedToken.payload.email });
    if (!user || !user.isActive) {
      logger.warn('Invalid user or inactive account');
      return next(new (InvalidCredentialsException as any)());
    }

    // Generate tokens
    const employeeInfo = { email: user.email, role: user.role.role };
    const { accessToken, refreshToken } = await generateTokens(
      employeeInfo,
      true,
      true,
      next
    );
    res.cookie('accessToken', accessToken, {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
    req.session.isAuthenticated = refreshToken;

    res.status(200).json({
      status: 'success',
      message: 'Token refreshed successfully',
    });
  } catch (error) {
    logger.error('Error in refreshTokenController', error);
    return next(
      new (CustomException as any)(
        500,
        'Failed to refresh token. Please try again later.'
      )
    );
  }
};

export const getSessionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies['accessToken'];

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  const decodedToken = (await verifyAccessToken(
    { token, isRefreshToken: false },
    next
  )) as IDecodedToken;
  if (!decodedToken) {
    logger.warn('Invalid or expired refresh token');
    return next(new (InvalidCredentialsException as any)());
  }

  const userEmail = decodedToken.payload?.email;
  const user = await getUser(userEmail, next);
  if (!user) {
    next(new (InvalidCredentialsException as any)());
  }
  if (!user) {
    logger.warn('Invalid login attempt', { userEmail });
    return next(new (InvalidCredentialsException as any)());
  }

  res.status(200).json({
    status: 'success',
    payload: omit(user, ['password']),
  });
};
