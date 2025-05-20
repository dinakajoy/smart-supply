import { Supplier } from './supplier.model';
import logger from '../../../shared/utils/logger';
import { CustomException } from '../../../shared/utils/errors';

export const isSupplier = async (email: string) => {
  try {
    const supplierExists = await Supplier.exists({ email });
    return Boolean(supplierExists);
  } catch (error: any) {
    logger.error(error.message);
    throw new (CustomException as any)(
      500,
      'Unable to check if supplier exist'
    );
  }
};

export const getSupplier = async (email: string) => {
  try {
    const supplier = await Supplier.find({ email }).lean();
    return supplier;
  } catch (error: any) {
    logger.error(error.message);
    throw new (CustomException as any)(
      500,
      'Unable to fetch supplier by email'
    );
  }
};
