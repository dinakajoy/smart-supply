import { User } from './user.model';
import logger from '../../shared/utils/logger';
import { CustomException } from '../../shared/utils/errors';

export const isUser = async (email: string) => {
  try {
    const userExists = await User.exists({ email });
    return Boolean(userExists);
  } catch (error: any) {
    logger.error(error.message);
    throw new (CustomException as any)(500, 'Unable to check if user exist');
  }
};

export const getUser = async (email: string) => {
  try {
    const user = await User.findOne({
      email,
    }).lean();
    return user;
  } catch (error: any) {
    logger.error(error.message);
    throw new (CustomException as any)(500, 'Unable to fetch user by email');
  }
};
