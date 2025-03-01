/* eslint-disable consistent-return */
import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import dotenv from 'dotenv-safe';
import { verifyAccessToken } from '../utils/helpers';
import {
  InvalidCredentialsException,
  NotFoundException,
  UnauthorizedException,
} from '../utils/errors';
import { IDecodedToken } from '../interfaces/token';
import { getUser } from 'api/services/user.service';

dotenv.config();

const isAuthorized =
  (...allowedRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const token =
      process.env.NODE_ENV === 'test'
        ? get(req, 'headers.authorization', '').replace(/^Bearer\s/, '')
        : req.session?.isAuthenticated;
    if (!token) {
      return next(new (NotFoundException as any)());
    }
    const decodedToken = await verifyAccessToken(
      { token, isRefreshToken: process.env.NODE_ENV !== 'test' },
      next
    );
    if (!decodedToken) {
      return next(new (UnauthorizedException as any)());
    }
    const userEmail = (decodedToken as IDecodedToken)?.payload?.email;
    const user = await getUser(userEmail, next);
    if (!user) {
      return next(new (InvalidCredentialsException as any)());
    }
    req.body.currentUserId = user._id;
    const authorized = allowedRoles.includes(user.role);
    if (!authorized) {
      return next(new (UnauthorizedException as any)());
    }
    next();
  };

export default isAuthorized;
