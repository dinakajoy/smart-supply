export interface IUserInfo {
  email: string;
  role: string;
}

export interface ICreateToken {
  userInfo: IUserInfo;
  isRefreshToken: boolean;
}

export interface IVerifyToken {
  token: string;
  isRefreshToken: boolean;
}

export interface IDecodedToken {
  payload: IUserInfo;
  iat: number;
  exp: number;
}

export interface CustomRequest extends Request {
  user?: {
    id?: string;
    email?: string;
    role?: string;
  };
}
