import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from 'config';
import logger from './logger';
import { CustomException, InvalidCredentialsException } from './errors';
import { ICreateToken, IVerifyToken } from '../interfaces';

const accessTokenSecret = config.get('jwt.accessTokenSecret') as string;
const refreshTokenSecret = config.get('jwt.refreshTokenSecret') as string;
const saltGen = config.get('environment.saltWorkFactor') as number;

export const signAccessToken = (payload: ICreateToken): Promise<string> =>
  new Promise((resolve, _reject) => {
    jwt.sign(
      { payload: payload.userInfo },
      payload.isRefreshToken ? refreshTokenSecret : accessTokenSecret,
      { expiresIn: payload.isRefreshToken ? '3d' : '30m' },
      async (err: any, token) => {
        if (err || token === undefined) {
          logger.error(err.message);
          throw new (CustomException as any)(500, 'Unsuccessful operation');
        } else {
          resolve(token);
        }
      }
    );
  });

export const verifyAccessToken = (tokenData: IVerifyToken) =>
  new Promise((resolve, _reject) => {
    jwt.verify(
      tokenData.token,
      tokenData.isRefreshToken ? refreshTokenSecret : accessTokenSecret,
      async (err: any, decodedToken) => {
        if (err) {
          logger.error(err.message);
          throw new (CustomException as any)(500, err.message);
        } else if (decodedToken === undefined) {
          throw new (InvalidCredentialsException as any)();
        } else {
          resolve(decodedToken);
        }
      }
    );
  });

export const hashPassword = (password: string, next: NextFunction) =>
  new Promise((resolve, _reject) => {
    bcrypt.genSalt(saltGen, (err, salt) => {
      bcrypt.hash(password, salt as string, (error, hash) => {
        if (error) {
          logger.error(error.message);
          throw new (CustomException as any)(500, 'Unsuccessful operation');
        }
        resolve(hash);
      });
    });
  });

export const comparePassword = (password: string, hash: string) =>
  new Promise((resolve, _reject) => {
    bcrypt.compare(password, hash, (err, res) => {
      if (err) {
        logger.error(err.message);
        throw new (CustomException as any)(500, 'Unsuccessful operation');
      }
      resolve(res);
    });
  });

// Helper function for password validation
export const isStrongPassword = (password: string): boolean => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

export async function generateTokens(
  userInfo: { email: string; role: string },
  createAccess: boolean,
  createRefresh: boolean
): Promise<{ accessToken?: string; refreshToken?: string }> {
  const tokens: { accessToken?: string; refreshToken?: string } = {};

  if (createAccess) {
    const accessTokenPayload: ICreateToken = {
      userInfo,
      isRefreshToken: false,
    };
    tokens.accessToken = await signAccessToken(accessTokenPayload);
  }

  if (createRefresh) {
    const refreshTokenPayload: ICreateToken = {
      userInfo,
      isRefreshToken: true,
    };
    tokens.refreshToken = await signAccessToken(refreshTokenPayload);
  }

  return tokens;
}
