import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import { isUser } from '../../modules/users/user.service';
import logger from '../utils/logger';
import {
  InvalidCredentialsException,
  NotFoundException,
  CustomException,
  UnauthorizedException,
} from '../utils/errors';
import { verifyAccessToken } from '../utils/helpers';
import { CustomRequest, IDecodedToken } from '../interfaces';

const isAuthenticated = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token =
    process.env.NODE_ENV === 'test'
      ? get(req, 'headers.authorization', '').replace(/^Bearer\s/, '')
      : req.cookies['accessToken'];
  if (!token) {
    return next(new (NotFoundException as any)());
  }
  try {
    const decodedToken = await verifyAccessToken({
      token,
      isRefreshToken: false,
    });
    const userEmail = (decodedToken as IDecodedToken)?.payload?.email;
    const result = await isUser(userEmail);
    if (!result) {
      return next(new (InvalidCredentialsException as any)());
    }
    ((req as unknown) as CustomRequest).user = {
      email: userEmail,
    };
    next();
  } catch (error: any) {
    logger.error('Authentication middleware error', error.message);
    next(new (CustomException as any)(403, 'Invalid or expired access token'));
  }
};

export default isAuthenticated;
