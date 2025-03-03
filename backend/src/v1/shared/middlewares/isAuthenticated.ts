import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import logger from '../utils/logger';
import { verifyAccessToken } from '../utils/helpers';
import { isUser } from '../../modules/employees/employee.service';
import {
  InvalidCredentialsException,
  NotFoundException,
  CustomException,
  UnauthorizedException,
} from '../utils/errors';
import { IDecodedToken } from '../interfaces';

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token =
    process.env.NODE_ENV === 'test'
      ? get(req, 'headers.authorization', '').replace(/^Bearer\s/, '')
      : req.cookies['access_token'];
  if (!token) {
    return next(new (NotFoundException as any)());
  }
  try {
    const decodedToken = await verifyAccessToken(
      { token, isRefreshToken: false },
      next
    );
    if (!decodedToken) {
      return next(new (UnauthorizedException as any)());
    }
    const userEmail = (decodedToken as IDecodedToken)?.payload?.email;
    const result = await isUser(userEmail, next);
    if (!result) {
      return next(new (InvalidCredentialsException as any)());
    }
    req.body.email = userEmail;
    next();
  } catch (error: any) {
    logger.error(error.message);
    next(new (CustomException as any)(403, 'Operation unsuccessful'));
  }
};

export default isAuthenticated;
