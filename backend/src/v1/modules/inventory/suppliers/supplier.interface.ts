import { Document } from 'mongoose';

export interface ISupplier extends Document {
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
  createdBy: string;
  updatedBy: string;
}
