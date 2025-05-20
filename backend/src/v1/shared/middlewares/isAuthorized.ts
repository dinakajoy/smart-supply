/* eslint-disable consistent-return */
import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import dotenv from 'dotenv-safe';
import { getUser } from '../../modules/users/user.service';
import { verifyAccessToken } from '../utils/helpers';
import {
  InvalidCredentialsException,
  NotFoundException,
  UnauthorizedException,
} from '../utils/errors';
import { CustomRequest, IDecodedToken } from '../interfaces';
import logger from 'shared/utils/logger';

dotenv.config();

const isAuthorized =
  (allowedRoles: string[]) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const token =
        process.env.NODE_ENV === 'test'
          ? get(req, 'headers.authorization', '').replace(/^Bearer\s/, '')
          : req.cookies['accessToken'];
      if (!token) {
        return next(new NotFoundException());
      }
      const decodedToken = await verifyAccessToken({
        token,
        isRefreshToken: false,
      });
      const userEmail = (decodedToken as IDecodedToken)?.payload?.email;
      const user = await getUser(userEmail);
      if (!user) {
        return next(new (InvalidCredentialsException as any)());
      }
      const authorized = allowedRoles.includes(user.role.role);
      if (!authorized) {
        return next(new (UnauthorizedException as any)());
      }
      (req as unknown as CustomRequest).user = {
        id: user._id.toString(),
        email: user.email,
        role: user.role.role,
      };
      next();
    } catch (error: any) {
      logger.error('Authorization middleware error', error.message);
      return next(new UnauthorizedException());
    }
  };

export default isAuthorized;
